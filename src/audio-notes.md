# EVA-01 audio module (`eva-unit-01/src/audio.js`)

API: `supported`, `unlock()`, `isUnlocked()`, `setEnabled(on)`, `setMuted(on)`, `startBoot()`, `setPhase(name)`, `stopBoot()`, `setBerserk(on)`, `sfx(name)`, `speak(text, opts)`, `dispose()`. Lazy: `unlock()` (user gesture) creates/resumes the AudioContext; every other call only records state before that.

Score (original): E-minor-ish, 52 BPM, 4-bar loop, one chord per bar — Em(add9) → Cmaj7 → Am(add9) → B7sus4. Layers: 8 detuned triangle/saw pad voices into a 780 Hz low-pass with a 0.045 Hz LFO; deep sine bass on beats 1 and 3 (plus a quiet octave); lub-dub heartbeat (64→44 Hz) once per two bars; sparse 6-note bell motif E5 B5 F#5 A5 G5 E5 through a 0.46 s feedback delay; very quiet filtered-noise shimmer.

Phases: `boot` = pad + heartbeat; `pilot`/`plug`/`insert` add bass; `neural`/`sync` add square sync-beep arpeggio and open the pad filter (~1.1–1.2 kHz); `activate` swells (riser + opened filter); `launch` adds sub rumble + rising sweeps; `idle` is quiet pad + heartbeat at 32 % score gain; `berserk` (or `setBerserk(true)`) is a 128 BPM detuned saw drone + distorted pulse every beat + siren every two bars + alarm motes.

SFX: `beep` (square 880), `alarm` (3 descending sweeps), `clamp` (low thud + noise), `lcl` (rising band-passed noise + bubbles), `sync` (rising sine), `launch` (rumble + sweep), `typing` (tiny click), `boot` (low tone); all 0.03–1.5 s and low-passed.

TTS: `speak()` serializes utterances, prefers a `ja*` voice (rate 0.95, pitch 1.05), ducks the score to 25 % while speaking and restores it on end/error; missing `speechSynthesis` resolves immediately, and a safety timer resolves if the engine never fires `end`.

Cleanup: `dispose()` clears the scheduler interval and the speech safety timer, cancels TTS (resolving queued promises), stops every tracked source, fades then closes the AudioContext through one tracked deferred timer, and removes the `voiceschanged` listener. `setPhase`/`setBerserk`/`startBoot` called before `unlock()` are remembered and applied when the context starts.

Autoplay: browsers require a user gesture — call `unlock()` from a click/keydown (the skin does this from its sound toggle); before that the module is silent and no AudioContext exists.
