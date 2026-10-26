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
      return h('div', { className: 'eva-scene eva-scene--activate' },
        h('div', { className: 'eva-activate' },
          h('span', { className: 'eva-activate__flap eva-activate__flap--l' }),
          h('span', { className: 'eva-activate__flap eva-activate__flap--r' }),
          h('span', { className: 'eva-activate__glow' }),
          h(Art, { name: 'head', className: 'eva-activate__head' }),
          h('span', { className: 'eva-activate__eye' })),
        h(SceneReadout, {
          jp: '初号機 起動',
          en: 'UNIT-01 ACTIVATED',
          big: '起動',
          rows: [
            ['初号機', 'UNIT-01', 'ACTIVE'],
            ['主電源', 'MAIN POWER', 'ON'],
            ['A.T.フィールド', 'A.T. FIELD', 'STANDBY'],
            ['全系統', 'ALL SYSTEMS', 'GREEN'],
          ],
        }));
    }

    function LaunchScene() {
      return h('div', { className: 'eva-scene eva-scene--launch' },
        h('div', { className: 'eva-launchscene' },
          h('span', { className: 'eva-launchscene__rails' }),
          h('span', { className: 'eva-launchscene__clamps' }),
          h('span', { className: 'eva-launchscene__title' }, '発進'),
          h('span', { className: 'eva-launchscene__sub' }, 'LAUNCH // EVA-01'),
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
      const reduced = reduceMotion();
      const scenes = reduced ? STATIC_SCENES : FULL_SCENES;
      const total = scenes.reduce((sum, scene) => sum + scene.ms, 0);
      const [elapsed, setElapsed] = useState(0);
      const [leaving, setLeaving] = useState(false);
      const done = useRef(false);
      const timer = useRef(0);

      const finish = () => {
        if (done.current) return;
        done.current = true;
        setLeaving(true);
        timer.current = setTimeout(() => props.onDone(), LEAVE_MS);
      };

      useEffect(() => {
        const started = performance.now();
        let frame = 0;
        let painted = -1;
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
          h(Art, { name: 'head', className: 'eva-launch__brandmark' }),
          h('span', { className: 'eva-launch__brand' },
            h('b', null, 'EVA-01'),
            h('em', null, '発進管制 / LAUNCH CONTROL')),
          h('span', { className: 'eva-launch__scenelabel' },
            h('span', null, 'SCENE ' + pad(at.index + 1) + ' / ' + pad(scenes.length)),
            h('b', null, at.scene.jp),
            h('span', null, at.scene.en)),
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
            h('span', null, 'EVA-01 // CYCLE 0001'))),
        h('div', { className: 'eva-launch__hazard' }),
        h('div', { className: 'eva-launch__flash' }));
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
    function Hud() {
      const fx = useSignal(fxSignal);
      const berserk = useSignal(berserkSignal);
      const [run, setRun] = useState(0);
      const [finished, setFinished] = useState(-1);
      const [burstRun, setBurstRun] = useState(0);
      const [burstDone, setBurstDone] = useState(0);

      useEffect(() => launchSignal.subscribe(() => {
        setRun((current) => current + 1);
      }), []);

      useEffect(() => berserkBurstSignal.subscribe(() => {
        setBurstRun((current) => current + 1);
      }), []);

      const playing = run !== -1 && finished !== run;
      const bursting = burstRun > burstDone;

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
              berserk ? 'BERSERK · CONTROL LOST' : 'EVANGELION TEST TYPE · UNIT-01')),
          h('span', { className: 'eva-frame-rail eva-frame-rail--r' },
            h('i', { className: 'eva-frame-rail__text' },
              berserk ? '暴走 · SYNC 412% · AT FIELD DOWN' : 'LAUNCH CONTROL · 発進管制')),
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
          h('span', { className: 'eva-hud__vignette' })),
        playing
          ? h(LaunchSequence, {
              key: run,
              onDone: () => setFinished(run),
            })
          : null,
        bursting
          ? h(BerserkBurst, {
              key: burstRun,
              onDone: () => setBurstDone(burstRun),
            })
          : null);
    }

    /* ------------------------------------------------------------------ *
     * Brand marks
     * ------------------------------------------------------------------ */
    function BrandMark() {
      return h('span', { className: 'eva-brandmark' }, h(Art, { name: 'head' }));
    }

    function BrandName() {
      return h('span', { className: 'eva-brandname' },
        h('span', { className: 'eva-brandname__unit' }, 'EVA-01'),
        h('span', { className: 'eva-brandname__sub' }, '初号機 / DSH'));
    }

    function HeroMark() {
      return h('span', { className: 'eva-hero' },
        h('span', { className: 'eva-hero__glow' }),
        h(Art, { name: 'head', className: 'eva-hero__mark' }),
        h('span', { className: 'eva-hero__text' },
          h('span', { className: 'eva-hero__tag' }, 'EVA-01'),
          h('span', { className: 'eva-hero__jp' }, '発進管制')));
    }

    /* ------------------------------------------------------------------ *
     * Footer controls: launch replay + HUD intensity + light/dark.
     * ------------------------------------------------------------------ */
    function FooterActions(props) {
      const fx = useSignal(fxSignal);
      const berserk = useSignal(berserkSignal);
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

    function ComposerRail() {
      const clock = useClock();
      return h('div', { className: 'eva-rail', 'aria-hidden': true },
        h('span', { className: 'eva-rail__cap' }, 'SYNC'),
        h('span', { className: 'eva-rail__value' }, '100.0%'),
        h('span', { className: 'eva-rail__ticks' },
          RAIL_TICKS.map((height, index) => h('i', { key: index, style: { '--eva-tick': height } }))),
        h('span', { className: 'eva-rail__sep' }),
        h('span', { className: 'eva-rail__stat' }, 'MAGI', h('b', null, 'NOMINAL')),
        h('span', { className: 'eva-rail__stat eva-rail__stat--power' }, 'POWER', h('b', null, 'LINKED')),
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
      return h('div', { className: 'eva-status', 'data-berserk': berserk ? '1' : '0' },
        h('div', { className: 'eva-status__main', 'aria-hidden': true },
          h('span', { className: 'eva-status__unit' },
            h('span', { className: 'eva-status__hex' }),
            'EVA-01'),
          h('span', { className: 'eva-status__rule' }),
          h('span', { className: 'eva-status__tag' },
            berserk ? '暴走 / BERSERK' : '発進管制 / LAUNCH CONTROL'),
          h('span', { className: 'eva-status__sep' }),
          h('span', { className: 'eva-status__metric' }, 'SYNC',
            h('b', null, berserk ? '412.0%' : '100.0%'),
            h('span', { className: 'eva-status__bars' },
              [0, 1, 2, 3, 4, 5, 6, 7].map((index) => h('i', { key: index })))),
          h('span', { className: 'eva-status__metric eva-status__metric--wide' }, 'MAGI',
            h('b', null, berserk ? 'FAILED' : 'NOMINAL')),
          h('span', { className: 'eva-status__metric eva-status__metric--wide' }, 'POWER',
            h('b', null, berserk ? 'OVERLOAD' : 'LINKED')),
          h('span', { className: 'eva-status__metric eva-status__metric--wide' }, 'A.T. FIELD',
            h('b', null, berserk ? 'COLLAPSED' : '0.00')),
          h('span', { className: 'eva-status__metric eva-status__metric--wide' }, 'LCL',
            h('b', null, berserk ? 'LEAK' : '0.00')),
          h('span', { className: 'eva-status__grow' }),
          h(Art, { name: 'waveform', className: 'eva-status__wave' }),
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
      return h('span', {
        className: 'eva-headtag',
        'data-berserk': berserk ? '1' : '0',
        'aria-hidden': true,
      },
        h('span', { className: 'eva-headtag__led' }),
        h('span', { className: 'eva-headtag__unit' }, 'EVA-01'),
        h('span', { className: 'eva-headtag__sub' }, berserk ? 'BERSERK' : 'TEST TYPE'));
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
          ctx.effect(() => {
            const dispose = theme.overrideTokens('dsh-eva-unit-01-skin', TOKENS);
            return () => dispose();
          });
        }

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
              }),
              locale.register('eva', 'zh-CN', {
                replay: '重播初号机启动序列',
                fx: '切换 HUD 强度',
                mode: '切换明暗模式',
                skip: '跳过',
                skipHint: 'ESC / SKIP 可跳过',
                berserk: '暴走',
                berserkTitle: '切换初号机暴走状态',
              }),
              locale.register('eva', 'zh', {
                replay: '重播初号机启动序列',
                fx: '切换 HUD 强度',
                mode: '切换明暗模式',
                skip: '跳过',
                skipHint: 'ESC / SKIP 可跳过',
                berserk: '暴走',
                berserkTitle: '切换初号机暴走状态',
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
        ctx.slots.inject('conversation.header.leading', replaceSingle('conversation.header.leading', HeaderTag));

        ctx.slots.inject('sidebar.brand.mark', replaceSingle('sidebar.brand.mark', BrandMark));
        ctx.slots.inject('sidebar.brand.name', replaceSingle('sidebar.brand.name', BrandName));
        ctx.slots.inject(
          'conversation.hero.brand.mark',
          replaceSingle('conversation.hero.brand.mark', HeroMark),
        );

        ctx.slots.inject('conversation.input.dock', () =>
          ctx.slots.register({ name: 'conversation.input.dock', id: 'eva-01-rail', order: 40 }, ComposerRail));

        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register({ name: 'sidebar.footer.action', id: 'eva-01-controls', order: 40 }, FooterActions));
      },
    };
  },
});
