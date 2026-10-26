window.__ModuleLoader__.load({
  id: 'dsh-eva-unit-01-skin',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useRef, useState } = React;

    /* ------------------------------------------------------------------ *
     * Generated payload — build.mjs injects the stylesheet and artwork.
     * ------------------------------------------------------------------ */
    const CSS = "/* =====================================================================\n   EVA UNIT-01 LAUNCH SKIN  ·  DeepSeek Harness Web GUI\n   Palette: void black / NERV violet / unit green / signal amber\n   Structure: this stylesheet ships inside the plugin's Client bundle and\n   is rendered by the HUD component, so unmounting the plugin removes it.\n   Host surfaces are re-coloured through --dsw-alias-* tokens (see\n   client.template.js TOKENS); literal colours below are artwork/ambience\n   for the EVA frame, brand marks and boot sequence.\n   ===================================================================== */\n\n:root {\n  --eva-void: #050409;\n  --eva-ink: #0a0616;\n  --eva-deep: #1a0b2e;\n  --eva-mid: #4b1d7a;\n  --eva-hot: #7a2fb0;\n  --eva-lilac: #b98be0;\n  --eva-bone: #e9e2f5;\n  --eva-steel: #6b5f80;\n  --eva-green: #9dff4a;\n  --eva-signal: #4dffb0;\n  --eva-acid: #c6ff00;\n  --eva-orange: #ff6b1a;\n  --eva-red: #ff2d2d;\n  --eva-hazard: #ffd400;\n  --eva-amber: #ffb347;\n  --eva-font-hud: ui-monospace, \"SF Mono\", SFMono-Regular, Menlo, \"Cascadia Code\", Consolas,\n    \"Liberation Mono\", \"PingFang SC\", \"Hiragino Sans GB\", monospace;\n  --eva-font-display: \"DIN Condensed\", \"Avenir Next Condensed\", \"Arial Narrow\", \"Helvetica Neue\",\n    \"PingFang SC\", \"Hiragino Sans GB\", sans-serif;\n  --eva-cut: 10px;\n}\n\n/* ---------- global ambience ---------- */\n\n::selection {\n  background: rgba(157, 255, 74, 0.85);\n  color: #050409;\n}\n\n* {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(122, 47, 176, 0.8) transparent;\n}\n\n::-webkit-scrollbar {\n  width: 9px;\n  height: 9px;\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n::-webkit-scrollbar-thumb {\n  background: linear-gradient(180deg, #4b1d7a, #7a2fb0);\n  border: 2px solid transparent;\n  background-clip: content-box;\n  border-radius: 9px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: linear-gradient(180deg, #7a2fb0, #9dff4a);\n  background-clip: content-box;\n}\n\nbody {\n  background-color: var(--dsw-alias-bg-base);\n  background-attachment: fixed;\n}\n\nbody[data-ds-dark-theme] {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(122, 47, 176, 0.26), transparent 62%),\n    radial-gradient(820px 560px at 92% 112%, rgba(77, 255, 176, 0.07), transparent 64%),\n    repeating-linear-gradient(0deg, rgba(233, 226, 245, 0.026) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(233, 226, 245, 0.026) 0 1px, transparent 1px 46px);\n}\n\nbody:not([data-ds-dark-theme]) {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(106, 31, 168, 0.1), transparent 62%),\n    repeating-linear-gradient(0deg, rgba(75, 29, 122, 0.045) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(75, 29, 122, 0.045) 0 1px, transparent 1px 46px);\n}\n\nbody {\n  --dsw-focus-ring-color: rgba(157, 255, 74, 0.9);\n}\n\n/* =====================================================================\n   FRAME HUD (shell.overlay)\n   ===================================================================== */\n\n.eva-hud {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  font-family: var(--eva-font-hud);\n  color: var(--eva-green);\n  -webkit-font-smoothing: antialiased;\n}\n\n.eva-corner {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(157, 255, 74, 0.5);\n  opacity: 0.5;\n}\n.eva-corner--tl {\n  top: 7px;\n  left: 7px;\n  border-right: 0;\n  border-bottom: 0;\n}\n.eva-corner--tr {\n  top: 7px;\n  right: 7px;\n  border-left: 0;\n  border-bottom: 0;\n}\n.eva-corner--bl {\n  bottom: calc(var(--eva-status-h) + 6px);\n  left: 7px;\n  border-right: 0;\n  border-top: 0;\n}\n.eva-corner--br {\n  bottom: calc(var(--eva-status-h) + 6px);\n  right: 7px;\n  border-left: 0;\n  border-top: 0;\n}\n\n.eva-hud__hr {\n  position: absolute;\n  left: 50%;\n  width: min(520px, 52vw);\n  height: 1px;\n  transform: translateX(-50%);\n  background: linear-gradient(90deg, transparent, rgba(157, 255, 74, 0.4), transparent);\n  opacity: 0.45;\n}\n.eva-hud__hr--top {\n  top: 0;\n}\n.eva-hud__hr--bottom {\n  bottom: var(--eva-status-h);\n}\n\n.eva-hud__scanlines {\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(0, 0, 0, 0.2) 0 1px,\n    transparent 1px 3px\n  );\n  opacity: 0.16;\n}\n\n.eva-hud__scan {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 140px;\n  background: linear-gradient(\n    180deg,\n    transparent,\n    rgba(157, 255, 74, 0.035) 45%,\n    rgba(157, 255, 74, 0.06) 50%,\n    rgba(157, 255, 74, 0.035) 55%,\n    transparent\n  );\n  animation: eva-scan 11s linear infinite;\n}\n\n.eva-hud__vignette {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(125% 105% at 50% 45%, transparent 56%, rgba(5, 4, 9, 0.42) 100%);\n  opacity: 0.6;\n}\n\n.eva-hud[data-fx=\"lite\"] .eva-hud__scanlines,\n.eva-hud[data-fx=\"lite\"] .eva-hud__scan,\n.eva-hud[data-fx=\"lite\"] .eva-hud__vignette {\n  display: none;\n}\n.eva-hud[data-fx=\"lite\"] .eva-corner,\n.eva-hud[data-fx=\"lite\"] .eva-hud__hr {\n  opacity: 0.25;\n}\n.eva-hud[data-fx=\"off\"] .eva-hud__scanlines,\n.eva-hud[data-fx=\"off\"] .eva-hud__scan,\n.eva-hud[data-fx=\"off\"] .eva-hud__vignette,\n.eva-hud[data-fx=\"off\"] .eva-corner,\n.eva-hud[data-fx=\"off\"] .eva-hud__hr {\n  display: none;\n}\n\n/* =====================================================================\n   BOOT SEQUENCE — seven-scene Unit-01 launch console\n   boot → pilot entry → entry-plug lock → neural link → sync 100%\n   → activation → launch.  Full ~13.7s, quick (reload) ~2.7s.\n   ===================================================================== */\n\n.eva-launch {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  overflow: hidden;\n  pointer-events: auto;\n  background: #05040a;\n  color: #e9e2f5;\n  font-family: var(--eva-font-hud);\n  user-select: none;\n  -webkit-user-select: none;\n  animation: eva-fade-in 0.16s linear both;\n}\n.eva-launch[data-scene=\"leave\"] {\n  animation: eva-launch-wipe 0.62s cubic-bezier(0.6, 0, 0.8, 0.2) both;\n}\n\n.eva-launch__bg {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(90% 70% at 50% 42%, rgba(122, 47, 176, 0.34), transparent 62%),\n    radial-gradient(60% 40% at 76% 18%, rgba(77, 255, 176, 0.06), transparent 70%),\n    linear-gradient(180deg, #05040a, #0a0616 58%, #05040a);\n}\n\n.eva-launch__slats {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n}\n.eva-launch__slat {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: calc(var(--eva-slat) * 14.2857%);\n  width: 14.2857%;\n  background:\n    linear-gradient(180deg, rgba(122, 47, 176, 0.26), rgba(26, 11, 46, 0.55) 42%, rgba(122, 47, 176, 0.2)),\n    #07050d;\n  border-left: 1px solid rgba(157, 255, 74, 0.13);\n  transform-origin: 50% 0;\n  animation: eva-slat-in 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) both;\n  animation-delay: calc(var(--eva-slat) * 55ms);\n}\n.eva-launch__slat:nth-child(even) {\n  background:\n    linear-gradient(180deg, rgba(26, 11, 46, 0.7), rgba(122, 47, 176, 0.2) 60%, rgba(26, 11, 46, 0.65)),\n    #06040c;\n}\n.eva-launch[data-scene=\"leave\"] .eva-launch__slat {\n  animation: eva-slat-out 0.5s cubic-bezier(0.6, 0, 0.8, 0.2) both;\n}\n\n.eva-launch__grid {\n  position: absolute;\n  inset: 0;\n  background-image:\n    repeating-linear-gradient(0deg, rgba(157, 255, 74, 0.06) 0 1px, transparent 1px 40px),\n    repeating-linear-gradient(90deg, rgba(157, 255, 74, 0.045) 0 1px, transparent 1px 40px);\n  -webkit-mask-image: radial-gradient(78% 78% at 50% 50%, #000 34%, transparent 100%);\n  mask-image: radial-gradient(78% 78% at 50% 50%, #000 34%, transparent 100%);\n}\n\n/* --- launch top / bottom chrome --- */\n.eva-launch__top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  height: 54px;\n  padding: 0 18px;\n  border-bottom: 1px solid rgba(157, 255, 74, 0.2);\n  background: linear-gradient(180deg, rgba(5, 4, 10, 0.94), rgba(5, 4, 10, 0));\n}\n.eva-launch__brandmark {\n  display: inline-flex;\n  width: 28px;\n  height: 28px;\n}\n.eva-launch__brandmark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-launch__brand {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  line-height: 1;\n}\n.eva-launch__brand b {\n  font-size: 12px;\n  letter-spacing: 0.3em;\n  color: #f3edff;\n}\n.eva-launch__brand em {\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.24em;\n  color: rgba(157, 255, 74, 0.7);\n}\n.eva-launch__scenelabel {\n  margin-left: auto;\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  font-size: 9px;\n  letter-spacing: 0.22em;\n  color: rgba(157, 255, 74, 0.55);\n  white-space: nowrap;\n}\n.eva-launch__scenelabel b {\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.28em;\n  color: #f3edff;\n}\n.eva-launch__skip {\n  pointer-events: auto;\n  appearance: none;\n  margin-left: 8px;\n  padding: 6px 13px;\n  border: 1px solid rgba(157, 255, 74, 0.45);\n  background: rgba(157, 255, 74, 0.08);\n  color: var(--eva-green);\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.22em;\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));\n}\n.eva-launch__skip:hover {\n  background: rgba(157, 255, 74, 0.18);\n}\n\n.eva-launch__stage {\n  position: absolute;\n  inset: 0;\n}\n.eva-scene {\n  position: absolute;\n  inset: 0;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  gap: clamp(24px, 5vw, 72px);\n  padding: 96px clamp(24px, 6vw, 96px) 112px;\n  animation: eva-scene-in 0.3s ease-out both;\n}\n.eva-launch[data-scene=\"boot\"] .eva-scene--boot,\n.eva-launch[data-scene=\"pilot\"] .eva-scene--pilot,\n.eva-launch[data-scene=\"plug\"] .eva-scene--plug,\n.eva-launch[data-scene=\"insert\"] .eva-scene--insert,\n.eva-launch[data-scene=\"neural\"] .eva-scene--neural,\n.eva-launch[data-scene=\"sync\"] .eva-scene--sync,\n.eva-launch[data-scene=\"activate\"] .eva-scene--activate,\n.eva-launch[data-scene=\"launch\"] .eva-scene--launch {\n  display: flex;\n}\n\n.eva-launch__foot {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 10px;\n  z-index: 6;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  padding: 0 18px;\n}\n.eva-launch__track {\n  display: flex;\n  gap: 4px;\n}\n.eva-launch__seg {\n  flex: 1;\n  height: 3px;\n  background: rgba(157, 255, 74, 0.12);\n  overflow: hidden;\n}\n.eva-launch__seg i {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, rgba(157, 255, 74, 0.45), var(--eva-green));\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform 0.16s linear;\n}\n.eva-launch__seg[data-done=\"1\"] i {\n  transform: scaleX(1);\n}\n.eva-launch__seg[data-active=\"1\"] i {\n  transform: scaleX(var(--eva-p));\n}\n.eva-launch__overall {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  font-size: 8.5px;\n  letter-spacing: 0.26em;\n  text-transform: uppercase;\n  color: rgba(157, 255, 74, 0.55);\n}\n.eva-launch__hint {\n  color: rgba(157, 255, 74, 0.75);\n  letter-spacing: 0.2em;\n}\n.eva-launch__hazard {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 7;\n  height: 10px;\n  background: repeating-linear-gradient(45deg, #ffd400 0 8px, #0a0616 8px 16px);\n  opacity: 0.85;\n  animation: eva-hazard-slide 6s linear infinite;\n}\n.eva-launch__flash {\n  position: absolute;\n  inset: 0;\n  z-index: 8;\n  pointer-events: none;\n  opacity: 0;\n  background: radial-gradient(\n    60% 60% at 50% 50%,\n    rgba(233, 226, 245, 0.92),\n    rgba(157, 255, 74, 0.3) 45%,\n    transparent 72%\n  );\n}\n.eva-launch[data-scene=\"launch\"] .eva-launch__flash {\n  animation: eva-flash 0.7s ease-out both;\n}\n.eva-launch[data-scene=\"leave\"] .eva-launch__flash {\n  animation: none;\n  opacity: 0;\n}\n\n/* --- shared scene read-out --- */\n.eva-scene__side {\n  width: min(300px, 30vw);\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n  text-align: left;\n}\n.eva-scene__meta {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid rgba(185, 139, 224, 0.35);\n  margin-bottom: 4px;\n}\n.eva-scene__meta b {\n  font-size: 15px;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  color: #f3edff;\n}\n.eva-scene__meta span {\n  font-size: 9px;\n  letter-spacing: 0.34em;\n  color: rgba(157, 255, 74, 0.7);\n}\n.eva-info__row {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  font-size: 10px;\n  letter-spacing: 0.12em;\n  color: rgba(233, 226, 245, 0.5);\n}\n.eva-info__row b {\n  margin-left: auto;\n  font-weight: 600;\n  color: var(--eva-green);\n}\n.eva-scene__big {\n  margin-top: 8px;\n  font-family: var(--eva-font-display);\n  font-size: clamp(28px, 3.4vw, 46px);\n  font-weight: 800;\n  letter-spacing: 0.24em;\n  color: #f3edff;\n  text-shadow: 0 0 26px rgba(157, 255, 74, 0.32);\n}\n\n/* --- scene 1: system boot --- */\n.eva-scene--boot {\n  justify-content: center;\n}\n.eva-boot {\n  display: flex;\n  align-items: center;\n  gap: clamp(28px, 5vw, 72px);\n}\n.eva-boot__term {\n  width: min(360px, 34vw);\n  display: grid;\n  gap: 6px;\n  font-size: 11px;\n  letter-spacing: 0.06em;\n  color: rgba(157, 255, 74, 0.85);\n}\n.eva-boot__line {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  opacity: 0;\n  animation: eva-bootline 0.3s ease-out both;\n}\n.eva-boot__line:nth-child(1) { animation-delay: 0.10s; }\n.eva-boot__line:nth-child(2) { animation-delay: 0.24s; }\n.eva-boot__line:nth-child(3) { animation-delay: 0.38s; }\n.eva-boot__line:nth-child(4) { animation-delay: 0.52s; }\n.eva-boot__line:nth-child(5) { animation-delay: 0.66s; }\n.eva-boot__line:nth-child(6) { animation-delay: 0.80s; }\n.eva-boot__line:nth-child(7) { animation-delay: 0.94s; }\n.eva-boot__line:nth-child(8) { animation-delay: 1.10s; }\n.eva-boot__line span:last-child {\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-boot__dial {\n  position: relative;\n  width: 180px;\n  height: 180px;\n}\n.eva-boot__ring {\n  position: absolute;\n  inset: 0;\n  border: 1px dashed rgba(157, 255, 74, 0.32);\n  border-radius: 50%;\n  animation: eva-spin 7s linear infinite;\n}\n.eva-boot__ring--2 {\n  inset: 26px;\n  border-style: solid;\n  border-color: rgba(185, 139, 224, 0.3);\n  animation-direction: reverse;\n  animation-duration: 4.2s;\n}\n.eva-boot__core {\n  position: absolute;\n  inset: 62px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(157, 255, 74, 0.5);\n  font-family: var(--eva-font-display);\n  font-size: 34px;\n  font-weight: 800;\n  color: var(--eva-green);\n  text-shadow: 0 0 18px rgba(157, 255, 74, 0.4);\n}\n\n/* --- scene 2: pilot entry / LCL --- */\n.eva-plug {\n  position: relative;\n  width: min(250px, 24vw);\n  height: min(330px, 46vh);\n}\n.eva-plug__shell {\n  position: absolute;\n  inset: 0;\n  clip-path: polygon(50% 0, 84% 10%, 100% 34%, 100% 100%, 0 100%, 0 34%, 16% 10%);\n  background: linear-gradient(180deg, rgba(122, 47, 176, 0.42), rgba(10, 6, 22, 0.92) 60%);\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-plug__lcl {\n  position: absolute;\n  left: 16%;\n  right: 16%;\n  bottom: 9%;\n  height: 62%;\n  overflow: hidden;\n  border: 1px solid rgba(255, 178, 56, 0.35);\n  background: rgba(8, 4, 2, 0.68);\n}\n.eva-plug__lclFill {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 82%;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 154, 26, 0.62) 0%,\n    rgba(255, 212, 0, 0.26) 55%,\n    rgba(255, 106, 26, 0.14) 100%\n  );\n  box-shadow: 0 0 24px rgba(255, 170, 40, 0.35);\n  animation: eva-lcl-fill 2.2s cubic-bezier(0.3, 0.7, 0.3, 1) 0.15s both;\n}\n.eva-plug__lclFill::before {\n  content: \"\";\n  position: absolute;\n  top: -3px;\n  left: 0;\n  right: 0;\n  height: 5px;\n  background: repeating-linear-gradient(90deg, rgba(255, 228, 128, 0.9) 0 7px, transparent 7px 14px);\n  animation: eva-surface 1.6s linear infinite;\n}\n.eva-plug__bubbles i {\n  position: absolute;\n  bottom: -4px;\n  left: calc(8% + var(--i) * 16%);\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: rgba(255, 226, 110, 0.85);\n  animation: eva-bubble 2.3s linear infinite;\n  animation-delay: calc(var(--i) * -0.32s);\n}\n.eva-plug__seat {\n  position: absolute;\n  left: 50%;\n  bottom: 4%;\n  width: 34%;\n  height: 8%;\n  transform: translateX(-50%);\n  border: 1px solid rgba(255, 190, 70, 0.42);\n  background: rgba(26, 11, 46, 0.8);\n}\n.eva-plug__clamp {\n  position: absolute;\n  top: 38%;\n  width: 26%;\n  height: 26%;\n  background: linear-gradient(90deg, rgba(75, 29, 122, 0.95), rgba(20, 12, 36, 0.98));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-plug__clamp--l {\n  left: -18%;\n  clip-path: polygon(0 0, 100% 12%, 100% 88%, 0 100%);\n  animation: eva-clamp-left 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.9s both;\n}\n.eva-plug__clamp--r {\n  right: -18%;\n  clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 88%);\n  animation: eva-clamp-right 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.9s both;\n}\n.eva-plug__label {\n  position: absolute;\n  left: -8%;\n  right: -8%;\n  bottom: -26px;\n  text-align: center;\n  font-size: 9px;\n  letter-spacing: 0.2em;\n  color: rgba(255, 200, 96, 0.9);\n}\n\n/* --- scene 3: entry-plug lock --- */\n.eva-insert {\n  position: relative;\n  width: min(320px, 30vw);\n  height: min(320px, 44vh);\n}\n.eva-insert__socket {\n  position: absolute;\n  left: 22%;\n  right: 22%;\n  top: 34%;\n  bottom: 6%;\n  border: 2px solid rgba(185, 139, 224, 0.45);\n  background: rgba(10, 6, 22, 0.85);\n  clip-path: polygon(50% 0, 100% 26%, 100% 100%, 0 100%, 0 26%);\n}\n.eva-insert__plug {\n  position: absolute;\n  left: 50%;\n  top: 2%;\n  width: 24%;\n  height: 52%;\n  transform: translate(-50%, 68%);\n  background: linear-gradient(180deg, rgba(122, 47, 176, 0.9), rgba(26, 11, 46, 0.96));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.6);\n  clip-path: polygon(50% 0, 100% 16%, 86% 100%, 14% 100%, 0 16%);\n  animation: eva-plug-drop 1.9s cubic-bezier(0.32, 0.9, 0.24, 1) both;\n}\n.eva-insert__clamp {\n  position: absolute;\n  top: 44%;\n  width: 34%;\n  height: 30%;\n  background: linear-gradient(90deg, rgba(75, 29, 122, 0.95), rgba(20, 12, 36, 0.98));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-insert__clamp--l {\n  left: 0;\n  clip-path: polygon(0 0, 100% 14%, 100% 100%, 0 88%);\n  animation: eva-insert-clamp-left 1.9s cubic-bezier(0.5, 0, 0.2, 1) both;\n}\n.eva-insert__clamp--r {\n  right: 0;\n  clip-path: polygon(0 14%, 100% 0, 100% 88%, 0 100%);\n  animation: eva-insert-clamp-right 1.9s cubic-bezier(0.5, 0, 0.2, 1) both;\n}\n.eva-insert__lock {\n  position: absolute;\n  left: 50%;\n  top: 52%;\n  padding: 5px 16px;\n  border: 2px solid var(--eva-green);\n  background: rgba(5, 4, 10, 0.6);\n  color: var(--eva-green);\n  font-size: 16px;\n  letter-spacing: 0.3em;\n  opacity: 0;\n  transform: translate(-50%, -50%) rotate(-7deg);\n  animation: eva-lock-stamp 1.9s ease-out both;\n}\n\n/* --- scene 4: neural link --- */\n.eva-neural {\n  width: min(420px, 38vw);\n}\n.eva-neural svg {\n  display: block;\n  width: 100%;\n  height: auto;\n  overflow: visible;\n}\n.eva-neural__wave {\n  fill: none;\n  stroke: var(--eva-green);\n  stroke-width: 1.6;\n  stroke-linejoin: round;\n  stroke-dasharray: 2000;\n  stroke-dashoffset: 2000;\n  filter: drop-shadow(0 0 6px rgba(157, 255, 74, 0.5));\n  animation: eva-draw 1.5s cubic-bezier(0.3, 0.7, 0.3, 1) 0.2s forwards;\n}\n.eva-neural__wave--b {\n  stroke: rgba(185, 139, 224, 0.75);\n  stroke-width: 1.1;\n  animation-delay: 0.45s;\n}\n\n/* --- scene 5: sync ratio --- */\n.eva-sync {\n  position: relative;\n  width: min(300px, 28vw);\n  aspect-ratio: 1;\n  display: grid;\n  place-items: center;\n}\n.eva-sync__ring {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: conic-gradient(\n    from -90deg,\n    var(--eva-green) calc(var(--eva-sync) * 1%),\n    rgba(157, 255, 74, 0.1) 0\n  );\n  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));\n  mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));\n}\n.eva-sync__pulse {\n  position: absolute;\n  inset: 12%;\n  border: 1px solid rgba(157, 255, 74, 0.35);\n  border-radius: 50%;\n  animation: eva-pulse-ring 1.8s ease-out infinite;\n}\n.eva-sync__pulse--2 {\n  animation-delay: 0.6s;\n}\n.eva-sync__value {\n  position: relative;\n  font-family: var(--eva-font-display);\n  font-size: clamp(34px, 4.6vw, 62px);\n  font-weight: 800;\n  color: #f3edff;\n  text-shadow: 0 0 26px rgba(157, 255, 74, 0.45);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.02em;\n}\n.eva-sync__label {\n  position: absolute;\n  bottom: 18%;\n  font-size: 9px;\n  letter-spacing: 0.4em;\n  color: rgba(157, 255, 74, 0.75);\n}\n\n/* --- scene 6: activation --- */\n.eva-activate {\n  position: relative;\n  width: min(300px, 28vw);\n  aspect-ratio: 1;\n  display: grid;\n  place-items: center;\n}\n.eva-activate__head {\n  position: relative;\n  display: inline-flex;\n  width: 74%;\n  height: 74%;\n  filter: drop-shadow(0 0 26px rgba(122, 47, 176, 0.6)) drop-shadow(0 0 8px rgba(157, 255, 74, 0.4));\n  animation: eva-power-up 1.6s ease-out both;\n}\n.eva-activate__head svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-activate__glow {\n  position: absolute;\n  inset: -10%;\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(157, 255, 74, 0.26), transparent 62%);\n  animation: eva-glow-pulse 1.6s ease-out both;\n}\n.eva-activate__eye {\n  position: absolute;\n  top: 39%;\n  left: 38%;\n  width: 9%;\n  height: 5%;\n  background: var(--eva-green);\n  box-shadow: 0 0 18px 4px rgba(157, 255, 74, 0.8);\n  opacity: 0;\n  animation: eva-eye-on 1.8s ease-out both;\n}\n.eva-activate__flap {\n  position: absolute;\n  top: 8%;\n  width: 34%;\n  height: 80%;\n  background: linear-gradient(90deg, rgba(75, 29, 122, 0.9), rgba(26, 11, 46, 0.96));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-activate__flap--l {\n  left: -24%;\n  clip-path: polygon(0 0, 100% 8%, 100% 92%, 0 100%);\n  animation: eva-flap-left 1.8s cubic-bezier(0.3, 0.7, 0.3, 1) both;\n}\n.eva-activate__flap--r {\n  right: -24%;\n  clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 92%);\n  animation: eva-flap-right 1.8s cubic-bezier(0.3, 0.7, 0.3, 1) both;\n}\n\n/* --- scene 7: launch --- */\n.eva-launchscene {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n.eva-launchscene__rails {\n  position: absolute;\n  inset: -40vh -30vw;\n  background: repeating-linear-gradient(\n    90deg,\n    transparent 0 11.8%,\n    rgba(185, 139, 224, 0.1) 11.8% 12%,\n    transparent 12% 23.8%,\n    rgba(157, 255, 74, 0.06) 23.8% 24%\n  );\n  animation: eva-cage-rise 1.7s linear both;\n}\n.eva-launchscene__clamps {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: min(620px, 68vw);\n  height: 34px;\n  border-top: 2px solid rgba(157, 255, 74, 0.4);\n  border-bottom: 2px solid rgba(157, 255, 74, 0.4);\n  transform: translate(-50%, -50%);\n  animation: eva-clamps-release 1.6s cubic-bezier(0.4, 0, 0.2, 1) both;\n}\n.eva-launchscene__title {\n  position: relative;\n  font-family: var(--eva-font-display);\n  font-size: clamp(80px, 13vw, 168px);\n  font-weight: 900;\n  line-height: 1;\n  letter-spacing: 0.24em;\n  color: var(--eva-green);\n  text-shadow: 0 0 44px rgba(157, 255, 74, 0.5), 0 0 8px rgba(255, 255, 255, 0.5);\n  animation: eva-launch-title 1.8s cubic-bezier(0.2, 0.9, 0.2, 1) both;\n}\n.eva-launchscene__sub {\n  font-size: 10px;\n  letter-spacing: 0.7em;\n  color: #f3edff;\n  opacity: 0.85;\n  animation: eva-fade-in 0.5s ease-out 0.4s both;\n}\n.eva-launchscene__bar {\n  width: min(560px, 64vw);\n  height: 5px;\n  background: linear-gradient(90deg, var(--eva-lilac), var(--eva-green));\n  box-shadow: 0 0 18px rgba(157, 255, 74, 0.5);\n  transform-origin: left center;\n  animation: eva-bar-grow 1.5s cubic-bezier(0.2, 0.9, 0.2, 1) 0.15s both;\n}\n\n/* --- launch keyframes --- */\n@keyframes eva-launch-wipe {\n  from {\n    opacity: 1;\n    clip-path: inset(0 0 0 0);\n  }\n  to {\n    opacity: 0;\n    clip-path: inset(0 0 100% 0);\n  }\n}\n@keyframes eva-scene-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes eva-bootline {\n  from {\n    opacity: 0;\n    transform: translateX(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes eva-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes eva-lcl-fill {\n  from {\n    height: 0;\n  }\n  to {\n    height: 82%;\n  }\n}\n@keyframes eva-surface {\n  to {\n    background-position: 28px 0;\n  }\n}\n@keyframes eva-bubble {\n  0% {\n    transform: translateY(0);\n    opacity: 0;\n  }\n  12% {\n    opacity: 0.9;\n  }\n  100% {\n    transform: translateY(-150px);\n    opacity: 0;\n  }\n}\n@keyframes eva-clamp-left {\n  from {\n    transform: translateX(-40px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-clamp-right {\n  from {\n    transform: translateX(40px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-plug-drop {\n  0% {\n    transform: translate(-50%, -120%);\n  }\n  62% {\n    transform: translate(-50%, 74%);\n  }\n  76% {\n    transform: translate(-50%, 64%);\n  }\n  100% {\n    transform: translate(-50%, 68%);\n  }\n}\n@keyframes eva-insert-clamp-left {\n  0%,\n  42% {\n    transform: translateX(-110%);\n  }\n  64%,\n  100% {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-insert-clamp-right {\n  0%,\n  42% {\n    transform: translateX(110%);\n  }\n  64%,\n  100% {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-lock-stamp {\n  0%,\n  58% {\n    opacity: 0;\n    transform: translate(-50%, -50%) rotate(-7deg) scale(1.9);\n  }\n  68% {\n    opacity: 1;\n    transform: translate(-50%, -50%) rotate(-7deg) scale(1);\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes eva-draw {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes eva-pulse-ring {\n  0% {\n    transform: scale(0.82);\n    opacity: 0.7;\n  }\n  100% {\n    transform: scale(1.06);\n    opacity: 0;\n  }\n}\n@keyframes eva-power-up {\n  0% {\n    opacity: 0.3;\n    transform: scale(0.94);\n  }\n  45% {\n    opacity: 1;\n    transform: scale(1.02);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes eva-glow-pulse {\n  0% {\n    opacity: 0.2;\n    transform: scale(0.88);\n  }\n  50% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0.35;\n    transform: scale(1.02);\n  }\n}\n@keyframes eva-eye-on {\n  0%,\n  42% {\n    opacity: 0;\n  }\n  52% {\n    opacity: 1;\n  }\n  58% {\n    opacity: 0.25;\n  }\n  66%,\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes eva-flap-left {\n  0%,\n  30% {\n    transform: translateX(0);\n    opacity: 0.9;\n  }\n  70%,\n  100% {\n    transform: translateX(-14%);\n    opacity: 0.55;\n  }\n}\n@keyframes eva-flap-right {\n  0%,\n  30% {\n    transform: translateX(0);\n    opacity: 0.9;\n  }\n  70%,\n  100% {\n    transform: translateX(14%);\n    opacity: 0.55;\n  }\n}\n@keyframes eva-cage-rise {\n  from {\n    transform: translateY(40px);\n    opacity: 0.3;\n  }\n  to {\n    transform: translateY(-60px);\n    opacity: 1;\n  }\n}\n@keyframes eva-clamps-release {\n  0% {\n    opacity: 0.9;\n    transform: translate(-50%, -50%) scaleX(1);\n  }\n  60%,\n  100% {\n    opacity: 0;\n    transform: translate(-50%, -50%) scaleX(1.6);\n  }\n}\n@keyframes eva-launch-title {\n  0% {\n    opacity: 0;\n    transform: scale(1.5);\n    letter-spacing: 0.6em;\n  }\n  25% {\n    opacity: 1;\n    transform: scale(1);\n    letter-spacing: 0.24em;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes eva-bar-grow {\n  from {\n    transform: scaleX(0);\n  }\n  to {\n    transform: scaleX(1);\n  }\n}\n\n/* =====================================================================\n   BRAND MARKS\n   ===================================================================== */\n\n.eva-brandmark {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.eva-brandmark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  max-width: 30px;\n  max-height: 30px;\n  filter: drop-shadow(0 0 5px rgba(157, 255, 74, 0.4));\n}\n\n.eva-brandname {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  min-width: 0;\n}\n.eva-brandname__unit {\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  font-weight: 800;\n  line-height: 1.05;\n  letter-spacing: 0.16em;\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n}\n.eva-brandname__sub {\n  font-family: var(--eva-font-hud);\n  font-size: 8px;\n  line-height: 1;\n  letter-spacing: 0.2em;\n  color: var(--eva-green);\n  opacity: 0.7;\n  white-space: nowrap;\n}\n\n.eva-hero {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 9px;\n  padding: 0 2px 0 0;\n  vertical-align: middle;\n}\n.eva-hero__glow {\n  position: absolute;\n  left: -10px;\n  top: 50%;\n  width: 74px;\n  height: 74px;\n  margin-top: -37px;\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(122, 47, 176, 0.5), transparent 70%);\n  filter: blur(5px);\n  pointer-events: none;\n}\n.eva-hero__mark {\n  position: relative;\n  display: inline-flex;\n  width: 30px;\n  height: 30px;\n  filter: drop-shadow(0 0 10px rgba(122, 47, 176, 0.6))\n    drop-shadow(0 0 3px rgba(157, 255, 74, 0.35));\n  animation: eva-float 7s ease-in-out infinite;\n}\n.eva-hero__mark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-hero__text {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  padding-left: 8px;\n  border-left: 1px solid rgba(157, 255, 74, 0.4);\n  text-align: left;\n}\n.eva-hero__tag {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.3em;\n  line-height: 1.1;\n  color: var(--eva-green);\n  text-shadow: 0 0 10px rgba(157, 255, 74, 0.35);\n}\n.eva-hero__jp {\n  font-family: var(--eva-font-display);\n  font-size: 9px;\n  letter-spacing: 0.34em;\n  line-height: 1;\n  color: var(--eva-lilac);\n  opacity: 0.75;\n  white-space: nowrap;\n}\n\n/* =====================================================================\n   SIDEBAR FOOTER CONTROLS\n   ===================================================================== */\n\n.eva-foot {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n.eva-foot__btn {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  height: 28px;\n  min-width: 28px;\n  margin: 0;\n  padding: 0 5px;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary);\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: color 0.15s, background 0.15s, border-color 0.15s, box-shadow 0.15s;\n}\n.eva-foot__btn:hover {\n  color: var(--eva-green);\n  border-color: rgba(157, 255, 74, 0.35);\n  background: rgba(157, 255, 74, 0.07);\n  box-shadow: 0 0 12px rgba(157, 255, 74, 0.12) inset;\n}\n.eva-foot__btn:active {\n  transform: translateY(0.5px);\n}\n.eva-foot__btn:focus-visible {\n  outline: 1px solid var(--eva-green);\n  outline-offset: 1px;\n}\n.eva-foot__btn[data-fx=\"off\"] {\n  opacity: 0.55;\n}\n.eva-foot__btn[data-berserk=\"1\"] {\n  color: var(--eva-alarm);\n  border-color: var(--eva-alarm);\n  background: var(--eva-alarm-soft);\n  box-shadow: 0 0 12px var(--eva-alarm-soft);\n}\n.eva-foot__btn[data-berserk=\"1\"]:hover {\n  background: var(--eva-alarm);\n  color: var(--eva-on-accent);\n  box-shadow: 0 0 18px var(--eva-alarm-soft);\n}\n.eva-foot__glyph {\n  font-size: 10px;\n  line-height: 1;\n}\n.eva-foot__label {\n  font-size: 8px;\n}\n\n/* =====================================================================\n   COMPOSER SYNC RAIL\n   ===================================================================== */\n\n.eva-rail {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  height: 19px;\n  margin: 0 0 4px;\n  padding: 0 18px;\n  pointer-events: none;\n  font-family: var(--eva-font-hud);\n  font-size: 8px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: rgba(157, 255, 74, 0.5);\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);\n  mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);\n}\n.eva-rail__cap {\n  opacity: 0.8;\n}\n.eva-rail__value {\n  color: var(--eva-green);\n  font-variant-numeric: tabular-nums;\n  text-shadow: 0 0 8px rgba(157, 255, 74, 0.3);\n}\n.eva-rail__ticks {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 2px;\n  height: 12px;\n}\n.eva-rail__ticks i {\n  display: block;\n  width: 1px;\n  height: calc(var(--eva-tick) * 1px);\n  background: linear-gradient(180deg, rgba(157, 255, 74, 0.85), rgba(157, 255, 74, 0.12));\n  animation: eva-tick 2.6s ease-in-out infinite;\n  animation-delay: calc(var(--eva-tick) * -70ms);\n}\n.eva-rail__sep {\n  width: 1px;\n  height: 9px;\n  background: rgba(185, 139, 224, 0.45);\n}\n.eva-rail__stat {\n  display: inline-flex;\n  gap: 4px;\n  opacity: 0.72;\n}\n.eva-rail__stat b {\n  font-weight: 600;\n  color: rgba(157, 255, 74, 0.8);\n}\n.eva-rail__hazard {\n  flex: 1;\n  min-width: 18px;\n  height: 4px;\n  background: repeating-linear-gradient(\n    45deg,\n    rgba(255, 212, 0, 0.5) 0 4px,\n    rgba(5, 4, 9, 0.85) 4px 8px\n  );\n  opacity: 0.4;\n}\n.eva-rail__wave {\n  display: inline-flex;\n  width: 60px;\n  height: 12px;\n  opacity: 0.55;\n  color: rgba(157, 255, 74, 0.85);\n}\n.eva-rail__wave svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.eva-rail__clock {\n  color: rgba(233, 226, 245, 0.6);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.14em;\n}\n.eva-rail__date {\n  opacity: 0.45;\n}\n.eva-rail__cycle {\n  opacity: 0.4;\n  letter-spacing: 0.16em;\n}\n@media (max-width: 900px) {\n  .eva-rail__stat--power,\n  .eva-rail__stat--at,\n  .eva-rail__date,\n  .eva-rail__cycle {\n    display: none;\n  }\n}\n\n\n/* =====================================================================\n   SCHEME VARIABLES — one accent per light/dark, used by the EVA chrome and\n   the host-surface rules below. Dark = launch console, light = white hangar.\n   ===================================================================== */\n\nbody {\n  --eva-status-h: 26px;\n  --eva-alarm: #c21212;\n  --eva-alarm-soft: rgba(194, 18, 18, 0.1);\n  --eva-alert-bg: rgba(255, 250, 248, 0.92);\n  --eva-pilot: #2f5fe0;\n  --eva-pilot-soft: rgba(47, 95, 224, 0.1);\n  --eva-pilot-glow: rgba(47, 95, 224, 0.2);\n  --eva-accent: #6a1fa8;\n  --eva-accent-strong: #4b1d7a;\n  --eva-accent-soft: rgba(106, 31, 168, 0.1);\n  --eva-glow: rgba(106, 31, 168, 0.18);\n  --eva-on-accent: #ffffff;\n  --eva-line: #d6c9ea;\n  --eva-hud-ink: rgba(75, 29, 122, 0.6);\n  --eva-hud-ink-dim: rgba(75, 29, 122, 0.34);\n  --eva-on-hazard: #1a0b2e;\n\n  --dsw-alias-bg-base: #f1ecf8;\n  --dsw-alias-bg-layer-1: #f8f4fd;\n  --dsw-alias-bg-layer-2: #fcfaff;\n  --dsw-alias-bg-layer-3: #ffffff;\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: #f3edfa;\n  --dsw-alias-bg-multi-select: #f3edfa;\n  --dsw-alias-border-l1: #d6c9ea;\n  --dsw-alias-border-l2: #b79bdc;\n  --dsw-alias-border-l3: #9e7fcb;\n  --dsw-alias-border-l4: #7e5fae;\n  --dsw-alias-brand-primary: #6a1fa8;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #6a1fa8;\n  --dsw-alias-brand-text: #1b0f2a;\n  --dsw-alias-label-primary: #1b0f2a;\n  --dsw-alias-label-secondary: #54446c;\n  --dsw-alias-label-tertiary: #7a6a92;\n  --dsw-alias-label-caption: #8b7ba0;\n  --dsw-alias-label-dimmed: #cfc4de;\n  --dsw-alias-state-business-primary: #6a1fa8;\n  --dsw-alias-state-business-tertiary: #e4d9f4;\n  --dsw-alias-state-success-primary: #1d7a4f;\n  --dsw-alias-state-warn-primary: #9a5300;\n  --dsw-alias-state-error-primary: #c41616;\n  --dsw-alias-state-idle-primary: #8b7ba3;\n  --dsw-alias-button-primary-fill: #6a1fa8;\n  --dsw-alias-button-primary-hover: #4b1d7a;\n  --dsw-alias-button-primary-dimmed: #e3d8f2;\n  --dsw-alias-button-contrast-fill: #7a2fb0;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #f1eaf9;\n  --dsw-alias-button-ghost-active-fill: #e9e0f6;\n  --dsw-alias-button-ghost-active-hover: #ded2f0;\n  --dsw-alias-button-ghost-active-border: #b79bdc;\n  --dsw-alias-interactive-bg-hover: rgba(106, 31, 168, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(106, 31, 168, 0.13);\n  --dsw-alias-interactive-bg-hover-solid: #ece4f7;\n  --dsw-alias-interactive-bg-hover-accent: rgba(106, 31, 168, 0.16);\n  --dsw-specific-sidebar-fill: #e9e1f5;\n  --dsw-specific-sidebar-nav-item-hover: #e4daf2;\n  --dsw-specific-sidebar-nav-item-active: #dacbee;\n  --dsw-specific-sidebar-nav-item-active-accent: #d2bfea;\n  --dsw-specific-bubble: #e7ddf6;\n  --dsw-specific-bubble-highlight: #d9c9ee;\n  --dsw-specific-input-major: #ffffff;\n  --dsw-specific-selector: #f0eaf8;\n  --dsw-specific-tip: #f0eaf8;\n  --dsw-specific-menu: rgba(255, 255, 255, 0.95);\n  --dsw-menu-surface-fill: rgba(250, 247, 254, 0.95);\n  --dsw-alias-menu-group-header-fill: rgba(243, 237, 250, 0.96);\n  --dsw-alias-menu-icon: #4b1d7a;\n  --dsw-alias-scrollbar-bg-l1: #d6c9ea;\n  --dsw-alias-scrollbar-bg-l2: #c3b0df;\n  --dsw-alias-scrollbar-hover-l1: #7a2fb0;\n  --dsw-alias-scrollbar-hover-l2: #6a1fa8;\n  --dsw-alias-settings-card-fill: #ffffff;\n  --dsw-alias-settings-card-stroke: rgba(106, 31, 168, 0.16);\n  --dsw-alias-markdown-code-block: #f5f0fb;\n  --dsw-alias-markdown-code-block-banner: #ede6f7;\n  --dsw-alias-markdown-inline-code: rgba(106, 31, 168, 0.08);\n  --dsw-alias-markdown-tag: rgba(106, 31, 168, 0.1);\n  --dsw-alias-markdown-placeholder: #ede6f7;\n  --dsw-alias-toast-bg: #2b1848;\n  --dsw-alias-toast-label: #f6f1fd;\n  --dsw-alias-tooltip-bg: #2b1848;\n  --dsw-alias-switch-thumb: #6a1fa8;\n  --dsw-alias-turn-trigger-bg: #f3edfa;\n  --dsw-alias-turn-trigger-bg-hover: rgba(106, 31, 168, 0.08);\n  --dsw-alias-bg-mask-1: rgba(75, 29, 122, 0.28);\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-radius-panel: 4px;\n  --dsw-font-family-brand: var(--eva-font-display);\n}\n\nbody[data-ds-dark-theme] {\n  --eva-alarm: #ff3b3b;\n  --eva-alarm-soft: rgba(255, 59, 59, 0.12);\n  --eva-alert-bg: rgba(40, 5, 8, 0.82);\n  --eva-pilot: #6fa8ff;\n  --eva-pilot-soft: rgba(111, 168, 255, 0.12);\n  --eva-pilot-glow: rgba(111, 168, 255, 0.22);\n  --eva-accent: #9dff4a;\n  --eva-accent-strong: #c6ff00;\n  --eva-accent-soft: rgba(157, 255, 74, 0.08);\n  --eva-glow: rgba(157, 255, 74, 0.18);\n  --eva-on-accent: #08130a;\n  --eva-line: #33224d;\n  --eva-hud-ink: rgba(157, 255, 74, 0.5);\n  --eva-hud-ink-dim: rgba(157, 255, 74, 0.26);\n  --eva-on-hazard: #1a0b2e;\n\n  --dsw-alias-bg-base: #07050e;\n  --dsw-alias-bg-layer-1: #0e0919;\n  --dsw-alias-bg-layer-2: #140c24;\n  --dsw-alias-bg-layer-3: #1b1030;\n  --dsw-alias-bg-overlay: #241540;\n  --dsw-alias-bg-module-platform: #1b1030;\n  --dsw-alias-bg-multi-select: #140c24;\n  --dsw-alias-border-l1: #33224d;\n  --dsw-alias-border-l2: #4a2f70;\n  --dsw-alias-border-l3: #5e3d8a;\n  --dsw-alias-border-l4: #7a54a8;\n  --dsw-alias-brand-primary: #9dff4a;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #9dff4a;\n  --dsw-alias-brand-text: #efe7fb;\n  --dsw-alias-label-primary: #efe7fb;\n  --dsw-alias-label-secondary: #b4a6cc;\n  --dsw-alias-label-tertiary: #8d7ba8;\n  --dsw-alias-label-caption: #7a6a94;\n  --dsw-alias-label-dimmed: #3a2c50;\n  --dsw-alias-state-business-primary: #9dff4a;\n  --dsw-alias-state-business-tertiary: #22301a;\n  --dsw-alias-state-success-primary: #4dffb0;\n  --dsw-alias-state-warn-primary: #ffb347;\n  --dsw-alias-state-error-primary: #ff3b3b;\n  --dsw-alias-state-idle-primary: #7e6c9e;\n  --dsw-alias-button-primary-fill: #9dff4a;\n  --dsw-alias-button-primary-hover: #c6ff00;\n  --dsw-alias-button-primary-dimmed: #2a3a16;\n  --dsw-alias-button-contrast-fill: #c6ff00;\n  --dsw-alias-button-elevated-fill: #241540;\n  --dsw-alias-button-floating-fill: #1b1030;\n  --dsw-alias-button-floating-hover: #241540;\n  --dsw-alias-button-ghost-active-fill: #241540;\n  --dsw-alias-button-ghost-active-hover: #2a1a45;\n  --dsw-alias-button-ghost-active-border: #633d93;\n  --dsw-alias-interactive-bg-hover: rgba(157, 255, 74, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(157, 255, 74, 0.12);\n  --dsw-alias-interactive-bg-hover-solid: #1b1030;\n  --dsw-alias-interactive-bg-hover-accent: rgba(157, 255, 74, 0.18);\n  --dsw-specific-sidebar-fill: #0a0614;\n  --dsw-specific-sidebar-nav-item-hover: #150d26;\n  --dsw-specific-sidebar-nav-item-active: #22123c;\n  --dsw-specific-sidebar-nav-item-active-accent: #2a1748;\n  --dsw-specific-bubble: #1f1236;\n  --dsw-specific-bubble-highlight: #2b1848;\n  --dsw-specific-input-major: #120b20;\n  --dsw-specific-selector: #1b1030;\n  --dsw-specific-tip: #1b1030;\n  --dsw-specific-menu: rgba(26, 15, 46, 0.94);\n  --dsw-menu-surface-fill: rgba(26, 15, 46, 0.94);\n  --dsw-alias-menu-group-header-fill: rgba(33, 20, 57, 0.95);\n  --dsw-alias-menu-icon: #d8c8f2;\n  --dsw-alias-scrollbar-bg-l1: #2a1748;\n  --dsw-alias-scrollbar-bg-l2: #3a2258;\n  --dsw-alias-scrollbar-hover-l1: #7a2fb0;\n  --dsw-alias-scrollbar-hover-l2: #9dff4a;\n  --dsw-alias-settings-card-fill: #120b20;\n  --dsw-alias-settings-card-stroke: rgba(157, 255, 74, 0.14);\n  --dsw-alias-markdown-code-block: #0a0614;\n  --dsw-alias-markdown-code-block-banner: #140c24;\n  --dsw-alias-markdown-inline-code: rgba(157, 255, 74, 0.1);\n  --dsw-alias-markdown-tag: rgba(157, 255, 74, 0.14);\n  --dsw-alias-markdown-placeholder: #1b1030;\n  --dsw-alias-toast-bg: #241540;\n  --dsw-alias-toast-label: #f6f1fd;\n  --dsw-alias-tooltip-bg: #241540;\n  --dsw-alias-switch-thumb: #9dff4a;\n  --dsw-alias-turn-trigger-bg: #140c24;\n  --dsw-alias-turn-trigger-bg-hover: rgba(157, 255, 74, 0.1);\n  --dsw-alias-bg-mask-1: rgba(5, 4, 9, 0.62);\n}\n\n/* =====================================================================\n   HOST SURFACES — app shell, sidebar, hero, composer, dialogs.\n   Anchors: [data-slot] / [data-*] / aria (stable) then CSS-module local\n   names as [class*=\"_local\"] (skin degrades gracefully if the host renames\n   a local; colours above still carry the theme).\n   ===================================================================== */\n\n/* --- shell columns: let the body ambience show through --- */\n[class*=\"_frame\"],\n[class*=\"_centerCol\"] {\n  background-color: transparent;\n}\n\n[class*=\"_sidebarCol\"] {\n  position: relative;\n  background-color: var(--dsw-specific-sidebar-fill);\n  background-image:\n    radial-gradient(120% 52% at 0% 0%, rgba(122, 47, 176, 0.18), transparent 62%),\n    linear-gradient(180deg, rgba(157, 255, 74, 0.03), transparent 30%);\n  border-right: 1px solid var(--dsw-alias-border-l1);\n}\n[class*=\"_sidebarCol\"]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 3px;\n  background: repeating-linear-gradient(\n    135deg,\n    var(--eva-hazard) 0 3px,\n    transparent 3px 6px\n  );\n  opacity: 0.26;\n  pointer-events: none;\n  z-index: 3;\n}\n[class*=\"_rightbarCol\"] {\n  border-left: 1px solid var(--dsw-alias-border-l1);\n}\n\n/* --- sidebar brand row --- */\n[class*=\"_logoRow\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n  padding-bottom: 8px;\n}\n[class*=\"_brand\"] {\n  border-radius: 0;\n  gap: 9px;\n}\n[class*=\"_brand\"]:hover {\n  background: transparent;\n}\n[class*=\"_brandMark\"] svg,\n[data-slot=\"sidebar.brand.mark\"] svg {\n  filter: drop-shadow(0 0 6px var(--eva-glow));\n}\n[class*=\"_brandName\"] {\n  font-family: var(--eva-font-hud);\n}\n\n/* --- new session: the launch button --- */\nbutton[class*=\"_newSession\"] {\n  position: relative;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 0;\n  background: linear-gradient(100deg, var(--dsw-alias-bg-layer-3), var(--dsw-alias-bg-layer-1));\n  color: var(--dsw-alias-label-primary);\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  clip-path: polygon(\n    0 0,\n    calc(100% - 12px) 0,\n    100% 12px,\n    100% 100%,\n    12px 100%,\n    0 calc(100% - 12px)\n  );\n  box-shadow: none;\n  transition: color 0.16s, box-shadow 0.16s, border-color 0.16s;\n}\nbutton[class*=\"_newSession\"]::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--eva-accent);\n  opacity: 0.9;\n}\nbutton[class*=\"_newSession\"]:hover {\n  color: var(--eva-accent);\n  border-color: var(--eva-accent);\n  box-shadow: inset 0 0 0 1px var(--eva-accent), 0 0 18px var(--eva-glow);\n}\nbutton[class*=\"_newSession\"]:focus-visible {\n  outline: 1px solid var(--eva-accent);\n  outline-offset: 2px;\n}\n[class*=\"_newSessionShortcut\"] {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.08em;\n  opacity: 0.6;\n}\n\n/* --- global panel rows --- */\n[class*=\"_panelList\"] {\n  gap: 2px;\n}\nbutton[class*=\"_panelRow\"] {\n  border-radius: 0;\n  border-left: 2px solid transparent;\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  letter-spacing: 0.1em;\n}\nbutton[class*=\"_panelRow\"]:hover {\n  border-left-color: var(--eva-accent);\n  background: linear-gradient(90deg, var(--eva-accent-soft), transparent 88%);\n  color: var(--eva-accent);\n}\n[class*=\"_panelTitle\"] {\n  font-weight: 500;\n}\n[class*=\"_panelGlyph\"] {\n  color: inherit;\n  opacity: 0.85;\n}\n\n/* --- workspace tree --- */\n[class*=\"_sectionHeader\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n  padding-bottom: 4px;\n}\n[class*=\"_sectionLabel\"] {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_iconButton\"] {\n  border-radius: 2px;\n}\n[class*=\"_iconButton\"]:hover {\n  color: var(--eva-accent);\n}\n\ndiv[class*=\"_sessionRow\"],\ndiv[class*=\"_projectRow\"] {\n  position: relative;\n  border-radius: 0;\n  border-left: 2px solid transparent;\n  transition: background 0.14s, border-color 0.14s, color 0.14s;\n}\ndiv[class*=\"_sessionRow\"]:hover,\ndiv[class*=\"_projectRow\"]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\ndiv[class*=\"_sessionRow\"][class*=\"_selected\"] {\n  background: linear-gradient(\n    90deg,\n    var(--dsw-specific-sidebar-nav-item-active),\n    transparent 94%\n  );\n  border-left-color: var(--eva-accent);\n}\ndiv[class*=\"_sessionRow\"][class*=\"_selected\"]::after {\n  content: \"\";\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  width: 5px;\n  height: 5px;\n  margin-top: -2.5px;\n  background: var(--eva-accent);\n  transform: rotate(45deg);\n  box-shadow: 0 0 8px var(--eva-glow);\n  pointer-events: none;\n}\ndiv[class*=\"_sessionRow\"] [class*=\"_title\"],\ndiv[class*=\"_projectRow\"] [class*=\"_title\"] {\n  font-size: 13px;\n}\ndiv[class*=\"_sessionRow\"] [class*=\"_time\"] {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.04em;\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_folder\"] {\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_folderActive\"] {\n  color: var(--eva-accent);\n}\n\n/* --- sidebar foot --- */\n[class*=\"_footArea\"] {\n  border-top: 1px solid var(--dsw-alias-border-l1);\n  padding-top: 6px;\n}\n[class*=\"_footerActions\"] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n[class*=\"_avatar\"] {\n  border-radius: 2px !important;\n  box-shadow: 0 0 0 1px var(--eva-accent), 0 0 10px var(--eva-glow);\n}\n\n/* --- conversation header --- */\nheader[class*=\"_header\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n  background: linear-gradient(180deg, var(--dsw-alias-bg-base), transparent);\n}\n[class*=\"_titleRow\"] {\n  font-family: var(--eva-font-hud);\n  letter-spacing: 0.04em;\n}\n[data-slot=\"conversation.header\"] button {\n  border-radius: 2px;\n}\n\n/* --- hero / empty state --- */\n[class*=\"_headline\"] {\n  position: relative;\n  padding-bottom: 12px;\n}\n[class*=\"_headline\"]::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 1px;\n  background: linear-gradient(\n    90deg,\n    transparent,\n    var(--eva-accent) 18%,\n    var(--eva-accent) 82%,\n    transparent\n  );\n  opacity: 0.4;\n}\n[class*=\"_titleGroup\"] > span:first-child {\n  font-family: var(--eva-font-display);\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  color: var(--dsw-alias-label-primary);\n  text-shadow: 0 0 28px var(--eva-glow);\n}\n[class*=\"_previewBadge\"] {\n  border: 0;\n  border-radius: 0;\n  padding: 1px 8px 0;\n  background: repeating-linear-gradient(\n    45deg,\n    var(--eva-hazard) 0 5px,\n    var(--eva-on-hazard) 5px 10px\n  );\n  color: var(--eva-on-hazard);\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n}\n[class*=\"_heroWorkspaceRow\"] button {\n  border: 1px solid transparent;\n  border-radius: 0;\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.1em;\n  color: var(--dsw-alias-label-secondary);\n  transition: color 0.14s, border-color 0.14s, background 0.14s, box-shadow 0.14s;\n}\n[class*=\"_heroWorkspaceRow\"] button:hover {\n  border-color: var(--eva-accent);\n  background: var(--eva-accent-soft);\n  color: var(--eva-accent);\n  box-shadow: 0 0 14px var(--eva-glow);\n}\n\n/* --- composer --- */\n[data-composer-card] {\n  position: relative;\n  border-radius: 0;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-input-major);\n  box-shadow:\n    0 0 0 1px rgba(5, 4, 9, 0.2),\n    0 18px 44px rgba(0, 0, 0, 0.28),\n    0 0 26px var(--eva-glow);\n  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);\n  transition: border-color 0.18s, box-shadow 0.18s;\n}\n[data-composer-card]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 16px;\n  height: 1px;\n  background: linear-gradient(90deg, transparent, var(--eva-accent), transparent 90%);\n  opacity: 0.55;\n  pointer-events: none;\n}\n[data-composer-card]:focus-within {\n  border-color: var(--eva-accent);\n  box-shadow:\n    0 0 0 1px var(--eva-accent),\n    0 18px 44px rgba(0, 0, 0, 0.32),\n    0 0 30px var(--eva-glow);\n}\n[data-lexical-editor] {\n  caret-color: var(--eva-accent);\n}\n[data-composer-placeholder] {\n  font-family: var(--eva-font-hud);\n  font-size: 13px;\n  letter-spacing: 0.04em;\n  opacity: 0.72;\n}\n[data-composer-card] > [class*=\"_row\"] {\n  border-top: 1px solid var(--dsw-alias-border-l1);\n}\n[data-composer-card] button {\n  border-radius: 2px;\n}\n[data-slot=\"conversation.composer.bar\"] button[class*=\"_primary\"] {\n  background: var(--eva-accent) !important;\n  color: var(--eva-on-accent) !important;\n  border-radius: 0;\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 7px 100%, 0 calc(100% - 7px));\n  box-shadow: 0 0 18px var(--eva-glow);\n}\n[data-slot=\"conversation.composer.bar\"] button[class*=\"_primary\"]:hover {\n  background: var(--eva-accent-strong) !important;\n}\n[data-slot=\"conversation.composer.bar\"] button[class*=\"_primary\"]:focus-visible {\n  outline: 1px solid var(--eva-accent);\n  outline-offset: 2px;\n}\n[data-slot=\"conversation.input.model\"] button,\n[data-slot=\"conversation.input.permission\"] button {\n  border-radius: 2px;\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.06em;\n}\n[data-slot=\"conversation.input.model\"] button:hover,\n[data-slot=\"conversation.input.permission\"] button:hover {\n  color: var(--eva-accent);\n}\n[class*=\"_triggerEffort\"] {\n  border-radius: 1px;\n  background: var(--eva-hazard);\n  color: var(--eva-on-hazard);\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n[class*=\"_add\"] {\n  border-radius: 2px;\n}\n\n/* --- dialogs / portalled surfaces --- */\n[role=\"dialog\"] {\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 2px;\n}\n[class*=\"_mask\"] {\n  backdrop-filter: blur(2px);\n}\n\n/* =====================================================================\n   KEYFRAMES\n   ===================================================================== */\n\n@keyframes eva-pulse {\n  0%,\n  100% {\n    opacity: 0.35;\n    transform: scale(0.85);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes eva-syncbar {\n  from {\n    height: 25%;\n  }\n  to {\n    height: 100%;\n  }\n}\n@keyframes eva-tick {\n  0%,\n  100% {\n    transform: scaleY(0.55);\n    opacity: 0.45;\n  }\n  50% {\n    transform: scaleY(1);\n    opacity: 1;\n  }\n}\n@keyframes eva-scan {\n  from {\n    top: -140px;\n  }\n  to {\n    top: 100%;\n  }\n}\n@keyframes eva-float {\n  0%,\n  100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-3px);\n  }\n}\n@keyframes eva-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes eva-launch-out {\n  from {\n    opacity: 1;\n    clip-path: inset(0 0 0 0);\n  }\n  to {\n    opacity: 0;\n    clip-path: inset(0 0 100% 0);\n  }\n}\n@keyframes eva-slat-in {\n  from {\n    transform: scaleY(0);\n    opacity: 0.15;\n  }\n  to {\n    transform: scaleY(1);\n    opacity: 1;\n  }\n}\n@keyframes eva-slat-out {\n  from {\n    transform: scaleY(1);\n  }\n  to {\n    transform: scaleY(0);\n  }\n}\n@keyframes eva-row-in {\n  from {\n    opacity: 0;\n    transform: translateX(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes eva-go {\n  0% {\n    opacity: 0;\n    transform: translateX(-50%) scale(1.5);\n    letter-spacing: 0.9em;\n  }\n  30% {\n    opacity: 1;\n    transform: translateX(-50%) scale(1);\n  }\n  72% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(-50%) scale(1.02);\n  }\n}\n@keyframes eva-hazard-slide {\n  to {\n    background-position: 64px 0;\n  }\n}\n@keyframes eva-flash {\n  0% {\n    opacity: 0;\n  }\n  18% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-hud *,\n  .eva-rail *,\n  .eva-hero__mark,\n  .eva-launch * {\n    animation: none !important;\n    transition: none !important;\n  }\n  .eva-hud__scan,\n  .eva-hud__scanlines {\n    display: none;\n  }\n}\n\n/* --- conversation transcript: bubbles, tabs, meta --- */\ndiv[class*=\"_bubble\"] {\n  border-radius: 0;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-left: 2px solid var(--eva-accent);\n  background: linear-gradient(\n    135deg,\n    var(--dsw-specific-bubble),\n    var(--dsw-alias-bg-layer-2)\n  );\n  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.16), 0 0 18px var(--eva-glow);\n}\nbutton[class*=\"_tab\"] {\n  border-radius: 0;\n  border-bottom: 2px solid transparent;\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  transition: color 0.14s, border-color 0.14s;\n}\nbutton[class*=\"_tab\"]:hover {\n  color: var(--eva-accent);\n}\nbutton[class*=\"_tab\"][class*=\"_tabActive\"] {\n  color: var(--eva-accent);\n  border-bottom-color: var(--eva-accent);\n  font-weight: 600;\n}\n[class*=\"_tablist\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n}\n[class*=\"_markdown\"] {\n  letter-spacing: 0.006em;\n}\n[class*=\"_chevron\"],\n[class*=\"_arrow\"] {\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_rowActions\"] button {\n  border-radius: 2px;\n}\n[class*=\"_rowActions\"] button:hover {\n  color: var(--eva-accent);\n}\n\n/* --- menus / popovers (rendered beside <body>, outside #root) --- */\n[role=\"menu\"],\n[role=\"listbox\"] {\n  border: 1px solid var(--dsw-alias-border-l1);\n  border-radius: 2px;\n  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(5, 4, 9, 0.16);\n}\n[role=\"menuitem\"] {\n  border-radius: 2px;\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  letter-spacing: 0.04em;\n}\n[role=\"menuitem\"]:hover,\n[role=\"menuitem\"][data-highlighted=\"true\"] {\n  color: var(--eva-accent);\n}\n\n/* =====================================================================\n   MECHA CHROME — cockpit frame, status rail, unit tag, panel hardware.\n   These additions make the post-launch UI read as a machine interior:\n   a persistent bottom telemetry rail, edge frame rails with engraved\n   labels, a unit tag in the header, and bolts / hazard details on the\n   input hatch and message plates.\n   ===================================================================== */\n\n/* --- edge frame rails --- */\n.eva-frame-rail {\n  position: absolute;\n  top: 56px;\n  bottom: calc(var(--eva-status-h) + 46px);\n  width: 10px;\n  pointer-events: none;\n  opacity: 0.55;\n  background: repeating-linear-gradient(\n    180deg,\n    var(--eva-hud-ink) 0 1px,\n    transparent 1px 12px\n  );\n}\n.eva-frame-rail--l {\n  left: 4px;\n}\n.eva-frame-rail--r {\n  right: 4px;\n}\n.eva-frame-rail__text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  writing-mode: vertical-rl;\n  font-style: normal;\n  font-size: 7px;\n  letter-spacing: 0.5em;\n  white-space: nowrap;\n  color: var(--eva-hud-ink);\n}\n.eva-hud[data-fx=\"lite\"] .eva-frame-rail {\n  opacity: 0.28;\n}\n.eva-hud[data-fx=\"off\"] .eva-frame-rail {\n  display: none;\n}\n\n/* --- bottom status rail (shell.bottom, 26px, reduces column height) --- */\n.eva-status {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  height: var(--eva-status-h);\n  box-sizing: border-box;\n  padding: 0 14px;\n  overflow: hidden;\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: var(--dsw-alias-label-tertiary);\n  background: var(--dsw-alias-bg-layer-1);\n  border-top: 1px solid var(--dsw-alias-border-l1);\n  pointer-events: none;\n}\n.eva-status::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: repeating-linear-gradient(45deg, var(--eva-hazard) 0 6px, transparent 6px 12px);\n  opacity: 0.32;\n}\n.eva-status__unit {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--dsw-alias-label-primary);\n  font-weight: 700;\n  letter-spacing: 0.24em;\n}\n.eva-status__hex {\n  width: 10px;\n  height: 10px;\n  background: var(--eva-accent);\n  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);\n  box-shadow: 0 0 9px var(--eva-glow);\n}\n.eva-status__rule {\n  width: 1px;\n  height: 12px;\n  background: var(--dsw-alias-border-l2);\n}\n.eva-status__tag {\n  color: var(--eva-accent);\n  opacity: 0.85;\n}\n.eva-status__sep {\n  width: 14px;\n  height: 1px;\n  background: var(--dsw-alias-border-l2);\n}\n.eva-status__metric {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.eva-status__metric b {\n  font-weight: 600;\n  color: var(--dsw-alias-label-secondary);\n  font-variant-numeric: tabular-nums;\n}\n.eva-status__bars {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 1px;\n  height: 9px;\n}\n.eva-status__bars i {\n  display: block;\n  width: 2px;\n  height: 35%;\n  background: var(--eva-accent);\n  animation: eva-syncbar 1.6s ease-in-out infinite alternate;\n}\n.eva-status__bars i:nth-child(2n) {\n  animation-delay: 0.2s;\n}\n.eva-status__bars i:nth-child(3n) {\n  animation-delay: 0.42s;\n}\n.eva-status__bars i:nth-child(5n) {\n  animation-delay: 0.66s;\n}\n.eva-status__grow {\n  flex: 1;\n}\n.eva-status__wave {\n  display: inline-flex;\n  width: 54px;\n  height: 12px;\n  color: var(--eva-accent);\n  opacity: 0.7;\n}\n.eva-status__wave svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-status__clock {\n  color: var(--dsw-alias-label-secondary);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.12em;\n}\n.eva-status__cycle {\n  color: var(--eva-accent);\n  opacity: 0.7;\n}\n.eva-status__hazard {\n  width: 30px;\n  height: 6px;\n  background: repeating-linear-gradient(45deg, var(--eva-hazard) 0 5px, transparent 5px 10px);\n  opacity: 0.45;\n}\n@media (max-width: 1180px) {\n  .eva-status__metric--wide {\n    display: none;\n  }\n}\n@media (max-width: 900px) {\n  .eva-status__tag,\n  .eva-status__wave,\n  .eva-status__hazard {\n    display: none;\n  }\n}\n\n/* --- header unit tag (conversation.header.leading) --- */\n.eva-headtag {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-right: 10px;\n  padding: 3px 8px;\n  border: 1px solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.18em;\n  color: var(--dsw-alias-label-secondary);\n  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));\n}\n.eva-headtag__led {\n  width: 5px;\n  height: 5px;\n  background: var(--eva-accent);\n  box-shadow: 0 0 6px var(--eva-glow);\n  animation: eva-pulse 2.4s ease-in-out infinite;\n}\n.eva-headtag__unit {\n  color: var(--dsw-alias-label-primary);\n  font-weight: 700;\n}\n.eva-headtag__sub {\n  opacity: 0.55;\n}\n\n/* --- panel hardware: input hatch bolts --- */\n[data-composer-card]::after {\n  content: \"\";\n  position: absolute;\n  inset: 6px;\n  pointer-events: none;\n  opacity: 0.7;\n  background-image:\n    radial-gradient(circle at 1.5px 1.5px, var(--dsw-alias-border-l3) 1.2px, transparent 1.9px),\n    radial-gradient(circle at calc(100% - 1.5px) 1.5px, var(--dsw-alias-border-l3) 1.2px, transparent 1.9px),\n    radial-gradient(circle at 1.5px calc(100% - 1.5px), var(--dsw-alias-border-l3) 1.2px, transparent 1.9px),\n    radial-gradient(\n      circle at calc(100% - 1.5px) calc(100% - 1.5px),\n      var(--dsw-alias-border-l3) 1.2px,\n      transparent 1.9px\n    );\n}\n\n/* --- message plates: angular cut + inner hairline --- */\ndiv[class*=\"_bubble\"] {\n  clip-path: polygon(\n    0 0,\n    calc(100% - 10px) 0,\n    100% 10px,\n    100% 100%,\n    10px 100%,\n    0 calc(100% - 10px)\n  );\n  box-shadow: inset 0 0 0 1px var(--eva-glow), 0 10px 26px rgba(0, 0, 0, 0.14);\n}\n\n/* --- workspace region: armour seam under the section header --- */\n[class*=\"_regionArea\"] {\n  position: relative;\n}\n[class*=\"_regionArea\"]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 12px;\n  right: 12px;\n  height: 1px;\n  pointer-events: none;\n  background: linear-gradient(90deg, transparent, var(--dsw-alias-border-l2), transparent);\n  opacity: 0.55;\n}\n\n/* =====================================================================\n   LIGHT (\"white hangar\") OVERRIDES — the launch console is dark; the light\n   scheme keeps the same geometry with violet ink and no CRT grain.\n   ===================================================================== */\n\nbody:not([data-ds-dark-theme]) .eva-hud {\n  color: var(--eva-accent);\n}\nbody:not([data-ds-dark-theme]) .eva-corner {\n  border-color: var(--eva-accent);\n  opacity: 0.3;\n}\nbody:not([data-ds-dark-theme]) .eva-hud__hr {\n  background: linear-gradient(90deg, transparent, rgba(106, 31, 168, 0.4), transparent);\n  opacity: 0.4;\n}\nbody:not([data-ds-dark-theme]) .eva-hud__scanlines,\nbody:not([data-ds-dark-theme]) .eva-hud__scan,\nbody:not([data-ds-dark-theme]) .eva-hud__vignette {\n  display: none;\n}\nbody:not([data-ds-dark-theme]) .eva-rail {\n  color: rgba(75, 29, 122, 0.6);\n}\nbody:not([data-ds-dark-theme]) .eva-rail__value,\nbody:not([data-ds-dark-theme]) .eva-rail__stat b,\nbody:not([data-ds-dark-theme]) .eva-rail__clock,\nbody:not([data-ds-dark-theme]) .eva-rail__wave,\nbody:not([data-ds-dark-theme]) .eva-rail__cycle {\n  color: #4b1d7a;\n  text-shadow: none;\n}\nbody:not([data-ds-dark-theme]) .eva-rail__ticks i {\n  background: linear-gradient(180deg, rgba(75, 29, 122, 0.8), rgba(75, 29, 122, 0.12));\n}\nbody:not([data-ds-dark-theme]) .eva-rail__sep {\n  background: rgba(75, 29, 122, 0.35);\n}\nbody:not([data-ds-dark-theme]) .eva-foot__btn:hover {\n  color: #4b1d7a;\n  border-color: rgba(75, 29, 122, 0.4);\n  background: rgba(75, 29, 122, 0.06);\n  box-shadow: 0 0 12px rgba(75, 29, 122, 0.1) inset;\n}\nbody:not([data-ds-dark-theme]) .eva-foot__btn:focus-visible {\n  outline-color: #4b1d7a;\n}\nbody:not([data-ds-dark-theme]) .eva-brandname__sub {\n  color: #4b1d7a;\n  opacity: 0.75;\n}\nbody:not([data-ds-dark-theme]) .eva-brandmark svg {\n  filter: drop-shadow(0 0 5px rgba(106, 31, 168, 0.3));\n}\nbody:not([data-ds-dark-theme]) .eva-hero__glow {\n  background: radial-gradient(circle, rgba(106, 31, 168, 0.26), transparent 70%);\n}\nbody:not([data-ds-dark-theme]) .eva-hero__tag {\n  color: #4b1d7a;\n  text-shadow: none;\n}\nbody:not([data-ds-dark-theme]) .eva-hero__text {\n  border-left-color: rgba(75, 29, 122, 0.35);\n}\nbody:not([data-ds-dark-theme]) .eva-hero__jp {\n  color: #7a2fb0;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-hud__scan {\n    display: none;\n  }\n}\n\n\n/* =====================================================================\n   BERSERK MODE — Unit-01 loses control.\n   body[data-eva-berserk] is toggled by the status-rail switch.  It remaps\n   the whole palette (green → alarm red, calm violet → blood violet), turns\n   the frame into a warning display and overrides the few literal-green\n   details that the calm skin hard-codes.\n   ===================================================================== */\n\nbody[data-eva-berserk] {\n  --eva-alarm: #c21212;\n  --eva-alarm-soft: rgba(194, 18, 18, 0.1);\n  --eva-alert-bg: rgba(255, 250, 248, 0.92);\n  --eva-green: #c21212;\n  --eva-green-signal: #d94a1e;\n  --eva-lilac: #b06a5f;\n  --eva-acid: #e0a800;\n  --eva-amber: #c26a00;\n  --eva-bone: #2a1110;\n  --eva-hud-ink: rgba(140, 15, 15, 0.6);\n  --eva-hud-ink-dim: rgba(140, 15, 15, 0.3);\n  --eva-accent: #c21212;\n  --eva-accent-strong: #8f0b0b;\n  --eva-accent-soft: rgba(194, 18, 18, 0.08);\n  --eva-glow: rgba(194, 18, 18, 0.18);\n  --eva-on-accent: #ffffff;\n  --eva-line: #e3c9c4;\n\n  --dsw-alias-bg-base: #f7efea;\n  --dsw-alias-bg-layer-1: #fbf5f1;\n  --dsw-alias-bg-layer-2: #fffdfc;\n  --dsw-alias-bg-layer-3: #ffffff;\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: #f6ebe5;\n  --dsw-alias-bg-multi-select: #f6ebe5;\n  --dsw-alias-border-l1: #e3c9c4;\n  --dsw-alias-border-l2: #cda6a0;\n  --dsw-alias-border-l3: #b8847c;\n  --dsw-alias-border-l4: #9c625a;\n  --dsw-alias-brand-primary: #c21212;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #c21212;\n  --dsw-alias-brand-text: #2a1110;\n  --dsw-alias-label-primary: #2a1110;\n  --dsw-alias-label-secondary: #6a4642;\n  --dsw-alias-label-tertiary: #8f6a64;\n  --dsw-alias-label-caption: #a07a72;\n  --dsw-alias-label-dimmed: #d8c0ba;\n  --dsw-alias-state-business-primary: #c21212;\n  --dsw-alias-state-business-tertiary: #f5ded9;\n  --dsw-alias-state-success-primary: #8a5300;\n  --dsw-alias-state-warn-primary: #8a5300;\n  --dsw-alias-state-error-primary: #a10d0d;\n  --dsw-alias-state-idle-primary: #a0807a;\n  --dsw-alias-button-primary-fill: #c21212;\n  --dsw-alias-button-primary-hover: #8f0b0b;\n  --dsw-alias-button-primary-dimmed: #f0dad5;\n  --dsw-alias-button-contrast-fill: #d94a1e;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #f7ebe6;\n  --dsw-alias-button-ghost-active-fill: #f2e2dc;\n  --dsw-alias-button-ghost-active-hover: #ebd5ce;\n  --dsw-alias-button-ghost-active-border: #cda6a0;\n  --dsw-alias-interactive-bg-hover: rgba(194, 18, 18, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(194, 18, 18, 0.12);\n  --dsw-alias-interactive-bg-hover-solid: #f4e6e1;\n  --dsw-alias-interactive-bg-hover-accent: rgba(194, 18, 18, 0.14);\n  --dsw-specific-sidebar-fill: #f1e4de;\n  --dsw-specific-sidebar-nav-item-hover: #ecdcd5;\n  --dsw-specific-sidebar-nav-item-active: #e6d1c9;\n  --dsw-specific-sidebar-nav-item-active-accent: #dfc6bd;\n  --dsw-specific-bubble: #f0e0da;\n  --dsw-specific-bubble-highlight: #e6cdc5;\n  --dsw-specific-input-major: #fffdfc;\n  --dsw-specific-selector: #f6ece7;\n  --dsw-specific-tip: #f6ece7;\n  --dsw-specific-menu: rgba(255, 253, 252, 0.95);\n  --dsw-menu-surface-fill: rgba(255, 251, 249, 0.95);\n  --dsw-alias-menu-group-header-fill: rgba(248, 238, 233, 0.96);\n  --dsw-alias-menu-icon: #6a1a16;\n  --dsw-alias-scrollbar-bg-l1: #e0cbc5;\n  --dsw-alias-scrollbar-bg-l2: #cfb3ac;\n  --dsw-alias-scrollbar-hover-l1: #c21212;\n  --dsw-alias-scrollbar-hover-l2: #8f0b0b;\n  --dsw-alias-settings-card-fill: #fffdfc;\n  --dsw-alias-settings-card-stroke: rgba(194, 18, 18, 0.18);\n  --dsw-alias-markdown-code-block: #faf2ee;\n  --dsw-alias-markdown-code-block-banner: #f2e4de;\n  --dsw-alias-markdown-inline-code: rgba(194, 18, 18, 0.08);\n  --dsw-alias-markdown-tag: rgba(194, 18, 18, 0.1);\n  --dsw-alias-markdown-placeholder: #f2e4de;\n  --dsw-alias-toast-bg: #35131a;\n  --dsw-alias-toast-label: #fbeeea;\n  --dsw-alias-tooltip-bg: #35131a;\n  --dsw-alias-switch-thumb: #c21212;\n  --dsw-alias-turn-trigger-bg: #f2e4de;\n  --dsw-alias-turn-trigger-bg-hover: rgba(194, 18, 18, 0.08);\n  --dsw-alias-bg-mask-1: rgba(70, 20, 16, 0.34);\n}\n\nbody[data-ds-dark-theme][data-eva-berserk] {\n  --eva-alarm: #ff3b3b;\n  --eva-alarm-soft: rgba(255, 59, 59, 0.12);\n  --eva-alert-bg: rgba(40, 5, 8, 0.82);\n  --eva-green: #ff3b3b;\n  --eva-green-signal: #ff7a1a;\n  --eva-lilac: #ff9d94;\n  --eva-acid: #ffd400;\n  --eva-amber: #ffb347;\n  --eva-bone: #f6e4e4;\n  --eva-hud-ink: rgba(255, 59, 59, 0.55);\n  --eva-hud-ink-dim: rgba(255, 59, 59, 0.28);\n  --eva-accent: #ff3b3b;\n  --eva-accent-strong: #ff7a1a;\n  --eva-accent-soft: rgba(255, 59, 59, 0.1);\n  --eva-glow: rgba(255, 59, 59, 0.22);\n  --eva-on-accent: #160406;\n  --eva-line: #4a1a22;\n\n  --dsw-alias-bg-base: #0a0406;\n  --dsw-alias-bg-layer-1: #140608;\n  --dsw-alias-bg-layer-2: #1c0a0c;\n  --dsw-alias-bg-layer-3: #260d10;\n  --dsw-alias-bg-overlay: #2a0f13;\n  --dsw-alias-bg-module-platform: #1c0a0c;\n  --dsw-alias-bg-multi-select: #140608;\n  --dsw-alias-border-l1: #4a1a22;\n  --dsw-alias-border-l2: #6b2530;\n  --dsw-alias-border-l3: #8e2f3c;\n  --dsw-alias-border-l4: #b03a48;\n  --dsw-alias-brand-primary: #ff3b3b;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff3b3b;\n  --dsw-alias-brand-text: #f6e4e4;\n  --dsw-alias-label-primary: #f7e9e9;\n  --dsw-alias-label-secondary: #c9a6a6;\n  --dsw-alias-label-tertiary: #9a7777;\n  --dsw-alias-label-caption: #8a6868;\n  --dsw-alias-label-dimmed: #3a2626;\n  --dsw-alias-state-business-primary: #ff3b3b;\n  --dsw-alias-state-business-tertiary: #3a1418;\n  --dsw-alias-state-success-primary: #ffb347;\n  --dsw-alias-state-warn-primary: #ffd400;\n  --dsw-alias-state-error-primary: #ff2d2d;\n  --dsw-alias-state-idle-primary: #8a6a6a;\n  --dsw-alias-button-primary-fill: #ff3b3b;\n  --dsw-alias-button-primary-hover: #ff7a1a;\n  --dsw-alias-button-primary-dimmed: #3a1518;\n  --dsw-alias-button-contrast-fill: #ffd400;\n  --dsw-alias-button-elevated-fill: #2a0f13;\n  --dsw-alias-button-floating-fill: #1c0a0c;\n  --dsw-alias-button-floating-hover: #2a0f13;\n  --dsw-alias-button-ghost-active-fill: #2a0f13;\n  --dsw-alias-button-ghost-active-hover: #351216;\n  --dsw-alias-button-ghost-active-border: #8e2f3c;\n  --dsw-alias-interactive-bg-hover: rgba(255, 59, 59, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(255, 59, 59, 0.14);\n  --dsw-alias-interactive-bg-hover-solid: #260d10;\n  --dsw-alias-interactive-bg-hover-accent: rgba(255, 59, 59, 0.2);\n  --dsw-specific-sidebar-fill: #120508;\n  --dsw-specific-sidebar-nav-item-hover: #200a0e;\n  --dsw-specific-sidebar-nav-item-active: #2c0f14;\n  --dsw-specific-sidebar-nav-item-active-accent: #37131a;\n  --dsw-specific-bubble: #241013;\n  --dsw-specific-bubble-highlight: #301418;\n  --dsw-specific-input-major: #180a0c;\n  --dsw-specific-selector: #200c0e;\n  --dsw-specific-tip: #200c0e;\n  --dsw-specific-menu: rgba(38, 13, 16, 0.94);\n  --dsw-menu-surface-fill: rgba(38, 13, 16, 0.94);\n  --dsw-alias-menu-group-header-fill: rgba(48, 18, 22, 0.95);\n  --dsw-alias-menu-icon: #f0c9c9;\n  --dsw-alias-scrollbar-bg-l1: #3a1418;\n  --dsw-alias-scrollbar-bg-l2: #4a1a22;\n  --dsw-alias-scrollbar-hover-l1: #ff3b3b;\n  --dsw-alias-scrollbar-hover-l2: #ff7a1a;\n  --dsw-alias-settings-card-fill: #180a0c;\n  --dsw-alias-settings-card-stroke: rgba(255, 59, 59, 0.18);\n  --dsw-alias-markdown-code-block: #120608;\n  --dsw-alias-markdown-code-block-banner: #1c0a0c;\n  --dsw-alias-markdown-inline-code: rgba(255, 59, 59, 0.12);\n  --dsw-alias-markdown-tag: rgba(255, 59, 59, 0.16);\n  --dsw-alias-markdown-placeholder: #260d10;\n  --dsw-alias-toast-bg: #2a0f13;\n  --dsw-alias-toast-label: #f6e4e4;\n  --dsw-alias-tooltip-bg: #2a0f13;\n  --dsw-alias-switch-thumb: #ff3b3b;\n  --dsw-alias-turn-trigger-bg: #1c0a0c;\n  --dsw-alias-turn-trigger-bg-hover: rgba(255, 59, 59, 0.1);\n  --dsw-alias-bg-mask-1: rgba(8, 2, 3, 0.66);\n}\n\nbody[data-ds-dark-theme][data-eva-berserk] {\n  background-image:\n    radial-gradient(900px 560px at 18% -10%, rgba(255, 45, 45, 0.16), transparent 62%),\n    radial-gradient(760px 520px at 88% 112%, rgba(255, 122, 26, 0.08), transparent 64%),\n    repeating-linear-gradient(0deg, rgba(255, 220, 220, 0.028) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(255, 220, 220, 0.028) 0 1px, transparent 1px 46px);\n}\nbody:not([data-ds-dark-theme])[data-eva-berserk] {\n  background-image:\n    radial-gradient(900px 560px at 18% -10%, rgba(194, 18, 18, 0.1), transparent 62%),\n    repeating-linear-gradient(0deg, rgba(194, 18, 18, 0.04) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(194, 18, 18, 0.04) 0 1px, transparent 1px 46px);\n}\n\n/* --- berserk HUD details --- */\nbody[data-eva-berserk] .eva-corner {\n  border-color: var(--eva-alarm);\n  opacity: 0.6;\n}\nbody[data-eva-berserk] .eva-hud__hr {\n  background: linear-gradient(90deg, transparent, var(--eva-alarm), transparent);\n  opacity: 0.55;\n}\nbody[data-eva-berserk] .eva-hud__scan {\n  background: linear-gradient(\n    180deg,\n    transparent,\n    var(--eva-alarm-soft) 48%,\n    rgba(255, 212, 0, 0.05) 52%,\n    var(--eva-alarm-soft) 56%,\n    transparent\n  );\n  animation-duration: 5.5s;\n}\nbody[data-eva-berserk] .eva-hud__scanlines {\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(60, 0, 0, 0.4) 0 1px,\n    transparent 1px 3px\n  );\n  opacity: 0.25;\n}\nbody[data-eva-berserk] .eva-hud__vignette {\n  background: radial-gradient(125% 105% at 50% 45%, transparent 50%, rgba(40, 0, 4, 0.6) 100%);\n  opacity: 0.8;\n}\nbody[data-eva-berserk] .eva-brandmark svg {\n  filter: drop-shadow(0 0 7px var(--eva-alarm));\n}\nbody[data-eva-berserk] .eva-hero__mark {\n  filter: drop-shadow(0 0 16px rgba(255, 45, 45, 0.55)) drop-shadow(0 0 4px rgba(255, 212, 0, 0.3));\n  animation-duration: 2.4s;\n}\nbody[data-eva-berserk] .eva-rail__ticks i {\n  background: linear-gradient(180deg, var(--eva-alarm), rgba(255, 59, 59, 0.12));\n}\nbody[data-eva-berserk] .eva-rail__hazard {\n  background: repeating-linear-gradient(\n    45deg,\n    rgba(255, 212, 0, 0.75) 0 4px,\n    rgba(90, 0, 0, 0.9) 4px 8px\n  );\n  opacity: 0.6;\n}\nbody[data-eva-berserk] .eva-foot__btn:hover {\n  color: var(--eva-alarm);\n  border-color: var(--eva-alarm);\n  background: var(--eva-alarm-soft);\n  box-shadow: 0 0 12px var(--eva-alarm-soft) inset;\n}\n\n/* --- HUD warning edge + alert chip --- */\n.eva-hud__edge {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: 0;\n  box-shadow:\n    inset 0 0 0 1px var(--eva-alarm-soft),\n    inset 0 0 140px var(--eva-alarm-soft);\n}\nbody[data-eva-berserk] .eva-hud__edge {\n  opacity: 1;\n  animation: eva-berserk-breathe 2.6s ease-in-out infinite;\n}\n.eva-hud__alert {\n  position: absolute;\n  top: 48px;\n  right: 16px;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 4px 9px;\n  border: 1px solid var(--eva-alarm);\n  background: var(--eva-alert-bg);\n  color: var(--eva-alarm);\n  font-size: 9px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  box-shadow: 0 0 16px var(--eva-alarm-soft);\n  animation: eva-berserk-flicker 2.8s steps(1) infinite;\n}\n.eva-hud__alert b {\n  font-weight: 700;\n  letter-spacing: 0.26em;\n}\n.eva-hud__alert i {\n  font-style: normal;\n  color: var(--eva-hazard);\n}\n\n/* --- status rail switch --- */\n.eva-status__main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n}\n.eva-status__berserk {\n  pointer-events: auto;\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: none;\n  height: 18px;\n  margin-left: 4px;\n  padding: 0 9px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-secondary);\n  font-family: var(--eva-font-hud);\n  font-size: 8.5px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));\n  transition: color 0.15s, background 0.15s, border-color 0.15s, box-shadow 0.15s;\n}\n.eva-status__berserk:hover {\n  color: var(--eva-alarm);\n  border-color: var(--eva-alarm);\n  box-shadow: 0 0 12px var(--eva-alarm-soft);\n}\n.eva-status__berserk[data-on=\"1\"] {\n  border-color: var(--eva-alarm);\n  background: var(--eva-alarm);\n  color: var(--eva-on-accent);\n  box-shadow: 0 0 16px var(--eva-alarm-soft);\n  animation: eva-berserk-pulse 1.2s ease-in-out infinite;\n}\n.eva-status__berserkLed {\n  display: inline-block;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: currentColor;\n  box-shadow: 0 0 7px currentColor;\n}\n.eva-status__berserkLabel {\n  line-height: 1;\n}\n.eva-status[data-berserk=\"1\"] .eva-status__tag,\n.eva-status[data-berserk=\"1\"] .eva-status__metric b,\n.eva-status[data-berserk=\"1\"] .eva-status__clock,\n.eva-status[data-berserk=\"1\"] .eva-status__cycle {\n  color: var(--eva-alarm);\n}\n.eva-status[data-berserk=\"1\"] .eva-status__hex {\n  background: var(--eva-alarm);\n  box-shadow: 0 0 10px var(--eva-alarm);\n}\n.eva-status[data-berserk=\"1\"] .eva-status__bars i,\n.eva-status[data-berserk=\"1\"] .eva-status__wave {\n  background: var(--eva-alarm);\n  color: var(--eva-alarm);\n  animation-duration: 0.5s;\n}\n.eva-status[data-berserk=\"1\"] .eva-status__hazard {\n  background: repeating-linear-gradient(\n    45deg,\n    var(--eva-alarm) 0 5px,\n    transparent 5px 10px\n  );\n  opacity: 0.85;\n}\n\n/* --- header tag in berserk --- */\n.eva-headtag[data-berserk=\"1\"] {\n  border-color: var(--eva-alarm);\n  color: var(--eva-alarm);\n}\n.eva-headtag[data-berserk=\"1\"] .eva-headtag__led {\n  background: var(--eva-alarm);\n  box-shadow: 0 0 8px var(--eva-alarm);\n  animation-duration: 0.8s;\n}\n.eva-headtag[data-berserk=\"1\"] .eva-headtag__unit {\n  color: var(--eva-alarm);\n}\n\n/* --- berserk activation burst --- */\n.eva-burst {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  overflow: hidden;\n  pointer-events: none;\n  animation: eva-fade-in 0.18s ease-out both;\n}\n.eva-burst[data-leave=\"1\"] {\n  animation: eva-burst-out 0.55s ease-in both;\n}\n.eva-burst__flash {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    62% 62% at 50% 50%,\n    rgba(255, 59, 59, 0.85),\n    rgba(120, 0, 8, 0.35) 45%,\n    transparent 72%\n  );\n  animation: eva-burst-flash 1.9s ease-out both;\n}\n.eva-burst__grid {\n  position: absolute;\n  inset: 0;\n  background-image:\n    repeating-linear-gradient(0deg, rgba(255, 59, 59, 0.12) 0 1px, transparent 1px 26px),\n    repeating-linear-gradient(90deg, rgba(255, 59, 59, 0.1) 0 1px, transparent 1px 26px);\n  opacity: 0.55;\n  animation: eva-burst-grid 0.9s linear infinite;\n}\n.eva-burst__ring {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 68vmin;\n  height: 68vmin;\n  margin: -34vmin 0 0 -34vmin;\n  border: 2px solid rgba(255, 59, 59, 0.55);\n  border-radius: 50%;\n  animation: eva-burst-ring 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;\n}\n.eva-burst__ring--2 {\n  border-width: 1px;\n  animation-delay: 0.25s;\n}\n.eva-burst__core {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  text-align: center;\n  animation: eva-burst-shake 0.42s steps(2) 4;\n}\n.eva-burst__tag {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.5em;\n  color: var(--eva-hazard);\n}\n.eva-burst__title {\n  font-family: var(--eva-font-display);\n  font-size: clamp(64px, 11vw, 150px);\n  font-weight: 900;\n  letter-spacing: 0.22em;\n  color: var(--eva-alarm);\n  text-shadow: 0 0 46px rgba(255, 59, 59, 0.65), 0 0 10px rgba(255, 255, 255, 0.4);\n}\n.eva-burst__sub {\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.5em;\n  color: #f6e4e4;\n  opacity: 0.9;\n}\n.eva-burst__bars {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 3px;\n  height: 26px;\n  margin-top: 6px;\n}\n.eva-burst__bars i {\n  display: block;\n  width: 3px;\n  height: calc(20% + var(--i) * 8%);\n  background: var(--eva-alarm);\n  animation: eva-burst-bar 0.5s ease-in-out infinite alternate;\n  animation-delay: calc(var(--i) * -0.08s);\n}\n.eva-burst__hazard {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 14px;\n  background: repeating-linear-gradient(45deg, #ffd400 0 10px, #12030a 10px 20px);\n  opacity: 0.9;\n  animation: eva-hazard-slide 4s linear infinite;\n}\n\n@keyframes eva-berserk-breathe {\n  0%,\n  100% {\n    opacity: 0.35;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes eva-berserk-flicker {\n  0%,\n  88%,\n  100% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 0.35;\n  }\n  92% {\n    opacity: 1;\n  }\n  94% {\n    opacity: 0.2;\n  }\n  96% {\n    opacity: 1;\n  }\n}\n@keyframes eva-berserk-pulse {\n  0%,\n  100% {\n    box-shadow: 0 0 10px var(--eva-alarm-soft);\n  }\n  50% {\n    box-shadow: 0 0 22px var(--eva-alarm-soft);\n  }\n}\n@keyframes eva-burst-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes eva-burst-flash {\n  0% {\n    opacity: 0;\n  }\n  12% {\n    opacity: 1;\n  }\n  38% {\n    opacity: 0.55;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes eva-burst-grid {\n  to {\n    background-position: 0 26px, 26px 0;\n  }\n}\n@keyframes eva-burst-ring {\n  0% {\n    opacity: 0.9;\n    transform: scale(0.25);\n  }\n  70% {\n    opacity: 0.9;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.25);\n  }\n}\n@keyframes eva-burst-shake {\n  0% {\n    transform: translate(0, 0);\n  }\n  25% {\n    transform: translate(-3px, 2px);\n  }\n  50% {\n    transform: translate(3px, -2px);\n  }\n  75% {\n    transform: translate(-2px, -3px);\n  }\n  100% {\n    transform: translate(0, 0);\n  }\n}\n@keyframes eva-burst-bar {\n  from {\n    height: 18%;\n  }\n  to {\n    height: 100%;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-burst *,\n  body[data-eva-berserk] .eva-hud__edge,\n  body[data-eva-berserk] .eva-hud__alert,\n  body[data-eva-berserk] .eva-hero__mark,\n  .eva-status__berserk[data-on=\"1\"] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n\n/* berserk-only extra texture */\nbody[data-eva-berserk] [class*=\"_sidebarCol\"]::after {\n  background: repeating-linear-gradient(\n    135deg,\n    var(--eva-alarm) 0 3px,\n    rgba(255, 212, 0, 0.6) 3px 6px\n  );\n  opacity: 0.5;\n}\nbody[data-eva-berserk] .eva-status::before {\n  background: repeating-linear-gradient(\n    45deg,\n    var(--eva-alarm) 0 6px,\n    transparent 6px 12px\n  );\n  opacity: 0.5;\n}\nbody[data-eva-berserk] .eva-hud__edge {\n  box-shadow:\n    inset 0 0 0 1px rgba(255, 59, 59, 0.35),\n    inset 0 0 160px rgba(255, 59, 59, 0.28);\n}\nbody[data-eva-berserk] .eva-hud__edge::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(\n    115deg,\n    transparent 46%,\n    rgba(255, 59, 59, 0.07) 50%,\n    transparent 54%\n  );\n  background-size: 280% 280%;\n  animation: eva-berserk-sweep 3.6s linear infinite;\n}\n@keyframes eva-berserk-sweep {\n  from {\n    background-position: 0% 0%;\n  }\n  to {\n    background-position: 100% 100%;\n  }\n}\n\n/* =====================================================================\n   BERSERK OVERLOAD — stronger frame shake + glitch tear stripes.\n   The frame transform makes the whole console shudder; horizontal RGB/tear\n   bands sweep across it at irregular intervals.  Both are disabled for\n   prefers-reduced-motion.\n   ===================================================================== */\n\nbody[data-eva-berserk][data-eva-berserk-shake] #root > div[data-slot=\"root\"] > [class*=\"_frame\"] {\n  transform-origin: 50% 50%;\n  animation: eva-berserk-shake 1.15s steps(1, end) 4 forwards;\n  will-change: transform;\n}\n\n@keyframes eva-berserk-shake {\n  0% {\n    transform: scale(1.02) translate3d(0, 0, 0);\n  }\n  8% {\n    transform: scale(1.02) translate3d(-4px, 2px, 0);\n  }\n  16% {\n    transform: scale(1.02) translate3d(4px, -2px, 0);\n  }\n  24% {\n    transform: scale(1.02) translate3d(-3px, 3px, 0);\n  }\n  32% {\n    transform: scale(1.02) translate3d(3px, -3px, 0);\n  }\n  40% {\n    transform: scale(1.02) translate3d(-4px, -2px, 0);\n  }\n  52% {\n    transform: scale(1.02) translate3d(2px, 2px, 0);\n  }\n  64% {\n    transform: scale(1.02) translate3d(-11px, 5px, 0);\n  }\n  68% {\n    transform: scale(1.02) translate3d(11px, -6px, 0);\n  }\n  72% {\n    transform: scale(1.02) translate3d(-8px, 6px, 0);\n  }\n  76% {\n    transform: scale(1.02) translate3d(8px, -4px, 0);\n  }\n  80% {\n    transform: scale(1.02) translate3d(-4px, 2px, 0);\n  }\n  88% {\n    transform: scale(1.02) translate3d(2px, -2px, 0);\n  }\n  100% {\n    transform: scale(1.02) translate3d(0, 0, 0);\n  }\n}\n\n.eva-hud__glitch {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n.eva-hud__glitch i {\n  position: absolute;\n  left: -12%;\n  right: -12%;\n  height: 2px;\n  opacity: 0;\n  mix-blend-mode: screen;\n  background: linear-gradient(\n    90deg,\n    transparent 0%,\n    rgba(255, 45, 45, 0.92) 26%,\n    rgba(255, 212, 0, 0.55) 50%,\n    rgba(255, 59, 59, 0.8) 66%,\n    transparent 88%\n  );\n  box-shadow: 0 0 10px rgba(255, 59, 59, 0.55);\n  animation: eva-glitch-band 3.2s steps(1, end) infinite;\n}\n.eva-hud__glitch i:nth-child(1) {\n  top: 13%;\n  height: 3px;\n  animation-delay: 0.15s;\n  animation-duration: 2.9s;\n}\n.eva-hud__glitch i:nth-child(2) {\n  top: 28%;\n  height: 14px;\n  opacity: 0.5;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(255, 45, 45, 0.55) 0 2px,\n    transparent 2px 6px\n  );\n  animation-delay: 0.9s;\n  animation-duration: 3.7s;\n}\n.eva-hud__glitch i:nth-child(3) {\n  top: 44%;\n  height: 10px;\n  background: repeating-linear-gradient(\n    90deg,\n    rgba(255, 45, 45, 0.75) 0 18px,\n    rgba(255, 212, 0, 0.35) 18px 26px,\n    transparent 26px 44px\n  );\n  animation-delay: 1.7s;\n  animation-duration: 4.3s;\n}\n.eva-hud__glitch i:nth-child(4) {\n  top: 61%;\n  height: 2px;\n  animation-delay: 2.4s;\n  animation-duration: 3.1s;\n}\n.eva-hud__glitch i:nth-child(5) {\n  top: 76%;\n  height: 5px;\n  animation-delay: 0.55s;\n  animation-duration: 3.9s;\n}\n.eva-hud__glitch i:nth-child(6) {\n  top: 88%;\n  height: 3px;\n  animation-delay: 1.25s;\n  animation-duration: 4.7s;\n}\n.eva-hud__glitch::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  mix-blend-mode: screen;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(255, 45, 45, 0.22) 0 2px,\n    rgba(255, 212, 0, 0.06) 2px 4px,\n    transparent 4px 9px\n  );\n  opacity: 0;\n  animation: eva-glitch-flash 4.2s steps(1, end) infinite;\n}\n.eva-hud__glitch::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: -160px;\n  height: 160px;\n  background: linear-gradient(180deg, transparent, rgba(255, 45, 45, 0.16), transparent);\n  animation: eva-glitch-roll 4.2s linear infinite;\n}\n\n@keyframes eva-glitch-band {\n  0% {\n    opacity: 0;\n    transform: translateX(0) scaleY(1);\n  }\n  3% {\n    opacity: 1;\n    transform: translateX(-18px) scaleY(1.5);\n  }\n  6% {\n    opacity: 0;\n    transform: translateX(12px);\n  }\n  9% {\n    opacity: 0.85;\n    transform: translateX(-9px);\n  }\n  12% {\n    opacity: 0;\n  }\n  48% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0.95;\n    transform: translateX(20px) scaleY(0.8);\n  }\n  53% {\n    opacity: 0;\n    transform: translateX(-10px);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes eva-glitch-flash {\n  0%,\n  84% {\n    opacity: 0;\n  }\n  86% {\n    opacity: 0.95;\n  }\n  88% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 0.75;\n  }\n  92% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes eva-glitch-roll {\n  to {\n    transform: translateY(calc(100vh + 240px));\n  }\n}\n\n/* =====================================================================\n   COLLAPSED SIDEBAR — the 56 px rail puts the native window controls over\n   the header area, so the unit tag, the top-left bracket and the left frame\n   rail are removed there and the footer actions become a compact 2×2 pad.\n   ===================================================================== */\n\nbody:has([data-collapsed=\"true\"]) .eva-headtag {\n  display: none;\n}\nbody:has([data-collapsed=\"true\"]) .eva-corner--tl {\n  display: none;\n}\nbody:has([data-collapsed=\"true\"]) .eva-frame-rail--l {\n  display: none;\n}\nbody:has([data-collapsed=\"true\"]) .eva-brandmark svg {\n  max-width: 22px;\n  max-height: 22px;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot {\n  display: grid;\n  grid-template-columns: repeat(2, 16px);\n  gap: 3px;\n  justify-items: center;\n  align-items: center;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot__btn {\n  width: 16px;\n  height: 16px;\n  min-width: 16px;\n  padding: 0;\n  border-radius: 1px;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot__glyph {\n  font-size: 8px;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot__label {\n  display: none;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  body[data-eva-berserk][data-eva-berserk-shake] #root > div[data-slot=\"root\"] > [class*=\"_frame\"],\n  .eva-hud__glitch i,\n  .eva-hud__glitch::after,\n  .eva-hud__glitch::before {\n    animation: none !important;\n  }\n}\n\n\n/* =====================================================================\n   PILOT LAYER — Shinji-style pilot authentication, portrait widget,\n   voice-caption bubble and the extra pilot scene inside the launch.\n   Original artwork only (art/pilot-*.svg); voice is system TTS.\n   ===================================================================== */\n\n/* --- pilot authentication gate (shown before the launch) --- */\n.eva-gate {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  overflow: hidden;\n  pointer-events: auto;\n  background: #05040a;\n  color: #e9e2f5;\n  font-family: var(--eva-font-hud);\n  animation: eva-fade-in 0.2s ease-out both;\n}\n.eva-gate__bg {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(90% 70% at 24% 28%, rgba(47, 95, 224, 0.22), transparent 60%),\n    radial-gradient(70% 60% at 78% 76%, rgba(122, 47, 176, 0.24), transparent 62%),\n    linear-gradient(180deg, #05040a, #0a0616 58%, #05040a);\n}\n.eva-gate__grid {\n  position: absolute;\n  inset: 0;\n  background-image:\n    repeating-linear-gradient(0deg, rgba(157, 255, 74, 0.06) 0 1px, transparent 1px 40px),\n    repeating-linear-gradient(90deg, rgba(157, 255, 74, 0.045) 0 1px, transparent 1px 40px);\n  -webkit-mask-image: radial-gradient(78% 78% at 50% 50%, #000 34%, transparent 100%);\n  mask-image: radial-gradient(78% 78% at 50% 50%, #000 34%, transparent 100%);\n}\n.eva-gate__top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 54px;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 0 18px;\n  border-bottom: 1px solid rgba(157, 255, 74, 0.18);\n  background: linear-gradient(180deg, rgba(5, 4, 10, 0.94), rgba(5, 4, 10, 0));\n}\n.eva-gate__mark {\n  display: inline-flex;\n  width: 28px;\n  height: 28px;\n}\n.eva-gate__mark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-gate__brand {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  line-height: 1;\n}\n.eva-gate__brand b {\n  font-size: 12px;\n  letter-spacing: 0.3em;\n  color: #f3edff;\n}\n.eva-gate__brand em {\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.24em;\n  color: rgba(157, 255, 74, 0.7);\n}\n.eva-gate__audio {\n  margin-left: auto;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 5px 9px;\n  border: 1px solid rgba(111, 168, 255, 0.35);\n  font-size: 9px;\n  letter-spacing: 0.2em;\n  color: rgba(233, 226, 245, 0.6);\n}\n.eva-gate__audioLed {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--eva-pilot);\n  box-shadow: 0 0 8px var(--eva-pilot);\n  animation: eva-pilot-heart 1.6s ease-in-out infinite;\n}\n.eva-gate__body {\n  position: absolute;\n  inset: 54px 0 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: clamp(32px, 6vw, 96px);\n  padding: 0 6vw;\n}\n.eva-gate__pilot {\n  display: flex;\n  align-items: center;\n  gap: 22px;\n}\n.eva-gate__portraitFrame {\n  position: relative;\n  display: block;\n  width: min(220px, 20vw);\n  aspect-ratio: 3 / 4;\n  overflow: hidden;\n  border: 1px solid rgba(111, 168, 255, 0.4);\n  background: radial-gradient(80% 80% at 50% 30%, rgba(47, 95, 224, 0.28), rgba(5, 4, 10, 0.85));\n  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);\n}\n.eva-gate__portrait {\n  display: block;\n  width: 100%;\n  height: 100%;\n  animation: eva-pilot-breathe 4.6s ease-in-out infinite;\n}\n.eva-gate__portrait svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-gate__pilotMeta {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.eva-gate__pilotMeta > b {\n  font-size: 22px;\n  letter-spacing: 0.12em;\n  color: #f3edff;\n}\n.eva-gate__pilotMeta > span {\n  font-size: 9px;\n  letter-spacing: 0.26em;\n  color: rgba(111, 168, 255, 0.85);\n}\n.eva-gate__rows {\n  display: grid;\n  gap: 6px;\n  margin-top: 10px;\n}\n.eva-gate__rows span {\n  display: flex;\n  justify-content: space-between;\n  gap: 18px;\n  width: 192px;\n  padding-bottom: 4px;\n  border-bottom: 1px solid rgba(185, 139, 224, 0.18);\n  font-size: 9px;\n  letter-spacing: 0.14em;\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-gate__rows b {\n  font-weight: 600;\n  color: var(--eva-pilot);\n}\n.eva-gate__main {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 10px;\n  max-width: 520px;\n}\n.eva-gate__eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.4em;\n  color: rgba(157, 255, 74, 0.8);\n}\n.eva-gate__title {\n  font-family: var(--eva-font-display);\n  font-size: clamp(44px, 5.4vw, 76px);\n  font-weight: 800;\n  line-height: 1;\n  letter-spacing: 0.14em;\n  color: #f3edff;\n  text-shadow: 0 0 30px rgba(111, 168, 255, 0.25);\n}\n.eva-gate__sub {\n  font-size: 9px;\n  letter-spacing: 0.5em;\n  color: rgba(185, 139, 224, 0.85);\n}\n.eva-gate__line {\n  width: min(420px, 32vw);\n  height: 1px;\n  background: linear-gradient(90deg, var(--eva-pilot), transparent);\n  opacity: 0.6;\n}\n.eva-gate__start {\n  pointer-events: auto;\n  cursor: pointer;\n  appearance: none;\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 3px;\n  margin-top: 8px;\n  padding: 14px 30px;\n  border: 1px solid var(--eva-pilot);\n  background: linear-gradient(180deg, rgba(47, 95, 224, 0.35), rgba(5, 4, 10, 0.9));\n  color: #f3edff;\n  font-family: var(--eva-font-hud);\n  font-size: 15px;\n  letter-spacing: 0.3em;\n  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));\n  box-shadow: 0 0 24px rgba(111, 168, 255, 0.2);\n  transition: background 0.15s, box-shadow 0.15s;\n}\n.eva-gate__start em {\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.24em;\n  color: var(--eva-pilot);\n}\n.eva-gate__start[disabled],\n.eva-gate__muted[disabled] {\n  opacity: 0.35;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.eva-gate__start:hover {\n  background: linear-gradient(180deg, rgba(47, 95, 224, 0.55), rgba(5, 4, 10, 0.9));\n  box-shadow: 0 0 30px rgba(111, 168, 255, 0.32);\n}\n.eva-gate__muted {\n  pointer-events: auto;\n  cursor: pointer;\n  appearance: none;\n  padding: 4px 0;\n  border: 0;\n  background: none;\n  color: rgba(233, 226, 245, 0.45);\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n}\n.eva-gate__muted:hover {\n  color: var(--eva-pilot);\n}\n.eva-gate__hint {\n  font-size: 8px;\n  letter-spacing: 0.24em;\n  color: rgba(157, 255, 74, 0.5);\n}\n.eva-gate__foot {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 44px;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 18px;\n  border-top: 1px solid rgba(157, 255, 74, 0.16);\n  background: linear-gradient(0deg, rgba(5, 4, 10, 0.92), rgba(5, 4, 10, 0));\n  font-size: 8.5px;\n  letter-spacing: 0.24em;\n  color: rgba(157, 255, 74, 0.55);\n}\n\n/* --- pilot scene inside the launch --- */\n.eva-pilotbrief {\n  position: relative;\n  width: min(220px, 20vw);\n  aspect-ratio: 3 / 4;\n}\n.eva-pilotbrief__frame {\n  position: absolute;\n  inset: -10px;\n  border: 1px solid rgba(111, 168, 255, 0.35);\n  clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);\n}\n.eva-pilotbrief__portrait {\n  position: absolute;\n  inset: 0;\n  display: block;\n  animation: eva-pilot-breathe 4.6s ease-in-out infinite;\n}\n.eva-pilotbrief__portrait svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-pilotbrief__a10 {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -34px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  color: rgba(233, 226, 245, 0.55);\n}\n.eva-pilotbrief__clip {\n  display: inline-flex;\n  width: 14px;\n  height: 14px;\n  color: var(--eva-pilot);\n}\n.eva-pilotbrief__clip svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-pilotbrief__a10 b {\n  margin-left: auto;\n  font-weight: 600;\n  color: var(--eva-pilot);\n}\n\n/* --- persistent pilot widget --- */\n.eva-pilotcard {\n  position: absolute;\n  top: 58px;\n  right: 18px;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 210px;\n  padding: 8px 10px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: linear-gradient(120deg, var(--dsw-alias-bg-layer-1), var(--dsw-alias-bg-base));\n  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);\n  pointer-events: none;\n}\n.eva-pilotcard::before {\n  content: \"\";\n  position: absolute;\n  inset: 4px;\n  border: 1px solid rgba(111, 168, 255, 0.2);\n  clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));\n  pointer-events: none;\n}\n.eva-pilotcard__avatar {\n  position: relative;\n  display: inline-flex;\n  width: 32px;\n  height: 32px;\n  flex: none;\n  animation: eva-pilot-breathe 4.6s ease-in-out infinite;\n}\n.eva-pilotcard__avatar svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-pilotcard__body {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n}\n.eva-pilotcard__name {\n  font-size: 11px;\n  letter-spacing: 0.14em;\n  color: var(--dsw-alias-label-primary);\n}\n.eva-pilotcard__role {\n  font-size: 7.5px;\n  letter-spacing: 0.2em;\n  color: rgba(111, 168, 255, 0.85);\n}\n.eva-pilotcard__sync {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 9px;\n  letter-spacing: 0.1em;\n  color: var(--dsw-alias-label-secondary);\n  font-variant-numeric: tabular-nums;\n}\n.eva-pilotcard__sync i {\n  font-style: normal;\n  color: var(--eva-pilot);\n  animation: eva-pilot-heart 1.6s ease-in-out infinite;\n}\n.eva-pilotcard__bars {\n  display: flex;\n  align-items: flex-end;\n  gap: 2px;\n  height: 22px;\n  margin-left: auto;\n  flex: none;\n}\n.eva-pilotcard__bars i {\n  width: 2px;\n  height: calc(30% + var(--i) * 11%);\n  background: var(--eva-pilot);\n  opacity: 0.85;\n  animation: eva-pilot-bars 1.4s ease-in-out infinite alternate;\n  animation-delay: calc(var(--i) * -0.12s);\n}\n\n/* --- pilot voice captions --- */\n.eva-comm {\n  position: fixed;\n  z-index: 10001;\n  top: 128px;\n  right: 18px;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 304px;\n  padding: 9px 12px;\n  border: 1px solid rgba(111, 168, 255, 0.45);\n  background: linear-gradient(180deg, rgba(10, 8, 22, 0.92), rgba(5, 4, 10, 0.95));\n  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));\n  box-shadow: 0 0 24px rgba(111, 168, 255, 0.2);\n  animation: eva-comm-in 0.24s ease-out both;\n}\n.eva-comm__avatar {\n  display: inline-flex;\n  width: 26px;\n  height: 26px;\n  flex: none;\n}\n.eva-comm__systemIcon {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  flex: none;\n  color: var(--eva-pilot);\n}\n.eva-comm__systemIcon svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-comm__avatar svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-comm__body {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n  text-align: left;\n}\n.eva-comm__who {\n  font-size: 7.5px;\n  letter-spacing: 0.22em;\n  color: var(--eva-pilot);\n}\n.eva-comm__jp {\n  font-size: 12.5px;\n  letter-spacing: 0.04em;\n  color: #f3edef;\n}\n.eva-comm__zh {\n  font-size: 9.5px;\n  letter-spacing: 0.03em;\n  color: rgba(233, 226, 245, 0.5);\n}\n\n/* --- status-bar pilot segment + sound switch --- */\n.eva-status__pilot {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--dsw-alias-label-secondary);\n}\n.eva-status__pilotAvatar {\n  display: inline-flex;\n  width: 16px;\n  height: 16px;\n}\n.eva-status__pilotAvatar svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-status__pilot b {\n  font-weight: 600;\n  letter-spacing: 0.18em;\n  color: var(--eva-pilot);\n}\n.eva-status__heart {\n  font-style: normal;\n  color: var(--eva-pilot);\n  animation: eva-pilot-heart 1.6s ease-in-out infinite;\n}\n.eva-foot__btn[data-sound=\"1\"] .eva-foot__glyph {\n  color: var(--eva-pilot);\n}\n.eva-foot__btn[data-sound=\"0\"] {\n  opacity: 0.55;\n}\n\n/* --- berserk variants --- */\nbody[data-eva-berserk] .eva-pilotcard {\n  border-color: var(--eva-alarm);\n  box-shadow: 0 0 24px var(--eva-alarm-soft);\n}\nbody[data-eva-berserk] .eva-pilotcard::before {\n  border-color: rgba(255, 59, 59, 0.35);\n}\nbody[data-eva-berserk] .eva-pilotcard__role,\nbody[data-eva-berserk] .eva-pilotcard__sync i,\nbody[data-eva-berserk] .eva-pilotcard__bars i {\n  color: var(--eva-alarm);\n  background: var(--eva-alarm);\n}\nbody[data-eva-berserk] .eva-pilotcard__avatar {\n  filter: hue-rotate(150deg) saturate(1.1) brightness(0.95);\n}\nbody[data-eva-berserk] .eva-comm {\n  border-color: var(--eva-alarm);\n  box-shadow: 0 0 24px var(--eva-alarm-soft);\n}\nbody[data-eva-berserk] .eva-status__pilot b,\nbody[data-eva-berserk] .eva-status__heart {\n  color: var(--eva-alarm);\n}\nbody[data-eva-berserk] .eva-foot__btn[data-sound=\"1\"] .eva-foot__glyph {\n  color: var(--eva-alarm);\n}\n\n/* --- pilot motion --- */\n@keyframes eva-pilot-breathe {\n  0%,\n  100% {\n    transform: translateY(0) scale(1);\n  }\n  50% {\n    transform: translateY(-1.5px) scale(1.015);\n  }\n}\n@keyframes eva-pilot-heart {\n  0%,\n  100% {\n    opacity: 0.55;\n    transform: scale(1);\n  }\n  15% {\n    opacity: 1;\n    transform: scale(1.15);\n  }\n  30% {\n    opacity: 0.7;\n    transform: scale(1);\n  }\n}\n@keyframes eva-pilot-bars {\n  from {\n    height: 16%;\n    opacity: 0.4;\n  }\n  to {\n    height: 100%;\n    opacity: 0.95;\n  }\n}\n@keyframes eva-comm-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@media (max-width: 1024px) {\n  .eva-pilotcard,\n  .eva-comm {\n    display: none;\n  }\n  .eva-gate__body {\n    flex-direction: column;\n    gap: 26px;\n  }\n  .eva-gate__pilot {\n    gap: 14px;\n  }\n  .eva-gate__portraitFrame {\n    width: 132px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-gate__portrait,\n  .eva-gate__audioLed,\n  .eva-pilotbrief__portrait,\n  .eva-pilotcard__avatar,\n  .eva-pilotcard__sync i,\n  .eva-pilotcard__bars i,\n  .eva-status__heart,\n  .eva-comm {\n    animation: none !important;\n  }\n}\n\nbody:not(:has([data-slot=\"conversation.composer\"])) .eva-pilotcard,\nbody:not(:has([data-slot=\"conversation.composer\"])) .eva-comm {\n  display: none;\n}\n\n/* pilot chip inside the sync rail (replaces the floating card) */\n.eva-rail__pilot {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding-right: 2px;\n  color: var(--dsw-alias-label-secondary);\n  flex: none;\n}\n.eva-rail__pilotAvatar {\n  display: inline-flex;\n  width: 16px;\n  height: 16px;\n  flex: none;\n}\n.eva-rail__pilotAvatar svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-rail__pilot b {\n  font-weight: 600;\n  letter-spacing: 0.14em;\n  color: var(--dsw-alias-label-primary);\n}\n.eva-rail__heart {\n  font-style: normal;\n  color: var(--eva-pilot);\n  animation: eva-pilot-heart 1.6s ease-in-out infinite;\n}\n.eva-rail__pilotSync {\n  color: var(--eva-pilot);\n  font-variant-numeric: tabular-nums;\n}\nbody[data-eva-berserk] .eva-rail__heart,\nbody[data-eva-berserk] .eva-rail__pilotSync {\n  color: var(--eva-alarm);\n}\n\n/* NERV workbench strip above the composer */\n.eva-desk {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 30px;\n  margin: 0 0 5px;\n  padding: 0 10px;\n  overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: linear-gradient(90deg, var(--dsw-alias-bg-layer-1), var(--dsw-alias-bg-base));\n  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.14em;\n  color: var(--dsw-alias-label-secondary);\n}\n.eva-desk__tag {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--eva-accent);\n  white-space: nowrap;\n}\n.eva-desk__tag b {\n  letter-spacing: 0.3em;\n}\n.eva-desk__tag i {\n  font-style: normal;\n  font-size: 7px;\n  letter-spacing: 0.22em;\n  opacity: 0.55;\n}\n.eva-desk__cell {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  height: 16px;\n  padding: 0 8px;\n  border: 0;\n  border-left: 1px solid var(--dsw-alias-border-l1);\n  background: none;\n  color: inherit;\n  font: inherit;\n  letter-spacing: inherit;\n  white-space: nowrap;\n}\n.eva-desk__cell i {\n  font-style: normal;\n  font-size: 7px;\n  letter-spacing: 0.2em;\n  opacity: 0.45;\n}\n.eva-desk__value {\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  color: var(--dsw-alias-label-primary);\n  font-variant-numeric: tabular-nums;\n}\n.eva-desk__cell--balance .eva-desk__value {\n  color: var(--eva-accent);\n}\n.eva-desk__refresh {\n  appearance: none;\n  padding: 0 2px;\n  border: 0;\n  background: none;\n  color: var(--dsw-alias-label-secondary);\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  line-height: 1;\n  cursor: pointer;\n  pointer-events: auto;\n}\n.eva-desk__refresh:hover {\n  color: var(--eva-accent);\n}\n.eva-desk__cell--music {\n  cursor: pointer;\n  pointer-events: auto;\n}\n.eva-desk__cell--music:hover .eva-desk__value {\n  color: var(--eva-accent);\n}\n.eva-desk__bars {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 2px;\n  height: 12px;\n  margin-left: 2px;\n}\n.eva-desk__bars i {\n  width: 2px;\n  height: 30%;\n  background: var(--eva-accent);\n  opacity: 0.75;\n  animation: eva-desk-bars 1.2s ease-in-out infinite alternate;\n  animation-delay: calc(var(--i) * -0.11s);\n}\n.eva-desk__bars--tps i {\n  background: var(--eva-pilot);\n}\n@keyframes eva-desk-bars {\n  from {\n    height: 20%;\n    opacity: 0.35;\n  }\n  to {\n    height: 100%;\n    opacity: 0.9;\n  }\n}\n@media (max-width: 900px) {\n  .eva-desk__tag,\n  .eva-desk__cell:nth-last-child(2) {\n    display: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .eva-desk__bars i {\n    animation: none;\n  }\n}\n\n/* =====================================================================\n   PILOT-SPECIFIC UNIT PAGES — 01 Shinji / 02 Asuka / 03 Rei.\n   `data-eva-pilot` is set from the client module; token palettes swap in JS.\n   ===================================================================== */\nbody[data-eva-pilot=\"02\"] {\n  --eva-accent: #ff7a1a;\n  --eva-accent-deep: #c22a12;\n  --eva-pilot: #ff5a3c;\n  --eva-pilot-soft: rgba(255, 90, 60, 0.12);\n  --eva-pilot-glow: rgba(255, 90, 60, 0.22);\n}\nbody[data-eva-pilot=\"02\"][data-ds-dark-theme] {\n  --eva-accent: #ff8a2a;\n  --eva-accent-deep: #ff5a1a;\n  --eva-pilot: #ff7a6a;\n  --eva-pilot-soft: rgba(255, 122, 106, 0.12);\n  --eva-pilot-glow: rgba(255, 122, 106, 0.22);\n}\nbody[data-eva-pilot=\"00\"] {\n  --eva-accent: #2c6f96;\n  --eva-accent-deep: #1d4f6b;\n  --eva-pilot: #3d7ea6;\n  --eva-pilot-soft: rgba(61, 126, 166, 0.12);\n  --eva-pilot-glow: rgba(61, 126, 166, 0.22);\n}\nbody[data-eva-pilot=\"00\"][data-ds-dark-theme] {\n  --eva-accent: #8fd4f2;\n  --eva-accent-deep: #5aa9cc;\n  --eva-pilot: #bfe6ff;\n  --eva-pilot-soft: rgba(191, 230, 255, 0.12);\n  --eva-pilot-glow: rgba(191, 230, 255, 0.22);\n}\n\nbody[data-eva-pilot=\"02\"]:not([data-ds-dark-theme]) {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(214, 41, 62, 0.16), transparent 62%),\n    repeating-linear-gradient(0deg, rgba(194, 42, 18, 0.04) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(194, 42, 18, 0.04) 0 1px, transparent 1px 46px);\n}\nbody[data-eva-pilot=\"02\"][data-ds-dark-theme] {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(255, 90, 40, 0.22), transparent 62%),\n    radial-gradient(820px 560px at 92% 112%, rgba(255, 122, 26, 0.1), transparent 64%),\n    repeating-linear-gradient(0deg, rgba(255, 233, 227, 0.026) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(255, 233, 227, 0.026) 0 1px, transparent 1px 46px);\n}\nbody[data-eva-pilot=\"00\"]:not([data-ds-dark-theme]) {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(61, 126, 166, 0.13), transparent 62%),\n    repeating-linear-gradient(0deg, rgba(44, 111, 150, 0.045) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(44, 111, 150, 0.045) 0 1px, transparent 1px 46px);\n}\nbody[data-eva-pilot=\"00\"][data-ds-dark-theme] {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(90, 169, 204, 0.18), transparent 62%),\n    radial-gradient(820px 560px at 92% 112%, rgba(191, 230, 255, 0.08), transparent 64%),\n    repeating-linear-gradient(0deg, rgba(230, 244, 251, 0.024) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(230, 244, 251, 0.024) 0 1px, transparent 1px 46px);\n}\n\nbody[data-eva-pilot=\"02\"] .eva-gate__bg {\n  background:\n    radial-gradient(90% 70% at 24% 28%, rgba(214, 41, 62, 0.22), transparent 60%),\n    radial-gradient(70% 60% at 78% 76%, rgba(255, 122, 26, 0.18), transparent 62%),\n    linear-gradient(180deg, #0b0505, #160807 58%, #0b0505);\n}\nbody[data-eva-pilot=\"00\"] .eva-gate__bg {\n  background:\n    radial-gradient(90% 70% at 24% 28%, rgba(61, 126, 166, 0.22), transparent 60%),\n    radial-gradient(70% 60% at 78% 76%, rgba(191, 230, 255, 0.14), transparent 62%),\n    linear-gradient(180deg, #04080c, #08131a 58%, #04080c);\n}\n\n/* pilot roster on the authentication gate */\n.eva-gate__body {\n  gap: clamp(18px, 2.6vw, 42px);\n  padding: 0 3.4vw;\n}\n.eva-gate__roster {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: min(272px, 21vw);\n  flex: none;\n}\n.eva-gate__rosterHead {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin-bottom: 2px;\n}\n.eva-gate__rosterHead b {\n  font-size: 9px;\n  letter-spacing: 0.28em;\n  color: rgba(157, 255, 74, 0.75);\n}\n.eva-gate__rosterHead em {\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.2em;\n  color: rgba(233, 226, 245, 0.4);\n}\n.eva-gate__card {\n  appearance: none;\n  display: flex;\n  align-items: stretch;\n  gap: 0;\n  min-height: 68px;\n  padding: 0;\n  overflow: hidden;\n  border: 1px solid rgba(185, 139, 224, 0.22);\n  background: rgba(8, 5, 16, 0.55);\n  color: #e9e2f5;\n  font-family: var(--eva-font-hud);\n  text-align: left;\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));\n  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;\n}\n.eva-gate__card[data-selected=\"1\"] {\n  border-color: var(--eva-pilot);\n  background: linear-gradient(90deg, var(--eva-pilot-soft), rgba(8, 5, 16, 0.72));\n  box-shadow: 0 0 18px var(--eva-pilot-glow);\n}\n.eva-gate__cardArt {\n  display: inline-flex;\n  width: 56px;\n  flex: none;\n  overflow: hidden;\n  border-right: 1px solid rgba(185, 139, 224, 0.18);\n  background: linear-gradient(180deg, rgba(18, 10, 30, 0.96), rgba(5, 4, 10, 0.96));\n}\n.eva-gate__cardArt svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.eva-gate__card[data-selected=\"1\"] .eva-gate__cardArt {\n  border-right-color: var(--eva-pilot);\n  filter: saturate(1.08);\n}\n.eva-gate__cardBody {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  min-width: 0;\n  padding: 8px 10px;\n  flex: 1;\n}\n.eva-gate__cardBody b {\n  font-size: 12px;\n  letter-spacing: 0.12em;\n}\n.eva-gate__cardBody i {\n  font-style: normal;\n  font-size: 7.5px;\n  letter-spacing: 0.16em;\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-gate__cardBody em {\n  font-style: normal;\n  font-size: 7px;\n  letter-spacing: 0.18em;\n  color: var(--eva-pilot);\n}\n.eva-gate__cardLed {\n  width: 5px;\n  height: 5px;\n  margin-left: auto;\n  border-radius: 50%;\n  background: rgba(233, 226, 245, 0.2);\n}\n.eva-gate__card[data-selected=\"1\"] .eva-gate__cardLed {\n  background: var(--eva-pilot);\n  box-shadow: 0 0 8px var(--eva-pilot);\n}\n\n/* pilot switch + unit chip in the workbench */\n.eva-desk__cell--pilot {\n  cursor: pointer;\n  pointer-events: auto;\n}\n.eva-desk__cell--pilot:hover .eva-desk__value {\n  color: var(--eva-pilot);\n}\n.eva-desk__unit {\n  font-style: normal;\n  font-size: 7.5px;\n  letter-spacing: 0.15em;\n  color: var(--eva-pilot);\n}\n\n@media (max-width: 1120px) {\n  .eva-gate__body {\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 18px;\n  }\n  .eva-gate__roster {\n    flex-direction: row;\n    width: 100%;\n    justify-content: center;\n  }\n  .eva-gate__rosterHead {\n    display: none;\n  }\n  .eva-gate__card {\n    flex: 1 1 160px;\n    max-width: 220px;\n  }\n}\n@media (max-width: 760px) {\n  .eva-gate__pilot {\n    display: none;\n  }\n}\n\n.eva-gate__atfield {\n  position: absolute;\n  top: 16%;\n  right: 4%;\n  width: 46vmin;\n  height: 46vmin;\n  color: var(--eva-pilot);\n  opacity: 0.09;\n  pointer-events: none;\n}\n.eva-gate__atfield svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n/* ---------------------------------------------------------------------\n   ENTRY-PLUG PILOT SELECTION (reference-inspired layout, original build)\n   --------------------------------------------------------------------- */\n.eva-gate__body--select {\n  display: grid;\n  grid-template-columns: minmax(300px, 0.9fr) minmax(430px, 1.1fr);\n  align-items: center;\n  gap: clamp(24px, 4vw, 64px);\n  padding: 0 4vw;\n}\n.eva-gate__plugScene {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 62vh;\n}\n.eva-gate__contours {\n  position: absolute;\n  inset: -4% -14%;\n  opacity: 0.6;\n  background:\n    repeating-radial-gradient(ellipse at 46% 56%,\n      transparent 0 15px,\n      rgba(255, 140, 40, 0.16) 16px 17px,\n      transparent 18px 33px);\n  -webkit-mask-image: radial-gradient(60% 60% at 50% 55%, #000 30%, transparent 78%);\n  mask-image: radial-gradient(60% 60% at 50% 55%, #000 30%, transparent 78%);\n  animation: eva-contour-drift 16s ease-in-out infinite alternate;\n  pointer-events: none;\n}\n@keyframes eva-contour-drift {\n  from { transform: scale(1) rotate(-2deg); opacity: 0.42; }\n  to { transform: scale(1.06) rotate(2deg); opacity: 0.72; }\n}\n.eva-gate__plug {\n  position: relative;\n  width: min(300px, 25vw);\n  aspect-ratio: 1 / 2;\n  transform: rotate(14deg);\n}\n.eva-gate__plugImg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 0 30px rgba(255, 140, 40, 0.18));\n}\n.eva-gate__plugGlow {\n  position: absolute;\n  left: 20%;\n  right: 20%;\n  top: 30%;\n  bottom: 24%;\n  background: radial-gradient(50% 50% at 50% 50%, var(--eva-pilot-glow), transparent 70%);\n  filter: blur(8px);\n  animation: eva-plug-glow 3.2s ease-in-out infinite;\n  pointer-events: none;\n}\n@keyframes eva-plug-glow {\n  0%, 100% { opacity: 0.55; }\n  50% { opacity: 1; }\n}\n.eva-gate__plugPilot {\n  position: absolute;\n  left: 20%;\n  right: 20%;\n  top: 42%;\n  bottom: 34%;\n  overflow: hidden;\n  opacity: 1;\n  filter: drop-shadow(0 0 10px var(--eva-pilot-glow));\n  pointer-events: none;\n  z-index: 2;\n}\n.eva-gate__plugPilotImg {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.eva-gate__plugPilot[data-inserting=\"1\"] {\n  animation: eva-plug-insert 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;\n}\n@keyframes eva-plug-insert {\n  from { opacity: 0; transform: translateX(26px) scale(1.08); filter: blur(4px); }\n  to { opacity: 0.92; transform: translateX(0) scale(1); filter: none; }\n}\n.eva-gate__plugTag {\n  position: absolute;\n  left: -18%;\n  right: -18%;\n  font-family: var(--eva-font-hud);\n  font-size: 8px;\n  letter-spacing: 0.3em;\n  color: rgba(255, 179, 71, 0.75);\n  text-align: center;\n  pointer-events: none;\n}\n.eva-gate__plugTag--top { top: 8%; }\n.eva-gate__plugTag--bottom { bottom: 8%; }\n.eva-gate__plug::before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 56%;\n  width: 82%;\n  height: 40%;\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  background: radial-gradient(closest-side, rgba(5, 4, 10, 0.62), transparent 72%);\n  pointer-events: none;\n}\n.eva-gate__ring {\n  position: absolute;\n  left: 50%;\n  top: 56%;\n  width: 80%;\n  height: auto;\n  transform: translate(-50%, -50%);\n  overflow: visible;\n  pointer-events: none;\n  z-index: 2;\n}\n.eva-gate__ringTrack,\n.eva-gate__ringFill {\n  fill: none;\n  stroke-width: 2.4;\n}\n.eva-gate__ringTrack { stroke: rgba(233, 226, 245, 0.28); }\n.eva-gate__ringFill {\n  stroke: var(--eva-pilot);\n  stroke-linecap: round;\n  stroke-dasharray: 326.7;\n  stroke-dashoffset: calc(326.7 - 326.7 * var(--sync));\n  filter: drop-shadow(0 0 6px var(--eva-pilot));\n  transform: rotate(-90deg);\n  transform-origin: 60px 60px;\n  transition: stroke-dashoffset 0.18s linear;\n}\n.eva-gate__sync {\n  position: absolute;\n  left: 50%;\n  top: 56%;\n  transform: translate(-50%, -50%);\n  z-index: 3;\n  padding: 2px 7px;\n  background: rgba(5, 4, 10, 0.62);\n  font-family: var(--eva-font-hud);\n  font-size: 17px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  color: #f3edff;\n  text-shadow: 0 0 12px var(--eva-pilot-glow);\n  pointer-events: none;\n}\n.eva-gate__syncLabel {\n  position: absolute;\n  left: 50%;\n  top: calc(56% + 22px);\n  z-index: 3;\n  transform: translateX(-50%);\n  font-family: var(--eva-font-hud);\n  font-size: 7px;\n  letter-spacing: 0.26em;\n  color: rgba(233, 226, 245, 0.42);\n  white-space: nowrap;\n  pointer-events: none;\n}\n.eva-gate__console {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  max-width: 600px;\n}\n.eva-gate__pilots {\n  display: flex;\n  gap: 8px;\n  width: 100%;\n  margin: 12px 0 10px;\n}\n.eva-gate__pilotBtn {\n  appearance: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  padding: 10px 6px 9px;\n  border: 1px solid rgba(185, 139, 224, 0.22);\n  background: rgba(8, 5, 16, 0.6);\n  color: #e9e2f5;\n  font-family: var(--eva-font-hud);\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));\n  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;\n}\n.eva-gate__pilotBtn:hover {\n  border-color: rgba(255, 179, 71, 0.5);\n}\n.eva-gate__pilotBtn[data-selected=\"1\"] {\n  border-color: var(--eva-pilot);\n  background: linear-gradient(180deg, var(--eva-pilot-soft), rgba(8, 5, 16, 0.78));\n  box-shadow: 0 0 22px var(--eva-pilot-glow);\n}\n.eva-gate__avatar {\n  display: inline-flex;\n  width: 86px;\n  height: 86px;\n  flex: none;\n  opacity: 0.9;\n  overflow: hidden;\n  border: 1px solid rgba(185, 139, 224, 0.22);\n  transition: opacity 0.15s, filter 0.15s, border-color 0.15s;\n}\n.eva-gate__pilotBtn[data-selected=\"1\"] .eva-gate__avatar {\n  border-color: var(--eva-pilot);\n}\n.eva-gate__pilotBtn[data-selected=\"1\"] .eva-gate__avatar {\n  opacity: 1;\n  filter: drop-shadow(0 0 10px var(--eva-pilot-glow));\n}\n.eva-gate__pilotInfo {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n}\n.eva-gate__pilotInfo b {\n  font-size: 12px;\n  letter-spacing: 0.1em;\n}\n.eva-gate__pilotInfo i {\n  font-style: normal;\n  font-size: 7px;\n  letter-spacing: 0.14em;\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-gate__pilotInfo em {\n  font-style: normal;\n  font-size: 6.5px;\n  letter-spacing: 0.16em;\n  color: var(--eva-pilot);\n}\n.eva-gate__pilotLed {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: rgba(233, 226, 245, 0.16);\n}\n.eva-gate__pilotBtn[data-selected=\"1\"] .eva-gate__pilotLed {\n  background: var(--eva-pilot);\n  box-shadow: 0 0 8px var(--eva-pilot);\n}\n.eva-gate__selectMeta {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n  padding: 8px 0;\n  border-top: 1px solid rgba(185, 139, 224, 0.16);\n  border-bottom: 1px solid rgba(185, 139, 224, 0.16);\n  width: 100%;\n  font-family: var(--eva-font-hud);\n}\n.eva-gate__selectMeta b {\n  font-size: 18px;\n  letter-spacing: 0.1em;\n  color: #f3edff;\n}\n.eva-gate__selectMeta span {\n  font-size: 8px;\n  letter-spacing: 0.2em;\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-gate__selectMeta i {\n  margin-left: auto;\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.18em;\n  color: var(--eva-pilot);\n}\n.eva-gate__actions {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 7px;\n  margin-top: 14px;\n}\n.eva-gate__actions .eva-gate__start {\n  margin-top: 0;\n}\n\n/* the old single-portrait layout can be hidden if both are rendered */\n.eva-gate__body--select .eva-gate__card,\n.eva-gate__body--select .eva-gate__roster {\n  display: none;\n}\n\n@media (max-width: 1120px) {\n  .eva-gate__body--select {\n    grid-template-columns: 1fr;\n    justify-items: center;\n    overflow: auto;\n    padding: 12px 6vw 70px;\n  }\n  .eva-gate__plugScene {\n    min-height: 38vh;\n    width: 100%;\n  }\n  .eva-gate__plug {\n    width: 180px;\n  }\n  .eva-gate__console {\n    align-items: center;\n    text-align: center;\n  }\n  .eva-gate__selectMeta {\n    justify-content: center;\n  }\n  .eva-gate__actions {\n    align-items: center;\n  }\n  .eva-gate__pilotBtn {\n    flex: 0 1 150px;\n  }\n}\n\n/* ---------------------------------------------------------------------\n   PILOT IMAGE PRIMITIVES — supplied photo (Shinji) or line-art alpha mask\n   (Asuka / Rei) for every pilot surface.\n   --------------------------------------------------------------------- */\n.eva-pilot-img {\n  display: inline-flex;\n  overflow: hidden;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n}\n.eva-pilot-img--photo img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.eva-pilot-img--photo {\n  background: #0a0616;\n}\n.eva-pilot-img--mask {\n  background: linear-gradient(180deg, #ffffff 8%, var(--eva-pilot) 92%);\n  -webkit-mask-size: contain;\n  mask-size: contain;\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n}\n.eva-gate__avatar.eva-pilot-img {\n  width: 86px;\n  height: 86px;\n}\n.eva-rail__pilotAvatar.eva-pilot-img,\n.eva-status__pilotAvatar.eva-pilot-img,\n.eva-comm__avatar.eva-pilot-img {\n  width: 16px;\n  height: 16px;\n  border-radius: 2px;\n}\n.eva-comm__avatar.eva-pilot-img {\n  width: 26px;\n  height: 26px;\n}\n.eva-pilotbrief__portrait.eva-pilot-img {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.eva-pilotbrief__portrait.eva-pilot-img--mask {\n  background: linear-gradient(180deg, #ffffff 8%, var(--eva-pilot) 92%);\n}\n.eva-rail__pilotAvatar img,\n.eva-status__pilotAvatar img,\n.eva-comm__avatar img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n/* ---------------------------------------------------------------------\n   NERV EMERGENCY — red broadcast before the pilot confirmation screen.\n   --------------------------------------------------------------------- */\n.eva-alarm {\n  position: fixed;\n  inset: 0;\n  z-index: 11000;\n  overflow: hidden;\n  background: #000;\n  color: #ff1a1a;\n  font-family: var(--eva-font-hud);\n  pointer-events: auto;\n}\n.eva-alarm__bg {\n  position: absolute;\n  inset: -4%;\n  width: 108%;\n  height: 108%;\n  object-fit: cover;\n  opacity: 0.9;\n  filter: contrast(1.08) brightness(0.86);\n  animation: eva-alarm-breathe 2.6s ease-in-out infinite;\n}\n.eva-alarm__flash {\n  position: absolute;\n  inset: 0;\n  background: rgba(210, 0, 0, 0.2);\n  mix-blend-mode: screen;\n  animation: eva-alarm-flash 0.62s steps(2) infinite;\n  pointer-events: none;\n}\n.eva-alarm__scan {\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0 1px, transparent 1px 4px);\n  pointer-events: none;\n}\n.eva-alarm__center {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  text-align: center;\n  padding: 0 6vw;\n}\n.eva-alarm__eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.5em;\n  color: #ff6b6b;\n}\n.eva-alarm__nerv {\n  font-family: Georgia, \"Times New Roman\", serif;\n  font-size: clamp(120px, 22vw, 300px);\n  font-weight: 400;\n  line-height: 0.82;\n  letter-spacing: 0.02em;\n  color: #ff0606;\n  text-shadow: 0 0 26px rgba(255, 0, 0, 0.55), 0 2px 0 #3a0000;\n  animation: eva-alarm-flicker 1.15s steps(2) infinite;\n}\n.eva-alarm__quote {\n  font-family: Georgia, \"Times New Roman\", serif;\n  font-size: clamp(15px, 2.1vw, 28px);\n  color: #ff3b3b;\n  background: rgba(150, 0, 0, 0.22);\n  padding: 2px 18px;\n}\n.eva-alarm__quote--2 {\n  font-size: clamp(14px, 1.9vw, 24px);\n}\n.eva-alarm__clock {\n  margin-top: 4px;\n  font-size: clamp(38px, 6.4vw, 86px);\n  letter-spacing: 0.08em;\n  color: #ff1a1a;\n  text-shadow: 0 0 20px rgba(255, 0, 0, 0.5);\n  font-variant-numeric: tabular-nums;\n}\n.eva-alarm__jp {\n  font-size: 9px;\n  letter-spacing: 0.3em;\n  color: rgba(255, 120, 120, 0.7);\n}\n.eva-alarm__foot {\n  position: absolute;\n  left: 18px;\n  bottom: 14px;\n  font-size: 8px;\n  letter-spacing: 0.26em;\n  color: rgba(255, 80, 80, 0.55);\n}\n@keyframes eva-alarm-breathe {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.035); }\n}\n@keyframes eva-alarm-flash {\n  0%, 100% { opacity: 0.25; }\n  50% { opacity: 0.9; }\n}\n@keyframes eva-alarm-flicker {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.76; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .eva-alarm__bg,\n  .eva-alarm__flash,\n  .eva-alarm__nerv {\n    animation: none !important;\n  }\n}\n\n/* ---------------------------------------------------------------------\n   ANGEL ATTACK — TV-style title card, original cue on click.\n   --------------------------------------------------------------------- */\n.eva-angel {\n  position: fixed;\n  inset: 0;\n  z-index: 11000;\n  overflow: hidden;\n  background: #000;\n  color: #e9e2f5;\n  font-family: var(--eva-font-hud);\n  pointer-events: auto;\n}\n.eva-angel__frame {\n  position: absolute;\n  inset: 5%;\n  z-index: 4;\n  border: 1px solid rgba(255, 45, 45, 0.16);\n  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);\n  pointer-events: none;\n}\n.eva-angel__grain {\n  position: absolute;\n  inset: 0;\n  z-index: 3;\n  opacity: 0.18;\n  background-image: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 3px);\n  mix-blend-mode: overlay;\n  pointer-events: none;\n}\n.eva-angel__scan {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0 1px, transparent 1px 4px);\n  pointer-events: none;\n}\n.eva-angel__flash {\n  position: absolute;\n  inset: 0;\n  z-index: 6;\n  background: rgba(255, 0, 0, 0.14);\n  mix-blend-mode: screen;\n  pointer-events: none;\n  animation: eva-angel-flash 0.72s steps(2) infinite;\n}\n.eva-angel[data-started=\"0\"] .eva-angel__flash {\n  animation: none;\n  opacity: 0;\n}\n.eva-angel__tv {\n  position: absolute;\n  top: 16px;\n  left: 22px;\n  right: 22px;\n  z-index: 7;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  font-size: 8px;\n  letter-spacing: 0.26em;\n  color: rgba(255, 90, 90, 0.7);\n}\n.eva-angel__bug {\n  font-family: Georgia, \"Times New Roman\", serif;\n  font-size: 18px;\n  letter-spacing: 0.14em;\n  color: #ff2d2d;\n  text-shadow: 0 0 12px rgba(255, 0, 0, 0.45);\n}\n.eva-angel__channel {\n  color: rgba(255, 255, 255, 0.5);\n}\n.eva-angel__time {\n  margin-left: auto;\n  color: rgba(255, 255, 255, 0.6);\n  font-variant-numeric: tabular-nums;\n}\n.eva-angel__rec {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #ff2d2d;\n  box-shadow: 0 0 10px #ff2d2d;\n  animation: eva-angel-blink 1.1s steps(2) infinite;\n}\n.eva-angel__entity {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 1;\n  width: min(300px, 24vw);\n  transform: translate(-50%, -50%) scale(0.9);\n  opacity: 0.13;\n  filter: drop-shadow(0 0 36px rgba(255, 0, 0, 0.25));\n}\n.eva-angel__entity svg {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.eva-angel[data-started=\"1\"] .eva-angel__entity {\n  animation: eva-angel-rise 5s ease-out both;\n}\n.eva-angel__seismic {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 56%;\n  z-index: 1;\n  height: 120px;\n  opacity: 0.35;\n}\n.eva-angel__seismic svg {\n  width: 100%;\n  height: 100%;\n}\n.eva-angel[data-started=\"1\"] .eva-angel__seismic path {\n  stroke-dasharray: 1900;\n  animation: eva-angel-scan 2.4s linear infinite;\n}\n.eva-angel__card {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 2;\n  width: min(940px, 84vw);\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  text-align: center;\n}\n.eva-angel__eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.5em;\n  color: #ff4b4b;\n}\n.eva-angel__jp {\n  font-family: \"Hiragino Mincho ProN\", \"Yu Mincho\", \"Songti SC\", serif;\n  font-size: clamp(64px, 13vw, 176px);\n  font-weight: 600;\n  line-height: 1;\n  letter-spacing: 0.06em;\n  color: #f2edf5;\n  text-shadow: 0 0 34px rgba(255, 0, 0, 0.28), 0 0 2px #ff2d2d;\n}\n.eva-angel[data-started=\"1\"] .eva-angel__jp {\n  animation: eva-angel-glitch 1.5s steps(2) infinite;\n}\n.eva-angel__en {\n  font-family: var(--eva-font-display);\n  font-size: clamp(16px, 2.4vw, 34px);\n  font-weight: 700;\n  letter-spacing: 0.52em;\n  color: #ff2d2d;\n}\n.eva-angel__meta {\n  font-size: 9px;\n  letter-spacing: 0.3em;\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-angel__meta--2 {\n  color: rgba(255, 80, 80, 0.62);\n}\n.eva-angel__status {\n  margin-top: 22px;\n  font-size: 9px;\n  letter-spacing: 0.26em;\n  color: rgba(255, 80, 80, 0.75);\n}\n.eva-angel__start {\n  appearance: none;\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  margin-top: 26px;\n  padding: 14px 30px;\n  border: 1px solid #ff2d2d;\n  background: linear-gradient(180deg, rgba(120, 0, 0, 0.55), rgba(10, 2, 2, 0.85));\n  color: #f3edff;\n  font-family: var(--eva-font-hud);\n  font-size: 15px;\n  letter-spacing: 0.3em;\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));\n  box-shadow: 0 0 26px rgba(255, 0, 0, 0.24);\n}\n.eva-angel__start:hover {\n  background: linear-gradient(180deg, rgba(180, 0, 0, 0.6), rgba(10, 2, 2, 0.9));\n}\n.eva-angel__start em {\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.22em;\n  color: #ff8a8a;\n}\n@keyframes eva-angel-flash {\n  0%, 100% { opacity: 0.2; }\n  50% { opacity: 0.7; }\n}\n@keyframes eva-angel-blink {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.15; }\n}\n@keyframes eva-angel-rise {\n  from { opacity: 0.05; transform: translate(-50%, -46%) scale(0.82); }\n  to { opacity: 0.3; transform: translate(-50%, -52%) scale(1.02); }\n}\n@keyframes eva-angel-scan {\n  from { stroke-dashoffset: 1900; }\n  to { stroke-dashoffset: 0; }\n}\n@keyframes eva-angel-glitch {\n  0%, 100% { transform: translate(0, 0); opacity: 1; }\n  12% { transform: translate(-2px, 1px); opacity: 0.85; }\n  24% { transform: translate(2px, -1px); }\n  36% { transform: translate(-1px, 0); }\n  48% { transform: translate(0, 1px); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .eva-angel__flash,\n  .eva-angel__rec,\n  .eva-angel[data-started=\"1\"] .eva-angel__entity,\n  .eva-angel[data-started=\"1\"] .eva-angel__seismic path,\n  .eva-angel[data-started=\"1\"] .eva-angel__jp {\n    animation: none !important;\n  }\n}\n";
    const ART = {"head":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original Unit-01 style mecha head emblem\">\n  <defs>\n    <linearGradient id=\"eva01HeadArmor\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#7A2FB0\"/>\n      <stop offset=\".58\" stop-color=\"#4B1D7A\"/>\n      <stop offset=\"1\" stop-color=\"#1A0B2E\"/>\n    </linearGradient>\n  </defs>\n\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" opacity=\".5\">\n    <path d=\"M3 90h10M3 96h6M107 90h10M111 96h6M3 83h4M113 83h4\"/>\n  </g>\n\n  \n  <path d=\"M44 24 31 15 28 21 39 30Z\" fill=\"#1A0B2E\" stroke=\"#7A2FB0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M76 24 89 15 92 21 81 30Z\" fill=\"#1A0B2E\" stroke=\"#7A2FB0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M54 25 64 23.5 67.5 1.5 60 3Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M58 22.5 63 22 65 8 62 8.5Z\" fill=\"#4B1D7A\"/>\n  \n\n  \n  <g stroke=\"#4B1D7A\" stroke-width=\"2\" stroke-linejoin=\"miter\">\n    <path d=\"M8 118 20 97 48 91 56 104 54 118Z\" fill=\"#1A0B2E\"/>\n    <path d=\"M112 118 100 97 72 91 64 104 66 118Z\" fill=\"#1A0B2E\"/>\n  </g>\n  <path d=\"M17 105 24 100 27 103 20 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M103 105 96 100 93 103 100 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M28 96 36 94M92 96 84 94\" stroke=\"#6B5F80\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M53 78H67L69 95H51Z\" fill=\"#6B5F80\" stroke=\"#2E2340\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54.5 82H65.5M54 87.5H66\" stroke=\"#2E2340\" stroke-width=\"1.5\"/>\n  <path d=\"M46 92H74L80 107H40Z\" fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M51 96H69L71 102H49Z\" fill=\"#050409\"/>\n  <path d=\"M58 98h4v3h-4Z\" fill=\"#9DFF4A\"/>\n\n  \n  <path d=\"M52 15 68 15 78 21 87 38 84 50 88 62 79 79 67 88 53 88 41 79 32 62 36 50 33 38 42 21Z\"\n        fill=\"url(#eva01HeadArmor)\" stroke=\"#B98BE0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" stroke-linecap=\"square\">\n    <path d=\"M36.5 48 41.5 48M35.5 53 40.5 53.6M34.5 58 39.5 58.6\"/>\n  </g>\n\n  \n  <path d=\"M45 26 75 26 79 40 60 44 41 40Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 28.5v13\" stroke=\"#E9E2F5\" stroke-width=\"1.5\"/>\n  <path d=\"M50 32.5 56.5 32.5M70 32.5 63.5 32.5\" stroke=\"#B98BE0\" stroke-width=\"1.5\"/>\n  <path d=\"M45.5 30.5h3v3h-3Z\" fill=\"#050409\" stroke=\"#FF6B1A\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M43 41 77 41 73 66 47 66Z\" fill=\"#050409\" stroke=\"#2E2340\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M44 44 76 44\" stroke=\"#1A0B2E\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M60 40 77 40 73 66 60 66Z\" fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M64 44 70 45 68 58 63 62Z\" fill=\"#7A2FB0\"/>\n  <path d=\"M64 66 70 64.5\" stroke=\"#B98BE0\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M44.5 48.5 59.8 46 60.2 55.5 46 58.5Z\" fill=\"#9DFF4A\" stroke=\"#4DFFB0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M45.5 49.7 59 47.3\" stroke=\"#C6FF00\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M47 66 73 66 77 77 67 87 53 87 43 77Z\" fill=\"#1A0B2E\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 67.5v6\" stroke=\"#B98BE0\" stroke-width=\"1\"/>\n  <g fill=\"#050409\">\n    <path d=\"M51 77 53.4 76.6 53.8 84.5 51.6 84.9Z\"/>\n    <path d=\"M55.2 76.6 57.6 76.2 58 84.1 55.8 84.5Z\"/>\n    <path d=\"M59.4 76.2 61.8 75.9 62.2 83.7 60 84.1Z\"/>\n    <path d=\"M63.6 75.9 66 75.6 66.2 83.3 64.2 83.6Z\"/>\n  </g>\n\n  \n  <circle cx=\"90\" cy=\"61\" r=\"7\" fill=\"#1A0B2E\" stroke=\"#6B5F80\" stroke-width=\"2\"/>\n  <circle cx=\"90\" cy=\"61\" r=\"2.8\" fill=\"#FF6B1A\"/>\n  <path d=\"M90 53.5v2M90 66.5v2M82.5 61h2M95.5 61h2\" stroke=\"#6B5F80\" stroke-width=\"1.5\"/>\n  <path d=\"M97 58.5 104 56 106 63 99 65.5Z\" fill=\"#6B5F80\" stroke=\"#2E2340\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M98.5 60 103 58.6\" stroke=\"#FF6B1A\" stroke-width=\"2\"/>\n</svg>","icon":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\" width=\"128\" height=\"128\" role=\"img\" aria-label=\"Unit-01 plugin icon\">\n  \n  <rect width=\"128\" height=\"128\" fill=\"#0A0612\"/>\n  <path d=\"M16 6H112L122 16V112L112 122H16L6 112V16Z\" fill=\"#120A22\" stroke=\"#2E2340\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M14 104 23 95 27 99 18 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M114 104 105 95 101 99 110 108Z\" fill=\"#FFD400\"/>\n\n  <g transform=\"translate(4 8) scale(.94)\">\n  \n  <path d=\"M40 31 24 19 20 29 34 42Z\" fill=\"#1A0B2E\" stroke=\"#7A2FB0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54 25 71 20 86 2 72 6Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M59 23 68 20 75 9 70 10Z\" fill=\"#4B1D7A\"/>\n\n  \n  <path d=\"M64 18 86 29 96 54 92 74 82 94 64 106 46 94 36 74 32 54 42 29Z\"\n        fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M64 20 84 30 86 40 64 44 42 40 44 30Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M64 44 88 50 86 76 64 92 42 76 40 50Z\" fill=\"#050409\" stroke=\"#2E2340\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M64 44 88 50 86 76 64 92 63 68 64 55Z\" fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M70 55 81 58 80 73 70 79Z\" fill=\"#7A2FB0\"/>\n\n  \n  <path d=\"M43 57 62 52 63 70 45 75Z\" fill=\"#9DFF4A\" stroke=\"#4DFFB0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M44.5 59.5 61 54.5\" stroke=\"#C6FF00\" stroke-width=\"2.5\"/>\n\n  \n  <g fill=\"#050409\">\n    <path d=\"M53 94 57 93 57 102 53.5 102.8Z\"/>\n    <path d=\"M60 93 64 92.6 64 101.6 60.4 102Z\"/>\n    <path d=\"M67 92.6 71 92.4 70.8 101.2 67.2 101.6Z\"/>\n  </g>\n\n  \n  <circle cx=\"96\" cy=\"63\" r=\"8.5\" fill=\"#1A0B2E\" stroke=\"#6B5F80\" stroke-width=\"3\"/>\n  <circle cx=\"96\" cy=\"63\" r=\"3.5\" fill=\"#FF6B1A\"/>\n  <path d=\"M96 51.5v2.5M96 72v2.5M84.5 63H87M105 63h2.5\" stroke=\"#6B5F80\" stroke-width=\"2.5\"/>\n  </g>\n</svg>","badge":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 56\" width=\"200\" height=\"56\" role=\"img\" aria-label=\"EVA-01 HUD badge\">\n  \n  <path d=\"M12 1H178L199 28 178 55H12L1 28Z\" fill=\"currentColor\"/>\n  <path d=\"M12 1H178L199 28 178 55H12L1 28Z\" fill=\"none\" stroke=\"#050409\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M15 6H175L190 28 175 50H15L5 28Z\" fill=\"#050409\" fill-opacity=\".8\"/>\n  <path d=\"M15 6H175L190 28 175 50H15L5 28Z\" fill=\"none\" stroke=\"#B98BE0\" stroke-opacity=\".45\" stroke-width=\"1\"/>\n\n  \n  <path d=\"M22 9 34 16V36L22 43 10 36V16Z\" fill=\"#1A0B2E\" stroke=\"#6B5F80\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M22 14 28 17V24L22 27 16 24V17Z\" fill=\"#4B1D7A\"/>\n\n  \n  <path class=\"accent\" fill=\"#9DFF4A\" d=\"M14.5 27 28 22.8 29 30.5 15.5 34.7Z M40 40H118L115 43H40Z\"/>\n\n  <text x=\"40\" y=\"16\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"7.5\" letter-spacing=\"1.6\" fill=\"#6B5F80\">LAUNCH SEQUENCE</text>\n  <text x=\"40\" y=\"35\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"21\" font-weight=\"700\" letter-spacing=\"2.4\" fill=\"#E9E2F5\">EVA-01</text>\n  <text x=\"189\" y=\"35\" text-anchor=\"end\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"14\" letter-spacing=\"1\" fill=\"#B98BE0\">初号機</text>\n  <text x=\"189\" y=\"16\" text-anchor=\"end\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"7\" letter-spacing=\"1.4\" fill=\"#6B5F80\">SYNC 100%</text>\n  <path d=\"M172 45h13M175 49h10\" stroke=\"#6B5F80\" stroke-width=\"1.5\"/>\n</svg>","hazard":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" role=\"img\" aria-label=\"Seamless 45 degree hazard stripes\">\n  \n  <rect width=\"24\" height=\"24\" fill=\"#050409\"/>\n  <g stroke=\"#FFD400\" stroke-width=\"2.83\" stroke-linecap=\"butt\">\n    <path d=\"M -30 -54 L 54 30\"/>\n    <path d=\"M -30 -46 L 54 38\"/>\n    <path d=\"M -30 -38 L 54 46\"/>\n    <path d=\"M -30 -30 L 54 54\"/>\n    <path d=\"M -30 -22 L 54 62\"/>\n    <path d=\"M -30 -14 L 54 70\"/>\n    <path d=\"M -30 -6 L 54 78\"/>\n  </g>\n</svg>","waveform":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 220 28\" width=\"220\" height=\"28\" fill=\"none\" role=\"img\" aria-label=\"Sync ratio HUD waveform\">\n  \n  <path d=\"M8 25.5H212\" stroke=\"currentColor\" stroke-width=\"1\" opacity=\".35\"/>\n  <g stroke=\"currentColor\" stroke-width=\"1\" opacity=\".3\">\n    <path d=\"M8 22.5v3M56 22.5v3M104 22.5v3M152 22.5v3M200 22.5v3M212 22.5v3\"/>\n  </g>\n\n  \n  <g fill=\"currentColor\">\n    <rect x=\"17\" y=\"16\" width=\"6\" height=\"9\" opacity=\".55\"/>\n    <rect x=\"29\" y=\"10\" width=\"6\" height=\"15\"/>\n    <rect x=\"41\" y=\"19\" width=\"6\" height=\"6\" opacity=\".55\"/>\n    <rect x=\"53\" y=\"5\" width=\"6\" height=\"20\"/>\n    <rect x=\"65\" y=\"14\" width=\"6\" height=\"11\" opacity=\".7\"/>\n    <rect x=\"77\" y=\"8\" width=\"6\" height=\"17\"/>\n    <rect x=\"89\" y=\"21\" width=\"6\" height=\"4\" opacity=\".55\"/>\n    <rect x=\"101\" y=\"6\" width=\"6\" height=\"19\"/>\n    <rect x=\"113\" y=\"12\" width=\"6\" height=\"13\" opacity=\".7\"/>\n    <rect x=\"125\" y=\"4\" width=\"6\" height=\"21\"/>\n    <rect x=\"137\" y=\"17\" width=\"6\" height=\"8\" opacity=\".55\"/>\n    <rect x=\"149\" y=\"11\" width=\"6\" height=\"14\"/>\n    <rect x=\"161\" y=\"7\" width=\"6\" height=\"18\" opacity=\".85\"/>\n    <rect x=\"173\" y=\"18\" width=\"6\" height=\"7\" opacity=\".55\"/>\n    <rect x=\"185\" y=\"13\" width=\"6\" height=\"12\"/>\n    <rect x=\"197\" y=\"20\" width=\"6\" height=\"5\" opacity=\".7\"/>\n  </g>\n\n  \n  <path d=\"M122 3h12l-6 -2.5Z\" fill=\"currentColor\"/>\n  <path d=\"M65 16.5h6\" stroke=\"#050409\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M8 8V4h5M212 8V4h-5\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".6\"/>\n</svg>","pilotAvatar":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original nervous pilot bust: brown-haired boy in a white and blue plugsuit with red collar, round chest unit and two A10 nerve clips\">\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" opacity=\".5\" stroke-linecap=\"square\">\n    <path d=\"M4 24V9h15M116 24V9H101\"/>\n  </g>\n\n  \n  <path d=\"M6 120 16 104 34 96 48 96 44 120Z\" fill=\"#2F5FE0\" stroke=\"#6FA8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M114 120 104 104 86 96 72 96 76 120Z\" fill=\"#2F5FE0\" stroke=\"#6FA8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M20 108 26 102 28 105 22 111Z\" fill=\"#EAF0FA\"/>\n  <path d=\"M100 108 94 102 92 105 98 111Z\" fill=\"#EAF0FA\"/>\n  <path d=\"M12 114 16 110M108 114 104 110\" stroke=\"#6B7488\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M42 95H78L81 120H39Z\" fill=\"#EAF0FA\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M42 97 39 120M78 97 81 120\" stroke=\"#FF2D2D\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M53 70H67L70 93H50Z\" fill=\"#DCC0AC\" stroke=\"#B08A72\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54 73H66\" stroke=\"#C9A98F\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M46 83H74L79 95H41ZM53 86H67L68 91H52Z\" fill=\"#FF2D2D\" fill-rule=\"evenodd\" stroke=\"#1A0B2E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M57 92H63L62 96H58Z\" fill=\"#6B7488\" stroke=\"#BFD8FF\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M60 99 65 101.1 67 106.2 65 111.3 60 113.4 55 111.3 53 106.2 55 101.1Z\"\n        fill=\"#1A0B2E\" stroke=\"#BFD8FF\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 102 63 103.2 64 106.2 63 109.2 60 110.4 57 109.2 56 106.2 57 103.2Z\" fill=\"#FF6B1A\"/>\n  <circle cx=\"60\" cy=\"106.2\" r=\"2.3\" fill=\"#FFB347\"/>\n\n  \n  <path d=\"M44 102 48 102 48.5 106 48 110 44 110 43.5 106Z\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M51 110V102L49.5 103.5\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M60 2 84 8 93 28 92 52 86 46 84 56 78 50 42 50 36 56 34 46 28 52 27 28 36 8Z\"\n        fill=\"#5C3323\" stroke=\"#3F2116\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n        fill=\"#F0E2D4\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M36 43 30 41 30 52 37 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M84 43 90 41 90 52 83 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M33 45V50M87 45V50\" stroke=\"#C9A98F\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M37 33 40 17 52 11 59 19 65 12 78 14 87 24 89 35 82 31 80 22 73 25 75 34 68 27 65 20 61 29 57 21 52 30 47 24 43 34Z\"\n        fill=\"#5C3323\" stroke=\"#3F2116\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M45 19 53 14M67 15 77 19\" stroke=\"#7C472C\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M43 36.5 57 39.5\" stroke=\"#3F2116\" stroke-width=\"2.5\" stroke-linecap=\"butt\"/>\n  <path d=\"M77 37 63 41.5\" stroke=\"#3F2116\" stroke-width=\"3\" stroke-linecap=\"butt\"/>\n\n  \n  <path d=\"M45 46 58 44.5 57.5 52.5 47 54Z\" fill=\"#FFFBF4\"/>\n  <path d=\"M48.5 47.5 55.5 46.2 55.5 51.3 49 52.6Z\" fill=\"#3A2418\"/>\n  <path d=\"M75 46 62 44.5 62.5 52.5 73 54Z\" fill=\"#FFFBF4\"/>\n  <path d=\"M71.5 47.5 64.5 46.2 64.5 51.3 71 52.6Z\" fill=\"#3A2418\"/>\n\n  \n  <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M55.5 65.5 60 64.8 64.5 65.8 60 67.6Z\" fill=\"#B5735C\"/>\n\n  \n  <path d=\"M29 29 39 26 45 36 37 44 28 40Z\" fill=\"#EAF0FA\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M34 38 39 35 41 39 37 43Z\" fill=\"#FF6B1A\"/>\n  <path d=\"M28 29 24 22M28 40 24 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  <path d=\"M91 29 81 26 75 36 83 44 92 40Z\" fill=\"#EAF0FA\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M86 38 81 35 79 39 83 43Z\" fill=\"#FF6B1A\"/>\n  <path d=\"M92 29 96 22M92 40 96 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n</svg>","pilotPortrait":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 320\" width=\"240\" height=\"320\" fill=\"none\" role=\"img\" aria-label=\"Original half-body pilot portrait: nervous boy in a white and blue plugsuit with red collar, round chest unit, A10 clips and one raised gloved hand\">\n  <defs>\n    \n    <linearGradient id=\"pilotSuitGrade\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#3F73F0\"/>\n      <stop offset=\"1\" stop-color=\"#27479E\"/>\n    </linearGradient>\n  </defs>\n\n  \n  <g stroke=\"#FFB347\" stroke-linejoin=\"miter\">\n    <g opacity=\".13\" stroke-width=\"1.5\">\n      <path d=\"M120 76 182.4 112 182.4 184 120 220 57.6 184 57.6 112Z\"/>\n      <path d=\"M120 40 213.5 94 213.5 202 120 256 26.5 202 26.5 94Z\"/>\n    </g>\n    <path d=\"M120 30V300M30 150H210\" opacity=\".07\" stroke-width=\"1.5\"/>\n  </g>\n\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"2\" opacity=\".6\" stroke-linecap=\"square\">\n    <path d=\"M16 46V16h30M224 46V16h-30M16 274v30h30M224 274v30h-30\"/>\n  </g>\n  <g fill=\"#FFB347\" opacity=\".85\">\n    <path d=\"M20 20h4v4h-4zM216 20h4v4h-4zM20 296h4v4h-4zM216 296h4v4h-4z\"/>\n  </g>\n\n  \n  <path d=\"M78 190H162L178 232 182 320H58L62 232Z\" fill=\"url(#pilotSuitGrade)\" stroke=\"#6FA8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M62 238 76 206 98 196 106 214 84 228 72 248Z\" fill=\"#2F5FE0\" stroke=\"#6FA8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M178 238 164 206 142 196 134 214 156 228 168 248Z\" fill=\"#2F5FE0\" stroke=\"#6FA8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M86 212 96 205 100 212 90 219Z\" fill=\"#EAF0FA\"/>\n  <path d=\"M154 212 144 205 140 212 150 219Z\" fill=\"#EAF0FA\"/>\n  <path d=\"M72 234 82 220M168 234 158 220\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n  <path d=\"M68 236 80 212M172 236 160 212\" stroke=\"#FF2D2D\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M92 198H148L158 240 154 320H86L82 240Z\" fill=\"#EAF0FA\" stroke=\"#BFD8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M91 200 81 240 85 320M149 200 159 240 155 320\" stroke=\"#FF2D2D\" stroke-width=\"2.5\"/>\n\n  \n  <path d=\"M102 132H138L143 200H97Z\" fill=\"#DCC0AC\" stroke=\"#B08A72\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M104 140H136\" stroke=\"#C9A98F\" stroke-width=\"2.5\"/>\n\n  \n  <path d=\"M96 164H144L154 200H86ZM106 175H134L138 191H102Z\" fill=\"#FF2D2D\" fill-rule=\"evenodd\" stroke=\"#1A0B2E\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M108 193H132L128 203H112Z\" fill=\"#6B7488\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M120 226 134 232 140 246 134 260 120 266 106 260 100 246 106 232Z\"\n        fill=\"#1A0B2E\" stroke=\"#BFD8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M120 233 129 237 133 246 129 255 120 259 111 255 107 246 111 237Z\" fill=\"#FF6B1A\"/>\n  <circle cx=\"120\" cy=\"246\" r=\"5.5\" fill=\"#FFB347\"/>\n  <path d=\"M120 220V226M120 266V272M94 246H100M140 246H146\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M96 208 106 208 107 215 106 222 96 222 95 215Z\" stroke=\"#6B7488\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M115 222V208L111 211.5\" stroke=\"#6B7488\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M174 102 180 132 186 160 176 186 162 206\" stroke=\"#6B7488\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M178 136 184 137 183 143 177 142ZM180 160 186 161 185 167 179 166Z\" fill=\"#6B7488\" stroke=\"#BFD8FF\" stroke-width=\"1.5\"/>\n  <path d=\"M154 204H168L170 214H152Z\" fill=\"#6B7488\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M184 146h5v5h-5z\" fill=\"#FFB347\"/>\n\n  \n  <g transform=\"translate(30.5 31) scale(1.5)\">\n    \n    <path d=\"M60 2 84 8 93 28 92 52 86 46 84 56 78 50 42 50 36 56 34 46 28 52 27 28 36 8Z\"\n          fill=\"#5C3323\" stroke=\"#3F2116\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    \n    <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n          fill=\"#F0E2D4\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    \n    <path d=\"M36 43 30 41 30 52 37 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M84 43 90 41 90 52 83 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M33 45V50M87 45V50\" stroke=\"#C9A98F\" stroke-width=\"1.5\"/>\n    \n    <path d=\"M37 33 40 17 52 11 59 19 65 12 78 14 87 24 89 35 82 31 80 22 73 25 75 34 68 27 65 20 61 29 57 21 52 30 47 24 43 34Z\"\n          fill=\"#5C3323\" stroke=\"#3F2116\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M45 19 53 14M67 15 77 19\" stroke=\"#7C472C\" stroke-width=\"2\"/>\n    \n    <path d=\"M43 36.5 57 39.5\" stroke=\"#3F2116\" stroke-width=\"2.5\" stroke-linecap=\"butt\"/>\n    <path d=\"M77 37 63 41.5\" stroke=\"#3F2116\" stroke-width=\"2.8\" stroke-linecap=\"butt\"/>\n    \n    <path d=\"M45 46 58 44.5 57.5 52.5 47 54Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M48.5 47.5 55.5 46.2 55.5 51.3 49 52.6Z\" fill=\"#3A2418\"/>\n    <path d=\"M75 46 62 44.5 62.5 52.5 73 54Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M71.5 47.5 64.5 46.2 64.5 51.3 71 52.6Z\" fill=\"#3A2418\"/>\n    \n    <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M55.5 65.5 60 64.8 64.5 65.8 60 67.6Z\" fill=\"#B5735C\"/>\n    \n    <path d=\"M29 29 39 26 45 36 37 44 28 40Z\" fill=\"#EAF0FA\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M34 38 39 35 41 39 37 43Z\" fill=\"#FF6B1A\"/>\n    <path d=\"M28 29 24 22M28 40 24 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n    <path d=\"M91 29 81 26 75 36 83 44 92 40Z\" fill=\"#EAF0FA\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M86 38 81 35 79 39 83 43Z\" fill=\"#FF6B1A\"/>\n    <path d=\"M92 29 96 22M92 40 96 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  </g>\n\n  \n  <path d=\"M52 156V128H58V156Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M59 156V121H65V156Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M66 157V125H72V157Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M73 158V134H78V158Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M38 196H76L78 210H36Z\" fill=\"#EAF0FA\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M38 198H76\" stroke=\"#FF2D2D\" stroke-width=\"1.5\"/>\n  <path d=\"M56 198H74L75 206H58Z\" fill=\"#6B7488\"/>\n  <path d=\"M44 200 74 196 82 178 78 158 56 154 42 170Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M40 172 48 164 55 174 45 182Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M24 320 40 282 42 248 48 214 72 210 80 226 58 242 54 276 62 320Z\" fill=\"#27479E\" stroke=\"#6FA8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M34 300 40 288M50 256 54 244\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M166 262V284\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  <path d=\"M168 276H176V284H168Z\" fill=\"#6B7488\" stroke=\"#BFD8FF\" stroke-width=\"1.5\"/>\n  <path d=\"M156 284H180L182 310H154Z\" fill=\"#6B7488\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M160 290H176L177 300H159Z\" fill=\"#1A0B2E\"/>\n  <circle cx=\"164\" cy=\"295\" r=\"2.6\" fill=\"#050409\"/>\n  <circle cx=\"172\" cy=\"295\" r=\"2.6\" fill=\"#050409\"/>\n  <circle cx=\"164\" cy=\"295\" r=\"1\" fill=\"#FFB347\"/>\n  <circle cx=\"172\" cy=\"295\" r=\"1\" fill=\"#FFB347\"/>\n  <path d=\"M158 305H178\" stroke=\"#EAF0FA\" stroke-width=\"2\"/>\n</svg>","pilotCasual":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 320\" width=\"240\" height=\"320\" fill=\"none\" role=\"img\" aria-label=\"Original casual pilot illustration: brown-haired boy in a navy zip jacket and white tee, headphones around the neck and a blue cassette player in one hand\">\n  <defs>\n    \n    <linearGradient id=\"pilotCasualNavy\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#33477F\"/>\n      <stop offset=\"1\" stop-color=\"#182349\"/>\n    </linearGradient>\n  </defs>\n\n  \n  <path d=\"M0 0H58L150 320H84Z\" fill=\"#FFB347\" opacity=\".055\"/>\n  <path d=\"M0 0H20L88 320H44Z\" fill=\"#FFB347\" opacity=\".045\"/>\n  <path d=\"M186 26H226V70H186Z\" stroke=\"#FFB347\" stroke-width=\"1.5\" opacity=\".14\"/>\n  <path d=\"M186 62H226M196 34H216\" stroke=\"#FFB347\" stroke-width=\"1.5\" opacity=\".12\"/>\n\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"2\" opacity=\".6\" stroke-linecap=\"square\">\n    <path d=\"M16 46V16h30M224 46V16h-30M16 274v30h30M224 274v30h-30\"/>\n  </g>\n  <g fill=\"#FFB347\" opacity=\".85\">\n    <path d=\"M20 20h4v4h-4zM216 20h4v4h-4zM20 296h4v4h-4zM216 296h4v4h-4z\"/>\n  </g>\n\n  \n  <path d=\"M82 176H158L172 320H68Z\" fill=\"#EAF0FA\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M40 320 52 220 72 190 102 176 108 232 126 320Z\" fill=\"url(#pilotCasualNavy)\" stroke=\"#2E4176\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M200 320 188 220 168 190 138 176 132 232 114 320Z\" fill=\"url(#pilotCasualNavy)\" stroke=\"#2E4176\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M102 176 108 232 126 320M138 176 132 232 114 320\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n  <path d=\"M102 182H110V192H102Z\" fill=\"#FFB347\"/>\n  <path d=\"M56 246 64 270M184 246 176 270\" stroke=\"#2E4176\" stroke-width=\"2\"/>\n  <path d=\"M158 240H176V256H162Z\" stroke=\"#BFD8FF\" stroke-width=\"1.5\" opacity=\".7\"/>\n\n  \n  <path d=\"M96 162H144L150 182H90Z\" fill=\"#26376B\" stroke=\"#2E4176\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M100 178 114 166 124 186 112 200Z\" fill=\"#26376B\" stroke=\"#3B55A8\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M140 178 126 166 116 186 128 200Z\" fill=\"#26376B\" stroke=\"#3B55A8\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M102 132H138L143 180H97Z\" fill=\"#DCC0AC\" stroke=\"#B08A72\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M104 140H136\" stroke=\"#C9A98F\" stroke-width=\"2.5\"/>\n\n  \n  <path d=\"M86 188 96 174M154 188 144 174\" stroke=\"#1B2749\" stroke-width=\"6\"/>\n  <path d=\"M84 184 102 180 108 190 104 202 88 204 82 196Z\" fill=\"#1B2749\" stroke=\"#3B55A8\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M90 187 101 185 104 192 100 199 91 200Z\" fill=\"#050409\"/>\n  <path d=\"M90 189 101 187\" stroke=\"#2F5FE0\" stroke-width=\"2\"/>\n  <path d=\"M156 184 138 180 132 190 136 202 152 204 158 196Z\" fill=\"#1B2749\" stroke=\"#3B55A8\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M150 187 139 185 136 192 140 199 149 200Z\" fill=\"#050409\"/>\n  <path d=\"M150 189 139 187\" stroke=\"#2F5FE0\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M92 202 86 216 76 236 70 246\" stroke=\"#050409\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M6 320 20 290 34 272 52 266 66 276 58 292 42 300 36 320Z\" fill=\"url(#pilotCasualNavy)\" stroke=\"#2E4176\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M30 300 38 288M44 278 50 270\" stroke=\"#3B55A8\" stroke-width=\"2\"/>\n  <path d=\"M52 296 56 274 70 264 86 266 92 280 84 296 66 302Z\" fill=\"#F0E2D4\" stroke=\"#B78C71\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M56 246H80L84 276H54Z\" fill=\"#2F5FE0\" stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 252H76L78 264H59Z\" fill=\"#1A0B2E\"/>\n  <path d=\"M60 268H64V272H60ZM68 268H72V272H68Z\" fill=\"#BFD8FF\"/>\n  <circle cx=\"64\" cy=\"258\" r=\"2.6\" fill=\"#050409\"/>\n  <circle cx=\"72\" cy=\"258\" r=\"2.6\" fill=\"#050409\"/>\n  <circle cx=\"64\" cy=\"258\" r=\"1\" fill=\"#FFB347\"/>\n  <circle cx=\"72\" cy=\"258\" r=\"1\" fill=\"#FFB347\"/>\n  <path d=\"M55 270 63 270 62 278 53 277Z\" fill=\"#F0E2D4\" stroke=\"#B78C71\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M65 270 73 270 72 278 64 278Z\" fill=\"#F0E2D4\" stroke=\"#B78C71\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M75 270 82 270 81 277 74 278Z\" fill=\"#F0E2D4\" stroke=\"#B78C71\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M50 258 57 250 62 258 54 266Z\" fill=\"#F0E2D4\" stroke=\"#B78C71\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <g transform=\"translate(30.5 31) scale(1.5)\">\n    <path d=\"M60 2 84 8 93 28 92 52 86 46 84 56 78 50 42 50 36 56 34 46 28 52 27 28 36 8Z\"\n          fill=\"#5C3323\" stroke=\"#3F2116\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n          fill=\"#F0E2D4\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M36 43 30 41 30 52 37 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M84 43 90 41 90 52 83 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M33 45V50M87 45V50\" stroke=\"#C9A98F\" stroke-width=\"1.5\"/>\n    <path d=\"M37 33 40 17 52 11 59 19 65 12 78 14 87 24 89 35 82 31 80 22 73 25 75 34 68 27 65 20 61 29 57 21 52 30 47 24 43 34Z\"\n          fill=\"#5C3323\" stroke=\"#3F2116\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M45 19 53 14M67 15 77 19\" stroke=\"#7C472C\" stroke-width=\"2\"/>\n    <path d=\"M43 37.5 57 38.5M77 37.5 63 38.5\" stroke=\"#3F2116\" stroke-width=\"2.2\" stroke-linecap=\"butt\"/>\n    <path d=\"M45 46 58 44.5 57.5 52.5 47 54Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M48.5 47.5 55.5 46.2 55.5 51.3 49 52.6Z\" fill=\"#2F5FE0\"/>\n    <path d=\"M75 46 62 44.5 62.5 52.5 73 54Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M71.5 47.5 64.5 46.2 64.5 51.3 71 52.6Z\" fill=\"#2F5FE0\"/>\n    <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M56 65.8 60 66.4 64 65.8\" stroke=\"#B5735C\" stroke-width=\"2\" stroke-linecap=\"butt\"/>\n  </g>\n</svg>","asukaAvatar":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original confident twin-tail pilot avatar: orange haired girl in a red plugsuit with white and orange collar and A10 clips\">\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" opacity=\".5\" stroke-linecap=\"square\">\n    <path d=\"M4 24V9h15M116 24V9H101\"/>\n  </g>\n\n  \n  <path d=\"M6 120 16 104 36 95 50 95 44 120Z\" fill=\"#FF7A1A\" stroke=\"#FFB347\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M114 120 104 104 84 95 70 95 76 120Z\" fill=\"#FF7A1A\" stroke=\"#FFB347\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M20 110 26 104 29 107 23 113Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M100 110 94 104 91 107 97 113Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M12 114 16 110M108 114 104 110\" stroke=\"#D6293E\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M40 95H80L83 120H37Z\" fill=\"#D6293E\" stroke=\"#FF7A1A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M40 97 37 120M80 97 83 120\" stroke=\"#F4EDEF\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M53 70H67L70 93H50Z\" fill=\"#F0E2D4\" stroke=\"#B08A72\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54 73H66\" stroke=\"#C9A98F\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M42 81H78L84 96H36Z\" fill=\"#FF7A1A\" stroke=\"#2A0A10\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M47 84H73L77 95H43Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M56 87H64L63 93H57Z\" fill=\"#6B7488\"/>\n\n  \n  <path d=\"M60 99 65 101.1 67 105.8 65 110.5 60 112.6 55 110.5 53 105.8 55 101.1Z\"\n        fill=\"#2A0A10\" stroke=\"#F4EDEF\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 102 62.8 103.2 63.8 105.8 62.8 108.4 60 109.6 57.2 108.4 56.2 105.8 57.2 103.2Z\" fill=\"#FF7A1A\"/>\n  <circle cx=\"60\" cy=\"105.8\" r=\"2.2\" fill=\"#FFB347\"/>\n\n  \n  <path d=\"M41 101 44.5 101 45 105 44.5 109 41 109 40.5 105Z\" stroke=\"#F4EDEF\" stroke-width=\"1.2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M47 102 50.5 102 50.5 104 47 107 50.5 107M47 108.5H51\" stroke=\"#F4EDEF\" stroke-width=\"1.2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M32 30 18 48 20 72 28 92 40 98 44 74 42 48 38 34Z\" fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M34 40 30 66 36 86 38 70 36 48Z\" fill=\"#E8661A\"/>\n  <path d=\"M36 36 30 58\" stroke=\"#FFB347\" stroke-width=\"2\"/>\n  <path d=\"M88 30 102 48 100 72 92 92 80 98 76 74 78 48 82 34Z\" fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M86 40 90 66 84 86 82 70 84 48Z\" fill=\"#E8661A\"/>\n  <path d=\"M84 36 90 58\" stroke=\"#FFB347\" stroke-width=\"2\"/>\n  <path d=\"M33 27 41 25 43 33 35 35Z\" fill=\"#F4EDEF\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M87 27 79 25 77 33 85 35Z\" fill=\"#F4EDEF\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M60 2 84 8 93 28 92 52 86 46 84 56 78 50 42 50 36 56 34 46 28 52 27 28 36 8Z\"\n        fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n        fill=\"#F0E2D4\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M36 43 30 41 30 52 37 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M84 43 90 41 90 52 83 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M33 45V50M87 45V50\" stroke=\"#C9A98F\" stroke-width=\"1.5\"/>\n  <path d=\"M37 33 40 17 52 11 59 19 65 12 78 14 87 24 89 35 82 31 80 22 73 25 75 34 68 27 65 20 61 29 57 21 52 30 47 24 43 34Z\"\n        fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M37 33 34 46 40 52 44 40ZM83 33 86 46 80 52 76 40Z\" fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M45 19 53 14M67 15 77 19\" stroke=\"#FFB347\" stroke-width=\"2\"/>\n  <path d=\"M43 37 57 38.5M77 36.5 63 40.5\" stroke=\"#B44A0E\" stroke-width=\"2.5\" stroke-linecap=\"butt\"/>\n  <path d=\"M45 46.5 58 45 57.5 52 47 53.5Z\" fill=\"#FFFBF4\"/>\n  <path d=\"M48.5 48 55.5 46.8 55.5 51 49 52.2Z\" fill=\"#2F5FE0\"/>\n  <path d=\"M75 46.5 62 45 62.5 52 73 53.5Z\" fill=\"#FFFBF4\"/>\n  <path d=\"M71.5 48 64.5 46.8 64.5 51 71 52.2Z\" fill=\"#2F5FE0\"/>\n  <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M55 65.5 60 66.6 66 63.8\" stroke=\"#B5735C\" stroke-width=\"2.2\" stroke-linecap=\"butt\"/>\n\n  \n  <path d=\"M29 29 39 26 45 36 37 44 28 40Z\" fill=\"#F4EDEF\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M34 38 39 35 41 39 37 43Z\" fill=\"#FF7A1A\"/>\n  <path d=\"M28 29 24 22M28 40 24 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  <path d=\"M91 29 81 26 75 36 83 44 92 40Z\" fill=\"#F4EDEF\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M86 38 81 35 79 39 83 43Z\" fill=\"#FF7A1A\"/>\n  <path d=\"M92 29 96 22M92 40 96 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n</svg>","asukaPortrait":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 320\" width=\"240\" height=\"320\" fill=\"none\" role=\"img\" aria-label=\"Original half-body pilot portrait: confident twin-tail girl in a red plugsuit with orange and white collar, arms crossed\">\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"2\" opacity=\".6\" stroke-linecap=\"square\">\n    <path d=\"M16 46V16h30M224 46V16h-30M16 274v30h30M224 274v30h-30\"/>\n  </g>\n  <g fill=\"#FFB347\" opacity=\".85\">\n    <path d=\"M20 20h4v4h-4zM216 20h4v4h-4zM20 296h4v4h-4zM216 296h4v4h-4z\"/>\n  </g>\n\n  \n  <path d=\"M78 190H162L178 232 182 320H58L62 232Z\" fill=\"#D6293E\" stroke=\"#FF7A1A\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M62 238 76 206 98 196 106 214 84 228 72 248Z\" fill=\"#FF7A1A\" stroke=\"#FFB347\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M178 238 164 206 142 196 134 214 156 228 168 248Z\" fill=\"#FF7A1A\" stroke=\"#FFB347\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M86 212 96 205 100 212 90 219Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M154 212 144 205 140 212 150 219Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M92 200 86 320M148 200 154 320\" stroke=\"#F4EDEF\" stroke-width=\"2.5\"/>\n\n  \n  <path d=\"M102 132H138L143 186H97Z\" fill=\"#F0E2D4\" stroke=\"#B08A72\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M104 140H136\" stroke=\"#C9A98F\" stroke-width=\"2.5\"/>\n  \n  <path d=\"M88 156H152L160 194H80ZM108 170H132L136 184H104Z\" fill=\"#F4EDEF\" fill-rule=\"evenodd\" stroke=\"#FF7A1A\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M120 208 134 214 140 228 134 242 120 248 106 242 100 228 106 214Z\"\n        fill=\"#2A0A10\" stroke=\"#F4EDEF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M120 215 129 219 133 228 129 237 120 241 111 237 107 228 111 219Z\" fill=\"#FF7A1A\"/>\n  <circle cx=\"120\" cy=\"228\" r=\"4.5\" fill=\"#FFB347\"/>\n  <path d=\"M89 205 95 205 96 211 95 217 89 217 88 211Z\" stroke=\"#F4EDEF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M99 206H104V210L99 214H104M99 217H105\" stroke=\"#F4EDEF\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n\n  \n  <path d=\"M78 72 64 98 58 152 64 210 74 232 84 190 78 132 82 80Z\" fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M68 100 62 152 68 198 74 168 70 116Z\" fill=\"#E8661A\"/>\n  <path d=\"M74 88 64 132\" stroke=\"#FFB347\" stroke-width=\"3\"/>\n  <path d=\"M162 72 176 98 182 152 176 210 166 232 156 190 162 132 158 80Z\" fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M172 100 178 152 172 198 166 168 170 116Z\" fill=\"#E8661A\"/>\n  <path d=\"M166 88 176 132\" stroke=\"#FFB347\" stroke-width=\"3\"/>\n  <path d=\"M78 72 88 70 90 80 80 84Z\" fill=\"#F4EDEF\" stroke=\"#B44A0E\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M162 72 152 70 150 80 160 84Z\" fill=\"#F4EDEF\" stroke=\"#B44A0E\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M52 282 58 262 150 246 146 266Z\" fill=\"#D6293E\" stroke=\"#FF7A1A\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M144 244 158 248 154 268 140 264Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M152 246 172 250 174 264 164 274 152 268Z\" fill=\"#D6293E\" stroke=\"#FF7A1A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M158 252 168 254M159 260 169 262\" stroke=\"#F4EDEF\" stroke-width=\"1.5\"/>\n  <path d=\"M186 300 180 280 88 264 92 284Z\" fill=\"#D6293E\" stroke=\"#FF7A1A\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M76 262 90 266 86 286 72 282Z\" fill=\"#F4EDEF\"/>\n  <path d=\"M44 276 64 272 74 284 68 298 52 296 42 286Z\" fill=\"#D6293E\" stroke=\"#FF7A1A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M50 278 58 280M51 286 59 288\" stroke=\"#F4EDEF\" stroke-width=\"1.5\"/>\n\n  \n  <g transform=\"translate(30.5 31) scale(1.5)\">\n    <path d=\"M60 2 84 8 93 28 92 52 86 46 84 56 78 50 42 50 36 56 34 46 28 52 27 28 36 8Z\"\n          fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n          fill=\"#F0E2D4\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M36 43 30 41 30 52 37 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M84 43 90 41 90 52 83 53Z\" fill=\"#EAD3BF\" stroke=\"#C9A98F\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M33 45V50M87 45V50\" stroke=\"#C9A98F\" stroke-width=\"1.5\"/>\n    <path d=\"M37 33 40 17 52 11 59 19 65 12 78 14 87 24 89 35 82 31 80 22 73 25 75 34 68 27 65 20 61 29 57 21 52 30 47 24 43 34Z\"\n          fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M37 33 34 46 40 52 44 40ZM83 33 86 46 80 52 76 40Z\" fill=\"#FF7A1A\" stroke=\"#B44A0E\" stroke-width=\"1.2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M45 19 53 14M67 15 77 19\" stroke=\"#FFB347\" stroke-width=\"2\"/>\n    <path d=\"M43 37 57 38.5M77 36.5 63 40.5\" stroke=\"#B44A0E\" stroke-width=\"2.5\" stroke-linecap=\"butt\"/>\n    <path d=\"M45 46.5 58 45 57.5 52 47 53.5Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M48.5 48 55.5 46.8 55.5 51 49 52.2Z\" fill=\"#2F5FE0\"/>\n    <path d=\"M75 46.5 62 45 62.5 52 73 53.5Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M71.5 48 64.5 46.8 64.5 51 71 52.2Z\" fill=\"#2F5FE0\"/>\n    <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M55 65.5 60 66.6 66 63.8\" stroke=\"#B5735C\" stroke-width=\"2.2\" stroke-linecap=\"butt\"/>\n    <path d=\"M29 29 39 26 45 36 37 44 28 40Z\" fill=\"#F4EDEF\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M34 38 39 35 41 39 37 43Z\" fill=\"#FF7A1A\"/>\n    <path d=\"M28 29 24 22M28 40 24 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n    <path d=\"M91 29 81 26 75 36 83 44 92 40Z\" fill=\"#F4EDEF\" stroke=\"#6B7488\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M86 38 81 35 79 39 83 43Z\" fill=\"#FF7A1A\"/>\n    <path d=\"M92 29 96 22M92 40 96 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  </g>\n</svg>","reiAvatar":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original calm pilot avatar: short light-blue haired girl in a white plugsuit with ice-blue panels and red chest detail\">\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" opacity=\".5\" stroke-linecap=\"square\">\n    <path d=\"M4 24V9h15M116 24V9H101\"/>\n  </g>\n\n  \n  <path d=\"M6 120 16 104 36 95 50 95 44 120Z\" fill=\"#7FC4E8\" stroke=\"#EDF3FA\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M114 120 104 104 84 95 70 95 76 120Z\" fill=\"#7FC4E8\" stroke=\"#EDF3FA\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M20 110 26 104 29 107 23 113Z\" fill=\"#EDF3FA\"/>\n  <path d=\"M100 110 94 104 91 107 97 113Z\" fill=\"#EDF3FA\"/>\n  <path d=\"M12 114 16 110M108 114 104 110\" stroke=\"#3D7EA6\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M40 95H80L83 120H37Z\" fill=\"#EDF3FA\" stroke=\"#7FC4E8\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M40 97 37 120M80 97 83 120\" stroke=\"#3D7EA6\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M53 70H67L70 93H50Z\" fill=\"#F2E7DD\" stroke=\"#C5AA96\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54 73H66\" stroke=\"#D9C3B2\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M42 81H78L84 96H36Z\" fill=\"#EDF3FA\" stroke=\"#7FC4E8\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M47 84H73L77 95H43Z\" fill=\"#EAF0FA\"/>\n  <path d=\"M40 96H80\" stroke=\"#C93A4B\" stroke-width=\"2\"/>\n  <path d=\"M56 86H64L63 92H57Z\" fill=\"#C93A4B\"/>\n\n  \n  <path d=\"M60 99 65 101.1 67 105.8 65 110.5 60 112.6 55 110.5 53 105.8 55 101.1Z\"\n        fill=\"#3D7EA6\" stroke=\"#EDF3FA\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 102 62.8 103.2 63.8 105.8 62.8 108.4 60 109.6 57.2 108.4 56.2 105.8 57.2 103.2Z\" fill=\"#C93A4B\"/>\n  <circle cx=\"60\" cy=\"105.8\" r=\"2.2\" fill=\"#FF7A1A\"/>\n\n  \n  <path d=\"M41 101 44.5 101 45 105 44.5 109 41 109 40.5 105Z\" stroke=\"#3D7EA6\" stroke-width=\"1.2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M47 101 50.5 101 51 105 50.5 109 47 109 46.5 105Z\" stroke=\"#3D7EA6\" stroke-width=\"1.2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M60 3 82 8 90 26 91 47 88 62 82 68 76 54 72 47 48 47 44 54 38 68 32 62 29 47 30 26 38 8Z\"\n        fill=\"#7FC4E8\" stroke=\"#3D7EA6\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n        fill=\"#F2E7DD\" stroke=\"#C5AA96\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M38 33 42 18 52 13 60 16 68 13 78 18 82 33 76 35 70 31 64 35 58 31 52 35 46 31 41 36Z\"\n        fill=\"#7FC4E8\" stroke=\"#3D7EA6\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M46 18 56 15M66 15 76 19\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M43 38 57 38.5M77 38 63 38.5\" stroke=\"#3D7EA6\" stroke-width=\"2.2\" stroke-linecap=\"butt\"/>\n  <path d=\"M45 46.5 58 45 57.5 52 47 53.5Z\" fill=\"#FFFBF4\"/>\n  <path d=\"M48.5 48 55.5 46.8 55.5 51 49 52.2Z\" fill=\"#C93A4B\"/>\n  <path d=\"M75 46.5 62 45 62.5 52 73 53.5Z\" fill=\"#FFFBF4\"/>\n  <path d=\"M71.5 48 64.5 46.8 64.5 51 71 52.2Z\" fill=\"#C93A4B\"/>\n  <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M56 66H64\" stroke=\"#B5735C\" stroke-width=\"2\" stroke-linecap=\"butt\"/>\n\n  \n  <path d=\"M29 29 39 26 45 36 37 44 28 40Z\" fill=\"#EDF3FA\" stroke=\"#3D7EA6\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M34 38 39 35 41 39 37 43Z\" fill=\"#7FC4E8\"/>\n  <path d=\"M28 29 24 22M28 40 24 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  <path d=\"M91 29 81 26 75 36 83 44 92 40Z\" fill=\"#EDF3FA\" stroke=\"#3D7EA6\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M86 38 81 35 79 39 83 43Z\" fill=\"#7FC4E8\"/>\n  <path d=\"M92 29 96 22M92 40 96 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n</svg>","reiPortrait":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 320\" width=\"240\" height=\"320\" fill=\"none\" role=\"img\" aria-label=\"Original half-body pilot portrait: calm short light-blue haired girl in a white plugsuit with ice-blue panels, hands at her sides\">\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"2\" opacity=\".6\" stroke-linecap=\"square\">\n    <path d=\"M16 46V16h30M224 46V16h-30M16 274v30h30M224 274v30h-30\"/>\n  </g>\n  <g fill=\"#FFB347\" opacity=\".85\">\n    <path d=\"M20 20h4v4h-4zM216 20h4v4h-4zM20 296h4v4h-4zM216 296h4v4h-4z\"/>\n  </g>\n\n  \n  <path d=\"M78 190H162L178 232 182 320H58L62 232Z\" fill=\"#EDF3FA\" stroke=\"#BFD8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 320 64 234 80 192 106 198 100 252 88 320Z\" fill=\"#7FC4E8\" stroke=\"#BFD8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M180 320 176 234 160 192 134 198 140 252 152 320Z\" fill=\"#7FC4E8\" stroke=\"#BFD8FF\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M104 198 88 320M136 198 152 320\" stroke=\"#C93A4B\" stroke-width=\"2.5\"/>\n  <path d=\"M90 214 100 208 103 214 94 220Z\" fill=\"#EDF3FA\"/>\n  <path d=\"M150 214 140 208 137 214 146 220Z\" fill=\"#EDF3FA\"/>\n\n  \n  <path d=\"M102 132H138L143 200H97Z\" fill=\"#F2E7DD\" stroke=\"#C5AA96\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M104 140H136\" stroke=\"#D9C3B2\" stroke-width=\"2.5\"/>\n  \n  <path d=\"M88 156H152L160 194H80ZM108 170H132L136 184H104Z\" fill=\"#EDF3FA\" fill-rule=\"evenodd\" stroke=\"#7FC4E8\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M108 194H132L128 203H112Z\" fill=\"#C93A4B\" stroke=\"#EDF3FA\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M120 226 134 232 140 246 134 260 120 266 106 260 100 246 106 232Z\"\n        fill=\"#3D7EA6\" stroke=\"#EDF3FA\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M120 233 129 237 133 246 129 255 120 259 111 255 107 246 111 237Z\" fill=\"#C93A4B\"/>\n  <circle cx=\"120\" cy=\"246\" r=\"5\" fill=\"#FF7A1A\"/>\n  <path d=\"M120 220V226M120 266V272M94 246H100M140 246H146\" stroke=\"#EDF3FA\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M95 208 104 208 105 215 104 222 95 222 94 215Z\" stroke=\"#3D7EA6\" stroke-width=\"2.2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M110 208 119 208 120 215 119 222 110 222 109 215Z\" stroke=\"#3D7EA6\" stroke-width=\"2.2\" stroke-linejoin=\"miter\"/>\n\n\n  \n  <path d=\"M44 280 42 258 48 214 68 200 84 208 82 264 86 280Z\" fill=\"#EDF3FA\" stroke=\"#7FC4E8\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M42 276H88L90 288H40Z\" fill=\"#7FC4E8\" stroke=\"#BFD8FF\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M46 288 84 288 88 300 80 314 54 316 44 304Z\" fill=\"#F2E7DD\" stroke=\"#C5AA96\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54 296V312M64 294V314M74 296V312\" stroke=\"#C5AA96\" stroke-width=\"1.5\"/>\n  <path d=\"M196 280 198 258 192 214 172 200 156 208 158 264 154 280Z\" fill=\"#EDF3FA\" stroke=\"#7FC4E8\" stroke-width=\"2.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M198 276H152L150 288H200Z\" fill=\"#7FC4E8\" stroke=\"#BFD8FF\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M194 288 156 288 152 300 160 314 186 316 196 304Z\" fill=\"#F2E7DD\" stroke=\"#C5AA96\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M186 296V312M176 294V314M166 296V312\" stroke=\"#C5AA96\" stroke-width=\"1.5\"/>\n\n  \n  <g transform=\"translate(30.5 31) scale(1.5)\">\n    <path d=\"M60 3 82 8 90 26 91 47 88 62 82 68 76 54 72 47 48 47 44 54 38 68 32 62 29 47 30 26 38 8Z\"\n          fill=\"#7FC4E8\" stroke=\"#3D7EA6\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M60 16 76 20 84 33 83 49 78 62 70 71 60 78 50 71 42 62 37 49 36 33 44 20Z\"\n          fill=\"#F2E7DD\" stroke=\"#C5AA96\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M38 33 42 18 52 13 60 16 68 13 78 18 82 33 76 35 70 31 64 35 58 31 52 35 46 31 41 36Z\"\n          fill=\"#7FC4E8\" stroke=\"#3D7EA6\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n    <path d=\"M46 18 56 15M66 15 76 19\" stroke=\"#BFD8FF\" stroke-width=\"2\"/>\n    <path d=\"M43 38 57 38.5M77 38 63 38.5\" stroke=\"#3D7EA6\" stroke-width=\"2.2\" stroke-linecap=\"butt\"/>\n    <path d=\"M45 46.5 58 45 57.5 52 47 53.5Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M48.5 48 55.5 46.8 55.5 51 49 52.2Z\" fill=\"#C93A4B\"/>\n    <path d=\"M75 46.5 62 45 62.5 52 73 53.5Z\" fill=\"#FFFBF4\"/>\n    <path d=\"M71.5 48 64.5 46.8 64.5 51 71 52.2Z\" fill=\"#C93A4B\"/>\n    <path d=\"M60 52V57L62.5 59.8\" stroke=\"#C0917A\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M56 66H64\" stroke=\"#B5735C\" stroke-width=\"2\" stroke-linecap=\"butt\"/>\n    <path d=\"M29 29 39 26 45 36 37 44 28 40Z\" fill=\"#EDF3FA\" stroke=\"#3D7EA6\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M34 38 39 35 41 39 37 43Z\" fill=\"#7FC4E8\"/>\n    <path d=\"M28 29 24 22M28 40 24 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n    <path d=\"M91 29 81 26 75 36 83 44 92 40Z\" fill=\"#EDF3FA\" stroke=\"#3D7EA6\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n    <path d=\"M86 38 81 35 79 39 83 43Z\" fill=\"#7FC4E8\"/>\n    <path d=\"M92 29 96 22M92 40 96 46\" stroke=\"#6B7488\" stroke-width=\"2.5\"/>\n  </g>\n</svg>","head02":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original Unit-02 style mecha head emblem recolour\">\n  \n  <defs>\n    <linearGradient id=\"eva02HeadArmor\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#E2323F\"/>\n      <stop offset=\".58\" stop-color=\"#A81F30\"/>\n      <stop offset=\"1\" stop-color=\"#2A0A10\"/>\n    </linearGradient>\n  </defs>\n\n  \n  <g stroke=\"#8A6E6E\" stroke-width=\"1.5\" opacity=\".5\">\n    <path d=\"M3 90h10M3 96h6M107 90h10M111 96h6M3 83h4M113 83h4\"/>\n  </g>\n\n  \n  <path d=\"M44 24 31 15 28 21 39 30Z\" fill=\"#2A0A10\" stroke=\"#E2323F\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M76 24 89 15 92 21 81 30Z\" fill=\"#2A0A10\" stroke=\"#E2323F\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M54 25 64 23.5 67.5 1.5 60 3Z\" fill=\"#E2323F\" stroke=\"#FF8A73\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M58 22.5 63 22 65 8 62 8.5Z\" fill=\"#A81F30\"/>\n  \n\n  \n  <g stroke=\"#A81F30\" stroke-width=\"2\" stroke-linejoin=\"miter\">\n    <path d=\"M8 118 20 97 48 91 56 104 54 118Z\" fill=\"#2A0A10\"/>\n    <path d=\"M112 118 100 97 72 91 64 104 66 118Z\" fill=\"#2A0A10\"/>\n  </g>\n  <path d=\"M17 105 24 100 27 103 20 108Z\" fill=\"#FF6B1A\"/>\n  <path d=\"M103 105 96 100 93 103 100 108Z\" fill=\"#FF6B1A\"/>\n  <path d=\"M28 96 36 94M92 96 84 94\" stroke=\"#8A6E6E\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M53 78H67L69 95H51Z\" fill=\"#8A6E6E\" stroke=\"#3A1418\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54.5 82H65.5M54 87.5H66\" stroke=\"#3A1418\" stroke-width=\"1.5\"/>\n  <path d=\"M46 92H74L80 107H40Z\" fill=\"#A81F30\" stroke=\"#FF8A73\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M51 96H69L71 102H49Z\" fill=\"#140306\"/>\n  <path d=\"M58 98h4v3h-4Z\" fill=\"#FF6B1A\"/>\n\n  \n  <path d=\"M52 15 68 15 78 21 87 38 84 50 88 62 79 79 67 88 53 88 41 79 32 62 36 50 33 38 42 21Z\"\n        fill=\"url(#eva02HeadArmor)\" stroke=\"#FF8A73\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <g stroke=\"#8A6E6E\" stroke-width=\"1.5\" stroke-linecap=\"square\">\n    <path d=\"M36.5 48 41.5 48M35.5 53 40.5 53.6M34.5 58 39.5 58.6\"/>\n  </g>\n\n  \n  <path d=\"M45 26 75 26 79 40 60 44 41 40Z\" fill=\"#E2323F\" stroke=\"#FF8A73\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 28.5v13\" stroke=\"#F4EDEF\" stroke-width=\"1.5\"/>\n  <path d=\"M50 32.5 56.5 32.5M70 32.5 63.5 32.5\" stroke=\"#FF8A73\" stroke-width=\"1.5\"/>\n  <path d=\"M45.5 30.5h3v3h-3Z\" fill=\"#140306\" stroke=\"#FF6B1A\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M43 41 77 41 73 66 47 66Z\" fill=\"#140306\" stroke=\"#3A1418\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M44 44 76 44\" stroke=\"#2A0A10\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M60 40 77 40 73 66 60 66Z\" fill=\"#A81F30\" stroke=\"#FF8A73\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M64 44 70 45 68 58 63 62Z\" fill=\"#E2323F\"/>\n  <path d=\"M64 66 70 64.5\" stroke=\"#FF8A73\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M44.5 48.5 59.8 46 60.2 55.5 46 58.5Z\" fill=\"#FF6B1A\" stroke=\"#FFE066\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M45.5 49.7 59 47.3\" stroke=\"#FFF0A0\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M47 66 73 66 77 77 67 87 53 87 43 77Z\" fill=\"#2A0A10\" stroke=\"#FF8A73\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 67.5v6\" stroke=\"#FF8A73\" stroke-width=\"1\"/>\n  <g fill=\"#140306\">\n    <path d=\"M51 77 53.4 76.6 53.8 84.5 51.6 84.9Z\"/>\n    <path d=\"M55.2 76.6 57.6 76.2 58 84.1 55.8 84.5Z\"/>\n    <path d=\"M59.4 76.2 61.8 75.9 62.2 83.7 60 84.1Z\"/>\n    <path d=\"M63.6 75.9 66 75.6 66.2 83.3 64.2 83.6Z\"/>\n  </g>\n\n  \n  <circle cx=\"90\" cy=\"61\" r=\"7\" fill=\"#2A0A10\" stroke=\"#8A6E6E\" stroke-width=\"2\"/>\n  <circle cx=\"90\" cy=\"61\" r=\"2.8\" fill=\"#FF6B1A\"/>\n  <path d=\"M90 53.5v2M90 66.5v2M82.5 61h2M95.5 61h2\" stroke=\"#8A6E6E\" stroke-width=\"1.5\"/>\n  <path d=\"M97 58.5 104 56 106 63 99 65.5Z\" fill=\"#8A6E6E\" stroke=\"#3A1418\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M98.5 60 103 58.6\" stroke=\"#FF6B1A\" stroke-width=\"2\"/>\n</svg>","head00":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original Unit-03 style mecha head emblem recolour\">\n  \n  <defs>\n    <linearGradient id=\"eva03HeadArmor\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#EDF3FA\"/>\n      <stop offset=\".58\" stop-color=\"#BFD8FF\"/>\n      <stop offset=\"1\" stop-color=\"#0A1018\"/>\n    </linearGradient>\n  </defs>\n\n  \n  <g stroke=\"#3D7EA6\" stroke-width=\"1.5\" opacity=\".5\">\n    <path d=\"M3 90h10M3 96h6M107 90h10M111 96h6M3 83h4M113 83h4\"/>\n  </g>\n\n  \n  <path d=\"M44 24 31 15 28 21 39 30Z\" fill=\"#0A1018\" stroke=\"#EDF3FA\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M76 24 89 15 92 21 81 30Z\" fill=\"#0A1018\" stroke=\"#EDF3FA\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M54 25 64 23.5 67.5 1.5 60 3Z\" fill=\"#EDF3FA\" stroke=\"#7FC4E8\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M58 22.5 63 22 65 8 62 8.5Z\" fill=\"#BFD8FF\"/>\n  \n\n  \n  <g stroke=\"#BFD8FF\" stroke-width=\"2\" stroke-linejoin=\"miter\">\n    <path d=\"M8 118 20 97 48 91 56 104 54 118Z\" fill=\"#0A1018\"/>\n    <path d=\"M112 118 100 97 72 91 64 104 66 118Z\" fill=\"#0A1018\"/>\n  </g>\n  <path d=\"M17 105 24 100 27 103 20 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M103 105 96 100 93 103 100 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M28 96 36 94M92 96 84 94\" stroke=\"#3D7EA6\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M53 78H67L69 95H51Z\" fill=\"#3D7EA6\" stroke=\"#14202E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54.5 82H65.5M54 87.5H66\" stroke=\"#14202E\" stroke-width=\"1.5\"/>\n  <path d=\"M46 92H74L80 107H40Z\" fill=\"#BFD8FF\" stroke=\"#7FC4E8\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M51 96H69L71 102H49Z\" fill=\"#05080D\"/>\n  <path d=\"M58 98h4v3h-4Z\" fill=\"#FF7A1A\"/>\n\n  \n  <path d=\"M52 15 68 15 78 21 87 38 84 50 88 62 79 79 67 88 53 88 41 79 32 62 36 50 33 38 42 21Z\"\n        fill=\"url(#eva03HeadArmor)\" stroke=\"#7FC4E8\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <g stroke=\"#3D7EA6\" stroke-width=\"1.5\" stroke-linecap=\"square\">\n    <path d=\"M36.5 48 41.5 48M35.5 53 40.5 53.6M34.5 58 39.5 58.6\"/>\n  </g>\n\n  \n  <path d=\"M45 26 75 26 79 40 60 44 41 40Z\" fill=\"#EDF3FA\" stroke=\"#7FC4E8\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 28.5v13\" stroke=\"#EDF3FA\" stroke-width=\"1.5\"/>\n  <path d=\"M50 32.5 56.5 32.5M70 32.5 63.5 32.5\" stroke=\"#7FC4E8\" stroke-width=\"1.5\"/>\n  <path d=\"M45.5 30.5h3v3h-3Z\" fill=\"#05080D\" stroke=\"#FF7A1A\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M43 41 77 41 73 66 47 66Z\" fill=\"#05080D\" stroke=\"#14202E\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M44 44 76 44\" stroke=\"#0A1018\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M60 40 77 40 73 66 60 66Z\" fill=\"#BFD8FF\" stroke=\"#7FC4E8\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M64 44 70 45 68 58 63 62Z\" fill=\"#EDF3FA\"/>\n  <path d=\"M64 66 70 64.5\" stroke=\"#7FC4E8\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M44.5 48.5 59.8 46 60.2 55.5 46 58.5Z\" fill=\"#FF7A1A\" stroke=\"#FFB347\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M45.5 49.7 59 47.3\" stroke=\"#FFD400\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M47 66 73 66 77 77 67 87 53 87 43 77Z\" fill=\"#0A1018\" stroke=\"#7FC4E8\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 67.5v6\" stroke=\"#7FC4E8\" stroke-width=\"1\"/>\n  <g fill=\"#05080D\">\n    <path d=\"M51 77 53.4 76.6 53.8 84.5 51.6 84.9Z\"/>\n    <path d=\"M55.2 76.6 57.6 76.2 58 84.1 55.8 84.5Z\"/>\n    <path d=\"M59.4 76.2 61.8 75.9 62.2 83.7 60 84.1Z\"/>\n    <path d=\"M63.6 75.9 66 75.6 66.2 83.3 64.2 83.6Z\"/>\n  </g>\n\n  \n  <circle cx=\"90\" cy=\"61\" r=\"7\" fill=\"#0A1018\" stroke=\"#3D7EA6\" stroke-width=\"2\"/>\n  <circle cx=\"90\" cy=\"61\" r=\"2.8\" fill=\"#FF7A1A\"/>\n  <path d=\"M90 53.5v2M90 66.5v2M82.5 61h2M95.5 61h2\" stroke=\"#3D7EA6\" stroke-width=\"1.5\"/>\n  <path d=\"M97 58.5 104 56 106 63 99 65.5Z\" fill=\"#3D7EA6\" stroke=\"#14202E\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M98.5 60 103 58.6\" stroke=\"#FF7A1A\" stroke-width=\"2\"/>\n</svg>","atField":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" width=\"240\" height=\"240\" fill=\"none\" color=\"#FFB347\" role=\"img\" aria-label=\"AT-field hexagon line motif\">\n  \n  <g stroke=\"currentColor\" stroke-linejoin=\"miter\" stroke-width=\"2\">\n    <path d=\"M120 6 218.7 63 218.7 177 120 234 21.3 177 21.3 63Z\" opacity=\".22\"/>\n    <path d=\"M120 34 186.5 72.4 186.5 149.6 120 188 53.5 149.6 53.5 72.4Z\" opacity=\".3\"/>\n    <path d=\"M120 60 153.9 79.6 153.9 118.8 120 138.4 86.1 118.8 86.1 79.6Z\" opacity=\".4\"/>\n  </g>\n  \n  <g stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".28\">\n    <path d=\"M120 6V34M120 188V234M21.3 63 53.5 72.4M186.5 72.4 218.7 63M21.3 177 53.5 149.6M186.5 149.6 218.7 177\"/>\n  </g>\n  \n  <g stroke=\"currentColor\" stroke-width=\"2\" opacity=\".55\">\n    <path d=\"M104 120H136M120 104V136\"/>\n  </g>\n</svg>","a10Clip":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" role=\"img\" aria-label=\"A10 nerve clip icon\">\n  \n  <path d=\"M5 4H19V8H16.5V20H13.5V8H10.5V20H7.5V8H5Z\" fill=\"currentColor\"/>\n  \n  <path d=\"M12 4V1.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"butt\"/>\n</svg>"};

    /* ------------------------------------------------------------------ *
     * Page-local signals and the tiny persistence they need.
     * ------------------------------------------------------------------ */
    const FX_KEY = 'eva01.hud.fx';
    const BERSERK_KEY = 'eva01.berserk';
    const SOUND_KEY = 'eva01.sound';
    const GATE_KEY = 'eva01.gate';
    const PILOT_KEY = 'eva01.pilot';
    const ASSET_VERSION = '1.4.1';

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


    const audio = createEvaAudio();

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
      if (soundSignal.get()) {
        audio.unlock().then((ok) => {
          if (ok) sayLine('gate');
        });
      }
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

    // All pilots share one armoured system cue; captions are NERV status
    // read-outs rather than character dialogue.
    const SYSTEM_LINES = {
      gate: { jp: 'パイロット、承認待ち', zh: '等待驾驶员确认' },
      boot: { jp: 'システム、起動', zh: '系统，启动' },
      pilot: { jp: 'パイロット、搭乗', zh: '驾驶员，登机' },
      plug: { jp: 'プラグ、接続', zh: '插入栓，连接' },
      neural: { jp: '神経接続', zh: '神经连接' },
      sync: { jp: 'シンクロ率、上昇', zh: '同步率，上升' },
      activate: { jp: '機体、起動', zh: '机体，启动' },
      launch: { jp: '発進', zh: '出发' },
      welcome: { jp: '接続完了', zh: '连接完成' },
      berserk_on: { jp: '警告、制御不能', zh: '警告，控制失效' },
      berserk_off: { jp: '制御、復帰', zh: '控制，恢复' },
    };

    function sayLine(key) {
      const line = SYSTEM_LINES[key];
      if (!line) return;
      captionSeq += 1;
      const current = captionSeq;
      captionSignal.set({ id: current, jp: line.jp, zh: line.zh });
      clearTimeout(captionTimer);
      captionTimer = setTimeout(() => {
        if (captionSeq === current) captionSignal.set(null);
      }, 3600);
      if (soundSignal.get()) audio.systemCue(key);
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
      const total = scenes.reduce((sum, scene) => sum + scene.ms, 0);
      const [elapsed, setElapsed] = useState(0);
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

      const start = () => {
        if (started) return;
        setStarted(true);
        if (soundSignal.get()) {
          audio.unlock().then((ok) => {
            if (ok) audio.startAngel();
          });
        }
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
          h('svg', { viewBox: '0 0 200 340', fill: 'none' },
            h('path', {
              d: 'M100 16 132 50 122 98 100 114 78 98 68 50Z',
              fill: '#ded8ea', opacity: '0.9',
            }),
            h('path', { d: 'M76 66 124 66M100 40v54', stroke: '#ff2d2d', 'stroke-width': '2' }),
            h('path', {
              d: 'M92 114h16l12 88-10 122h-20l-10-122z',
              fill: '#b9b2c9', opacity: '0.8',
            }),
            h('path', { d: 'M86 122 52 196 64 210 96 160Z', fill: '#9a92ab', opacity: '0.7' }),
            h('path', { d: 'M114 122 148 196 136 210 104 160Z', fill: '#9a92ab', opacity: '0.7' }),
            h('circle', { cx: '100', cy: '154', r: '9', fill: '#ff1a1a' }),
            h('path', { d: 'M78 292l22 18 22-18', stroke: '#ded8ea', 'stroke-width': '2', opacity: '0.5' })),
        ),
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
                h('em', null, 'CLICK TO START · 音声 ON'))),
        h('span', { className: 'eva-angel__scan' }),
        h('span', { className: 'eva-angel__flash' }),
        h('span', { className: 'eva-angel__frame' }));
    }

    function PilotGate(props) {
      const pilot = usePilot();
      const [picked, setPicked] = useState(false);
      const [sync, setSync] = useState(0);
      const [ready, setReady] = useState(false);
      const started = useRef(false);

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
            h('div', { className: 'eva-gate__pilots' },
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
              h('i', null, 'A10 · LCL · ' + pilot.unitEn + ' · SYSTEM AUDIO')),
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
      return h('div', { className: 'eva-comm', key: caption.id },
        h(Art, { name: 'a10Clip', className: 'eva-comm__systemIcon' }),
        h('span', { className: 'eva-comm__body' },
          h('span', { className: 'eva-comm__who' }, 'NERV SYSTEM · 装甲音声'),
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
    function Hud() {
      const fx = useSignal(fxSignal);
      const berserk = useSignal(berserkSignal);
      const sound = useSignal(soundSignal);
      const caption = useSignal(captionSignal);
      const pilot = usePilot();
      const [alarm, setAlarm] = useState(true);
      const [gate, setGate] = useState(true);
      const [run, setRun] = useState(-1);
      const [finished, setFinished] = useState(-1);
      const [burstRun, setBurstRun] = useState(0);
      const [burstDone, setBursted] = useState(0);
      const soundRef = useRef(sound);
      const lastBerserk = useRef(berserk);
      soundRef.current = sound;

      const startFromGate = (withSound) => {
        if (withSound && soundRef.current) {
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

      useEffect(() => {
        if (berserk === lastBerserk.current) return;
        lastBerserk.current = berserk;
        audio.setBerserk(berserk);
        if (berserk) {
          audio.sfx('alarm');
          sayLine('berserk_on');
        } else {
          sayLine('berserk_off');
        }
      }, [berserk]);

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
          h('span', { className: 'eva-hud__vignette' })),
        alarm ? h(AngelIntro, { onDone: () => setAlarm(false) })
          : gate ? h(PilotGate, { onStart: startFromGate }) : null,
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
      const [balance, setBalance] = useState({ state: 'loading' });

      useEffect(() => {
        let alive = true;
        let attempts = 0;
        let retryTimer = 0;
        const load = (force) => {
          const url = '/dsh-eva-unit-01/balance.json' + (force ? '?refresh=1' : '');
          fetch(url, { headers: { accept: 'application/json' }, credentials: 'same-origin' })
            .then((response) => response.json())
            .then((data) => {
              attempts = 0;
              if (alive) setBalance(data && typeof data === 'object' ? data : { ok: false });
            })
            .catch(() => {
              if (!alive) return;
              setBalance({ ok: false, code: 'OFFLINE' });
              // The host route can appear a moment after the client module, so
              // retry a few times before settling on OFFLINE.
              if (attempts < 3) {
                attempts += 1;
                clearTimeout(retryTimer);
                retryTimer = setTimeout(() => load(false), 2500);
              }
            });
        };
        load(false);
        const timer = setInterval(() => load(false), 60000);
        return () => {
          alive = false;
          clearTimeout(retryTimer);
          clearInterval(timer);
        };
      }, []);

      const refresh = () => {
        setBalance({ state: 'loading' });
        fetch('/dsh-eva-unit-01/balance.json?refresh=1', {
          headers: { accept: 'application/json' },
          credentials: 'same-origin',
        })
          .then((response) => response.json())
          .then((data) => setBalance(data && typeof data === 'object' ? data : { ok: false }))
          .catch(() => setBalance({ ok: false, code: 'OFFLINE' }));
      };

      const balanceText = balance && balance.ok
        ? balance.text
        : balance && balance.code === 'NO_KEY'
          ? 'NO KEY'
          : balance && balance.code
            ? balance.code
            : '···';

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
        h('span', { className: 'eva-desk__cell eva-desk__cell--balance' },
          h('i', null, 'BALANCE'),
          h('b', { className: 'eva-desk__value' }, balanceText),
          h('button', {
            type: 'button',
            className: 'eva-desk__refresh',
            title: '刷新余额 / REFRESH',
            'aria-label': '刷新余额',
            onClick: refresh,
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
          h('span', { className: 'eva-status__pilot' },
            h(PilotImage, { pilot, kind: 'avatar', className: 'eva-status__pilotAvatar' }),
            h('b', null, 'PILOT ' + pilot.no),
            h('i', { className: 'eva-status__heart' }, '♥')),
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
      const pilot = usePilot();
      return h('span', {
        className: 'eva-headtag',
        'data-berserk': berserk ? '1' : '0',
        'aria-hidden': true,
      },
        h('span', { className: 'eva-headtag__led' }),
        h('span', { className: 'eva-headtag__unit' }, 'EVA-' + pilot.unit),
        h('span', { className: 'eva-headtag__sub' }, berserk ? 'BERSERK' : 'PILOT ' + pilot.no));
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

        // Audio engine: original synthesised score + SFX + system TTS.  The
        // AudioContext is only created after a user gesture (gate / replay /
        // sound button), never during page start.
        ctx.effect(() => {
          audio.setEnabled(readSound());
          return () => {
            clearTimeout(captionTimer);
            audio.dispose();
          };
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
        ctx.slots.inject('conversation.header.leading', replaceSingle('conversation.header.leading', HeaderTag));

        ctx.slots.inject('sidebar.brand.mark', replaceSingle('sidebar.brand.mark', BrandMark));
        ctx.slots.inject('sidebar.brand.name', replaceSingle('sidebar.brand.name', BrandName));
        ctx.slots.inject(
          'conversation.hero.brand.mark',
          replaceSingle('conversation.hero.brand.mark', HeroMark),
        );

        ctx.slots.inject('conversation.input.dock', () => {
          const desk = ctx.slots.register({ name: 'conversation.input.dock', id: 'eva-01-desk', order: 39 }, Workbench);
          const rail = ctx.slots.register({ name: 'conversation.input.dock', id: 'eva-01-rail', order: 40 }, ComposerRail);
          return () => {
            desk();
            rail();
          };
        });

        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register({ name: 'sidebar.footer.action', id: 'eva-01-controls', order: 40 }, FooterActions));
      },
    };
  },
});
