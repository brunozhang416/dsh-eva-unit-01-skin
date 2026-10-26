/**
 * EVA-01 launch-console audio: original cinematic score + SFX + TTS.
 * One self-contained browser module, ES2019, no imports/files/network.
 *
 * Lazy: createEvaAudio() only reads feature flags; the AudioContext is
 * created on the first unlock() from a user gesture. A lookahead scheduler
 * (setInterval + ctx.currentTime) replaces per-note timers, and every Web
 * Audio / speechSynthesis call is guarded so a missing API never throws into
 * the plugin. Master chain: gain → soft clip → compressor, held around
 * -20 dBFS RMS (well under the -12 dBFS average budget) with click-free ramps.
 */
function createEvaAudio() {
  'use strict';
  var W = typeof window !== 'undefined' ? window : null;
  var AudioCtor = W && (W.AudioContext || W.webkitAudioContext);
  var noop = function () {};
  /* No Web Audio: keep the API shape, stay silent. */
  if (typeof AudioCtor !== 'function') {
    return {
      supported: false, unlock: function () { return Promise.resolve(false); },
      isUnlocked: function () { return false; }, setEnabled: noop, startBoot: noop,
      setPhase: noop, stopBoot: noop, setBerserk: noop, sfx: noop, setMuted: noop,
      dispose: noop, speak: function () { return Promise.resolve(); },
    };
  }
  var MASTER_LEVEL = 0.6, SCORE_FULL = 1, SCORE_IDLE = 0.32;
  var LOOKAHEAD = 0.12, TICK_MS = 40; /* schedule 120 ms ahead, tick 40 ms */
  var BOOT_BPM = 52, IDLE_BPM = 48, BERSERK_BPM = 128;
  var state = {
    ctx: null, unlocked: false, enabled: true, running: false, wantBoot: false,
    berserk: false, phase: 'idle', disposed: false, schedulerId: 0, stepIndex: 0,
    nextStepTime: 0, closeTimer: 0, voiceListener: null, live: [], noiseBuffer: null,
    master: null, shaper: null, limiter: null, score: null, duck: null, sfxBus: null,
    padBus: null, padFilter: null, padLfo: null, bassBus: null, bassFilter: null,
    bellBus: null, bellDelay: null, bellFeedback: null, bellTone: null, bellWet: null,
    shimmerGain: null, shimmerSource: null, rumbleGain: null, rumbleSource: null,
    berserkBus: null, berserkPulseIn: null, berserkSirenBus: null, berserkSirenFilter: null,
    angelBus: null, angelTimer: 0, angelNext: 0, angelBeat: 0, wantAngel: false,
    speech: { queue: [], active: false, timer: 0, task: null, voice: null },
  };
  /* Original 4-bar progression, one chord per bar:
   *   Em(add9) E3 G3 B3 F#4 → Cmaj7 C3 G3 B3 E4
   *   Am(add9) A2 C3 E3 B3 → B7sus4 B2 E3 F#3 A3
   * Bass E1/C2/A1/B1; bell figure (E-aeolian, 6 notes) E5 B5 F#5 A5 G5 E5. */
  var CHORDS = [[52, 55, 59, 66], [48, 55, 59, 64], [45, 48, 52, 59], [47, 52, 54, 57]];
  var BASS = [28, 36, 33, 35];
  var BELL_MOTIF = [[0, 5, 76], [0, 7, 83], [1, 3, 78], [2, 5, 81], [3, 2, 79], [3, 6, 76]];
  var PAD_TONE = { boot: 780, pilot: 820, plug: 840, insert: 810, neural: 1080, sync: 1180, activate: 1400, launch: 950, idle: 620, berserk: 900 };
  var SHIMMER_LEVEL = { boot: 0.012, pilot: 0.014, plug: 0.013, insert: 0.014, neural: 0.019, sync: 0.022, activate: 0.026, launch: 0.028, idle: 0.008, berserk: 0.018 };
  var BASS_PHASES = ['pilot', 'plug', 'insert', 'neural', 'sync', 'activate', 'launch'];
  var ARP_PHASES = ['neural', 'sync'];

  /* ------------------------------ helpers ----------------------------- */
  function hz(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }
  function clampNumber(v, fallback, lo, hi) { var n = typeof v === 'number' && isFinite(v) ? v : fallback; return n < lo ? lo : n > hi ? hi : n; }
  function now() { return state.ctx ? state.ctx.currentTime : 0; }
  /* Smooth AudioParam move; cancelAndHold stops ramps from stacking. */
  function rampParam(param, value, at, duration) {
    if (!param) return;
    try {
      var start = Math.max(at, now());
      if (typeof param.cancelAndHoldAtTime === 'function') param.cancelAndHoldAtTime(start);
      else { param.cancelScheduledValues(start); param.setValueAtTime(param.value, start); }
      param.linearRampToValueAtTime(value, start + Math.max(duration, 0.01));
    } catch (error) { try { param.value = value; } catch (ignored) {} }
  }
  function makeCurve(amount) {
    var n = 1024, curve = new Float32Array(n), k = Math.max(0.2, amount), norm = Math.tanh(k);
    for (var i = 0; i < n; i += 1) curve[i] = Math.tanh(k * ((i * 2) / (n - 1) - 1)) / norm;
    return curve;
  }
  function makeGain(value, dest) { var n = state.ctx.createGain(); n.gain.value = value; if (dest) n.connect(dest); return n; }
  function makeFilter(type, freq, q, dest) { var n = state.ctx.createBiquadFilter(); n.type = type; n.frequency.value = freq; n.Q.value = q; if (dest) n.connect(dest); return n; }
  /* StereoPanner is optional (older Safari); null means "connect dry". */
  function panNode(pan, dest) {
    try {
      if (typeof state.ctx.createStereoPanner !== 'function') return null;
      var n = state.ctx.createStereoPanner(); n.pan.value = pan; n.connect(dest); return n;
    } catch (error) { return null; }
  }
  function createNoiseBuffer(seconds) {
    var length = Math.max(1, Math.floor(state.ctx.sampleRate * seconds));
    var buffer = state.ctx.createBuffer(1, length, state.ctx.sampleRate), data = buffer.getChannelData(0);
    for (var i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  }
  function disconnectAll(nodes) { for (var i = 0; i < nodes.length; i += 1) { try { nodes[i].disconnect(); } catch (error) {} } }
  /* Keep a source until it ends, then release its per-event node chain. */
  function track(source, cleanup) {
    state.live.push(source);
    source.onended = function () {
      var i = state.live.indexOf(source);
      if (i >= 0) state.live.splice(i, 1);
      try { source.disconnect(); } catch (error) {}
      if (cleanup) { try { cleanup(); } catch (ignored) {} }
    };
    return source;
  }
  function ready() { return !state.disposed && !!state.ctx && state.unlocked; }
  /* One short enveloped tone: type, freq, toFreq, sweep, detune, peak,
   * attack, decay, filter, filterFreq, q. Exponential segments stay > 0. */
  function playTone(dest, at, options) {
    var opts = options || {}, ctx = state.ctx, filter = null;
    var osc = ctx.createOscillator(), gain = ctx.createGain();
    var attack = Math.max(0.003, opts.attack == null ? 0.01 : opts.attack);
    var decay = Math.max(0.02, opts.decay == null ? 0.2 : opts.decay);
    var peak = Math.max(0.0002, opts.peak == null ? 0.05 : opts.peak);
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(Math.max(1, opts.freq || 440), at);
    if (opts.detune) osc.detune.value = opts.detune;
    if (opts.toFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, opts.toFreq), at + Math.max(0.02, opts.sweep || decay));
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    if (opts.filter) { filter = makeFilter(opts.filter, opts.filterFreq || 1200, opts.q || 0.7, null); gain.connect(filter); filter.connect(dest); }
    else gain.connect(dest);
    osc.connect(gain); osc.start(at); osc.stop(at + attack + decay + 0.04);
    track(osc, function () { try { gain.disconnect(); } catch (error) {} if (filter) { try { filter.disconnect(); } catch (ignored) {} } });
    return osc;
  }
  /* One filtered-noise gesture (risers, thuds, clicks). */
  function playNoise(dest, at, options) {
    var opts = options || {}, ctx = state.ctx;
    var source = ctx.createBufferSource(), gain = ctx.createGain(), filter = ctx.createBiquadFilter();
    var duration = Math.max(0.04, opts.dur || 0.4);
    var attack = Math.min(duration * 0.8, Math.max(0.003, opts.attack == null ? 0.02 : opts.attack));
    var peak = Math.max(0.0002, opts.peak == null ? 0.05 : opts.peak);
    source.buffer = state.noiseBuffer; source.loop = false;
    filter.type = opts.filter || 'bandpass'; filter.Q.value = opts.q || 1;
    filter.frequency.setValueAtTime(Math.max(20, opts.from == null ? 600 : opts.from), at);
    if (opts.to) filter.frequency.exponentialRampToValueAtTime(Math.max(20, opts.to), at + Math.max(0.03, opts.sweep || duration));
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    source.connect(filter); filter.connect(gain); gain.connect(dest);
    source.start(at); source.stop(at + duration + 0.05);
    track(source, function () { try { filter.disconnect(); } catch (error) {} try { gain.disconnect(); } catch (ignored) {} });
    return source;
  }

  /* ----------------------------- audio graph -------------------------- */
  /* Built once on unlock; layers are gain-gated long-lived chains. */
  function buildGraph() {
    var ctx = state.ctx;
    state.noiseBuffer = createNoiseBuffer(2.5);
    state.master = makeGain(0.0001, null); /* master → soft clip → limiter */
    state.shaper = ctx.createWaveShaper(); state.shaper.curve = makeCurve(1.4);
    try { state.shaper.oversample = '2x'; } catch (error) {}
    state.limiter = ctx.createDynamicsCompressor();
    state.limiter.threshold.value = -14; state.limiter.knee.value = 8; state.limiter.ratio.value = 6;
    state.limiter.attack.value = 0.003; state.limiter.release.value = 0.3;
    state.master.connect(state.shaper); state.shaper.connect(state.limiter); state.limiter.connect(ctx.destination);
    state.score = makeGain(0.0001, null); state.duck = makeGain(1, state.master); state.score.connect(state.duck);
    state.angelBus = makeGain(0.0001, state.master);
    state.sfxBus = makeGain(0.85, state.master);
    /* pad: detuned triangle/saw pairs per chord into one slow low-pass */
    state.padBus = makeGain(1, null);
    state.padFilter = makeFilter('lowpass', 780, 0.7, state.score); state.padBus.connect(state.padFilter);
    state.padLfo = ctx.createOscillator(); state.padLfo.type = 'sine'; state.padLfo.frequency.value = 0.045;
    state.padLfo.connect(makeGain(140, state.padFilter.frequency)); state.padLfo.start();
    state.bassBus = makeGain(0.9, null); state.bassFilter = makeFilter('lowpass', 250, 0.8, state.score); state.bassBus.connect(state.bassFilter);
    /* bell bus: dry plus a filtered feedback delay (~0.46 s) */
    state.bellBus = makeGain(0.85, state.score);
    state.bellDelay = ctx.createDelay(1.5); state.bellDelay.delayTime.value = 0.46;
    state.bellTone = makeFilter('lowpass', 2400, 0.8, null);
    state.bellFeedback = makeGain(0.3, null); state.bellWet = makeGain(0.4, state.score);
    state.bellBus.connect(state.bellDelay); state.bellDelay.connect(state.bellTone); state.bellTone.connect(state.bellFeedback);
    state.bellFeedback.connect(state.bellDelay); state.bellTone.connect(state.bellWet);
    /* airy filtered-noise shimmer, very quiet */
    state.shimmerSource = ctx.createBufferSource(); state.shimmerSource.buffer = state.noiseBuffer; state.shimmerSource.loop = true;
    var shimmerFilter = makeFilter('bandpass', 1500, 1.1, null), shimmerLfo = ctx.createOscillator(), shimmerTrem = ctx.createOscillator();
    state.shimmerGain = makeGain(0.0001, state.score);
    shimmerLfo.frequency.value = 0.07; shimmerLfo.connect(makeGain(420, shimmerFilter.frequency)); shimmerLfo.start();
    shimmerTrem.frequency.value = 0.05; shimmerTrem.connect(makeGain(0.003, state.shimmerGain.gain)); shimmerTrem.start();
    state.shimmerSource.connect(shimmerFilter); shimmerFilter.connect(state.shimmerGain); state.shimmerSource.start();
    /* launch rumble, gated off until phase 'launch' */
    state.rumbleSource = ctx.createBufferSource(); state.rumbleSource.buffer = state.noiseBuffer; state.rumbleSource.loop = true;
    var rumbleFilter = makeFilter('lowpass', 85, 0.9, null), rumbleLfo = ctx.createOscillator();
    state.rumbleGain = makeGain(0.0001, state.score);
    rumbleLfo.frequency.value = 0.09; rumbleLfo.connect(makeGain(0.25, state.rumbleGain.gain)); rumbleLfo.start();
    state.rumbleSource.connect(rumbleFilter); rumbleFilter.connect(state.rumbleGain); state.rumbleSource.start();
    buildBerserkChain();
  }
  /* Berserk: detuned saw drone + distorted pulse bus + sweeping siren bus,
   * built muted at unlock and brought in by ramp on setBerserk(true). */
  function buildBerserkChain() {
    var ctx = state.ctx;
    state.berserkBus = makeGain(0.0001, state.score);
    var droneFilter = makeFilter('lowpass', 480, 1.4, state.berserkBus), droneLfo = ctx.createOscillator();
    droneLfo.frequency.value = 0.16; droneLfo.connect(makeGain(110, droneFilter.frequency)); droneLfo.start();
    var drones = [[40, 'sawtooth', -9, 0.032], [40, 'sawtooth', 11, 0.03], [28, 'sine', 0, 0.055], [52, 'triangle', -14, 0.016]];
    for (var i = 0; i < drones.length; i += 1) {
      var osc = ctx.createOscillator();
      osc.type = drones[i][1]; osc.frequency.value = hz(drones[i][0]); osc.detune.value = drones[i][2];
      osc.connect(makeGain(drones[i][3], droneFilter)); osc.start();
    }
    state.berserkPulseIn = makeGain(1, null);
    var pulseShaper = ctx.createWaveShaper(); pulseShaper.curve = makeCurve(3.4);
    try { pulseShaper.oversample = '2x'; } catch (error) {}
    state.berserkPulseIn.connect(pulseShaper); pulseShaper.connect(makeFilter('lowpass', 760, 0.9, state.berserkBus));
    state.berserkSirenBus = makeGain(0.9, null);
    state.berserkSirenFilter = makeFilter('bandpass', 900, 3.5, state.berserkBus); state.berserkSirenBus.connect(state.berserkSirenFilter);
  }

  /* ---------------------- tempo + lookahead scheduler ------------------ */
  function bpm() { if (state.berserk) return BERSERK_BPM; return state.phase === 'idle' ? IDLE_BPM : BOOT_BPM; }
  function beatDur() { return 60 / bpm(); }
  function stepDur() { return beatDur() / 2; } /* one eighth note */
  function tick() {
    if (!state.ctx || !state.running) return;
    try {
      var horizon = state.ctx.currentTime + LOOKAHEAD, guard = 0;
      while (state.nextStepTime < horizon && guard < 64) {
        scheduleStep(state.stepIndex, state.nextStepTime);
        state.stepIndex += 1; state.nextStepTime += stepDur(); guard += 1;
      }
    } catch (error) { /* one bad event must never kill the score */ }
  }
  function startScheduler() {
    if (state.schedulerId || !state.ctx) return;
    state.schedulerId = setInterval(tick, TICK_MS); tick();
  }
  function stopScheduler() {
    if (!state.schedulerId) return;
    try { clearInterval(state.schedulerId); } catch (error) {}
    state.schedulerId = 0;
  }
  /* Four bars of 8 eighth-notes: step % 8 is the beat inside a bar, and
   * floor(step / 8) % 4 selects the chord. */
  function scheduleStep(step, at) {
    var local = step % 8, bar = Math.floor(step / 8) % 4;
    if (state.berserk) { scheduleBerserkStep(local, bar, at); return; }
    if (local === 0) {
      schedulePad(at, bar);
      if (BASS_PHASES.indexOf(state.phase) >= 0) scheduleBass(at, bar, beatDur());
      if (bar % 2 === 0) scheduleHeartbeat(at, beatDur());
      if (state.phase !== 'idle') scheduleBellMotif(at, bar);
    }
    if (ARP_PHASES.indexOf(state.phase) >= 0 && local % 2 === 0) scheduleArp(at, bar, local);
    if (state.phase === 'launch' && local === 0 && bar % 2 === 1) scheduleLaunchSwell(at);
  }

  /* -------------------------------- score ----------------------------- */
  function schedulePad(at, bar) {
    var ctx = state.ctx, chord = CHORDS[bar % CHORDS.length];
    var barLength = beatDur() * 4;
    var attack = Math.min(1.5, barLength * 0.35), release = Math.min(2.4, barLength * 0.55);
    var stopAt = at + barLength + release;
    var voice = makeGain(1, state.padBus);
    voice.gain.setValueAtTime(0.0001, at);
    voice.gain.linearRampToValueAtTime(0.034, at + attack);
    voice.gain.setValueAtTime(0.034, at + barLength - Math.min(0.4, barLength * 0.1));
    voice.gain.linearRampToValueAtTime(0.0001, stopAt);
    var nodes = [voice], oscs = [];
    for (var i = 0; i < chord.length; i += 1) {
      var pan = panNode(i % 2 === 0 ? -0.24 : 0.24, voice);
      if (pan) nodes.push(pan);
      var target = pan || voice, voices = [['triangle', -7, 1], ['sawtooth', 6, 0.7]]; /* detuned pair */
      for (var j = 0; j < voices.length; j += 1) {
        var osc = ctx.createOscillator();
        osc.type = voices[j][0]; osc.frequency.value = hz(chord[i]); osc.detune.value = voices[j][1];
        var level = makeGain(voices[j][2], target);
        nodes.push(level); osc.connect(level); osc.start(at); osc.stop(stopAt + 0.05); oscs.push(osc);
      }
    }
    var remaining = oscs.length;
    for (var k = 0; k < oscs.length; k += 1) {
      track(oscs[k], function () { remaining -= 1; if (remaining <= 0) disconnectAll(nodes); });
    }
  }
  function scheduleBass(at, bar, beat) {
    var root = BASS[bar % BASS.length], offsets = [0, 2]; /* beats 1 and 3 */
    for (var i = 0; i < offsets.length; i += 1) {
      var t = at + offsets[i] * beat;
      /* deep sine fundamental plus a quiet octave for small speakers */
      playTone(state.bassBus, t, { type: 'sine', freq: hz(root), peak: 0.18, attack: 0.02, decay: 1.5 });
      playTone(state.bassBus, t, { type: 'triangle', freq: hz(root + 12), peak: 0.04, attack: 0.025, decay: 1.35 });
    }
  }
  function scheduleHeartbeat(at, beat) {
    var level = state.phase === 'idle' ? 0.1 : state.phase === 'launch' ? 0.17 : 0.14;
    thump(at, level); thump(at + beat * 0.34, level * 0.7); /* lub-dub per 2 bars */
  }
  function thump(at, peak) { playTone(state.bassBus, at, { type: 'sine', freq: 64, toFreq: 44, sweep: 0.18, peak: peak, attack: 0.006, decay: 0.24 }); }
  function scheduleBellMotif(at, bar) {
    for (var i = 0; i < BELL_MOTIF.length; i += 1) {
      if (BELL_MOTIF[i][0] !== bar) continue;
      var t = at + BELL_MOTIF[i][1] * stepDur(), midi = BELL_MOTIF[i][2];
      playTone(state.bellBus, t, { type: 'sine', freq: hz(midi), peak: 0.05, attack: 0.012, decay: 2.3 });
      playTone(state.bellBus, t, { type: 'sine', freq: hz(midi + 12), peak: 0.012, attack: 0.014, decay: 1.3 });
    }
  }
  function scheduleArp(at, bar, local) {
    var chord = CHORDS[bar % CHORDS.length], midi = chord[(local / 2) % chord.length] + 12;
    playTone(state.score, at, { type: 'square', freq: hz(midi), peak: 0.02, attack: 0.005, decay: 0.16, filter: 'lowpass', filterFreq: 3200, q: 0.9 });
  }
  /* Activation swell: band-passed noise riser plus a rising triangle. */
  function scheduleActivateRiser(at) {
    playNoise(state.score, at, { filter: 'bandpass', from: 380, to: 3000, sweep: 2.0, dur: 2.2, attack: 0.35, peak: 0.07, q: 1.4 });
    playTone(state.score, at, { type: 'triangle', freq: 220, toFreq: 880, sweep: 2.0, peak: 0.04, attack: 0.3, decay: 1.9, filter: 'lowpass', filterFreq: 2400, q: 0.8 });
  }
  /* Launch: sub rumble swell plus rising sweeps. */
  function scheduleLaunchSwell(at) {
    playNoise(state.score, at, { filter: 'lowpass', from: 220, to: 60, sweep: 2.6, dur: 2.9, attack: 0.6, peak: 0.09, q: 0.9 });
    playTone(state.score, at, { type: 'sawtooth', freq: 42, toFreq: 96, sweep: 2.6, peak: 0.045, attack: 0.4, decay: 2.4, filter: 'lowpass', filterFreq: 420, q: 0.8 });
    playTone(state.score, at + 0.2, { type: 'sine', freq: 180, toFreq: 620, sweep: 2.2, peak: 0.022, attack: 0.5, decay: 2.0 });
  }
  /* Berserk (128 BPM): distorted pulse every beat, siren every 2 bars,
   * short alarm motes over the drone. */
  function scheduleBerserkStep(local, bar, at) {
    if (local % 2 === 0) scheduleBerserkPulse(at, local === 0 ? 0.3 : 0.22);
    if (local === 6 && bar % 2 === 0) scheduleSiren(at);
    if (local === 3 || local === 7) playTone(state.berserkBus, at, { type: 'square', freq: 1568, peak: 0.018, attack: 0.004, decay: 0.07, filter: 'lowpass', filterFreq: 4200, q: 0.8 });
  }
  function scheduleBerserkPulse(at, peak) {
    var ctx = state.ctx, osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(150, at); osc.frequency.exponentialRampToValueAtTime(48, at + 0.18);
    gain.gain.setValueAtTime(0.0001, at); gain.gain.exponentialRampToValueAtTime(peak, at + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.24);
    osc.connect(gain); gain.connect(state.berserkPulseIn); osc.start(at); osc.stop(at + 0.28);
    track(osc, function () { try { gain.disconnect(); } catch (error) {} });
    playNoise(state.berserkBus, at, { filter: 'lowpass', from: 1200, to: 300, dur: 0.09, attack: 0.003, peak: 0.035, q: 0.8 });
  }
  function scheduleSiren(at) {
    var filter = state.berserkSirenFilter;
    if (!filter) return;
    try {
      filter.frequency.cancelScheduledValues(at); filter.frequency.setValueAtTime(420, at);
      filter.frequency.exponentialRampToValueAtTime(1450, at + 0.5);
      filter.frequency.exponentialRampToValueAtTime(360, at + 1.35);
    } catch (error) {}
    playTone(state.berserkSirenBus, at, { type: 'sawtooth', freq: 120, peak: 0.05, attack: 0.06, decay: 1.35, filter: 'lowpass', filterFreq: 2400, q: 0.9 });
  }

  /* -------------------------- ANGEL ATTACK --------------------------- */
  /* Original tense cue for the TV-style title card: low E1/F1 ostinato,
   * timpani hits, high cluster swells and a distant siren. No existing
   * recording or melody is reproduced. */
  var ANGEL_BEAT = 0.62;
  function scheduleAngelBeat(step, at) {
    var bus = state.angelBus;
    if (!bus) return;
    playTone(bus, at, {
      type: 'triangle', freq: hz(step % 2 === 0 ? 28 : 29), peak: step % 2 === 0 ? 0.2 : 0.14,
      attack: 0.008, decay: 0.58, filter: 'lowpass', filterFreq: 220, q: 0.8,
    });
    if (step === 0 || step === 4) {
      playTone(bus, at, { type: 'sine', freq: 58, peak: 0.26, attack: 0.006, decay: 0.55, filter: 'lowpass', filterFreq: 160, q: 0.7 });
      playNoise(bus, at, { filter: 'lowpass', from: 380, to: 110, dur: 0.35, attack: 0.005, peak: 0.07, q: 0.6 });
    }
    if (step === 0) {
      playTone(bus, at, { type: 'sawtooth', freq: hz(64), peak: 0.035, attack: 0.5, decay: 2.2, filter: 'lowpass', filterFreq: 1200, q: 0.9 });
      playTone(bus, at + 0.015, { type: 'sawtooth', freq: hz(65), peak: 0.03, attack: 0.6, decay: 2.4, filter: 'lowpass', filterFreq: 1400, q: 0.9 });
    }
    if (step === 6) {
      playTone(bus, at, { type: 'sine', freq: 320, pitchTo: 220, peak: 0.035, attack: 0.1, decay: 1.0, filter: 'lowpass', filterFreq: 900, q: 0.7 });
    }
  }
  function angelLoop() {
    if (!state.ctx || !state.angelBus || !state.angelTimer) return;
    var horizon = now() + 0.2;
    var guard = 0;
    while (state.angelNext < horizon && guard < 8) {
      scheduleAngelBeat(state.angelBeat, state.angelNext);
      state.angelNext += ANGEL_BEAT;
      state.angelBeat = (state.angelBeat + 1) % 8;
      guard += 1;
    }
  }
  function startAngel() {
    state.wantAngel = true;
    if (state.disposed || !state.ctx || !state.unlocked) return;
    if (state.angelTimer) return;
    rampParam(state.angelBus.gain, 0.85, now(), 0.35);
    state.angelBeat = 0; state.angelNext = now() + 0.06;
    state.angelTimer = setInterval(angelLoop, 55);
    angelLoop();
  }
  function stopAngel() {
    state.wantAngel = false;
    if (state.angelTimer) { try { clearInterval(state.angelTimer); } catch (error) {} state.angelTimer = 0; }
    if (state.ctx && state.angelBus) rampParam(state.angelBus.gain, 0.0001, now(), 0.5);
  }

  /* ------------------------ phase / mode changes ---------------------- */
  function applyPhase(phase, immediate) {
    state.phase = phase;
    if (!state.ctx) return;
    var at = now();
    try {
      rampParam(state.padFilter.frequency, PAD_TONE[phase] || 780, at, immediate ? 0.2 : 0.9);
      rampParam(state.padBus.gain, state.berserk ? 0.22 : phase === 'idle' ? 0.55 : 1, at, 1.2);
      if (state.shimmerGain) rampParam(state.shimmerGain.gain, SHIMMER_LEVEL[phase] || 0.012, at, 1.5);
      if (state.rumbleGain) rampParam(state.rumbleGain.gain, phase === 'launch' ? 1 : 0.0001, at, phase === 'launch' ? 1.8 : 1.2);
      if (state.running) {
        rampParam(state.score.gain, phase === 'idle' ? SCORE_IDLE : SCORE_FULL, at, phase === 'idle' ? 1.8 : 1);
        if (phase === 'activate') scheduleActivateRiser(at + 0.05);
        if (phase === 'launch') scheduleLaunchSwell(at + 0.05);
      }
    } catch (error) {}
  }
  function applyBerserk(on) {
    if (!state.ctx) return;
    var at = now();
    try {
      rampParam(state.berserkBus.gain, on ? 1 : 0.0001, at, on ? 0.5 : 0.4);
      rampParam(state.padBus.gain, on ? 0.22 : state.phase === 'idle' ? 0.55 : 1, at, on ? 0.5 : 1.2);
      if (state.running) rampParam(state.score.gain, on ? SCORE_FULL : state.phase === 'idle' ? SCORE_IDLE : SCORE_FULL, at, on ? 0.6 : 1);
    } catch (error) {}
  }

  /* -------------------------------- SFX ------------------------------- */
  /* Short (0.03–1.5 s) console sounds, all low-passed so nothing stings. */
  function sfxBeep() {
    var at = now() + 0.01;
    playTone(state.sfxBus, at, { type: 'square', freq: 880, peak: 0.05, attack: 0.004, decay: 0.14, filter: 'lowpass', filterFreq: 3200, q: 0.9 });
    playTone(state.sfxBus, at + 0.16, { type: 'square', freq: 880, peak: 0.032, attack: 0.004, decay: 0.1, filter: 'lowpass', filterFreq: 3200, q: 0.9 });
  }
  function sfxAlarm() {
    var at = now() + 0.01;
    for (var i = 0; i < 3; i += 1) {
      var start = 900 - i * 140;
      playTone(state.sfxBus, at + i * 0.27, { type: 'sawtooth', freq: start, toFreq: start * 0.55, sweep: 0.22, peak: 0.045, attack: 0.01, decay: 0.24, filter: 'lowpass', filterFreq: 2400, q: 1.2 });
    }
  }
  function sfxClamp() {
    var at = now() + 0.01;
    playTone(state.sfxBus, at, { type: 'sine', freq: 96, toFreq: 44, sweep: 0.22, peak: 0.16, attack: 0.005, decay: 0.32 });
    playNoise(state.sfxBus, at, { filter: 'lowpass', from: 1400, to: 260, dur: 0.2, attack: 0.004, peak: 0.07, q: 0.8 });
  }
  function sfxLcl() {
    var at = now() + 0.01;
    playNoise(state.sfxBus, at, { filter: 'bandpass', from: 260, to: 2400, sweep: 1.0, dur: 1.05, attack: 0.18, peak: 0.08, q: 2.2 });
    var bubbles = [0.2, 0.42, 0.62];
    for (var i = 0; i < bubbles.length; i += 1) playTone(state.sfxBus, at + bubbles[i], { type: 'sine', freq: 300 + i * 240, toFreq: 430 + i * 260, sweep: 0.12, peak: 0.028, attack: 0.01, decay: 0.14 });
  }
  function sfxSync() {
    var at = now() + 0.01;
    playTone(state.sfxBus, at, { type: 'sine', freq: 440, toFreq: 1320, sweep: 0.55, peak: 0.06, attack: 0.01, decay: 0.55, filter: 'lowpass', filterFreq: 3200, q: 0.8 });
    playTone(state.sfxBus, at, { type: 'square', freq: 220, toFreq: 660, sweep: 0.55, peak: 0.018, attack: 0.01, decay: 0.5, filter: 'lowpass', filterFreq: 1800, q: 0.8 });
  }
  function sfxLaunch() {
    var at = now() + 0.01;
    playNoise(state.sfxBus, at, { filter: 'lowpass', from: 120, to: 60, dur: 1.4, attack: 0.2, peak: 0.12, q: 0.7 });
    playTone(state.sfxBus, at, { type: 'sine', freq: 38, toFreq: 72, sweep: 1.3, peak: 0.09, attack: 0.15, decay: 1.3 });
    playNoise(state.sfxBus, at + 0.1, { filter: 'bandpass', from: 200, to: 1800, sweep: 1.1, dur: 1.2, attack: 0.3, peak: 0.06, q: 1.4 });
  }
  function sfxTyping() {
    var at = now() + 0.005;
    playNoise(state.sfxBus, at, { filter: 'highpass', from: 2400, dur: 0.035, attack: 0.002, peak: 0.05, q: 0.7 });
    playTone(state.sfxBus, at, { type: 'square', freq: 1600, peak: 0.016, attack: 0.002, decay: 0.03, filter: 'lowpass', filterFreq: 4000, q: 0.8 });
  }
  function sfxBoot() {
    var at = now() + 0.01;
    playTone(state.sfxBus, at, { type: 'sine', freq: 110, peak: 0.09, attack: 0.04, decay: 1.2, filter: 'lowpass', filterFreq: 500, q: 0.7 });
    playTone(state.sfxBus, at + 0.02, { type: 'triangle', freq: 165, peak: 0.035, attack: 0.08, decay: 1.0, filter: 'lowpass', filterFreq: 800, q: 0.7 });
    playNoise(state.sfxBus, at, { filter: 'lowpass', from: 600, to: 200, dur: 0.9, attack: 0.1, peak: 0.02, q: 0.8 });
  }


  /* ---------------------------- SYSTEM CUE ---------------------------- */
  /* One armoured-HUD voice for all pilots: short digital chirp sequences,
   * a servo noise tail and a low mechanical thump. No character TTS. */
  var SYSTEM_BASE = {
    gate: 520, boot: 440, pilot: 600, plug: 520, neural: 700, sync: 820,
    activate: 960, launch: 1040, welcome: 660, berserk_on: 220, berserk_off: 420,
  };
  function systemCue(name) {
    if (!ready()) return;
    try {
      var at = now() + 0.02;
      var base = SYSTEM_BASE[name] || 640;
      var steps = name === 'berserk_on' ? [-12, -7, -2, -14] : name === 'launch' ? [0, 7, 12, 19] : [0, 4, 7, 4];
      for (var i = 0; i < steps.length; i += 1) {
        var freq = base * Math.pow(2, steps[i] / 12);
        playTone(state.sfxBus, at + i * 0.075, {
          type: 'square', freq: freq, peak: 0.045, attack: 0.003, decay: 0.07,
          filter: 'lowpass', filterFreq: 2400, q: 0.8,
        });
        playTone(state.sfxBus, at + i * 0.075, {
          type: 'triangle', freq: freq * 0.5, peak: 0.018, attack: 0.003, decay: 0.09,
          filter: 'lowpass', filterFreq: 900, q: 0.7,
        });
      }
      playNoise(state.sfxBus, at, { filter: 'bandpass', from: 1400, to: 380, dur: 0.22, attack: 0.004, peak: 0.02, q: 1.1 });
      playTone(state.sfxBus, at + 0.02, {
        type: 'sine', freq: 74, peak: 0.08, attack: 0.005, decay: 0.22,
        filter: 'lowpass', filterFreq: 150, q: 0.7,
      });
    } catch (error) { /* console must never break */ }
  }
  var SFX = { beep: sfxBeep, alarm: sfxAlarm, clamp: sfxClamp, lcl: sfxLcl, sync: sfxSync, launch: sfxLaunch, typing: sfxTyping, boot: sfxBoot };

  /* -------------------------------- TTS ------------------------------- */
  /* Japanese voice preferred, serialized queue, score ducked to 25 % while
   * speaking. Missing speechSynthesis resolves immediately. */
  function pickVoice(preferred) {
    try {
      var synth = W && W.speechSynthesis;
      if (!synth || typeof synth.getVoices !== 'function') return null;
      var voices = synth.getVoices() || [], japanese = [];
      for (var i = 0; i < voices.length; i += 1) {
        var voice = voices[i];
        if (voice && typeof voice.lang === 'string' && voice.lang.toLowerCase().indexOf('ja') === 0) japanese.push(voice);
      }
      /* Per-pilot preferences first, so Shinji/Asuka/Rei can use different
       * installed Japanese voices where the OS provides them. */
      if (preferred && preferred.length) {
        for (var p = 0; p < preferred.length; p += 1) {
          var token = String(preferred[p] || '').toLowerCase();
          if (!token) continue;
          for (var k = 0; k < japanese.length; k += 1) {
            if (String(japanese[k].name || '').toLowerCase().indexOf(token) !== -1) return japanese[k];
          }
        }
      }
      for (var j = 0; j < japanese.length; j += 1) {
        if (/kyoko|nanami|haruka|ayumi|ichiro|takumi|otoya|hattori|google/i.test(japanese[j].name || '')) return japanese[j];
      }
      return japanese[0] || null;
    } catch (error) { return null; }
  }
  function setDuck(on) {
    if (!state.ctx || !state.duck) return;
    try { rampParam(state.duck.gain, on ? 0.25 : 1, now(), on ? 0.18 : 0.4); } catch (error) {}
  }
  function pumpSpeech() {
    var speech = state.speech;
    if (state.disposed || speech.active) return;
    var task = speech.queue.shift();
    if (!task) { setDuck(false); return; }
    try {
      var synth = W.speechSynthesis;
      if (!synth) { task.resolve(); pumpSpeech(); return; }
      var utterance = new W.SpeechSynthesisUtterance(task.text), voice = pickVoice(task.opts.voice);
      if (voice) { utterance.voice = voice; }
      utterance.lang = task.opts.lang || (voice && voice.lang) || 'ja-JP';
      utterance.rate = clampNumber(task.opts.rate, 0.95, 0.5, 2);
      utterance.pitch = clampNumber(task.opts.pitch, 1.05, 0.1, 2);
      utterance.volume = clampNumber(task.opts.volume, 0.9, 0.1, 1);
      speech.active = true; speech.task = task;
      var finished = false;
      var finish = function () {
        if (finished) return;
        finished = true;
        if (speech.timer) { try { clearTimeout(speech.timer); } catch (error) {} speech.timer = 0; }
        speech.active = false; speech.task = null;
        try { task.resolve(); } catch (error) {}
        pumpSpeech();
      };
      utterance.onend = finish; utterance.onerror = finish; utterance.oncancel = finish;
      /* Some engines never fire end without an installed voice: never hang. */
      speech.timer = setTimeout(finish, Math.max(2800, task.text.length * 140) + 3000);
      setDuck(true); synth.speak(utterance);
    } catch (error) {
      speech.active = false; speech.task = null; setDuck(false);
      try { task.resolve(); } catch (ignored) {}
    }
  }
  function flushSpeech() {
    var speech = state.speech;
    if (speech.timer) { try { clearTimeout(speech.timer); } catch (error) {} speech.timer = 0; }
    try { if (W && W.speechSynthesis) W.speechSynthesis.cancel(); } catch (error) {}
    var pending = speech.queue.splice(0, speech.queue.length);
    if (speech.task) { pending.unshift(speech.task); speech.task = null; }
    speech.active = false;
    for (var i = 0; i < pending.length; i += 1) { try { pending[i].resolve(); } catch (error) {} }
    setDuck(false);
  }

  /* ----------------------------- public API --------------------------- */
  /* Shared tail of unlock(): apply remembered phase/berserk/boot state. */
  function becomeRunning() {
    if (state.disposed || !state.ctx || state.ctx.state !== 'running') return false;
    if (!state.unlocked) {
      state.unlocked = true;
      rampParam(state.master.gain, state.enabled ? MASTER_LEVEL : 0.0001, now(), 0.3);
      if (state.berserk) applyBerserk(true);
      if (state.wantBoot && !state.running) beginScore(); else applyPhase(state.phase, true);
      if (state.wantAngel) startAngel();
    } else if (state.wantBoot && !state.running) beginScore();
    return true;
  }
  function unlock() {
    if (state.disposed) return Promise.resolve(false);
    try {
      if (!state.ctx) { state.ctx = new AudioCtor(); buildGraph(); }
      if (state.ctx.state === 'running') return Promise.resolve(becomeRunning());
      var resuming = typeof state.ctx.resume === 'function' ? state.ctx.resume() : null;
      return Promise.resolve(resuming).then(becomeRunning).catch(function () { return false; });
    } catch (error) {
      try { if (state.ctx) state.ctx.close(); } catch (ignored) {}
      state.ctx = null; return Promise.resolve(false);
    }
  }
  function isUnlocked() { return !!(state.ctx && state.unlocked && state.ctx.state === 'running'); }
  function setEnabled(on) {
    if (state.disposed) return;
    state.enabled = !!on;
    if (!state.ctx) return;
    rampParam(state.master.gain, state.enabled ? MASTER_LEVEL : 0.0001, now(), 0.12);
  }
  function beginScore() {
    if (state.disposed || !state.ctx || !state.unlocked || state.running) return;
    state.running = true;
    if (state.phase === 'idle') state.phase = 'boot';
    state.stepIndex = 0; state.nextStepTime = now() + 0.15;
    applyPhase(state.phase, true);
    rampParam(state.score.gain, SCORE_FULL, now(), 1.5);
    if (state.berserk) applyBerserk(true);
    startScheduler();
  }
  function startBoot() {
    if (state.disposed) return;
    state.wantBoot = true;
    if (!state.ctx || !state.unlocked) return; /* remembered, starts on unlock */
    if (state.running) {
      if (state.phase === 'idle') applyPhase('boot');
      rampParam(state.score.gain, SCORE_FULL, now(), 1.2);
      return;
    }
    beginScore();
  }
  function setPhase(phase) {
    if (state.disposed || typeof phase !== 'string' || !phase) return;
    if (phase === 'berserk') { state.berserk = true; state.phase = 'berserk'; if (state.ctx) applyBerserk(true); return; }
    if (state.berserk) { state.berserk = false; if (state.ctx) applyBerserk(false); }
    applyPhase(phase);
  }
  function stopBoot() {
    if (state.disposed) return;
    state.wantBoot = false;
    if (state.berserk) { state.berserk = false; if (state.ctx) applyBerserk(false); }
    if (!state.running) { state.phase = 'idle'; return; }
    applyPhase('idle'); /* fade to quiet pad + heartbeat ambience */
  }
  function setBerserk(on) {
    if (state.disposed) return;
    state.berserk = !!on;
    if (!state.ctx) return; /* remembered, applied on unlock */
    applyBerserk(state.berserk);
  }
  function sfx(name) {
    if (!ready()) return;
    try { var effect = SFX[name]; if (typeof effect === 'function') effect(); } catch (error) { /* never break the console */ }
  }
  function speak(text, opts) {
    var options = opts || {};
    try {
      if (state.disposed) return Promise.resolve();
      if (!W || !W.speechSynthesis || typeof W.SpeechSynthesisUtterance !== 'function') return Promise.resolve();
      var phrase = typeof text === 'string' ? text.trim() : '';
      if (!phrase) return Promise.resolve();
      return new Promise(function (resolve) {
        try { state.speech.queue.push({ text: phrase, opts: options, resolve: resolve }); pumpSpeech(); } catch (error) { resolve(); }
      });
    } catch (error) { return Promise.resolve(); }
  }
  function dispose() {
    if (state.disposed) return;
    state.disposed = true;
    stopScheduler(); stopAngel(); flushSpeech();
    try {
      if (state.voiceListener && W && W.speechSynthesis && typeof W.speechSynthesis.removeEventListener === 'function') {
        W.speechSynthesis.removeEventListener('voiceschanged', state.voiceListener);
      }
    } catch (error) {}
    state.voiceListener = null;
    try {
      if (state.ctx) {
        var at = now();
        rampParam(state.master.gain, 0.0001, at, 0.08);
        var sources = state.live.slice(0);
        for (var i = 0; i < sources.length; i += 1) { try { sources[i].stop(at + 0.09); } catch (error) {} }
        state.live.length = 0;
        var closedCtx = state.ctx;
        /* tracked timer: deferred AudioContext close; clears its own id. */
        state.closeTimer = setTimeout(function () { state.closeTimer = 0; try { closedCtx.close(); } catch (error) {} }, 260);
      }
    } catch (error) {}
    state.unlocked = false; state.running = false; state.wantBoot = false; state.phase = 'idle';
  }
  /* voiceschanged is not a timer, but it must be released on dispose too. */
  try {
    if (W && W.speechSynthesis && typeof W.speechSynthesis.addEventListener === 'function') {
      state.voiceListener = function () { try { state.speech.voice = pickVoice() || state.speech.voice; } catch (error) {} };
      W.speechSynthesis.addEventListener('voiceschanged', state.voiceListener);
    }
  } catch (error) {}
  return {
    supported: true, unlock: unlock, isUnlocked: isUnlocked, setEnabled: setEnabled,
    startBoot: startBoot, setPhase: setPhase, stopBoot: stopBoot, setBerserk: setBerserk,
    sfx: sfx, speak: speak, systemCue: systemCue, setMuted: function (on) { setEnabled(!on); }, dispose: dispose,
    startAngel: startAngel, stopAngel: stopAngel,
  };
}
