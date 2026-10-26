window.__ModuleLoader__.load({
  id: 'dsh-eva-unit-01-skin',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useRef, useState } = React;

    /* ------------------------------------------------------------------ *
     * Generated payload — build.mjs injects the stylesheet and artwork.
     * ------------------------------------------------------------------ */
    const CSS = __EVA_CSS__;
    const ART = __EVA_ART__;

    /* ------------------------------------------------------------------ *
     * Page-local signals and the tiny persistence they need.
     * ------------------------------------------------------------------ */
    const FX_KEY = 'eva01.hud.fx';
    const BERSERK_KEY = 'eva01.berserk';
    const SOUND_KEY = 'eva01.sound';
    const GATE_KEY = 'eva01.gate';
    const PILOT_KEY = 'eva01.pilot';
    const ASSET_VERSION = '1.5.2';

    const assetUrl = (file) => '/dsh-eva-unit-01/assets/' + file + '?v=' + ASSET_VERSION;

    function readFx() {
      try {
        const value = window.localStorage.getItem(FX_KEY);
        return value === 'lite' || value === 'off' ? value : 'full';
      } catch (error) {
        return 'full';
      }
    }

    function writeFx(value) {
      try {
        window.localStorage.setItem(FX_KEY, value);
      } catch (error) {
        /* private mode: the preference simply stays page-local */
      }
    }

    function readBerserk() {
      try {
        return window.localStorage.getItem(BERSERK_KEY) === '1';
      } catch (error) {
        return false;
      }
    }

    function writeBerserk(on) {
      try {
        window.localStorage.setItem(BERSERK_KEY, on ? '1' : '0');
      } catch (error) {
        /* page-local only */
      }
    }

    function readSound() {
      try {
        return window.localStorage.getItem(SOUND_KEY) !== '0';
      } catch (error) {
        return true;
      }
    }

    function writeSound(on) {
      try {
        window.localStorage.setItem(SOUND_KEY, on ? '1' : '0');
      } catch (error) {
        /* page-local only */
      }
    }

    function hasGatePassed() {
      try {
        return window.sessionStorage.getItem(GATE_KEY) === '1';
      } catch (error) {
        return false;
      }
    }

    function markGatePassed() {
      try {
        window.sessionStorage.setItem(GATE_KEY, '1');
      } catch (error) {
        /* page-local only */
      }
    }

    function readPilot() {
      try {
        const value = window.localStorage.getItem(PILOT_KEY);
        return value === 'asuka' || value === 'rei' || value === 'shinji' ? value : 'shinji';
      } catch (error) {
        return 'shinji';
      }
    }

    function writePilot(key) {
      try {
        window.localStorage.setItem(PILOT_KEY, key);
      } catch (error) {
        /* page-local only */
      }
    }

    function createSignal(initial) {
      const listeners = new Set();
      let value = initial;
      return {
        get() {
          return value;
        },
        set(next) {
          if (next === value) return;
          value = next;
          listeners.forEach((listener) => listener(value));
        },
        subscribe(listener) {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
      };
    }

    const fxSignal = createSignal(readFx());
    const launchSignal = createSignal(0);
    const berserkSignal = createSignal(readBerserk());
    const berserkBurstSignal = createSignal(0);
    const soundSignal = createSignal(readSound());
    const captionSignal = createSignal(null);
    const pilotSwitchSignal = createSignal(0);
    const cockpitOpenSignal = createSignal(false);
    let pendingPilotKey = null;
    const balanceSignal = createSignal({ state: 'loading' });
    let balanceFeedTimer = 0;

    function loadBalance(force) {
      const url = '/dsh-eva-unit-01/balance.json' + (force ? '?refresh=1' : '');
      return fetch(url, { headers: { accept: 'application/json' }, credentials: 'same-origin' })
        .then((response) => response.json())
        .then((data) => {
          const next = data && typeof data === 'object' ? data : { ok: false };
          balanceSignal.set(next);
          return next;
        })
        .catch(() => {
          const next = { ok: false, code: 'OFFLINE' };
          balanceSignal.set(next);
          return next;
        });
    }

    function startBalanceFeed() {
      stopBalanceFeed();
      loadBalance(false);
      balanceFeedTimer = setInterval(() => loadBalance(false), 60000);
    }

    function stopBalanceFeed() {
      if (!balanceFeedTimer) return;
      clearInterval(balanceFeedTimer);
      balanceFeedTimer = 0;
    }

    function usePower() {
      const balance = useSignal(balanceSignal);
      const amount = balance && balance.ok ? Number(balance.balance) : NaN;
      const known = Number.isFinite(amount);
      const pct = known ? Math.max(0, Math.min(100, amount)) : 0;
      return {
        balance,
        known,
        amount: known ? amount : null,
        pct,
        low: known && amount < 15,
        text: known ? (balance.text || ('¥' + amount.toFixed(2))) : (balance && balance.code ? balance.code : '···'),
      };
    }


    /* __EVA_AUDIO__ */

    let audio = createEvaAudio();

    // ------------------------------------------------------------------
    // Pilot roster. Each pilot owns a unit page (01 / 02 / 03), a palette,
    // a portrait set, voice parameters and an original script. The names are
    // homage only; artwork, music and lines are original to this plugin.
    // ------------------------------------------------------------------
    const PILOTS = {
      shinji: {
        key: 'shinji',
        no: '01',
        unit: '01',
        unitJp: '初号機',
        unitEn: 'UNIT-01',
        name: '碇シンジ',
        en: 'SHINJI IKARI',
        avatar: 'pilotAvatar',
        portrait: 'pilotPortrait',
        casual: 'pilotCasual',
        head: 'head',
        assetAvatar: 'avatar-shinji.png',
        assetPortrait: 'portrait-shinji.png',
        photo: true,
        voice: { rate: 0.86, pitch: 1.02, volume: 0.88, prefer: ['eddy', 'reed', 'kyoko'] },
        voiceLabel: 'BOYISH',
        intro: { jp: 'こんにちは。碇シンジです。……よろしく。', zh: '你好，我是碇真嗣。……请多指教。' },
        lines: {
          gate: { jp: 'ゲートの前で、足が止まる', zh: '在闸门前，脚迈不动。' },
          boot: { jp: 'システム、起動した…？', zh: '系统…启动了吗？' },
          pilot: { jp: 'パイロット、搭乗します', zh: '驾驶员，开始登机。' },
          plug: { jp: 'プラグ、入るの…怖い', zh: '插入栓要进去了…好怕。' },
          neural: { jp: '神経、つながってく…', zh: '神经…正在接上。' },
          sync: { jp: 'シンクロ率、上がってる', zh: '同步率在往上走。' },
          activate: { jp: '初号機が、動き出した', zh: '初号机…动起来了。' },
          launch: { jp: '発進、します…！', zh: '要…出发了！' },
          welcome: { jp: '来てくれた…うれしい', zh: '你来了…我很高兴。' },
          berserk_on: { jp: '止まらない、誰か止めて', zh: '停不下来…谁来拦住它！' },
          berserk_off: { jp: '…戻った、の？', zh: '……回来了吗？' },
          complete: { jp: '生きてる…よかった', zh: '还活着…太好了。' },
        },
      },
      asuka: {
        key: 'asuka',
        no: '02',
        unit: '02',
        unitJp: '二号機',
        unitEn: 'UNIT-02',
        name: '明日香',
        en: 'ASUKA LANGLEY',
        avatar: 'asukaAvatar',
        portrait: 'asukaPortrait',
        casual: 'asukaPortrait',
        head: 'head02',
        assetAvatar: 'avatar-asuka.png',
        assetPortrait: 'portrait-asuka.png',
        photo: true,
        voice: { rate: 1.12, pitch: 1.38, volume: 1, prefer: ['kyoko', 'sandy', 'flo'] },
        voiceLabel: 'BRIGHT',
        intro: { jp: 'あたし、明日香。よろしくね。', zh: '我是明日香。请多指教。' },
        lines: {
          gate: { jp: '私に任せなさい！', zh: '交给我吧！' },
          boot: { jp: 'システム、起動ね。', zh: '系统，启动了呢。' },
          pilot: { jp: 'アスカ、搭乗するわ。', zh: '明日香，登机。' },
          plug: { jp: 'プラグ、装着！', zh: '插入栓，装着！' },
          neural: { jp: '神経接続、完了。', zh: '神经连接，完成。' },
          sync: { jp: 'シンクロ率、見てなさい！', zh: '看看同步率吧！' },
          activate: { jp: '二号機、起動！', zh: '二号机，启动！' },
          launch: { jp: '発進よ！', zh: '出发！' },
          welcome: { jp: '戻ったわ。何するの？', zh: '我回来了。要做什么？' },
          berserk_on: { jp: 'うわっ…制御不能！？', zh: '哇……控制不住了！？' },
          berserk_off: { jp: '……戻ったわね。', zh: '……回来了呢。' },
          complete: { jp: '任務完了！', zh: '任务完成！' },
        },
      },
      rei: {
        key: 'rei',
        no: '00',
        unit: '00',
        unitJp: '零号機',
        unitEn: 'UNIT-00',
        name: '綾波レイ',
        en: 'REI AYANAMI',
        avatar: 'reiAvatar',
        portrait: 'reiPortrait',
        casual: 'reiPortrait',
        head: 'head00',
        assetAvatar: 'avatar-rei.png',
        assetPortrait: 'portrait-rei.png',
        photo: true,
        voice: { rate: 0.72, pitch: 0.72, volume: 0.7, prefer: ['shelley', 'flo', 'kyoko'] },
        voiceLabel: 'COLD',
        intro: { jp: '……綾波レイ。よろしく。', zh: '……绫波丽。请多指教。' },
        lines: {
          gate: { jp: '……指示をください。', zh: '……请下指示。' },
          boot: { jp: 'システム、起動。', zh: '系统，启动。' },
          pilot: { jp: '綾波レイ、搭乗します。', zh: '绫波丽，登机。' },
          plug: { jp: 'プラグ、接続。', zh: '插入栓，连接。' },
          neural: { jp: '神経、接続。', zh: '神经，连接。' },
          sync: { jp: 'シンクロ、上昇。', zh: '同步率，上升。' },
          activate: { jp: '零号機、起動。', zh: '零号机，启动。' },
          launch: { jp: '発進します。', zh: '出发。' },
          welcome: { jp: 'おかえりなさい。', zh: '欢迎回来。' },
          berserk_on: { jp: '……制御、できません。', zh: '……无法控制。' },
          berserk_off: { jp: '……戻りました。', zh: '……回来了。' },
          complete: { jp: '任務、完了。', zh: '任务，完成。' },
        },
      },
    };

    const pilotSignal = createSignal(readPilot());

    function pilotOf(key) {
      return PILOTS[key] || PILOTS.shinji;
    }

    function currentPilot() {
      return pilotOf(pilotSignal.get());
    }

    function setPilot(key) {
      if (!PILOTS[key] || pilotSignal.get() === key) return;
      writePilot(key);
      pilotSignal.set(key);
    }

    function choosePilot(key) {
      if (!PILOTS[key]) return;
      setPilot(key);
      sayIntro(key);
      if (soundSignal.get()) audio.unlock();
    }

    function openPilotSwitch() {
      pendingPilotKey = null;
      pilotSwitchSignal.set(pilotSwitchSignal.get() + 1);
    }

    function openPilotSwitchFor(key) {
      pendingPilotKey = PILOTS[key] ? key : null;
      pilotSwitchSignal.set(pilotSwitchSignal.get() + 1);
    }

    function cyclePilot() {
      const keys = Object.keys(PILOTS);
      const index = keys.indexOf(pilotSignal.get());
      choosePilot(keys[(index + 1) % keys.length]);
    }

    function usePilot() {
      return pilotOf(useSignal(pilotSignal));
    }

    let captionSeq = 0;
    let captionTimer = 0;

    function sayLine(key) {
      const pilot = currentPilot();
      const line = pilot.lines[key];
      if (!line) return;
      captionSeq += 1;
      const current = captionSeq;
      captionSignal.set({ id: current, jp: line.jp, zh: line.zh, pilot: pilot.key });
      clearTimeout(captionTimer);
      captionTimer = setTimeout(() => {
        if (captionSeq === current) captionSignal.set(null);
      }, 4600);
      if (soundSignal.get()) {
        audio.speak(line.jp, {
          lang: 'ja-JP',
          rate: pilot.voice.rate,
          pitch: pilot.voice.pitch,
          volume: pilot.voice.volume,
          voice: pilot.voice.prefer,
        });
      }
    }

    // Pilot self-introduction played when a card is picked (and when the
    // workbench cycles pilots).
    function sayIntro(key) {
      const pilot = pilotOf(key);
      const line = pilot.intro;
      if (!line) return;
      captionSeq += 1;
      const current = captionSeq;
      captionSignal.set({ id: current, jp: line.jp, zh: line.zh, pilot: pilot.key });
      clearTimeout(captionTimer);
      captionTimer = setTimeout(() => {
        if (captionSeq === current) captionSignal.set(null);
      }, 5200);
      if (soundSignal.get()) {
        audio.speak(line.jp, {
          lang: 'ja-JP',
          rate: pilot.voice.rate,
          pitch: pilot.voice.pitch,
          volume: pilot.voice.volume,
          voice: pilot.voice.prefer,
        });
      }
    }

    function toggleSound() {
      const next = !soundSignal.get();
      soundSignal.set(next);
      writeSound(next);
      audio.setEnabled(next);
      if (next) {
        audio.unlock().then((ok) => {
          if (ok) {
            audio.sfx('beep');
            audio.setPhase('idle');
            audio.startBoot();
            audio.stopBoot();
          }
        });
      }
    }

    function setFx(next) {
      fxSignal.set(next);
      writeFx(next);
    }

    function toggleBerserk() {
      const next = !berserkSignal.get();
      berserkSignal.set(next);
      writeBerserk(next);
      if (next) berserkBurstSignal.set(berserkBurstSignal.get() + 1);
    }

    function useSignal(signal) {
      const [, force] = useState(0);
      useEffect(() => signal.subscribe(() => force((tick) => tick + 1)), [signal]);
      return signal.get();
    }

    const reduceMotion = () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pad = (value) => String(value).padStart(2, '0');

    function Art(props) {
      return h('span', {
        className: props.className,
        'aria-hidden': true,
        dangerouslySetInnerHTML: { __html: ART[props.name] || '' },
      });
    }

    function PilotImage(props) {
      const pilot = props.pilot;
      const file = props.kind === 'portrait' ? pilot.assetPortrait : pilot.assetAvatar;
      const url = assetUrl(file);
      const className = 'eva-pilot-img' + (props.className ? ' ' + props.className : '');
      if (pilot.photo) {
        return h('span', { className: className + ' eva-pilot-img--photo', 'aria-hidden': true },
          h('img', { src: url, alt: '' }));
      }
      return h('span', {
        className: className + ' eva-pilot-img--mask',
        'aria-hidden': true,
        style: {
          WebkitMaskImage: 'url(' + url + ')',
          maskImage: 'url(' + url + ')',
        },
      });
    }

    function useClock() {
      const [clock, setClock] = useState(() => new Date());
      useEffect(() => {
        const timer = setInterval(() => setClock(new Date()), 1000);
        return () => clearInterval(timer);
      }, []);
      return clock;
    }

    function clockText(clock) {
      return pad(clock.getHours()) + ':' + pad(clock.getMinutes()) + ':' + pad(clock.getSeconds());
    }

    function dateText(clock) {
      return clock.getFullYear() + '.' + pad(clock.getMonth() + 1) + '.' + pad(clock.getDate());
    }

    /* ------------------------------------------------------------------ *
     * LAUNCH SEQUENCE — a seven-scene Unit-01 start-up:
     *   boot → pilot entry → entry-plug lock → neural link → sync 100%
     *   → activation → launch.  Roughly 13.7 s, skippable with Esc/Space or
     *   the SKIP button; a 2.7 s "restart" variant plays for reloads within
     *   five minutes of the last launch.
     * ------------------------------------------------------------------ */
    const FULL_SCENES = [
      { id: 'boot', ms: 1400, jp: 'システム起動', en: 'SYSTEM BOOT' },
      { id: 'pilot', ms: 2200, jp: 'パイロット認証', en: 'PILOT AUTHENTICATION' },
      { id: 'plug', ms: 2500, jp: 'パイロット搭乗', en: 'PILOT ENTRY' },
      { id: 'insert', ms: 1900, jp: 'プラグ挿入', en: 'ENTRY PLUG LOCK' },
      { id: 'neural', ms: 2500, jp: '神経接続', en: 'NEURAL LINK' },
      { id: 'sync', ms: 1500, jp: 'シンクロ率 100%', en: 'SYNC RATIO' },
      { id: 'activate', ms: 2000, jp: '初号機 起動', en: 'UNIT-01 ACTIVATED' },
      { id: 'launch', ms: 1900, jp: '発進', en: 'LAUNCH' },
    ];

    // Reduced-motion fallback: three static beats instead of the full motion
    // sequence, so the splash still appears instead of vanishing.
    const STATIC_SCENES = [
      { id: 'boot', ms: 900, jp: 'システム起動', en: 'SYSTEM BOOT' },
      { id: 'activate', ms: 900, jp: '初号機 起動', en: 'UNIT-01 ACTIVATED' },
      { id: 'launch', ms: 900, jp: '発進', en: 'LAUNCH' },
    ];

    const LEAVE_MS = 620;
    const SLATS = [0, 1, 2, 3, 4, 5, 6];

    const BOOT_LINES = [
      ['MAGI SYSTEM', 'CHECK'],
      ['OS VERSION', '1.0.0'],
      ['POWER FEED', 'STABLE'],
      ['ARMOR INTEGRITY', '100%'],
      ['COOLANT LOOP', 'NOMINAL'],
      ['A10 CLIPS', 'STANDBY'],
      ['NEURAL BUFFER', 'EMPTY'],
      ['SYNC MONITOR', 'OFFLINE'],
    ];

    function sceneAt(scenes, elapsed) {
      let acc = 0;
      for (let index = 0; index < scenes.length; index += 1) {
        const scene = scenes[index];
        if (elapsed < acc + scene.ms || index === scenes.length - 1) {
          return {
            index,
            scene,
            progress: Math.max(0, Math.min(1, (elapsed - acc) / scene.ms)),
          };
        }
        acc += scene.ms;
      }
      return { index: scenes.length - 1, scene: scenes[scenes.length - 1], progress: 1 };
    }

    function syncAt(scenes, elapsed) {
      let acc = 0;
      let sync = 0;
      for (const scene of scenes) {
        const reached = elapsed >= acc;
        const local = Math.max(0, Math.min(1, (elapsed - acc) / scene.ms));
        if (reached && scene.id === 'neural') sync = local * 86;
        if (reached && scene.id === 'sync') sync = 86 + local * 14;
        if (reached && (scene.id === 'activate' || scene.id === 'launch')) sync = 100;
        acc += scene.ms;
      }
      return Math.max(0, Math.min(100, sync));
    }

    function lclAt(scenes, elapsed) {
      let acc = 0;
      let lcl = 0;
      for (const scene of scenes) {
        const reached = elapsed >= acc;
        const local = Math.max(0, Math.min(1, (elapsed - acc) / scene.ms));
        if (reached && scene.id === 'plug') lcl = local;
        if (reached && (scene.id === 'insert' || scene.id === 'neural' || scene.id === 'sync' ||
          scene.id === 'activate' || scene.id === 'launch')) lcl = 1;
        acc += scene.ms;
      }
      return Math.max(0, Math.min(1, lcl));
    }

    function SceneReadout(props) {
      return h('div', { className: 'eva-scene__side' },
        h('div', { className: 'eva-scene__meta' },
          h('b', null, props.jp),
          h('span', null, props.en)),
        (props.rows || []).map((row, index) =>
          h('div', { key: index, className: 'eva-info__row' },
            h('span', null, row[0]),
            h('b', null, row[2] || 'OK'))),
        h('div', { className: 'eva-scene__big' }, props.big));
    }

    function BootScene() {
      return h('div', { className: 'eva-scene eva-scene--boot' },
        h('div', { className: 'eva-boot' },
          h('div', { className: 'eva-boot__term' },
            BOOT_LINES.map((line, index) =>
              h('div', { key: index, className: 'eva-boot__line' },
                h('span', null, line[0]),
                h('span', null, line[1])))),
          h('div', { className: 'eva-boot__dial' },
            h('span', { className: 'eva-boot__ring' }),
            h('span', { className: 'eva-boot__ring eva-boot__ring--2' }),
            h('span', { className: 'eva-boot__core' }, '01'))),
        h(SceneReadout, {
          jp: '起動シーケンス',
          en: 'BOOT SEQUENCE',
          big: '起動',
          rows: [
            ['MAGI', '照合', 'CHECK'],
            ['電源', '供給', 'FEED'],
            ['装甲', '健全', '100%'],
          ],
        }));
    }

    function PilotScene() {
      const pilot = usePilot();
      return h('div', { className: 'eva-scene eva-scene--pilot' },
        h('div', { className: 'eva-pilotbrief' },
          h('span', { className: 'eva-pilotbrief__frame' }),
          h(PilotImage, { pilot, kind: 'portrait', className: 'eva-pilotbrief__portrait' }),
          h('span', { className: 'eva-pilotbrief__a10' },
            h(Art, { name: 'a10Clip', className: 'eva-pilotbrief__clip' }),
            h('span', null, 'A10 CLIPS · L/R'),
            h('b', null, 'LOCK'))),
        h(SceneReadout, {
          jp: 'パイロット認証',
          en: 'PILOT AUTHENTICATION',
          big: '搭乗',
          rows: [
            ['パイロット', 'PILOT', pilot.name],
            ['A10 クリップ', 'A10 CLIPS', 'STANDBY'],
            ['シンクロ率', 'SYNC RATIO', '0.0%'],
            ['LCL', 'LCL', 'READY'],
          ],
        }));
    }

    function PlugScene(props) {
      const percent = Math.round(props.lcl * 100);
      return h('div', { className: 'eva-scene eva-scene--plug' },
        h('div', { className: 'eva-plug' },
          h('span', { className: 'eva-plug__shell' }),
          h('span', { className: 'eva-plug__lcl' },
            h('span', { className: 'eva-plug__lclFill' }),
            h('span', { className: 'eva-plug__bubbles' },
              [0, 1, 2, 3, 4, 5].map((index) =>
                h('i', { key: index, style: { '--i': index } })))),
          h('span', { className: 'eva-plug__seat' }),
          h('span', { className: 'eva-plug__clamp eva-plug__clamp--l' }),
          h('span', { className: 'eva-plug__clamp eva-plug__clamp--r' }),
          h('span', { className: 'eva-plug__label' }, 'LCL 注入 / FILLING ' + percent + '%')),
        h(SceneReadout, {
          jp: 'パイロット搭乗',
          en: 'PILOT ENTRY',
          big: '搭乗',
          rows: [
            ['パイロット', 'PILOT', 'ENTRY'],
            ['プラグ・スーツ', 'PLUG SUIT', 'LINKED'],
            ['LCL', '注入', percent + '%'],
            ['生命維持', 'LIFE SUPPORT', 'OK'],
          ],
        }));
    }

    function InsertScene() {
      return h('div', { className: 'eva-scene eva-scene--insert' },
        h('div', { className: 'eva-insert' },
          h('span', { className: 'eva-insert__socket' }),
          h('span', { className: 'eva-insert__plug' }),
          h('span', { className: 'eva-insert__clamp eva-insert__clamp--l' }),
          h('span', { className: 'eva-insert__clamp eva-insert__clamp--r' }),
          h('span', { className: 'eva-insert__lock' }, 'LOCKED')),
        h(SceneReadout, {
          jp: 'プラグ挿入',
          en: 'ENTRY PLUG LOCK',
          big: '接続',
          rows: [
            ['プラグ', 'PLUG', 'INSERT'],
            ['装甲ロック', 'ARMOR LOCK', 'LOCKED'],
            ['気密', 'SEAL', 'CLEAR'],
            ['電源接続', 'POWER LINK', 'OK'],
          ],
        }));
    }

    function NeuralScene(props) {
      const percent = props.sync.toFixed(1);
      return h('div', { className: 'eva-scene eva-scene--neural' },
        h('div', { className: 'eva-neural' },
          h('svg', { viewBox: '0 0 420 160', 'aria-hidden': true },
            h('path', {
              className: 'eva-neural__wave',
              d: 'M0 80 L24 80 L32 46 L42 112 L52 66 L62 94 L74 80 L92 80 L104 26 L116 134 L128 60 L140 100 L154 80 L172 80 L188 44 L200 116 L212 70 L224 92 L238 80 L258 80 L272 34 L284 126 L296 64 L308 96 L322 80 L342 80 L356 52 L368 108 L380 72 L392 88 L404 80 L420 80',
            }),
            h('path', {
              className: 'eva-neural__wave eva-neural__wave--b',
              d: 'M0 80 L30 80 L44 62 L58 98 L72 80 L96 80 L118 54 L134 108 L150 80 L184 80 L206 60 L220 100 L236 80 L268 80 L292 50 L306 112 L322 80 L352 80 L372 66 L386 94 L400 80 L420 80',
            }))),
        h(SceneReadout, {
          jp: '神経接続',
          en: 'NEURAL LINK',
          big: '同期',
          rows: [
            ['神経接続', 'NEURAL LINK', percent + '%'],
            ['A10 クリップ', 'A10 CLIPS', 'LOCKED'],
            ['パイロット適合', 'PILOT MATCH', 'OK'],
            ['シンクロ率', 'SYNC RATIO', percent + '%'],
          ],
        }));
    }

    function SyncScene(props) {
      return h('div', { className: 'eva-scene eva-scene--sync' },
        h('div', { className: 'eva-sync' },
          h('span', { className: 'eva-sync__ring' }),
          h('span', { className: 'eva-sync__pulse' }),
          h('span', { className: 'eva-sync__pulse eva-sync__pulse--2' }),
          h('span', { className: 'eva-sync__value' }, props.sync.toFixed(1) + '%'),
          h('span', { className: 'eva-sync__label' }, 'シンクロ率')),
        h(SceneReadout, {
          jp: 'シンクロ率 100%',
          en: 'SYNC RATIO',
          big: '適合',
          rows: [
            ['シンクロ率', 'SYNC RATIO', props.sync.toFixed(1) + '%'],
            ['位相', 'PHASE', 'ALIGNED'],
            ['共鳴', 'RESONANCE', 'STABLE'],
          ],
        }));
    }

    function ActivateScene() {
      const pilot = usePilot();
      return h('div', { className: 'eva-scene eva-scene--activate' },
        h('div', { className: 'eva-activate' },
          h('span', { className: 'eva-activate__flap eva-activate__flap--l' }),
          h('span', { className: 'eva-activate__flap eva-activate__flap--r' }),
          h('span', { className: 'eva-activate__glow' }),
          h(Art, { name: pilot.head, className: 'eva-activate__head' }),
          h('span', { className: 'eva-activate__eye' })),
        h(SceneReadout, {
          jp: pilot.unitJp + ' 起動',
          en: pilot.unitEn + ' ACTIVATED',
          big: '起動',
          rows: [
            [pilot.unitJp, pilot.unitEn, 'ACTIVE'],
            ['主電源', 'MAIN POWER', 'ON'],
            ['A.T.フィールド', 'A.T. FIELD', 'STANDBY'],
            ['全系統', 'ALL SYSTEMS', 'GREEN'],
          ],
        }));
    }

    function LaunchScene() {
      const pilot = usePilot();
      return h('div', { className: 'eva-scene eva-scene--launch' },
        h('div', { className: 'eva-launchscene' },
          h('span', { className: 'eva-launchscene__rails' }),
          h('span', { className: 'eva-launchscene__clamps' }),
          h('span', { className: 'eva-launchscene__title' }, '発進'),
          h('span', { className: 'eva-launchscene__sub' }, 'LAUNCH // EVA-' + pilot.unit),
          h('span', { className: 'eva-launchscene__bar' })),
        h(SceneReadout, {
          jp: '発進',
          en: 'LAUNCH',
          big: '発進',
          rows: [
            ['固定解除', 'LOCK RELEASE', 'OK'],
            ['カタパルト', 'CATAPULT', 'READY'],
            ['電磁浮上', 'MAGLEV', 'ON'],
          ],
        }));
    }

    function LaunchSequence(props) {
      const pilot = usePilot();
      const reduced = reduceMotion();
      const scenes = reduced ? STATIC_SCENES : FULL_SCENES;
      const startIndex = Math.max(0, scenes.findIndex((scene) => scene.id === props.startScene));
      const skipMs = scenes.slice(0, startIndex).reduce((sum, scene) => sum + scene.ms, 0);
      const total = scenes.reduce((sum, scene) => sum + scene.ms, 0);
      const [elapsed, setElapsed] = useState(skipMs);
      const [leaving, setLeaving] = useState(false);
      const done = useRef(false);
      const timer = useRef(0);
      const lastScene = useRef(null);

      const finish = () => {
        if (done.current) return;
        done.current = true;
        setLeaving(true);
        timer.current = setTimeout(() => props.onDone(), LEAVE_MS);
      };

      useEffect(() => {
        const started = performance.now() - skipMs;
        let frame = 0;
        let painted = skipMs;
        const tick = (now) => {
          const next = Math.min(total, now - started);
          if (next - painted > 33 || next >= total) {
            painted = next;
            setElapsed(next);
          }
          if (next >= total) {
            finish();
            return;
          }
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => {
          cancelAnimationFrame(frame);
          clearTimeout(timer.current);
        };
      }, []);

      useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            finish();
          }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, []);

      const at = sceneAt(scenes, elapsed);
      const sync = syncAt(scenes, elapsed);
      const lcl = lclAt(scenes, elapsed);
      const progress = total > 0 ? elapsed / total : 1;
      const sceneId = leaving ? 'leave' : at.scene.id;
      const sceneProps = { sync, lcl };

      useEffect(() => {
        const id = at.scene.id;
        if (lastScene.current === id) return;
        lastScene.current = id;
        if (props.onScene) props.onScene(id);
      }, [at.scene.id]);

      return h('div', {
        className: 'eva-launch',
        'data-scene': sceneId,
        style: {
          '--eva-p': at.progress.toFixed(3),
          '--eva-sync': sync.toFixed(1),
          '--eva-lcl': lcl.toFixed(3),
        },
        role: 'presentation',
      },
        h('div', { className: 'eva-launch__bg' }),
        h('div', { className: 'eva-launch__slats' },
          SLATS.map((index) =>
            h('span', { key: index, className: 'eva-launch__slat', style: { '--eva-slat': index } }))),
        h('div', { className: 'eva-launch__grid' }),
        h('div', { className: 'eva-launch__top' },
          h(Art, { name: pilot.head, className: 'eva-launch__brandmark' }),
          h('span', { className: 'eva-launch__brand' },
            h('b', null, 'EVA-' + pilot.unit),
            h('em', null, '発進管制 / LAUNCH CONTROL')),
          h('span', { className: 'eva-launch__scenelabel' },
            h('span', null, 'SCENE ' + pad(at.index + 1) + ' / ' + pad(scenes.length)),
            h('b', null, at.scene.jp.replace('初号機', pilot.unitJp)),
            h('span', null, at.scene.en.replace('UNIT-01', pilot.unitEn))),
          h('button', {
            type: 'button',
            className: 'eva-launch__skip',
            onClick: (event) => {
              event.stopPropagation();
              finish();
            },
          }, t('skip'))),
        h('div', { className: 'eva-launch__stage' },
          h(BootScene),
          h(PilotScene),
          h(PlugScene, sceneProps),
          h(InsertScene),
          h(NeuralScene, sceneProps),
          h(SyncScene, sceneProps),
          h(ActivateScene),
          h(LaunchScene)),
        h('div', { className: 'eva-launch__foot' },
          h('div', { className: 'eva-launch__track' },
            scenes.map((scene, index) =>
              h('span', {
                key: scene.id,
                className: 'eva-launch__seg',
                'data-done': index < at.index ? '1' : '0',
                'data-active': index === at.index ? '1' : '0',
              }, h('i')))),
          h('div', { className: 'eva-launch__overall' },
            h('span', null, 'SEQUENCE ' + pad(Math.round(progress * 100)) + '%'),
            h('span', null, 'SYNC ' + sync.toFixed(1) + '%'),
            h('span', { className: 'eva-launch__hint' }, t('skipHint')),
            h('span', null, 'EVA-' + pilot.unit + ' // CYCLE 0001'))),
        h('div', { className: 'eva-launch__hazard' }),
        h('div', { className: 'eva-launch__flash' }));
    }

    /* ------------------------------------------------------------------ *
     * Pilot authentication gate — borrows the reference plugin's "choose your
     * pilot" beat: a portrait, the pilot name, A10 clip status and a start
     * control.  The click is what unlocks WebAudio (browser autoplay policy).
     * ------------------------------------------------------------------ */
    /* ------------------------------------------------------------------ *
     * ANGEL ATTACK — TV-style opening card with an original tense cue.
     * The first click unlocks audio (browser policy) and starts both the
     * title animation and the synthesised angel-attack BGM.
     * ------------------------------------------------------------------ */
    function AngelIntro(props) {
      const [started, setStarted] = useState(false);
      const [elapsed, setElapsed] = useState(0);
      const soundOn = useSignal(soundSignal);

      const start = () => {
        if (started) return;
        setStarted(true);
        // Clicking the launch control is itself a request for sound: if the
        // preference was muted, turn it back on for this session.
        if (!soundSignal.get()) {
          soundSignal.set(true);
          writeSound(true);
          audio.setEnabled(true);
        }
        audio.unlock().then((ok) => {
          if (ok) audio.startAngel();
        });
      };

      useEffect(() => {
        if (!started) return undefined;
        const duration = reduceMotion() ? 1800 : 5200;
        const from = Date.now();
        const tick = setInterval(() => setElapsed(Date.now() - from), 100);
        const done = setTimeout(() => {
          audio.stopAngel();
          props.onDone();
        }, duration);
        return () => {
          clearInterval(tick);
          clearTimeout(done);
          audio.stopAngel();
        };
      }, [started]);

      const seconds = 5 * 60 + 31 + Math.floor(elapsed / 1000);
      const time = '02:' + pad(Math.floor(seconds / 60) % 60) + ':' + pad(seconds % 60);

      return h('div', {
        className: 'eva-angel',
        'data-started': started ? '1' : '0',
        role: 'dialog',
        'aria-label': 'ANGEL ATTACK / 使徒、襲来',
      },
        h('span', { className: 'eva-angel__grain' }),
        h('span', { className: 'eva-angel__entity', 'aria-hidden': true },
          h('img', {
            className: 'eva-angel__entityImg',
            src: assetUrl('angel-ascend.png'),
            alt: '',
          })),
        h('span', { className: 'eva-angel__seismic', 'aria-hidden': true },
          h('svg', { viewBox: '0 0 1200 120', preserveAspectRatio: 'none' },
            h('path', {
              d: 'M0 60h170l22-34 20 68 24-56 18 22h150l26-40 20 76 22-60 18 24h180l24-38 22 72 24-58 16 24h160l24-44 20 72 22-52 18 24h150',
              fill: 'none', stroke: '#ff2d2d', 'stroke-width': '2',
            }))),
        h('div', { className: 'eva-angel__tv' },
          h('span', { className: 'eva-angel__bug' }, 'NERV'),
          h('span', { className: 'eva-angel__channel' }, 'TOKYO-3 / 緊急放送'),
          h('span', { className: 'eva-angel__time' }, time),
          h('i', { className: 'eva-angel__rec' })),
        h('div', { className: 'eva-angel__card' },
          h('span', { className: 'eva-angel__eyebrow' }, 'ANGEL ATTACK'),
          h('span', { className: 'eva-angel__jp' }, '使徒、襲来'),
          h('span', { className: 'eva-angel__en' }, 'ANGEL ATTACK'),
          h('span', { className: 'eva-angel__meta' }, '第3新東京市 · TOKYO-3'),
          h('span', { className: 'eva-angel__meta eva-angel__meta--2' }, '特務機関 NERV · 第一種戦闘配置'),
          h('span', { className: 'eva-angel__soundState', 'data-on': soundOn ? '1' : '0' },
            soundOn ? 'AUDIO ONLINE · 音声 ON' : 'AUDIO OFFLINE · クリックで音声 ON'),
          started
            ? h('span', { className: 'eva-angel__status' }, 'ALERT LEVEL 1 · ORIGINAL CUE')
            : h('button', {
                type: 'button',
                className: 'eva-angel__start',
                onClick: (event) => {
                  event.stopPropagation();
                  start();
                },
              },
                h('span', null, '▶ 起動'),
                h('em', null, 'CLICK TO START · 音声 ' + (soundOn ? 'ON' : 'OFF')))),
        h('span', { className: 'eva-angel__scan' }),
        h('span', { className: 'eva-angel__flash' }),
        h('span', { className: 'eva-angel__frame' }));
    }

    function PilotGate(props) {
      const pilot = usePilot();
      const [picked, setPicked] = useState(false);
      const [changeMode, setChangeMode] = useState(false);
      const [sync, setSync] = useState(0);
      const [ready, setReady] = useState(false);
      const started = useRef(false);
      const selectedMode = Boolean(props.preselect) && !changeMode;

      // Returning from the cockpit panel: preselect the clicked pilot and let
      // the selected-pilot loading display play before boarding. This is not
      // the empty selection screen and does not switch the chat UI directly.
      useEffect(() => {
        if (!props.preselect || !PILOTS[props.preselect]) return;
        setPicked(true);
        choosePilot(props.preselect);
      }, []);

      const begin = (withSound) => {
        if (started.current || !picked || !ready) return;
        started.current = true;
        props.onStart(withSound);
      };

      const choose = (event, key) => {
        event.stopPropagation();
        setPicked(true);
        choosePilot(key);
      };

      // The entry plug stays empty until a pilot is chosen. Selecting a card
      // starts the insertion + sync loading animation; the confirm buttons
      // only unlock at 100%.
      useEffect(() => {
        if (!picked) {
          setSync(0);
          setReady(false);
          return undefined;
        }
        setReady(false);
        const from = typeof performance !== 'undefined' ? performance.now() : Date.now();
        let raf = 0;
        const tick = (now) => {
          const progress = Math.min(1, (now - from) / 1400);
          setSync(Math.round(progress * 100));
          if (progress < 1) raf = requestAnimationFrame(tick);
          else setReady(true);
        };
        raf = requestAnimationFrame(tick);
        return () => {
          cancelAnimationFrame(raf);
        };
      }, [picked, pilot.key]);


      return h('div', {
        className: 'eva-gate',
        role: 'presentation',
      },
        h('div', { className: 'eva-gate__bg' }),
        h('div', { className: 'eva-gate__grid' }),
        h('span', { className: 'eva-gate__atfield', 'aria-hidden': true },
          h(Art, { name: 'atField' })),
        h('div', { className: 'eva-gate__top' },
          h(Art, { name: pilot.head, className: 'eva-gate__mark' }),
          h('span', { className: 'eva-gate__brand' },
            h('b', null, 'EVA-' + pilot.unit),
            h('em', null, pilot.unitJp + ' · 発進管制 / LAUNCH CONTROL')),
          h('span', { className: 'eva-gate__audio' },
            h('span', { className: 'eva-gate__audioLed' }),
            'AUDIO ' + (readSound() ? 'ON' : 'OFF'))),
        h('div', { className: 'eva-gate__body eva-gate__body--select' },
          h('div', { className: 'eva-gate__plugScene' },
            h('span', { className: 'eva-gate__contours', 'aria-hidden': true }),
            h('div', { className: 'eva-gate__plug' },
              h('img', {
                className: 'eva-gate__plugImg',
                src: assetUrl('entry-plug.svg'),
                alt: '',
              }),
              h('span', { className: 'eva-gate__plugGlow' }),

              h('span', { className: 'eva-gate__plugTag eva-gate__plugTag--top' }, 'ENTRY PLUG / 挿入栓'),
              h('span', { className: 'eva-gate__plugTag eva-gate__plugTag--bottom' }, 'EVA-' + pilot.unit + ' · ' + pilot.unitJp),
              picked
                ? h(React.Fragment, null,
                    h('svg', { className: 'eva-gate__ring', viewBox: '0 0 120 120', 'aria-hidden': true },
                      h('circle', { className: 'eva-gate__ringTrack', cx: 60, cy: 60, r: 52 }),
                      h('circle', {
                        className: 'eva-gate__ringFill',
                        cx: 60,
                        cy: 60,
                        r: 52,
                        style: { '--sync': (sync / 100).toFixed(3) },
                      })),
                    h('span', { className: 'eva-gate__sync' }, sync + '%'),
                    h('span', { className: 'eva-gate__syncLabel' }, 'SYNC / 接続'))
                : null)),
          h('div', { className: 'eva-gate__console' },
            h('span', { className: 'eva-gate__eyebrow' }, 'パイロット認証 / PILOT AUTHENTICATION'),
            h('span', { className: 'eva-gate__title' }, pilot.unitJp + ' 起動'),
            h('span', { className: 'eva-gate__sub' }, 'EVA-' + pilot.unit + ' // INSERT ENTRY PLUG'),
            h('span', { className: 'eva-gate__line' }),
            selectedMode
              ? h('div', { className: 'eva-gate__selected' },
                  h('div', { className: 'eva-gate__selectedPhoto' },
                    h(PilotImage, { pilot, kind: 'portrait', className: 'eva-gate__selectedPortrait' })),
                  h('div', { className: 'eva-gate__selectedInfo' },
                    h('span', { className: 'eva-gate__eyebrow' }, 'PILOT SELECTED / パイロット選択済み'),
                    h('b', { className: 'eva-gate__selectedName' }, pilot.name),
                    h('span', { className: 'eva-gate__selectedEn' }, pilot.en + ' · PILOT ' + pilot.no),
                    h('span', { className: 'eva-gate__selectedMeta' },
                      'A10 · LCL 0.00 · ' + pilot.unitEn + ' · VOICE ' + pilot.voiceLabel),
                    h('span', { className: 'eva-gate__selectedSync' }, sync + '% / SYNC'),
                    h('button', {
                      type: 'button',
                      className: 'eva-gate__change',
                      onClick: (event) => {
                        event.stopPropagation();
                        setChangeMode(true);
                      },
                    }, '更换驾驶员 / CHANGE')))
              : [h('div', { className: 'eva-gate__pilots' },
                  Object.values(PILOTS).map((item) =>
                    h('button', {
                      key: item.key,
                      type: 'button',
                      className: 'eva-gate__pilotBtn',
                      'data-selected': picked && item.key === pilot.key ? '1' : '0',
                      onClick: (event) => choose(event, item.key),
                    },
                      h(PilotImage, { pilot: item, kind: 'avatar', className: 'eva-gate__avatar' }),
                      h('span', { className: 'eva-gate__pilotInfo' },
                        h('b', null, item.name),
                        h('i', null, item.en),
                        h('em', null, 'UNIT-' + item.unit + ' · PILOT ' + item.no)),
                      h('span', { className: 'eva-gate__pilotLed' })))),
                h('div', { className: 'eva-gate__selectMeta' },
                  h('b', null, pilot.name),
                  h('span', null, pilot.en + ' · PILOT ' + pilot.no),
                  h('i', null, 'A10 · LCL · ' + pilot.unitEn + ' · VOICE ' + pilot.voiceLabel))],
            h('div', { className: 'eva-gate__actions' },
              h('button', {
                type: 'button',
                className: 'eva-gate__start',
                disabled: !picked || !ready,
                'aria-disabled': !picked || !ready,
                onClick: (event) => {
                  event.stopPropagation();
                  begin(true);
                },
              },
                h('span', null, '接続開始'),
                h('em', null, 'INSERT ENTRY PLUG')),
              h('button', {
                type: 'button',
                className: 'eva-gate__muted',
                disabled: !picked || !ready,
                'aria-disabled': !picked || !ready,
                onClick: (event) => {
                  event.stopPropagation();
                  begin(false);
                },
              }, '音声なしで起動 / START MUTED'),
              h('span', { className: 'eva-gate__hint' }, 'カードで驾驶员更换 · 装填完了後に接続開始')))),
        h('div', { className: 'eva-gate__foot' },
          h('span', null, !picked ? 'SELECT PILOT / 手動承認' : ready ? 'PILOT CONFIRMED / 承認待ち' : 'LOADING / 挿入栓装填中…'),
          h('span', null, 'NERV · EVA-' + pilot.unit + ' · ' + pilot.unitJp),
          h('span', null, 'CYCLE 0001')));
    }

    function PilotComm(props) {
      const caption = props && props.caption;
      if (!caption) return null;
      const pilot = pilotOf(caption.pilot || pilotSignal.get());
      return h('div', { className: 'eva-comm', key: caption.id },
        h(PilotImage, { pilot, kind: 'avatar', className: 'eva-comm__avatar' }),
        h('span', { className: 'eva-comm__body' },
          h('span', { className: 'eva-comm__who' }, 'パイロット · ' + pilot.name),
          h('span', { className: 'eva-comm__jp' }, caption.jp),
          h('span', { className: 'eva-comm__zh' }, caption.zh)));
    }

    /* ------------------------------------------------------------------ *
     * BERSERK burst — short red overload played when Unit-01 loses control.
     * ------------------------------------------------------------------ */
    function BerserkBurst(props) {
      const [leaving, setLeaving] = useState(false);

      useEffect(() => {
        const quiet = reduceMotion();
        const leaveAt = quiet ? 450 : 1450;
        const doneAt = quiet ? 750 : 2050;
        const toLeave = setTimeout(() => setLeaving(true), leaveAt);
        const toDone = setTimeout(() => props.onDone(), doneAt);
        return () => {
          clearTimeout(toLeave);
          clearTimeout(toDone);
        };
      }, []);

      return h('div', {
        className: 'eva-burst',
        'data-leave': leaving ? '1' : '0',
        'aria-hidden': true,
      },
        h('div', { className: 'eva-burst__flash' }),
        h('div', { className: 'eva-burst__grid' }),
        h('div', { className: 'eva-burst__ring' }),
        h('div', { className: 'eva-burst__ring eva-burst__ring--2' }),
        h('div', { className: 'eva-burst__core' },
          h('span', { className: 'eva-burst__tag' }, 'SYNC > 400%'),
          h('span', { className: 'eva-burst__title' }, '制御不能'),
          h('span', { className: 'eva-burst__sub' }, 'UNIT-01 BERSERK // CONTROL LOST'),
          h('span', { className: 'eva-burst__bars' },
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) =>
              h('i', { key: index, style: { '--i': index } })))),
        h('div', { className: 'eva-burst__hazard' }));
    }

    /* ------------------------------------------------------------------ *
     * Persistent HUD frame: corner brackets, frame rails, scanlines and the
     * launch player.
     * ------------------------------------------------------------------ */
    /* Berserk cut-in: the supplied Unit-01 / Unit-02 art, shown for ~4 s
     * after berserk is switched on (Unit-00 has no cut-in). */
    function BerserkArt(props) {
      const unit = props.unit;
      if (!unit) return null;
      const file = unit === 'asuka' ? 'berserk-02.png' : 'berserk-01.png';
      return h('div', { className: 'eva-berserk-art', 'data-unit': unit, 'aria-hidden': true },
        h('img', { src: assetUrl(file), alt: '' }),
        h('span', { className: 'eva-berserk-art__scan' }),
        h('span', { className: 'eva-berserk-art__label' },
          'BERSERK / 暴走 · ' + (unit === 'asuka' ? 'UNIT-02' : 'UNIT-01')));
    }

    /* Floating "switch pilot" control above the sidebar's new-conversation
     * button. Opens the entry-plug gate again. */
    function PilotSwitchButton() {
      return h('button', {
        type: 'button',
        className: 'eva-switch',
        title: '切换驾驶员 / SWITCH PILOT',
        'aria-label': '切换驾驶员',
        onClick: () => {
          audio.sfx('beep');
          openPilotSwitch();
        },
      },
        h('svg', {
          className: 'eva-switch__icon',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '1.8',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'aria-hidden': true,
        },
          h('path', { d: 'M4 9h12l-3-3M16 9l3 3-3 3' }),
          h('path', { d: 'M20 15H8l3 3M8 15l-3-3 3-3' })));
    }

    /* Thin canopy strip under the host header. */
    function CockpitChrome() {
      const power = usePower();
      return h('div', {
        className: 'eva-canopy',
        'data-low': power.low ? '1' : '0',
        'aria-hidden': true,
      },
        h('span', { className: 'eva-canopy__hazard' }),
        h('span', null, 'LCL / SYNC MONITOR'),
        h('span', null, 'MAGI ONLINE'),
        h('span', { className: 'eva-canopy__grow' }),
        h('span', null, 'ENTRY PLUG LOCKED'),
        h('span', null, 'TOKYO-3 / NERV'),
        h('span', { className: 'eva-canopy__hazard' }));
    }

    /* Measure the free margin between the left sidebar and the chat body,
     * so the merged cockpit panel never covers the conversation and follows
     * both sidebars as they collapse/expand. */
    function useCockpitPlacement() {
      const [place, setPlace] = useState({ measured: false, overlay: false, left: 0, width: 196, minLeft: 0, maxLeft: 0 });
      useEffect(() => {
        let alive = true;
        let raf = 0;
        let last = '';
        const measure = () => {
          raf = 0;
          if (!alive) return;
          try {
            const main = document.querySelector('[data-slot="main"]');
            const center = main && main.parentElement;
            const sidebar = document.querySelector('[class*="sidebarCol"]')
              || (center && center.previousElementSibling);
            const column = document.querySelector('[data-slot="main"] [class*="_column"]')
              || document.querySelector('[data-slot="main"] [data-composer-card]')
              || document.querySelector('[class*="ST7X_W_body"]');
            if (!column) return;
            const columnRect = column.getBoundingClientRect();
            const sidebarRight = sidebar ? sidebar.getBoundingClientRect().right : 0;
            const available = columnRect.left - sidebarRight - 16;
            const overlay = available < 154;
            const minLeft = Math.max(4, sidebarRight + 6);
            let width;
            let left;
            let maxLeft;
            if (overlay) {
              width = Math.min(228, Math.max(154, window.innerWidth - sidebarRight - 24));
              left = sidebarRight + 8;
              maxLeft = Math.max(minLeft, window.innerWidth - width - 8);
            } else {
              width = Math.min(228, Math.floor(available));
              left = Math.max(minLeft, columnRect.left - width - 8);
              maxLeft = Math.max(minLeft, columnRect.left - width - 8);
            }
            const key = [Math.round(left), width, Math.round(minLeft), Math.round(maxLeft), overlay ? 1 : 0].join(':');
            if (key === last) return;
            last = key;
            setPlace({ measured: true, overlay, left, width, minLeft, maxLeft });
          } catch (error) {
            /* host not mounted yet */
          }
        };
        const schedule = () => {
          if (!raf) raf = window.requestAnimationFrame(measure);
        };
        const targets = [
          document.body,
          document.querySelector('[data-slot="main"]'),
          document.querySelector('[data-slot="main"] [class*="_column"]'),
          document.querySelector('[data-composer-card]'),
        ].filter(Boolean);
        let observer = null;
        try {
          observer = new ResizeObserver(schedule);
          targets.forEach((target) => observer.observe(target));
        } catch (error) {
          observer = null;
        }
        let mutations = null;
        try {
          mutations = new MutationObserver(schedule);
          mutations.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'data-collapsed', 'data-ds-dark-theme'],
          });
        } catch (error) {
          mutations = null;
        }
        window.addEventListener('resize', schedule);
        window.addEventListener('transitionend', schedule, true);
        const timer = setInterval(schedule, 800);
        schedule();
        return () => {
          alive = false;
          if (raf) cancelAnimationFrame(raf);
          if (observer) observer.disconnect();
          if (mutations) mutations.disconnect();
          window.removeEventListener('resize', schedule);
          window.removeEventListener('transitionend', schedule, true);
          clearInterval(timer);
        };
      }, []);
      return place;
    }

    function readPanelPos() {
      try {
        const raw = window.localStorage.getItem('eva01.panel');
        const value = raw ? JSON.parse(raw) : null;
        if (value && Number.isFinite(value.left) && Number.isFinite(value.top)) return value;
      } catch (error) {
        /* unavailable */
      }
      return null;
    }

    function writePanelPos(value) {
      try {
        if (value) window.localStorage.setItem('eva01.panel', JSON.stringify(value));
        else window.localStorage.removeItem('eva01.panel');
      } catch (error) {
        /* unavailable */
      }
    }

    function readPanelFlag(key) {
      try { return window.localStorage.getItem('eva01.' + key) === '1'; } catch (error) { return false; }
    }

    function writePanelFlag(key, value) {
      try {
        if (value) window.localStorage.setItem('eva01.' + key, '1');
        else window.localStorage.removeItem('eva01.' + key);
      } catch (error) {
        /* unavailable */
      }
    }

    /* Text control in the sidebar brand row; opens/closes the merged panel.
     * Its placement is measured from the brand mark/name, and it folds away
     * together with the left sidebar instead of floating on a collapsed rail. */
    function PilotToggle() {
      const open = useSignal(cockpitOpenSignal);
      const [place, setPlace] = useState({ visible: false, left: 164, top: 56 });
      useEffect(() => {
        let alive = true;
        let raf = 0;
        let last = '';
        const measure = () => {
          raf = 0;
          if (!alive) return;
          try {
            const sidebar = document.querySelector('[class*="sidebarCol"]');
            const mark = document.querySelector('.eva-brandmark');
            const name = document.querySelector('.eva-brandname');
            if (!sidebar || !mark) return;
            const sidebarRect = sidebar.getBoundingClientRect();
            const markRect = mark.getBoundingClientRect();
            const nameRect = name ? name.getBoundingClientRect() : markRect;
            const width = 84;
            const top = markRect.top + markRect.height / 2 - 11;
            const left = Math.max(nameRect.right + 8, markRect.right + 10);
            const maxRight = sidebarRect.right - 28;
            const visible = sidebarRect.width >= 120 && left + width <= maxRight;
            const safeLeft = visible ? Math.min(left, maxRight - width) : left;
            const key = (visible ? 1 : 0) + ':' + Math.round(safeLeft) + ':' + Math.round(top);
            if (key === last) return;
            last = key;
            setPlace({ visible, left: safeLeft, top });
          } catch (error) {
            /* host not mounted yet */
          }
        };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
        const targets = [
          document.querySelector('[class*="sidebarCol"]'),
          document.querySelector('.eva-brandmark'),
          document.querySelector('.eva-brandname'),
        ].filter(Boolean);
        let observer = null;
        try {
          observer = new ResizeObserver(schedule);
          targets.forEach((target) => observer.observe(target));
        } catch (error) {
          observer = null;
        }
        let mutations = null;
        try {
          mutations = new MutationObserver(schedule);
          mutations.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'data-collapsed'],
          });
        } catch (error) {
          mutations = null;
        }
        window.addEventListener('resize', schedule);
        const timer = setInterval(schedule, 800);
        schedule();
        return () => {
          alive = false;
          if (raf) cancelAnimationFrame(raf);
          if (observer) observer.disconnect();
          if (mutations) mutations.disconnect();
          window.removeEventListener('resize', schedule);
          clearInterval(timer);
        };
      }, []);
      if (!place.visible) return null;
      return h('button', {
        type: 'button',
        className: 'eva-pilot-toggle',
        style: { left: place.left + 'px', top: place.top + 'px' },
        'data-open': open ? '1' : '0',
        'aria-expanded': open ? 'true' : 'false',
        title: '切换驾驶员 / PILOT PANEL',
        onClick: () => cockpitOpenSignal.set(!open),
      },
        h('span', { className: 'eva-pilot-toggle__glyph', 'aria-hidden': true }, '⇄'),
        h('span', { className: 'eva-pilot-toggle__label' }, '切换驾驶员'));
    }

    /* One merged cockpit panel: pilot on top, EVA POWER/status below, pilot
     * switching at the bottom. The old separate left/right consoles and the
     * duplicate header/workbench/status readouts were removed. */
    function CockpitPanel() {
      const place = useCockpitPlacement();
      const pilot = usePilot();
      const power = usePower();
      const berserk = useSignal(berserkSignal);
      const [jitter, setJitter] = useState(0);
      const [manual, setManual] = useState(() => readPanelPos());
      const [collapsed, setCollapsed] = useState(() => readPanelFlag('panelCollapsed'));
      const open = useSignal(cockpitOpenSignal);
      const panelRef = useRef(null);
      const dragRef = useRef(null);
      useEffect(() => {
        const timer = setInterval(() => setJitter(Math.random() * 0.8), 1800);
        return () => clearInterval(timer);
      }, []);
      useEffect(() => () => {
        dragRef.current = null;
      }, []);
      if (!place.measured || !open) return null;

      const maxTop = () => Math.max(8, window.innerHeight - ((panelRef.current && panelRef.current.offsetHeight) || 420) - 42);
      const clampLeft = (value) => Math.max(6, Math.min(value, window.innerWidth - place.width - 6));
      const position = manual
        ? { left: clampLeft(manual.left), top: Math.min(Math.max(manual.top, 8), maxTop()) }
        : { left: place.left, top: 58 };
      const toggleCollapsed = () => {
        setCollapsed((value) => {
          const next = !value;
          writePanelFlag('panelCollapsed', next);
          return next;
        });
      };
      const closePanel = () => {
        cockpitOpenSignal.set(false);
      };
      const beginDrag = (event) => {
        if (event.button !== 0) return;
        const target = event.currentTarget;
        try { target.setPointerCapture(event.pointerId); } catch (error) { /* ignore */ }
        dragRef.current = {
          pointerId: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          left: position.left,
          top: position.top,
        };
      };
      const moveDrag = (event) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        event.preventDefault();
        const next = {
          left: clampLeft(drag.left + event.clientX - drag.x),
          top: Math.min(Math.max(drag.top + event.clientY - drag.y, 8), maxTop()),
        };
        setManual(next);
      };
      const endDrag = (event) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        dragRef.current = null;
        try { event.currentTarget.releasePointerCapture(event.pointerId); } catch (error) { /* ignore */ }
        setManual((value) => {
          if (value) writePanelPos(value);
          return value;
        });
      };
      const resetDrag = () => {
        setManual(null);
        writePanelPos(null);
      };
      const sync = berserk ? 412.0 : 98.4 + jitter;
      const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      return h('aside', {
        ref: panelRef,
        className: 'eva-cp',
        style: { left: position.left + 'px', top: position.top + 'px', width: place.width + 'px' },
        'data-berserk': berserk ? '1' : '0',
        'data-low': power.low ? '1' : '0',
        'data-collapsed': collapsed ? '1' : '0',
        'data-overlay': place.overlay ? '1' : '0',
        'aria-label': '驾驶舱信息与电量',
      },
        h('div', {
          className: 'eva-cp__head',
          title: '拖动面板 / 双击复位',
          onPointerDown: beginDrag,
          onPointerMove: moveDrag,
          onPointerUp: endDrag,
          onPointerCancel: endDrag,
          onDoubleClick: resetDrag,
        },
          h('span', { className: 'eva-cp__grip' }, '⠿'),
          h('b', null, 'COCKPIT'),
          h('span', null, 'EVA-' + pilot.unit + ' // PILOT ' + pilot.no),
          h('span', {
            className: 'eva-cp__actions',
            onPointerDown: (event) => event.stopPropagation(),
          },
            h('button', {
              type: 'button',
              className: 'eva-cp__action',
              title: collapsed ? '展开 / EXPAND' : '收起 / COLLAPSE',
              'aria-label': collapsed ? '展开面板' : '收起面板',
              onClick: toggleCollapsed,
            }, collapsed ? '＋' : '－'),
            h('button', {
              type: 'button',
              className: 'eva-cp__action',
              title: '隐藏 / HIDE',
              'aria-label': '隐藏面板',
              onClick: closePanel,
            }, '×'))),
        collapsed ? null : h('div', { className: 'eva-cp__pilot' },
          h('div', { className: 'eva-cp__photo' },
            h(PilotImage, { pilot, kind: 'portrait', className: 'eva-cp__portrait' }),
            h('span', { className: 'eva-cp__tag' }, 'PILOT ' + pilot.no),
            h('span', { className: 'eva-cp__tag eva-cp__tag--unit' }, 'EVA-' + pilot.no),
            h('div', { className: 'eva-cp__name' },
              h('b', null, pilot.name),
              h('span', null, pilot.en + ' · ' + pilot.unitEn))),
          h('div', { className: 'eva-cp__sync' },
            h('span', {
              className: 'eva-cp__ring',
              style: { '--eva-sync': Math.min(100, sync).toFixed(1) + '%' },
            },
              h('b', null, berserk ? '412' : sync.toFixed(1)),
              h('em', null, 'SYNC')),
            h('span', { className: 'eva-cp__syncText' },
              h('i', null, 'SYNCHRONIZATION'),
              h('b', null, berserk ? '412.0%' : sync.toFixed(1) + '%'))),
          h('div', { className: 'eva-cp__rows' },
            [['A10 NERVE CLIPS', 'LOCKED / L-R', 'ok'],
             ['LCL PRESSURE', '0.00 / NOMINAL', ''],
             ['VOICE PROFILE', pilot.voiceLabel, 'blue']].map((row) =>
              h('span', { key: row[0], className: 'eva-cp__row' },
                h('i', null, row[0]),
                h('b', { 'data-tone': row[2] }, row[1]))))),
        collapsed ? null : h('div', { className: 'eva-cp__power' },
          h('div', { className: 'eva-cp__powerHead' },
            h('b', null, 'EVA POWER'),
            h('span', null, 'MAIN BUS / B+'),
            h('button', {
              type: 'button',
              className: 'eva-cp__refresh',
              title: '刷新电量 / REFRESH',
              'aria-label': '刷新电量',
              onClick: () => loadBalance(true),
            }, '↻')),
          h('div', { className: 'eva-cp__gauge' },
            h('div', { className: 'eva-cp__battery', 'aria-hidden': true },
              h('span', { className: 'eva-cp__threshold' }),
              cells.map((index) => h('i', {
                key: index,
                'data-on': power.known && power.pct >= (index + 1) * 10 ? '1' : '0',
              }))),
            h('div', { className: 'eva-cp__readout' },
              h('span', null, 'REMAINING CHARGE'),
              h('b', { className: 'eva-cp__pct' },
                power.known ? Math.round(power.pct) : '--',
                h('small', null, '%')),
              h('span', null, 'ACCOUNT BALANCE'),
              h('b', { className: 'eva-cp__amount' }, power.text),
              h('em', null, 'LOW POWER / 残量 15% 以下 → BERSERK'))),
          h('div', { className: 'eva-cp__stats' },
            [['MAGI', berserk ? 'FAILED' : 'NOMINAL', berserk ? 'danger' : 'ok'],
             ['A.T. FIELD', berserk ? 'DOWN' : 'STANDBY', 'blue'],
             ['UPLINK', 'SECURE', 'ok'],
             ['MODE', berserk ? 'BERSERK' : 'NORMAL', berserk ? 'danger' : '']].map((row) =>
              h('span', { key: row[0] },
                h('i', null, row[0]),
                h('b', { 'data-tone': row[2] }, row[1]))))),
        collapsed ? null : h('div', { className: 'eva-cp__switch' },
          h('span', { className: 'eva-cp__switchLabel' }, 'PILOT SELECT / 驾驶员'),
          h('div', { className: 'eva-cp__tabs', role: 'group', 'aria-label': '选择驾驶员' },
            Object.keys(PILOTS).map((key) => h('button', {
              key,
              type: 'button',
              'aria-pressed': pilot.key === key ? 'true' : 'false',
              onClick: () => {
                audio.sfx('beep');
                cockpitOpenSignal.set(false);
                openPilotSwitchFor(key);
              },
            },
              h('b', null, PILOTS[key].name),
              h('span', null, PILOTS[key].en.split(' ')[0]))))));
    }

    function Hud() {
      const fx = useSignal(fxSignal);
      const berserk = useSignal(berserkSignal);
      const sound = useSignal(soundSignal);
      const caption = useSignal(captionSignal);
      const pilot = usePilot();
      const power = usePower();
      const [alarm, setAlarm] = useState(true);
      const [gate, setGate] = useState(true);
      const [run, setRun] = useState(-1);
      const [finished, setFinished] = useState(-1);
      const [burstRun, setBurstRun] = useState(0);
      const [burstDone, setBursted] = useState(0);
      const [berserkArt, setBerserkArt] = useState(null);
      const artTimer = useRef(0);
      const lowPowerRef = useRef(false);
      const soundRef = useRef(sound);
      const lastBerserk = useRef(berserk);
      soundRef.current = sound;

      const startFromGate = (withSound) => {
        if (withSound && !soundRef.current) {
          soundSignal.set(true);
          writeSound(true);
          audio.setEnabled(true);
        }
        if (withSound) {
          audio.unlock().then((ok) => {
            if (ok) {
              audio.setEnabled(true);
              audio.sfx('boot');
              sayLine('gate');
            }
          });
        }
        setGate(false);
        setRun((current) => (current < 0 ? 0 : current + 1));
      };

      useEffect(() => launchSignal.subscribe(() => {
        setAlarm(false);
        setGate(false);
        if (soundRef.current) audio.unlock();
        setRun((current) => (current < 0 ? 0 : current + 1));
      }), []);

      useEffect(() => berserkBurstSignal.subscribe(() => {
        setBurstRun((current) => current + 1);
      }), []);

      useEffect(() => {
        audio.setBerserk(berserkSignal.get());
      }, []);

      useEffect(() => pilotSwitchSignal.subscribe(() => {
        setAlarm(false);
        setGate(true);
        setRun(-1);
        setFinished(-1);
        setBerserkArt(null);
        audio.stopBoot();
        audio.stopAngel();
      }), []);

      useEffect(() => {
        if (!power.known) return;
        if (power.low && !lowPowerRef.current) {
          lowPowerRef.current = true;
          if (!berserkSignal.get()) toggleBerserk();
        } else if (!power.low && lowPowerRef.current) {
          lowPowerRef.current = false;
          if (berserkSignal.get()) toggleBerserk();
        }
      }, [power.known, power.low]);

      useEffect(() => {
        try {
          document.body.toggleAttribute('data-eva-low-power', Boolean(power.known && power.low));
        } catch (error) {
          /* document unavailable */
        }
        return () => {
          try {
            document.body.removeAttribute('data-eva-low-power');
          } catch (error) {
            /* nothing to clean up */
          }
        };
      }, [power.known, power.low]);

      useEffect(() => {
        if (berserk === lastBerserk.current) return;
        lastBerserk.current = berserk;
        audio.setBerserk(berserk);
        if (berserk) {
          audio.sfx('alarm');
          sayLine('berserk_on');
          const unitKey = pilotSignal.get();
          if (unitKey === 'shinji' || unitKey === 'asuka') {
            setBerserkArt(unitKey);
            clearTimeout(artTimer.current);
            artTimer.current = setTimeout(() => setBerserkArt(null), 4300);
          }
        } else {
          clearTimeout(artTimer.current);
          setBerserkArt(null);
          sayLine('berserk_off');
        }
      }, [berserk]);

      useEffect(() => () => clearTimeout(artTimer.current), []);

      useEffect(() => () => {
        clearTimeout(captionTimer);
      }, []);

      const playing = run !== -1 && finished !== run;
      const bursting = burstRun > burstDone;

      const handleScene = (id) => {
        if (!soundRef.current) return;
        audio.setPhase(id);
        if (id === 'boot') {
          audio.startBoot();
          sayLine('boot');
        }
        if (id === 'pilot') {
          audio.sfx('boot');
          sayLine('pilot');
        }
        if (id === 'plug') {
          audio.sfx('lcl');
          sayLine('plug');
        }
        if (id === 'insert') audio.sfx('clamp');
        if (id === 'neural') {
          audio.sfx('sync');
          sayLine('neural');
        }
        if (id === 'sync') {
          audio.sfx('sync');
          sayLine('sync');
        }
        if (id === 'activate') {
          audio.sfx('clamp');
          sayLine('activate');
        }
        if (id === 'launch') {
          audio.sfx('launch');
          sayLine('launch');
        }
      };

      const finishLaunch = (index) => {
        setFinished(index);
        audio.stopBoot();
        audio.setPhase(soundRef.current ? 'idle' : 'idle');
        sayLine('welcome');
      };

      return h(React.Fragment, null,
        h('style', { 'data-eva-one': 'skin' }, CSS),
        h('div', {
          className: 'eva-hud',
          'data-fx': fx,
          'data-berserk': berserk ? '1' : '0',
          'aria-hidden': true,
        },
          h('span', { className: 'eva-hud__hr eva-hud__hr--top' }),
          h('span', { className: 'eva-hud__hr eva-hud__hr--bottom' }),
          h('span', { className: 'eva-corner eva-corner--tl' }),
          h('span', { className: 'eva-corner eva-corner--tr' }),
          h('span', { className: 'eva-corner eva-corner--bl' }),
          h('span', { className: 'eva-corner eva-corner--br' }),
          h('span', { className: 'eva-frame-rail eva-frame-rail--l' },
            h('i', { className: 'eva-frame-rail__text' },
              berserk ? 'BERSERK · CONTROL LOST' : 'EVANGELION · ' + pilot.unitEn)),
          h('span', { className: 'eva-frame-rail eva-frame-rail--r' },
            h('i', { className: 'eva-frame-rail__text' },
              berserk ? '暴走 · SYNC 412% · AT FIELD DOWN' : 'PILOT ' + pilot.no + ' · ' + pilot.name)),
          berserk
            ? h('span', { className: 'eva-hud__alert' },
                h('b', null, 'BERSERK'),
                h('span', null, '暴走 / CONTROL LOST'),
                h('i', null, 'SYNC 412%'))
            : null,
          berserk
            ? h('span', { className: 'eva-hud__glitch', 'aria-hidden': true },
                [0, 1, 2, 3, 4, 5].map((index) => h('i', { key: index })))
            : null,
          h('span', { className: 'eva-hud__edge' }),
          h('span', { className: 'eva-hud__scan' }),
          h('span', { className: 'eva-hud__scanlines' }),
          h('span', { className: 'eva-hud__vignette' }),
          berserkArt ? h(BerserkArt, { unit: berserkArt }) : null),
        !alarm && !gate && !playing ? h(React.Fragment, null, h(CockpitPanel), h(PilotToggle)) : null,
        alarm ? h(AngelIntro, { onDone: () => setAlarm(false) })
          : gate ? h(PilotGate, { onStart: startFromGate, preselect: pendingPilotKey }) : null,
        playing
          ? h(LaunchSequence, {
              key: run,
              onScene: handleScene,
              onDone: () => finishLaunch(run),
            })
          : null,
        bursting
          ? h(BerserkBurst, {
              key: burstRun,
              onDone: () => setBursted(burstRun),
            })
          : null,
        h(PilotComm, { caption }));
    }

    /* ------------------------------------------------------------------ *
     * Brand marks
     * ------------------------------------------------------------------ */
    function BrandMark() {
      const pilot = usePilot();
      return h('span', { className: 'eva-brandmark' }, h(Art, { name: pilot.head }));
    }

    function BrandName() {
      const pilot = usePilot();
      return h('span', { className: 'eva-brandname' },
        h('span', { className: 'eva-brandname__unit' }, 'EVA-' + pilot.unit),
        h('span', { className: 'eva-brandname__sub' }, pilot.unitJp + ' / DSH'));
    }

    function HeroMark() {
      const pilot = usePilot();
      return h('span', { className: 'eva-hero' },
        h('span', { className: 'eva-hero__glow' }),
        h(Art, { name: pilot.head, className: 'eva-hero__mark' }),
        h('span', { className: 'eva-hero__text' },
          h('span', { className: 'eva-hero__tag' }, 'EVA-' + pilot.unit),
          h('span', { className: 'eva-hero__jp' }, pilot.unitJp + ' · 発進管制')));
    }

    /* ------------------------------------------------------------------ *
     * Footer controls: launch replay + HUD intensity + light/dark.
     * ------------------------------------------------------------------ */
    function FooterActions(props) {
      const fx = useSignal(fxSignal);
      const berserk = useSignal(berserkSignal);
      const sound = useSignal(soundSignal);
      const wide = Boolean(props && props.wide);
      const next = fx === 'full' ? 'lite' : fx === 'lite' ? 'off' : 'full';
      const glyph = fx === 'full' ? '◈' : fx === 'lite' ? '◇' : '○';
      return h('div', { className: 'eva-foot' },
        h('button', {
          type: 'button',
          className: 'eva-foot__btn',
          title: t('replay'),
          'aria-label': t('replay'),
          onClick: () => launchSignal.set(launchSignal.get() + 1),
        },
          h('span', { className: 'eva-foot__glyph', 'aria-hidden': true }, '▶'),
          wide ? h('span', { className: 'eva-foot__label' }, '起動') : null),
        h('button', {
          type: 'button',
          className: 'eva-foot__btn',
          'data-fx': fx,
          title: t('fx'),
          'aria-label': t('fx'),
          onClick: () => setFx(next),
        },
          h('span', { className: 'eva-foot__glyph', 'aria-hidden': true }, glyph),
          wide ? h('span', { className: 'eva-foot__label' }, 'HUD') : null),
        h('button', {
          type: 'button',
          className: 'eva-foot__btn',
          title: t('mode'),
          'aria-label': t('mode'),
          onClick: () => themeMode(),
        },
          h('span', { className: 'eva-foot__glyph', 'aria-hidden': true }, '◐'),
          wide ? h('span', { className: 'eva-foot__label' }, 'MODE') : null),
        h('button', {
          type: 'button',
          className: 'eva-foot__btn',
          'data-sound': sound ? '1' : '0',
          'aria-pressed': sound,
          title: t('soundTitle'),
          'aria-label': t('soundTitle'),
          onClick: () => toggleSound(),
        },
          h('span', { className: 'eva-foot__glyph', 'aria-hidden': true }, sound ? '♪' : '∅'),
          wide ? h('span', { className: 'eva-foot__label' }, t('sound')) : null),
        h('button', {
          type: 'button',
          className: 'eva-foot__btn',
          'data-berserk': berserk ? '1' : '0',
          'aria-pressed': berserk,
          title: t('berserkTitle'),
          'aria-label': t('berserkTitle'),
          onClick: () => toggleBerserk(),
        },
          h('span', { className: 'eva-foot__glyph', 'aria-hidden': true }, '⚠'),
          wide ? h('span', { className: 'eva-foot__label' }, t('berserk')) : null));
    }

    /* ------------------------------------------------------------------ *
     * Sync-ratio rail above the composer.
     * ------------------------------------------------------------------ */
    const RAIL_TICKS = [3, 6, 4, 9, 5, 12, 7, 14, 6, 10, 4, 8, 5, 11, 7, 9];

    /* ------------------------------------------------------------------ *
     * NERV workbench strip: account balance (host bridge), clock, original
     * score transport and a decorative TPS meter. Borrows the reference
     * plugin's "desktop widget" idea, implemented for this skin.
     * ------------------------------------------------------------------ */
    function Workbench() {
      const clock = useClock();
      const sound = useSignal(soundSignal);
      const pilot = usePilot();
      const power = usePower();

      return h('div', { className: 'eva-desk' },
        h('span', { className: 'eva-desk__tag' },
          h('b', null, 'NERV'),
          h('i', null, 'WORKBENCH')),
        h('button', {
          type: 'button',
          className: 'eva-desk__cell eva-desk__cell--pilot',
          title: '切换驾驶员 / CYCLE PILOT',
          onClick: () => cyclePilot(),
        },
          h('i', null, 'PILOT'),
          h('b', { className: 'eva-desk__value' }, pilot.name),
          h('em', { className: 'eva-desk__unit' }, 'EVA-' + pilot.unit)),
        h('span', {
          className: 'eva-desk__cell eva-desk__cell--balance',
          'data-low': power.low ? '1' : '0',
          title: 'EVA 电量 / 剩余额度',
        },
          h('i', null, 'POWER'),
          h('b', { className: 'eva-desk__value' }, power.text),
          h('span', { className: 'eva-desk__battery', 'aria-hidden': true },
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) =>
              h('i', {
                key: index,
                'data-on': power.known && power.pct >= (index + 1) * 10 ? '1' : '0',
              }))),
          h('button', {
            type: 'button',
            className: 'eva-desk__refresh',
            title: '刷新电量 / REFRESH',
            'aria-label': '刷新电量',
            onClick: () => loadBalance(true),
          }, '↻')),
        h('span', { className: 'eva-desk__cell' },
          h('i', null, 'CLOCK'),
          h('b', { className: 'eva-desk__value' }, clockText(clock))),
        h('button', {
          type: 'button',
          className: 'eva-desk__cell eva-desk__cell--music',
          title: t('soundTitle'),
          onClick: () => toggleSound(),
        },
          h('i', null, 'SCORE'),
          h('b', { className: 'eva-desk__value' }, sound ? 'EM-01 ▶' : 'MUTED'),
          h('span', { className: 'eva-desk__bars', 'aria-hidden': true },
            [0, 1, 2, 3, 4].map((index) => h('i', { key: index, style: { '--i': index } })))),
        h('span', { className: 'eva-desk__cell' },
          h('i', null, 'TPS'),
          h('span', { className: 'eva-desk__bars eva-desk__bars--tps', 'aria-hidden': true },
            [0, 1, 2, 3, 4, 5, 6, 7].map((index) => h('i', { key: index, style: { '--i': index } })))));
    }

    function ComposerRail() {
      const clock = useClock();
      const berserk = useSignal(berserkSignal);
      const pilot = usePilot();
      const power = usePower();
      const [sync, setSync] = useState(() => 98.4 + Math.random() * 1.6);
      useEffect(() => {
        const timer = setInterval(() => setSync(98.4 + Math.random() * 1.6), 1500);
        return () => clearInterval(timer);
      }, []);
      return h('div', { className: 'eva-rail', 'aria-hidden': true },
        h('span', { className: 'eva-rail__pilot' },
          h(PilotImage, { pilot, kind: 'avatar', className: 'eva-rail__pilotAvatar' }),
          h('b', null, pilot.name),
          h('i', { className: 'eva-rail__heart' }, '♥'),
          h('span', { className: 'eva-rail__pilotSync' },
            (berserk ? '412.0' : sync.toFixed(1)) + '%')),
        h('span', { className: 'eva-rail__sep' }),
        h('span', { className: 'eva-rail__cap' }, 'SYNC'),
        h('span', { className: 'eva-rail__value' }, berserk ? '412.0%' : '100.0%'),
        h('span', { className: 'eva-rail__ticks' },
          RAIL_TICKS.map((height, index) => h('i', { key: index, style: { '--eva-tick': height } }))),
        h('span', { className: 'eva-rail__sep' }),
        h('span', { className: 'eva-rail__stat' }, 'MAGI', h('b', null, 'NOMINAL')),
        h('span', { className: 'eva-rail__stat eva-rail__stat--power', 'data-low': power.low ? '1' : '0' }, 'POWER', h('b', null, power.known ? Math.round(power.pct) + '%' : '--')),
        h('span', { className: 'eva-rail__stat eva-rail__stat--at' }, 'A.T.', h('b', null, '0.00')),
        h('span', { className: 'eva-rail__hazard' }),
        h(Art, { name: 'waveform', className: 'eva-rail__wave' }),
        h('span', { className: 'eva-rail__clock' }, clockText(clock)),
        h('span', { className: 'eva-rail__date' }, dateText(clock)),
        h('span', { className: 'eva-rail__cycle' }, 'CYCLE 0001 // 起動'));
    }

    /* ------------------------------------------------------------------ *
     * Full-width bottom status rail (shell.bottom) — the launch-console
     * telemetry strip that makes the whole frame read as a cockpit.
     * ------------------------------------------------------------------ */
    function StatusBar() {
      const clock = useClock();
      const berserk = useSignal(berserkSignal);
      const pilot = usePilot();
      return h('div', { className: 'eva-status', 'data-berserk': berserk ? '1' : '0' },
        h('div', { className: 'eva-status__main', 'aria-hidden': true },
          h('span', { className: 'eva-status__unit' },
            h('span', { className: 'eva-status__hex' }),
            'EVA-' + pilot.unit),
          h('span', { className: 'eva-status__rule' }),
          h('span', { className: 'eva-status__tag' },
            berserk ? '暴走 / BERSERK' : '発進管制 / LAUNCH CONTROL'),
          h('span', { className: 'eva-status__sep' }),
          h('span', { className: 'eva-status__grow' }),
          h('span', { className: 'eva-status__clock' }, clockText(clock)),
          h('span', { className: 'eva-status__cycle' }, 'CYCLE 0001'),
          h('span', { className: 'eva-status__hazard' })),
        h('button', {
          type: 'button',
          className: 'eva-status__berserk',
          'data-on': berserk ? '1' : '0',
          'aria-pressed': berserk,
          title: t('berserkTitle'),
          'aria-label': t('berserkTitle'),
          onClick: () => toggleBerserk(),
        },
          h('span', { className: 'eva-status__berserkLed' }),
          h('span', { className: 'eva-status__berserkLabel' }, t('berserk'))));
    }

    /* ------------------------------------------------------------------ *
     * Unit tag in the conversation header (conversation.header.leading).
     * ------------------------------------------------------------------ */
    function HeaderTag() {
      const berserk = useSignal(berserkSignal);
      const pilot = usePilot();
      const power = usePower();
      return h('span', {
        className: 'eva-headtag',
        'data-berserk': berserk ? '1' : '0',
        'data-low-power': power.low ? '1' : '0',
        'aria-hidden': true,
      },
        h('span', { className: 'eva-headtag__led' }),
        h('span', { className: 'eva-headtag__unit' }, 'EVA-' + pilot.unit),
        h('span', { className: 'eva-headtag__sub' }, berserk ? 'BERSERK' : 'PILOT ' + pilot.no),
        h('span', {
          className: 'eva-headtag__power',
          title: 'EVA 电量 · 剩余额度 ' + power.text,
        },
          h('em', null, 'PWR'),
          h('span', { className: 'eva-headtag__battery', 'aria-hidden': true },
            [0, 1, 2, 3, 4].map((index) =>
              h('i', {
                key: index,
                'data-on': power.known && power.pct >= (index + 1) * 20 ? '1' : '0',
              }))),
          h('b', null, power.known ? Math.round(power.pct) + '%' : '--')));
    }

    /* ------------------------------------------------------------------ *
     * Theme tokens layered over the active palette.
     * ------------------------------------------------------------------ */
    const TOKENS = {
      '--dsw-alias-bg-base': { light: '#f1ecf8', dark: '#07050e' },
      '--dsw-alias-bg-layer-1': { light: '#f8f4fd', dark: '#0e0919' },
      '--dsw-alias-bg-layer-2': { light: '#fcfaff', dark: '#140c24' },
      '--dsw-alias-bg-overlay': { light: '#ffffff', dark: '#241540' },
      '--dsw-alias-border-l1': { light: '#d6c9ea', dark: '#33224d' },
      '--dsw-alias-border-l2': { light: '#b79bdc', dark: '#4a2f70' },
      '--dsw-alias-brand-primary': { light: '#6a1fa8', dark: '#9dff4a' },
      '--dsw-alias-label-primary': { light: '#1b0f2a', dark: '#efe7fb' },
      '--dsw-alias-label-secondary': { light: '#54446c', dark: '#b4a6cc' },
      '--dsw-alias-state-error-primary': { light: '#c41616', dark: '#ff3b3b' },
      '--dsw-alias-state-idle-primary': { light: '#8b7ba3', dark: '#7e6c9e' },
      '--dsw-alias-state-success-primary': { light: '#1d7a4f', dark: '#4dffb0' },
      '--dsw-alias-state-warn-primary': { light: '#9a5300', dark: '#ffb347' },
      '--dsw-specific-sidebar-fill': { light: '#e9e1f5', dark: '#0a0614' },
    };

    const PILOT_TOKENS = {
      '01': TOKENS,
      '02': {
        ...TOKENS,
        '--dsw-alias-bg-base': { light: '#fbf1ec', dark: '#0c0506' },
        '--dsw-alias-bg-layer-1': { light: '#fff8f3', dark: '#160909' },
        '--dsw-alias-bg-layer-2': { light: '#fffdfb', dark: '#1f0c0c' },
        '--dsw-alias-bg-overlay': { light: '#ffffff', dark: '#2b0d0d' },
        '--dsw-alias-border-l1': { light: '#eaccc0', dark: '#3f1a1a' },
        '--dsw-alias-border-l2': { light: '#d8a08c', dark: '#5c2222' },
        '--dsw-alias-brand-primary': { light: '#c22a12', dark: '#ff7a1a' },
        '--dsw-alias-label-primary': { light: '#2a0e0b', dark: '#ffe9e3' },
        '--dsw-alias-label-secondary': { light: '#6d4a42', dark: '#d8b3a9' },
        '--dsw-specific-sidebar-fill': { light: '#f3ded4', dark: '#100607' },
      },
      '00': {
        ...TOKENS,
        '--dsw-alias-bg-base': { light: '#eef4f8', dark: '#050a0e' },
        '--dsw-alias-bg-layer-1': { light: '#f6fafd', dark: '#0a1218' },
        '--dsw-alias-bg-layer-2': { light: '#fbfdff', dark: '#0e1a22' },
        '--dsw-alias-bg-overlay': { light: '#ffffff', dark: '#142732' },
        '--dsw-alias-border-l1': { light: '#c8dbe6', dark: '#1e3441' },
        '--dsw-alias-border-l2': { light: '#9fc0d3', dark: '#2e4c5e' },
        '--dsw-alias-brand-primary': { light: '#2c6f96', dark: '#8fd4f2' },
        '--dsw-alias-label-primary': { light: '#0d1a22', dark: '#e6f4fb' },
        '--dsw-alias-label-secondary': { light: '#4a6373', dark: '#a8c4d4' },
        '--dsw-specific-sidebar-fill': { light: '#e2eef5', dark: '#060d12' },
      },
    };

    /* ------------------------------------------------------------------ *
     * Plugin
     * ------------------------------------------------------------------ */
    let t = (key) => key;
    let themeMode = () => {};

    return {
      inject: ['slots'],
      apply(ctx) {
        const theme = ctx.get('theme');
        if (theme) {
          themeMode = () => {
            const dark = document.body.hasAttribute('data-ds-dark-theme');
            theme.setTheme(dark ? 'light' : 'dark');
          };
        }

        // The selected pilot owns the page: this attribute drives every
        // pilot-specific accent and background, and the token set is swapped
        // live so switching pilot repaints the host surfaces immediately.
        ctx.effect(() => {
          const applyPilot = () => {
            try {
              document.body.setAttribute('data-eva-pilot', currentPilot().unit);
            } catch (error) {
              /* document unavailable */
            }
          };
          applyPilot();
          const dispose = pilotSignal.subscribe(applyPilot);
          return () => {
            dispose();
            try {
              document.body.removeAttribute('data-eva-pilot');
            } catch (error) {
              /* nothing to clean up */
            }
          };
        });

        if (theme) {
          ctx.effect(() => {
            let disposeTokens = null;
            const applyTokens = () => {
              if (disposeTokens) disposeTokens();
              disposeTokens = theme.overrideTokens(
                'dsh-eva-unit-01-skin',
                PILOT_TOKENS[currentPilot().unit] || TOKENS,
              );
            };
            applyTokens();
            const dispose = pilotSignal.subscribe(applyTokens);
            return () => {
              dispose();
              if (disposeTokens) disposeTokens();
            };
          });
        }

        ctx.effect(() => {
          startBalanceFeed();
          return () => stopBalanceFeed();
        });

        // Audio engine: original synthesised score + SFX + system TTS.  The
        // AudioContext is only created after a user gesture (gate / replay /
        // sound button), never during page start.
        ctx.effect(() => {
          // HMR can re-apply the plugin without re-evaluating this module.
          // Recreate the engine so a previous apply's dispose() cannot leave
          // a dead instance behind.
          const engine = createEvaAudio();
          audio = engine;
          engine.setEnabled(soundSignal.get());
          return () => {
            clearTimeout(captionTimer);
            engine.dispose();
          };
        });

        // If the page is already interactive (or HMR replaced the engine),
        // the next pointer gesture re-unlocks audio even outside the intro.
        ctx.effect(() => {
          const unlock = () => {
            if (soundSignal.get()) audio.unlock();
          };
          window.addEventListener('pointerdown', unlock, { once: true });
          return () => window.removeEventListener('pointerdown', unlock);
        });

        const locale = ctx.get('locale');
        if (locale) {
          t = locale.bind('eva');
          ctx.effect(() => {
            const registrations = [
              locale.register('eva', 'en', {
                replay: 'Replay the Unit-01 launch sequence',
                fx: 'Cycle HUD intensity',
                mode: 'Switch light / dark',
                skip: 'SKIP',
                skipHint: 'ESC / SKIP to abort',
                berserk: 'BERSERK',
                berserkTitle: 'Toggle Unit-01 berserk mode',
                sound: 'SOUND',
                soundTitle: 'Toggle music, SFX and armoured system cues',
              }),
              locale.register('eva', 'zh-CN', {
                replay: '重播初号机启动序列',
                fx: '切换 HUD 强度',
                mode: '切换明暗模式',
                skip: '跳过',
                skipHint: 'ESC / SKIP 可跳过',
                berserk: '暴走',
                berserkTitle: '切换初号机暴走状态',
                sound: '音声',
                soundTitle: '开关配乐、音效与装甲系统提示音',
              }),
              locale.register('eva', 'zh', {
                replay: '重播初号机启动序列',
                fx: '切换 HUD 强度',
                mode: '切换明暗模式',
                skip: '跳过',
                skipHint: 'ESC / SKIP 可跳过',
                berserk: '暴走',
                berserkTitle: '切换初号机暴走状态',
                sound: '音声',
                soundTitle: '开关配乐、音效与装甲系统提示音',
              }),
            ];
            return () => registrations.forEach((dispose) => dispose());
          });
        }

        // Single-cell slots already hold the shipped occupant: register one
        // priority lower so the Unit-01 chrome shadows it. A hot reload can
        // still overlap with the previous registration for one frame; log and
        // move on instead of throwing out of the slot injection.
        const replaceSingle = (name, component) => () => {
          try {
            return ctx.slots.register({ name, priority: -100 }, component);
          } catch (error) {
            if (typeof console !== 'undefined' && console.warn) {
              console.warn('[eva-unit-01] keeping the previous ' + name + ' registration:', error && error.message);
            }
            return undefined;
          }
        };

        // The order also encodes the resolved skin profile (fx level + reduced
        // motion) so a live Slots inspection can tell which ambience a page
        // booted with: -1000 / -990 / -980 = HUD full / lite / off,
        // -100 more when the OS asks for reduced motion.
        const fxLevel = readFx() === 'full' ? 0 : readFx() === 'lite' ? 1 : 2;
        const hudOrder = -1000 - fxLevel * 10 - (reduceMotion() ? 100 : 0);
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register({ name: 'shell.overlay', id: 'eva-01-hud', order: hudOrder }, Hud));

        // Berserk mode is a body attribute so the stylesheet can repaint every
        // surface without React touching the host tree.
        ctx.effect(() => {
          const applyBerserk = () => {
            try {
              document.body.toggleAttribute('data-eva-berserk', berserkSignal.get());
            } catch (error) {
              /* document unavailable outside a page */
            }
          };
          applyBerserk();
          const dispose = berserkSignal.subscribe(applyBerserk);
          return () => {
            dispose();
            try {
              document.body.removeAttribute('data-eva-berserk');
            } catch (error) {
              /* nothing to clean up */
            }
          };
        });

        // The violent shake is a one-shot: five seconds after the mode is
        // switched on, the frame settles and only the red console remains.
        ctx.effect(() => {
          const SHAKE_MS = 5000;
          let timer = 0;
          let previous = berserkSignal.get();
          const onSwitch = () => {
            const on = berserkSignal.get();
            try {
              if (on && !previous) {
                clearTimeout(timer);
                document.body.setAttribute('data-eva-berserk-shake', '');
                timer = setTimeout(() => {
                  try {
                    document.body.removeAttribute('data-eva-berserk-shake');
                  } catch (error) {
                    /* page went away */
                  }
                }, SHAKE_MS);
              } else if (!on) {
                clearTimeout(timer);
                document.body.removeAttribute('data-eva-berserk-shake');
              }
            } catch (error) {
              /* document unavailable */
            }
            previous = on;
          };
          const dispose = berserkSignal.subscribe(onSwitch);
          return () => {
            dispose();
            clearTimeout(timer);
            try {
              document.body.removeAttribute('data-eva-berserk-shake');
            } catch (error) {
              /* nothing to clean up */
            }
          };
        });

        ctx.slots.inject('shell.bottom', replaceSingle('shell.bottom', StatusBar));

        ctx.slots.inject('sidebar.brand.mark', replaceSingle('sidebar.brand.mark', BrandMark));
        ctx.slots.inject('sidebar.brand.name', replaceSingle('sidebar.brand.name', BrandName));
        ctx.slots.inject(
          'conversation.hero.brand.mark',
          replaceSingle('conversation.hero.brand.mark', HeroMark),
        );

        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register({ name: 'sidebar.footer.action', id: 'eva-01-controls', order: 40 }, FooterActions));
      },
    };
  },
});
