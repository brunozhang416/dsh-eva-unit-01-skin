window.__ModuleLoader__.load({
  id: 'dsh-eva-unit-01-skin',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useRef, useState } = React;

    /* ------------------------------------------------------------------ *
     * Generated payload — build.mjs injects the stylesheet and artwork.
     * ------------------------------------------------------------------ */
    const CSS = "/* =====================================================================\n   EVA UNIT-01 LAUNCH SKIN  ·  DeepSeek Harness Web GUI\n   Palette: void black / NERV violet / unit green / signal amber\n   Structure: this stylesheet ships inside the plugin's Client bundle and\n   is rendered by the HUD component, so unmounting the plugin removes it.\n   Host surfaces are re-coloured through --dsw-alias-* tokens (see\n   client.template.js TOKENS); literal colours below are artwork/ambience\n   for the EVA frame, brand marks and boot sequence.\n   ===================================================================== */\n\n:root {\n  --eva-void: #050409;\n  --eva-ink: #0a0616;\n  --eva-deep: #1a0b2e;\n  --eva-mid: #4b1d7a;\n  --eva-hot: #7a2fb0;\n  --eva-lilac: #b98be0;\n  --eva-bone: #e9e2f5;\n  --eva-steel: #6b5f80;\n  --eva-green: #9dff4a;\n  --eva-signal: #4dffb0;\n  --eva-acid: #c6ff00;\n  --eva-orange: #ff6b1a;\n  --eva-red: #ff2d2d;\n  --eva-hazard: #ffd400;\n  --eva-amber: #ffb347;\n  --eva-font-hud: ui-monospace, \"SF Mono\", SFMono-Regular, Menlo, \"Cascadia Code\", Consolas,\n    \"Liberation Mono\", \"PingFang SC\", \"Hiragino Sans GB\", monospace;\n  --eva-font-display: \"DIN Condensed\", \"Avenir Next Condensed\", \"Arial Narrow\", \"Helvetica Neue\",\n    \"PingFang SC\", \"Hiragino Sans GB\", sans-serif;\n  --eva-cut: 10px;\n}\n\n/* ---------- global ambience ---------- */\n\n::selection {\n  background: rgba(157, 255, 74, 0.85);\n  color: #050409;\n}\n\n* {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(122, 47, 176, 0.8) transparent;\n}\n\n::-webkit-scrollbar {\n  width: 9px;\n  height: 9px;\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n::-webkit-scrollbar-thumb {\n  background: linear-gradient(180deg, #4b1d7a, #7a2fb0);\n  border: 2px solid transparent;\n  background-clip: content-box;\n  border-radius: 9px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: linear-gradient(180deg, #7a2fb0, #9dff4a);\n  background-clip: content-box;\n}\n\nbody {\n  background-color: var(--dsw-alias-bg-base);\n  background-attachment: fixed;\n}\n\nbody[data-ds-dark-theme] {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(122, 47, 176, 0.26), transparent 62%),\n    radial-gradient(820px 560px at 92% 112%, rgba(77, 255, 176, 0.07), transparent 64%),\n    repeating-linear-gradient(0deg, rgba(233, 226, 245, 0.026) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(233, 226, 245, 0.026) 0 1px, transparent 1px 46px);\n}\n\nbody:not([data-ds-dark-theme]) {\n  background-image:\n    radial-gradient(1100px 640px at 16% -12%, rgba(106, 31, 168, 0.1), transparent 62%),\n    repeating-linear-gradient(0deg, rgba(75, 29, 122, 0.045) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(75, 29, 122, 0.045) 0 1px, transparent 1px 46px);\n}\n\nbody {\n  --dsw-focus-ring-color: rgba(157, 255, 74, 0.9);\n}\n\n/* =====================================================================\n   FRAME HUD (shell.overlay)\n   ===================================================================== */\n\n.eva-hud {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  font-family: var(--eva-font-hud);\n  color: var(--eva-green);\n  -webkit-font-smoothing: antialiased;\n}\n\n.eva-corner {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(157, 255, 74, 0.5);\n  opacity: 0.5;\n}\n.eva-corner--tl {\n  top: 7px;\n  left: 7px;\n  border-right: 0;\n  border-bottom: 0;\n}\n.eva-corner--tr {\n  top: 7px;\n  right: 7px;\n  border-left: 0;\n  border-bottom: 0;\n}\n.eva-corner--bl {\n  bottom: calc(var(--eva-status-h) + 6px);\n  left: 7px;\n  border-right: 0;\n  border-top: 0;\n}\n.eva-corner--br {\n  bottom: calc(var(--eva-status-h) + 6px);\n  right: 7px;\n  border-left: 0;\n  border-top: 0;\n}\n\n.eva-hud__hr {\n  position: absolute;\n  left: 50%;\n  width: min(520px, 52vw);\n  height: 1px;\n  transform: translateX(-50%);\n  background: linear-gradient(90deg, transparent, rgba(157, 255, 74, 0.4), transparent);\n  opacity: 0.45;\n}\n.eva-hud__hr--top {\n  top: 0;\n}\n.eva-hud__hr--bottom {\n  bottom: var(--eva-status-h);\n}\n\n.eva-hud__scanlines {\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(0, 0, 0, 0.2) 0 1px,\n    transparent 1px 3px\n  );\n  opacity: 0.16;\n}\n\n.eva-hud__scan {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 140px;\n  background: linear-gradient(\n    180deg,\n    transparent,\n    rgba(157, 255, 74, 0.035) 45%,\n    rgba(157, 255, 74, 0.06) 50%,\n    rgba(157, 255, 74, 0.035) 55%,\n    transparent\n  );\n  animation: eva-scan 11s linear infinite;\n}\n\n.eva-hud__vignette {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(125% 105% at 50% 45%, transparent 56%, rgba(5, 4, 9, 0.42) 100%);\n  opacity: 0.6;\n}\n\n.eva-hud[data-fx=\"lite\"] .eva-hud__scanlines,\n.eva-hud[data-fx=\"lite\"] .eva-hud__scan,\n.eva-hud[data-fx=\"lite\"] .eva-hud__vignette {\n  display: none;\n}\n.eva-hud[data-fx=\"lite\"] .eva-corner,\n.eva-hud[data-fx=\"lite\"] .eva-hud__hr {\n  opacity: 0.25;\n}\n.eva-hud[data-fx=\"off\"] .eva-hud__scanlines,\n.eva-hud[data-fx=\"off\"] .eva-hud__scan,\n.eva-hud[data-fx=\"off\"] .eva-hud__vignette,\n.eva-hud[data-fx=\"off\"] .eva-corner,\n.eva-hud[data-fx=\"off\"] .eva-hud__hr {\n  display: none;\n}\n\n/* =====================================================================\n   BOOT SEQUENCE — seven-scene Unit-01 launch console\n   boot → pilot entry → entry-plug lock → neural link → sync 100%\n   → activation → launch.  Full ~13.7s, quick (reload) ~2.7s.\n   ===================================================================== */\n\n.eva-launch {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  overflow: hidden;\n  pointer-events: auto;\n  background: #05040a;\n  color: #e9e2f5;\n  font-family: var(--eva-font-hud);\n  user-select: none;\n  -webkit-user-select: none;\n  animation: eva-fade-in 0.16s linear both;\n}\n.eva-launch[data-scene=\"leave\"] {\n  animation: eva-launch-wipe 0.62s cubic-bezier(0.6, 0, 0.8, 0.2) both;\n}\n\n.eva-launch__bg {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(90% 70% at 50% 42%, rgba(122, 47, 176, 0.34), transparent 62%),\n    radial-gradient(60% 40% at 76% 18%, rgba(77, 255, 176, 0.06), transparent 70%),\n    linear-gradient(180deg, #05040a, #0a0616 58%, #05040a);\n}\n\n.eva-launch__slats {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n}\n.eva-launch__slat {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: calc(var(--eva-slat) * 14.2857%);\n  width: 14.2857%;\n  background:\n    linear-gradient(180deg, rgba(122, 47, 176, 0.26), rgba(26, 11, 46, 0.55) 42%, rgba(122, 47, 176, 0.2)),\n    #07050d;\n  border-left: 1px solid rgba(157, 255, 74, 0.13);\n  transform-origin: 50% 0;\n  animation: eva-slat-in 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) both;\n  animation-delay: calc(var(--eva-slat) * 55ms);\n}\n.eva-launch__slat:nth-child(even) {\n  background:\n    linear-gradient(180deg, rgba(26, 11, 46, 0.7), rgba(122, 47, 176, 0.2) 60%, rgba(26, 11, 46, 0.65)),\n    #06040c;\n}\n.eva-launch[data-scene=\"leave\"] .eva-launch__slat {\n  animation: eva-slat-out 0.5s cubic-bezier(0.6, 0, 0.8, 0.2) both;\n}\n\n.eva-launch__grid {\n  position: absolute;\n  inset: 0;\n  background-image:\n    repeating-linear-gradient(0deg, rgba(157, 255, 74, 0.06) 0 1px, transparent 1px 40px),\n    repeating-linear-gradient(90deg, rgba(157, 255, 74, 0.045) 0 1px, transparent 1px 40px);\n  -webkit-mask-image: radial-gradient(78% 78% at 50% 50%, #000 34%, transparent 100%);\n  mask-image: radial-gradient(78% 78% at 50% 50%, #000 34%, transparent 100%);\n}\n\n/* --- launch top / bottom chrome --- */\n.eva-launch__top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  height: 54px;\n  padding: 0 18px;\n  border-bottom: 1px solid rgba(157, 255, 74, 0.2);\n  background: linear-gradient(180deg, rgba(5, 4, 10, 0.94), rgba(5, 4, 10, 0));\n}\n.eva-launch__brandmark {\n  display: inline-flex;\n  width: 28px;\n  height: 28px;\n}\n.eva-launch__brandmark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-launch__brand {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  line-height: 1;\n}\n.eva-launch__brand b {\n  font-size: 12px;\n  letter-spacing: 0.3em;\n  color: #f3edff;\n}\n.eva-launch__brand em {\n  font-style: normal;\n  font-size: 8px;\n  letter-spacing: 0.24em;\n  color: rgba(157, 255, 74, 0.7);\n}\n.eva-launch__scenelabel {\n  margin-left: auto;\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  font-size: 9px;\n  letter-spacing: 0.22em;\n  color: rgba(157, 255, 74, 0.55);\n  white-space: nowrap;\n}\n.eva-launch__scenelabel b {\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.28em;\n  color: #f3edff;\n}\n.eva-launch__skip {\n  pointer-events: auto;\n  appearance: none;\n  margin-left: 8px;\n  padding: 6px 13px;\n  border: 1px solid rgba(157, 255, 74, 0.45);\n  background: rgba(157, 255, 74, 0.08);\n  color: var(--eva-green);\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.22em;\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));\n}\n.eva-launch__skip:hover {\n  background: rgba(157, 255, 74, 0.18);\n}\n\n.eva-launch__stage {\n  position: absolute;\n  inset: 0;\n}\n.eva-scene {\n  position: absolute;\n  inset: 0;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  gap: clamp(24px, 5vw, 72px);\n  padding: 96px clamp(24px, 6vw, 96px) 112px;\n  animation: eva-scene-in 0.3s ease-out both;\n}\n.eva-launch[data-scene=\"boot\"] .eva-scene--boot,\n.eva-launch[data-scene=\"plug\"] .eva-scene--plug,\n.eva-launch[data-scene=\"insert\"] .eva-scene--insert,\n.eva-launch[data-scene=\"neural\"] .eva-scene--neural,\n.eva-launch[data-scene=\"sync\"] .eva-scene--sync,\n.eva-launch[data-scene=\"activate\"] .eva-scene--activate,\n.eva-launch[data-scene=\"launch\"] .eva-scene--launch {\n  display: flex;\n}\n\n.eva-launch__foot {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 10px;\n  z-index: 6;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  padding: 0 18px;\n}\n.eva-launch__track {\n  display: flex;\n  gap: 4px;\n}\n.eva-launch__seg {\n  flex: 1;\n  height: 3px;\n  background: rgba(157, 255, 74, 0.12);\n  overflow: hidden;\n}\n.eva-launch__seg i {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, rgba(157, 255, 74, 0.45), var(--eva-green));\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform 0.16s linear;\n}\n.eva-launch__seg[data-done=\"1\"] i {\n  transform: scaleX(1);\n}\n.eva-launch__seg[data-active=\"1\"] i {\n  transform: scaleX(var(--eva-p));\n}\n.eva-launch__overall {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  font-size: 8.5px;\n  letter-spacing: 0.26em;\n  text-transform: uppercase;\n  color: rgba(157, 255, 74, 0.55);\n}\n.eva-launch__hint {\n  color: rgba(157, 255, 74, 0.75);\n  letter-spacing: 0.2em;\n}\n.eva-launch__hazard {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 7;\n  height: 10px;\n  background: repeating-linear-gradient(45deg, #ffd400 0 8px, #0a0616 8px 16px);\n  opacity: 0.85;\n  animation: eva-hazard-slide 6s linear infinite;\n}\n.eva-launch__flash {\n  position: absolute;\n  inset: 0;\n  z-index: 8;\n  pointer-events: none;\n  opacity: 0;\n  background: radial-gradient(\n    60% 60% at 50% 50%,\n    rgba(233, 226, 245, 0.92),\n    rgba(157, 255, 74, 0.3) 45%,\n    transparent 72%\n  );\n}\n.eva-launch[data-scene=\"launch\"] .eva-launch__flash {\n  animation: eva-flash 0.7s ease-out both;\n}\n.eva-launch[data-scene=\"leave\"] .eva-launch__flash {\n  animation: none;\n  opacity: 0;\n}\n\n/* --- shared scene read-out --- */\n.eva-scene__side {\n  width: min(300px, 30vw);\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n  text-align: left;\n}\n.eva-scene__meta {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid rgba(185, 139, 224, 0.35);\n  margin-bottom: 4px;\n}\n.eva-scene__meta b {\n  font-size: 15px;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  color: #f3edff;\n}\n.eva-scene__meta span {\n  font-size: 9px;\n  letter-spacing: 0.34em;\n  color: rgba(157, 255, 74, 0.7);\n}\n.eva-info__row {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  font-size: 10px;\n  letter-spacing: 0.12em;\n  color: rgba(233, 226, 245, 0.5);\n}\n.eva-info__row b {\n  margin-left: auto;\n  font-weight: 600;\n  color: var(--eva-green);\n}\n.eva-scene__big {\n  margin-top: 8px;\n  font-family: var(--eva-font-display);\n  font-size: clamp(28px, 3.4vw, 46px);\n  font-weight: 800;\n  letter-spacing: 0.24em;\n  color: #f3edff;\n  text-shadow: 0 0 26px rgba(157, 255, 74, 0.32);\n}\n\n/* --- scene 1: system boot --- */\n.eva-scene--boot {\n  justify-content: center;\n}\n.eva-boot {\n  display: flex;\n  align-items: center;\n  gap: clamp(28px, 5vw, 72px);\n}\n.eva-boot__term {\n  width: min(360px, 34vw);\n  display: grid;\n  gap: 6px;\n  font-size: 11px;\n  letter-spacing: 0.06em;\n  color: rgba(157, 255, 74, 0.85);\n}\n.eva-boot__line {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  opacity: 0;\n  animation: eva-bootline 0.3s ease-out both;\n}\n.eva-boot__line:nth-child(1) { animation-delay: 0.10s; }\n.eva-boot__line:nth-child(2) { animation-delay: 0.24s; }\n.eva-boot__line:nth-child(3) { animation-delay: 0.38s; }\n.eva-boot__line:nth-child(4) { animation-delay: 0.52s; }\n.eva-boot__line:nth-child(5) { animation-delay: 0.66s; }\n.eva-boot__line:nth-child(6) { animation-delay: 0.80s; }\n.eva-boot__line:nth-child(7) { animation-delay: 0.94s; }\n.eva-boot__line:nth-child(8) { animation-delay: 1.10s; }\n.eva-boot__line span:last-child {\n  color: rgba(233, 226, 245, 0.45);\n}\n.eva-boot__dial {\n  position: relative;\n  width: 180px;\n  height: 180px;\n}\n.eva-boot__ring {\n  position: absolute;\n  inset: 0;\n  border: 1px dashed rgba(157, 255, 74, 0.32);\n  border-radius: 50%;\n  animation: eva-spin 7s linear infinite;\n}\n.eva-boot__ring--2 {\n  inset: 26px;\n  border-style: solid;\n  border-color: rgba(185, 139, 224, 0.3);\n  animation-direction: reverse;\n  animation-duration: 4.2s;\n}\n.eva-boot__core {\n  position: absolute;\n  inset: 62px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(157, 255, 74, 0.5);\n  font-family: var(--eva-font-display);\n  font-size: 34px;\n  font-weight: 800;\n  color: var(--eva-green);\n  text-shadow: 0 0 18px rgba(157, 255, 74, 0.4);\n}\n\n/* --- scene 2: pilot entry / LCL --- */\n.eva-plug {\n  position: relative;\n  width: min(250px, 24vw);\n  height: min(330px, 46vh);\n}\n.eva-plug__shell {\n  position: absolute;\n  inset: 0;\n  clip-path: polygon(50% 0, 84% 10%, 100% 34%, 100% 100%, 0 100%, 0 34%, 16% 10%);\n  background: linear-gradient(180deg, rgba(122, 47, 176, 0.42), rgba(10, 6, 22, 0.92) 60%);\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-plug__lcl {\n  position: absolute;\n  left: 16%;\n  right: 16%;\n  bottom: 9%;\n  height: 62%;\n  overflow: hidden;\n  border: 1px solid rgba(157, 255, 74, 0.3);\n  background: rgba(5, 4, 10, 0.68);\n}\n.eva-plug__lclFill {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 82%;\n  background: linear-gradient(180deg, rgba(157, 255, 74, 0.5), rgba(77, 255, 176, 0.14));\n  animation: eva-lcl-fill 2.2s cubic-bezier(0.3, 0.7, 0.3, 1) 0.15s both;\n}\n.eva-plug__lclFill::before {\n  content: \"\";\n  position: absolute;\n  top: -3px;\n  left: 0;\n  right: 0;\n  height: 5px;\n  background: repeating-linear-gradient(90deg, rgba(198, 255, 0, 0.75) 0 7px, transparent 7px 14px);\n  animation: eva-surface 1.6s linear infinite;\n}\n.eva-plug__bubbles i {\n  position: absolute;\n  bottom: -4px;\n  left: calc(8% + var(--i) * 16%);\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: rgba(198, 255, 0, 0.8);\n  animation: eva-bubble 2.3s linear infinite;\n  animation-delay: calc(var(--i) * -0.32s);\n}\n.eva-plug__seat {\n  position: absolute;\n  left: 50%;\n  bottom: 4%;\n  width: 34%;\n  height: 8%;\n  transform: translateX(-50%);\n  border: 1px solid rgba(157, 255, 74, 0.4);\n  background: rgba(26, 11, 46, 0.8);\n}\n.eva-plug__clamp {\n  position: absolute;\n  top: 38%;\n  width: 26%;\n  height: 26%;\n  background: linear-gradient(90deg, rgba(75, 29, 122, 0.95), rgba(20, 12, 36, 0.98));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-plug__clamp--l {\n  left: -18%;\n  clip-path: polygon(0 0, 100% 12%, 100% 88%, 0 100%);\n  animation: eva-clamp-left 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.9s both;\n}\n.eva-plug__clamp--r {\n  right: -18%;\n  clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 88%);\n  animation: eva-clamp-right 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.9s both;\n}\n.eva-plug__label {\n  position: absolute;\n  left: -8%;\n  right: -8%;\n  bottom: -26px;\n  text-align: center;\n  font-size: 9px;\n  letter-spacing: 0.2em;\n  color: rgba(157, 255, 74, 0.8);\n}\n\n/* --- scene 3: entry-plug lock --- */\n.eva-insert {\n  position: relative;\n  width: min(320px, 30vw);\n  height: min(320px, 44vh);\n}\n.eva-insert__socket {\n  position: absolute;\n  left: 22%;\n  right: 22%;\n  top: 34%;\n  bottom: 6%;\n  border: 2px solid rgba(185, 139, 224, 0.45);\n  background: rgba(10, 6, 22, 0.85);\n  clip-path: polygon(50% 0, 100% 26%, 100% 100%, 0 100%, 0 26%);\n}\n.eva-insert__plug {\n  position: absolute;\n  left: 50%;\n  top: 2%;\n  width: 24%;\n  height: 52%;\n  transform: translate(-50%, 68%);\n  background: linear-gradient(180deg, rgba(122, 47, 176, 0.9), rgba(26, 11, 46, 0.96));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.6);\n  clip-path: polygon(50% 0, 100% 16%, 86% 100%, 14% 100%, 0 16%);\n  animation: eva-plug-drop 1.9s cubic-bezier(0.32, 0.9, 0.24, 1) both;\n}\n.eva-insert__clamp {\n  position: absolute;\n  top: 44%;\n  width: 34%;\n  height: 30%;\n  background: linear-gradient(90deg, rgba(75, 29, 122, 0.95), rgba(20, 12, 36, 0.98));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-insert__clamp--l {\n  left: 0;\n  clip-path: polygon(0 0, 100% 14%, 100% 100%, 0 88%);\n  animation: eva-insert-clamp-left 1.9s cubic-bezier(0.5, 0, 0.2, 1) both;\n}\n.eva-insert__clamp--r {\n  right: 0;\n  clip-path: polygon(0 14%, 100% 0, 100% 88%, 0 100%);\n  animation: eva-insert-clamp-right 1.9s cubic-bezier(0.5, 0, 0.2, 1) both;\n}\n.eva-insert__lock {\n  position: absolute;\n  left: 50%;\n  top: 52%;\n  padding: 5px 16px;\n  border: 2px solid var(--eva-green);\n  background: rgba(5, 4, 10, 0.6);\n  color: var(--eva-green);\n  font-size: 16px;\n  letter-spacing: 0.3em;\n  opacity: 0;\n  transform: translate(-50%, -50%) rotate(-7deg);\n  animation: eva-lock-stamp 1.9s ease-out both;\n}\n\n/* --- scene 4: neural link --- */\n.eva-neural {\n  width: min(420px, 38vw);\n}\n.eva-neural svg {\n  display: block;\n  width: 100%;\n  height: auto;\n  overflow: visible;\n}\n.eva-neural__wave {\n  fill: none;\n  stroke: var(--eva-green);\n  stroke-width: 1.6;\n  stroke-linejoin: round;\n  stroke-dasharray: 2000;\n  stroke-dashoffset: 2000;\n  filter: drop-shadow(0 0 6px rgba(157, 255, 74, 0.5));\n  animation: eva-draw 1.5s cubic-bezier(0.3, 0.7, 0.3, 1) 0.2s forwards;\n}\n.eva-neural__wave--b {\n  stroke: rgba(185, 139, 224, 0.75);\n  stroke-width: 1.1;\n  animation-delay: 0.45s;\n}\n\n/* --- scene 5: sync ratio --- */\n.eva-sync {\n  position: relative;\n  width: min(300px, 28vw);\n  aspect-ratio: 1;\n  display: grid;\n  place-items: center;\n}\n.eva-sync__ring {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: conic-gradient(\n    from -90deg,\n    var(--eva-green) calc(var(--eva-sync) * 1%),\n    rgba(157, 255, 74, 0.1) 0\n  );\n  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));\n  mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));\n}\n.eva-sync__pulse {\n  position: absolute;\n  inset: 12%;\n  border: 1px solid rgba(157, 255, 74, 0.35);\n  border-radius: 50%;\n  animation: eva-pulse-ring 1.8s ease-out infinite;\n}\n.eva-sync__pulse--2 {\n  animation-delay: 0.6s;\n}\n.eva-sync__value {\n  position: relative;\n  font-family: var(--eva-font-display);\n  font-size: clamp(34px, 4.6vw, 62px);\n  font-weight: 800;\n  color: #f3edff;\n  text-shadow: 0 0 26px rgba(157, 255, 74, 0.45);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.02em;\n}\n.eva-sync__label {\n  position: absolute;\n  bottom: 18%;\n  font-size: 9px;\n  letter-spacing: 0.4em;\n  color: rgba(157, 255, 74, 0.75);\n}\n\n/* --- scene 6: activation --- */\n.eva-activate {\n  position: relative;\n  width: min(300px, 28vw);\n  aspect-ratio: 1;\n  display: grid;\n  place-items: center;\n}\n.eva-activate__head {\n  position: relative;\n  display: inline-flex;\n  width: 74%;\n  height: 74%;\n  filter: drop-shadow(0 0 26px rgba(122, 47, 176, 0.6)) drop-shadow(0 0 8px rgba(157, 255, 74, 0.4));\n  animation: eva-power-up 1.6s ease-out both;\n}\n.eva-activate__head svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-activate__glow {\n  position: absolute;\n  inset: -10%;\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(157, 255, 74, 0.26), transparent 62%);\n  animation: eva-glow-pulse 1.6s ease-out both;\n}\n.eva-activate__eye {\n  position: absolute;\n  top: 39%;\n  left: 38%;\n  width: 9%;\n  height: 5%;\n  background: var(--eva-green);\n  box-shadow: 0 0 18px 4px rgba(157, 255, 74, 0.8);\n  opacity: 0;\n  animation: eva-eye-on 1.8s ease-out both;\n}\n.eva-activate__flap {\n  position: absolute;\n  top: 8%;\n  width: 34%;\n  height: 80%;\n  background: linear-gradient(90deg, rgba(75, 29, 122, 0.9), rgba(26, 11, 46, 0.96));\n  box-shadow: inset 0 0 0 1px rgba(185, 139, 224, 0.5);\n}\n.eva-activate__flap--l {\n  left: -24%;\n  clip-path: polygon(0 0, 100% 8%, 100% 92%, 0 100%);\n  animation: eva-flap-left 1.8s cubic-bezier(0.3, 0.7, 0.3, 1) both;\n}\n.eva-activate__flap--r {\n  right: -24%;\n  clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 92%);\n  animation: eva-flap-right 1.8s cubic-bezier(0.3, 0.7, 0.3, 1) both;\n}\n\n/* --- scene 7: launch --- */\n.eva-launchscene {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n.eva-launchscene__rails {\n  position: absolute;\n  inset: -40vh -30vw;\n  background: repeating-linear-gradient(\n    90deg,\n    transparent 0 11.8%,\n    rgba(185, 139, 224, 0.1) 11.8% 12%,\n    transparent 12% 23.8%,\n    rgba(157, 255, 74, 0.06) 23.8% 24%\n  );\n  animation: eva-cage-rise 1.7s linear both;\n}\n.eva-launchscene__clamps {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: min(620px, 68vw);\n  height: 34px;\n  border-top: 2px solid rgba(157, 255, 74, 0.4);\n  border-bottom: 2px solid rgba(157, 255, 74, 0.4);\n  transform: translate(-50%, -50%);\n  animation: eva-clamps-release 1.6s cubic-bezier(0.4, 0, 0.2, 1) both;\n}\n.eva-launchscene__title {\n  position: relative;\n  font-family: var(--eva-font-display);\n  font-size: clamp(80px, 13vw, 168px);\n  font-weight: 900;\n  line-height: 1;\n  letter-spacing: 0.24em;\n  color: var(--eva-green);\n  text-shadow: 0 0 44px rgba(157, 255, 74, 0.5), 0 0 8px rgba(255, 255, 255, 0.5);\n  animation: eva-launch-title 1.8s cubic-bezier(0.2, 0.9, 0.2, 1) both;\n}\n.eva-launchscene__sub {\n  font-size: 10px;\n  letter-spacing: 0.7em;\n  color: #f3edff;\n  opacity: 0.85;\n  animation: eva-fade-in 0.5s ease-out 0.4s both;\n}\n.eva-launchscene__bar {\n  width: min(560px, 64vw);\n  height: 5px;\n  background: linear-gradient(90deg, var(--eva-lilac), var(--eva-green));\n  box-shadow: 0 0 18px rgba(157, 255, 74, 0.5);\n  transform-origin: left center;\n  animation: eva-bar-grow 1.5s cubic-bezier(0.2, 0.9, 0.2, 1) 0.15s both;\n}\n\n/* --- launch keyframes --- */\n@keyframes eva-launch-wipe {\n  from {\n    opacity: 1;\n    clip-path: inset(0 0 0 0);\n  }\n  to {\n    opacity: 0;\n    clip-path: inset(0 0 100% 0);\n  }\n}\n@keyframes eva-scene-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes eva-bootline {\n  from {\n    opacity: 0;\n    transform: translateX(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes eva-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes eva-lcl-fill {\n  from {\n    height: 0;\n  }\n  to {\n    height: 82%;\n  }\n}\n@keyframes eva-surface {\n  to {\n    background-position: 28px 0;\n  }\n}\n@keyframes eva-bubble {\n  0% {\n    transform: translateY(0);\n    opacity: 0;\n  }\n  12% {\n    opacity: 0.9;\n  }\n  100% {\n    transform: translateY(-150px);\n    opacity: 0;\n  }\n}\n@keyframes eva-clamp-left {\n  from {\n    transform: translateX(-40px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-clamp-right {\n  from {\n    transform: translateX(40px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-plug-drop {\n  0% {\n    transform: translate(-50%, -120%);\n  }\n  62% {\n    transform: translate(-50%, 74%);\n  }\n  76% {\n    transform: translate(-50%, 64%);\n  }\n  100% {\n    transform: translate(-50%, 68%);\n  }\n}\n@keyframes eva-insert-clamp-left {\n  0%,\n  42% {\n    transform: translateX(-110%);\n  }\n  64%,\n  100% {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-insert-clamp-right {\n  0%,\n  42% {\n    transform: translateX(110%);\n  }\n  64%,\n  100% {\n    transform: translateX(0);\n  }\n}\n@keyframes eva-lock-stamp {\n  0%,\n  58% {\n    opacity: 0;\n    transform: translate(-50%, -50%) rotate(-7deg) scale(1.9);\n  }\n  68% {\n    opacity: 1;\n    transform: translate(-50%, -50%) rotate(-7deg) scale(1);\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes eva-draw {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes eva-pulse-ring {\n  0% {\n    transform: scale(0.82);\n    opacity: 0.7;\n  }\n  100% {\n    transform: scale(1.06);\n    opacity: 0;\n  }\n}\n@keyframes eva-power-up {\n  0% {\n    opacity: 0.3;\n    transform: scale(0.94);\n  }\n  45% {\n    opacity: 1;\n    transform: scale(1.02);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes eva-glow-pulse {\n  0% {\n    opacity: 0.2;\n    transform: scale(0.88);\n  }\n  50% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0.35;\n    transform: scale(1.02);\n  }\n}\n@keyframes eva-eye-on {\n  0%,\n  42% {\n    opacity: 0;\n  }\n  52% {\n    opacity: 1;\n  }\n  58% {\n    opacity: 0.25;\n  }\n  66%,\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes eva-flap-left {\n  0%,\n  30% {\n    transform: translateX(0);\n    opacity: 0.9;\n  }\n  70%,\n  100% {\n    transform: translateX(-14%);\n    opacity: 0.55;\n  }\n}\n@keyframes eva-flap-right {\n  0%,\n  30% {\n    transform: translateX(0);\n    opacity: 0.9;\n  }\n  70%,\n  100% {\n    transform: translateX(14%);\n    opacity: 0.55;\n  }\n}\n@keyframes eva-cage-rise {\n  from {\n    transform: translateY(40px);\n    opacity: 0.3;\n  }\n  to {\n    transform: translateY(-60px);\n    opacity: 1;\n  }\n}\n@keyframes eva-clamps-release {\n  0% {\n    opacity: 0.9;\n    transform: translate(-50%, -50%) scaleX(1);\n  }\n  60%,\n  100% {\n    opacity: 0;\n    transform: translate(-50%, -50%) scaleX(1.6);\n  }\n}\n@keyframes eva-launch-title {\n  0% {\n    opacity: 0;\n    transform: scale(1.5);\n    letter-spacing: 0.6em;\n  }\n  25% {\n    opacity: 1;\n    transform: scale(1);\n    letter-spacing: 0.24em;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes eva-bar-grow {\n  from {\n    transform: scaleX(0);\n  }\n  to {\n    transform: scaleX(1);\n  }\n}\n\n/* =====================================================================\n   BRAND MARKS\n   ===================================================================== */\n\n.eva-brandmark {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.eva-brandmark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  max-width: 30px;\n  max-height: 30px;\n  filter: drop-shadow(0 0 5px rgba(157, 255, 74, 0.4));\n}\n\n.eva-brandname {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  min-width: 0;\n}\n.eva-brandname__unit {\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  font-weight: 800;\n  line-height: 1.05;\n  letter-spacing: 0.16em;\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n}\n.eva-brandname__sub {\n  font-family: var(--eva-font-hud);\n  font-size: 8px;\n  line-height: 1;\n  letter-spacing: 0.2em;\n  color: var(--eva-green);\n  opacity: 0.7;\n  white-space: nowrap;\n}\n\n.eva-hero {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 9px;\n  padding: 0 2px 0 0;\n  vertical-align: middle;\n}\n.eva-hero__glow {\n  position: absolute;\n  left: -10px;\n  top: 50%;\n  width: 74px;\n  height: 74px;\n  margin-top: -37px;\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(122, 47, 176, 0.5), transparent 70%);\n  filter: blur(5px);\n  pointer-events: none;\n}\n.eva-hero__mark {\n  position: relative;\n  display: inline-flex;\n  width: 30px;\n  height: 30px;\n  filter: drop-shadow(0 0 10px rgba(122, 47, 176, 0.6))\n    drop-shadow(0 0 3px rgba(157, 255, 74, 0.35));\n  animation: eva-float 7s ease-in-out infinite;\n}\n.eva-hero__mark svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-hero__text {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  padding-left: 8px;\n  border-left: 1px solid rgba(157, 255, 74, 0.4);\n  text-align: left;\n}\n.eva-hero__tag {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.3em;\n  line-height: 1.1;\n  color: var(--eva-green);\n  text-shadow: 0 0 10px rgba(157, 255, 74, 0.35);\n}\n.eva-hero__jp {\n  font-family: var(--eva-font-display);\n  font-size: 9px;\n  letter-spacing: 0.34em;\n  line-height: 1;\n  color: var(--eva-lilac);\n  opacity: 0.75;\n  white-space: nowrap;\n}\n\n/* =====================================================================\n   SIDEBAR FOOTER CONTROLS\n   ===================================================================== */\n\n.eva-foot {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n.eva-foot__btn {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  height: 28px;\n  min-width: 28px;\n  margin: 0;\n  padding: 0 5px;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary);\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: color 0.15s, background 0.15s, border-color 0.15s, box-shadow 0.15s;\n}\n.eva-foot__btn:hover {\n  color: var(--eva-green);\n  border-color: rgba(157, 255, 74, 0.35);\n  background: rgba(157, 255, 74, 0.07);\n  box-shadow: 0 0 12px rgba(157, 255, 74, 0.12) inset;\n}\n.eva-foot__btn:active {\n  transform: translateY(0.5px);\n}\n.eva-foot__btn:focus-visible {\n  outline: 1px solid var(--eva-green);\n  outline-offset: 1px;\n}\n.eva-foot__btn[data-fx=\"off\"] {\n  opacity: 0.55;\n}\n.eva-foot__btn[data-berserk=\"1\"] {\n  color: var(--eva-alarm);\n  border-color: var(--eva-alarm);\n  background: var(--eva-alarm-soft);\n  box-shadow: 0 0 12px var(--eva-alarm-soft);\n}\n.eva-foot__btn[data-berserk=\"1\"]:hover {\n  background: var(--eva-alarm);\n  color: var(--eva-on-accent);\n  box-shadow: 0 0 18px var(--eva-alarm-soft);\n}\n.eva-foot__glyph {\n  font-size: 10px;\n  line-height: 1;\n}\n.eva-foot__label {\n  font-size: 8px;\n}\n\n/* =====================================================================\n   COMPOSER SYNC RAIL\n   ===================================================================== */\n\n.eva-rail {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  height: 19px;\n  margin: 0 0 4px;\n  padding: 0 18px;\n  pointer-events: none;\n  font-family: var(--eva-font-hud);\n  font-size: 8px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: rgba(157, 255, 74, 0.5);\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);\n  mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);\n}\n.eva-rail__cap {\n  opacity: 0.8;\n}\n.eva-rail__value {\n  color: var(--eva-green);\n  font-variant-numeric: tabular-nums;\n  text-shadow: 0 0 8px rgba(157, 255, 74, 0.3);\n}\n.eva-rail__ticks {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 2px;\n  height: 12px;\n}\n.eva-rail__ticks i {\n  display: block;\n  width: 1px;\n  height: calc(var(--eva-tick) * 1px);\n  background: linear-gradient(180deg, rgba(157, 255, 74, 0.85), rgba(157, 255, 74, 0.12));\n  animation: eva-tick 2.6s ease-in-out infinite;\n  animation-delay: calc(var(--eva-tick) * -70ms);\n}\n.eva-rail__sep {\n  width: 1px;\n  height: 9px;\n  background: rgba(185, 139, 224, 0.45);\n}\n.eva-rail__stat {\n  display: inline-flex;\n  gap: 4px;\n  opacity: 0.72;\n}\n.eva-rail__stat b {\n  font-weight: 600;\n  color: rgba(157, 255, 74, 0.8);\n}\n.eva-rail__hazard {\n  flex: 1;\n  min-width: 18px;\n  height: 4px;\n  background: repeating-linear-gradient(\n    45deg,\n    rgba(255, 212, 0, 0.5) 0 4px,\n    rgba(5, 4, 9, 0.85) 4px 8px\n  );\n  opacity: 0.4;\n}\n.eva-rail__wave {\n  display: inline-flex;\n  width: 60px;\n  height: 12px;\n  opacity: 0.55;\n  color: rgba(157, 255, 74, 0.85);\n}\n.eva-rail__wave svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.eva-rail__clock {\n  color: rgba(233, 226, 245, 0.6);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.14em;\n}\n.eva-rail__date {\n  opacity: 0.45;\n}\n.eva-rail__cycle {\n  opacity: 0.4;\n  letter-spacing: 0.16em;\n}\n@media (max-width: 900px) {\n  .eva-rail__stat--power,\n  .eva-rail__stat--at,\n  .eva-rail__date,\n  .eva-rail__cycle {\n    display: none;\n  }\n}\n\n\n/* =====================================================================\n   SCHEME VARIABLES — one accent per light/dark, used by the EVA chrome and\n   the host-surface rules below. Dark = launch console, light = white hangar.\n   ===================================================================== */\n\nbody {\n  --eva-status-h: 26px;\n  --eva-alarm: #c21212;\n  --eva-alarm-soft: rgba(194, 18, 18, 0.1);\n  --eva-alert-bg: rgba(255, 250, 248, 0.92);\n  --eva-accent: #6a1fa8;\n  --eva-accent-strong: #4b1d7a;\n  --eva-accent-soft: rgba(106, 31, 168, 0.1);\n  --eva-glow: rgba(106, 31, 168, 0.18);\n  --eva-on-accent: #ffffff;\n  --eva-line: #d6c9ea;\n  --eva-hud-ink: rgba(75, 29, 122, 0.6);\n  --eva-hud-ink-dim: rgba(75, 29, 122, 0.34);\n  --eva-on-hazard: #1a0b2e;\n\n  --dsw-alias-bg-base: #f1ecf8;\n  --dsw-alias-bg-layer-1: #f8f4fd;\n  --dsw-alias-bg-layer-2: #fcfaff;\n  --dsw-alias-bg-layer-3: #ffffff;\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: #f3edfa;\n  --dsw-alias-bg-multi-select: #f3edfa;\n  --dsw-alias-border-l1: #d6c9ea;\n  --dsw-alias-border-l2: #b79bdc;\n  --dsw-alias-border-l3: #9e7fcb;\n  --dsw-alias-border-l4: #7e5fae;\n  --dsw-alias-brand-primary: #6a1fa8;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #6a1fa8;\n  --dsw-alias-brand-text: #1b0f2a;\n  --dsw-alias-label-primary: #1b0f2a;\n  --dsw-alias-label-secondary: #54446c;\n  --dsw-alias-label-tertiary: #7a6a92;\n  --dsw-alias-label-caption: #8b7ba0;\n  --dsw-alias-label-dimmed: #cfc4de;\n  --dsw-alias-state-business-primary: #6a1fa8;\n  --dsw-alias-state-business-tertiary: #e4d9f4;\n  --dsw-alias-state-success-primary: #1d7a4f;\n  --dsw-alias-state-warn-primary: #9a5300;\n  --dsw-alias-state-error-primary: #c41616;\n  --dsw-alias-state-idle-primary: #8b7ba3;\n  --dsw-alias-button-primary-fill: #6a1fa8;\n  --dsw-alias-button-primary-hover: #4b1d7a;\n  --dsw-alias-button-primary-dimmed: #e3d8f2;\n  --dsw-alias-button-contrast-fill: #7a2fb0;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #f1eaf9;\n  --dsw-alias-button-ghost-active-fill: #e9e0f6;\n  --dsw-alias-button-ghost-active-hover: #ded2f0;\n  --dsw-alias-button-ghost-active-border: #b79bdc;\n  --dsw-alias-interactive-bg-hover: rgba(106, 31, 168, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(106, 31, 168, 0.13);\n  --dsw-alias-interactive-bg-hover-solid: #ece4f7;\n  --dsw-alias-interactive-bg-hover-accent: rgba(106, 31, 168, 0.16);\n  --dsw-specific-sidebar-fill: #e9e1f5;\n  --dsw-specific-sidebar-nav-item-hover: #e4daf2;\n  --dsw-specific-sidebar-nav-item-active: #dacbee;\n  --dsw-specific-sidebar-nav-item-active-accent: #d2bfea;\n  --dsw-specific-bubble: #e7ddf6;\n  --dsw-specific-bubble-highlight: #d9c9ee;\n  --dsw-specific-input-major: #ffffff;\n  --dsw-specific-selector: #f0eaf8;\n  --dsw-specific-tip: #f0eaf8;\n  --dsw-specific-menu: rgba(255, 255, 255, 0.95);\n  --dsw-menu-surface-fill: rgba(250, 247, 254, 0.95);\n  --dsw-alias-menu-group-header-fill: rgba(243, 237, 250, 0.96);\n  --dsw-alias-menu-icon: #4b1d7a;\n  --dsw-alias-scrollbar-bg-l1: #d6c9ea;\n  --dsw-alias-scrollbar-bg-l2: #c3b0df;\n  --dsw-alias-scrollbar-hover-l1: #7a2fb0;\n  --dsw-alias-scrollbar-hover-l2: #6a1fa8;\n  --dsw-alias-settings-card-fill: #ffffff;\n  --dsw-alias-settings-card-stroke: rgba(106, 31, 168, 0.16);\n  --dsw-alias-markdown-code-block: #f5f0fb;\n  --dsw-alias-markdown-code-block-banner: #ede6f7;\n  --dsw-alias-markdown-inline-code: rgba(106, 31, 168, 0.08);\n  --dsw-alias-markdown-tag: rgba(106, 31, 168, 0.1);\n  --dsw-alias-markdown-placeholder: #ede6f7;\n  --dsw-alias-toast-bg: #2b1848;\n  --dsw-alias-toast-label: #f6f1fd;\n  --dsw-alias-tooltip-bg: #2b1848;\n  --dsw-alias-switch-thumb: #6a1fa8;\n  --dsw-alias-turn-trigger-bg: #f3edfa;\n  --dsw-alias-turn-trigger-bg-hover: rgba(106, 31, 168, 0.08);\n  --dsw-alias-bg-mask-1: rgba(75, 29, 122, 0.28);\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-radius-panel: 4px;\n  --dsw-font-family-brand: var(--eva-font-display);\n}\n\nbody[data-ds-dark-theme] {\n  --eva-alarm: #ff3b3b;\n  --eva-alarm-soft: rgba(255, 59, 59, 0.12);\n  --eva-alert-bg: rgba(40, 5, 8, 0.82);\n  --eva-accent: #9dff4a;\n  --eva-accent-strong: #c6ff00;\n  --eva-accent-soft: rgba(157, 255, 74, 0.08);\n  --eva-glow: rgba(157, 255, 74, 0.18);\n  --eva-on-accent: #08130a;\n  --eva-line: #33224d;\n  --eva-hud-ink: rgba(157, 255, 74, 0.5);\n  --eva-hud-ink-dim: rgba(157, 255, 74, 0.26);\n  --eva-on-hazard: #1a0b2e;\n\n  --dsw-alias-bg-base: #07050e;\n  --dsw-alias-bg-layer-1: #0e0919;\n  --dsw-alias-bg-layer-2: #140c24;\n  --dsw-alias-bg-layer-3: #1b1030;\n  --dsw-alias-bg-overlay: #241540;\n  --dsw-alias-bg-module-platform: #1b1030;\n  --dsw-alias-bg-multi-select: #140c24;\n  --dsw-alias-border-l1: #33224d;\n  --dsw-alias-border-l2: #4a2f70;\n  --dsw-alias-border-l3: #5e3d8a;\n  --dsw-alias-border-l4: #7a54a8;\n  --dsw-alias-brand-primary: #9dff4a;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #9dff4a;\n  --dsw-alias-brand-text: #efe7fb;\n  --dsw-alias-label-primary: #efe7fb;\n  --dsw-alias-label-secondary: #b4a6cc;\n  --dsw-alias-label-tertiary: #8d7ba8;\n  --dsw-alias-label-caption: #7a6a94;\n  --dsw-alias-label-dimmed: #3a2c50;\n  --dsw-alias-state-business-primary: #9dff4a;\n  --dsw-alias-state-business-tertiary: #22301a;\n  --dsw-alias-state-success-primary: #4dffb0;\n  --dsw-alias-state-warn-primary: #ffb347;\n  --dsw-alias-state-error-primary: #ff3b3b;\n  --dsw-alias-state-idle-primary: #7e6c9e;\n  --dsw-alias-button-primary-fill: #9dff4a;\n  --dsw-alias-button-primary-hover: #c6ff00;\n  --dsw-alias-button-primary-dimmed: #2a3a16;\n  --dsw-alias-button-contrast-fill: #c6ff00;\n  --dsw-alias-button-elevated-fill: #241540;\n  --dsw-alias-button-floating-fill: #1b1030;\n  --dsw-alias-button-floating-hover: #241540;\n  --dsw-alias-button-ghost-active-fill: #241540;\n  --dsw-alias-button-ghost-active-hover: #2a1a45;\n  --dsw-alias-button-ghost-active-border: #633d93;\n  --dsw-alias-interactive-bg-hover: rgba(157, 255, 74, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(157, 255, 74, 0.12);\n  --dsw-alias-interactive-bg-hover-solid: #1b1030;\n  --dsw-alias-interactive-bg-hover-accent: rgba(157, 255, 74, 0.18);\n  --dsw-specific-sidebar-fill: #0a0614;\n  --dsw-specific-sidebar-nav-item-hover: #150d26;\n  --dsw-specific-sidebar-nav-item-active: #22123c;\n  --dsw-specific-sidebar-nav-item-active-accent: #2a1748;\n  --dsw-specific-bubble: #1f1236;\n  --dsw-specific-bubble-highlight: #2b1848;\n  --dsw-specific-input-major: #120b20;\n  --dsw-specific-selector: #1b1030;\n  --dsw-specific-tip: #1b1030;\n  --dsw-specific-menu: rgba(26, 15, 46, 0.94);\n  --dsw-menu-surface-fill: rgba(26, 15, 46, 0.94);\n  --dsw-alias-menu-group-header-fill: rgba(33, 20, 57, 0.95);\n  --dsw-alias-menu-icon: #d8c8f2;\n  --dsw-alias-scrollbar-bg-l1: #2a1748;\n  --dsw-alias-scrollbar-bg-l2: #3a2258;\n  --dsw-alias-scrollbar-hover-l1: #7a2fb0;\n  --dsw-alias-scrollbar-hover-l2: #9dff4a;\n  --dsw-alias-settings-card-fill: #120b20;\n  --dsw-alias-settings-card-stroke: rgba(157, 255, 74, 0.14);\n  --dsw-alias-markdown-code-block: #0a0614;\n  --dsw-alias-markdown-code-block-banner: #140c24;\n  --dsw-alias-markdown-inline-code: rgba(157, 255, 74, 0.1);\n  --dsw-alias-markdown-tag: rgba(157, 255, 74, 0.14);\n  --dsw-alias-markdown-placeholder: #1b1030;\n  --dsw-alias-toast-bg: #241540;\n  --dsw-alias-toast-label: #f6f1fd;\n  --dsw-alias-tooltip-bg: #241540;\n  --dsw-alias-switch-thumb: #9dff4a;\n  --dsw-alias-turn-trigger-bg: #140c24;\n  --dsw-alias-turn-trigger-bg-hover: rgba(157, 255, 74, 0.1);\n  --dsw-alias-bg-mask-1: rgba(5, 4, 9, 0.62);\n}\n\n/* =====================================================================\n   HOST SURFACES — app shell, sidebar, hero, composer, dialogs.\n   Anchors: [data-slot] / [data-*] / aria (stable) then CSS-module local\n   names as [class*=\"_local\"] (skin degrades gracefully if the host renames\n   a local; colours above still carry the theme).\n   ===================================================================== */\n\n/* --- shell columns: let the body ambience show through --- */\n[class*=\"_frame\"],\n[class*=\"_centerCol\"] {\n  background-color: transparent;\n}\n\n[class*=\"_sidebarCol\"] {\n  position: relative;\n  background-color: var(--dsw-specific-sidebar-fill);\n  background-image:\n    radial-gradient(120% 52% at 0% 0%, rgba(122, 47, 176, 0.18), transparent 62%),\n    linear-gradient(180deg, rgba(157, 255, 74, 0.03), transparent 30%);\n  border-right: 1px solid var(--dsw-alias-border-l1);\n}\n[class*=\"_sidebarCol\"]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 3px;\n  background: repeating-linear-gradient(\n    135deg,\n    var(--eva-hazard) 0 3px,\n    transparent 3px 6px\n  );\n  opacity: 0.26;\n  pointer-events: none;\n  z-index: 3;\n}\n[class*=\"_rightbarCol\"] {\n  border-left: 1px solid var(--dsw-alias-border-l1);\n}\n\n/* --- sidebar brand row --- */\n[class*=\"_logoRow\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n  padding-bottom: 8px;\n}\n[class*=\"_brand\"] {\n  border-radius: 0;\n  gap: 9px;\n}\n[class*=\"_brand\"]:hover {\n  background: transparent;\n}\n[class*=\"_brandMark\"] svg,\n[data-slot=\"sidebar.brand.mark\"] svg {\n  filter: drop-shadow(0 0 6px var(--eva-glow));\n}\n[class*=\"_brandName\"] {\n  font-family: var(--eva-font-hud);\n}\n\n/* --- new session: the launch button --- */\nbutton[class*=\"_newSession\"] {\n  position: relative;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 0;\n  background: linear-gradient(100deg, var(--dsw-alias-bg-layer-3), var(--dsw-alias-bg-layer-1));\n  color: var(--dsw-alias-label-primary);\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  clip-path: polygon(\n    0 0,\n    calc(100% - 12px) 0,\n    100% 12px,\n    100% 100%,\n    12px 100%,\n    0 calc(100% - 12px)\n  );\n  box-shadow: none;\n  transition: color 0.16s, box-shadow 0.16s, border-color 0.16s;\n}\nbutton[class*=\"_newSession\"]::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--eva-accent);\n  opacity: 0.9;\n}\nbutton[class*=\"_newSession\"]:hover {\n  color: var(--eva-accent);\n  border-color: var(--eva-accent);\n  box-shadow: inset 0 0 0 1px var(--eva-accent), 0 0 18px var(--eva-glow);\n}\nbutton[class*=\"_newSession\"]:focus-visible {\n  outline: 1px solid var(--eva-accent);\n  outline-offset: 2px;\n}\n[class*=\"_newSessionShortcut\"] {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.08em;\n  opacity: 0.6;\n}\n\n/* --- global panel rows --- */\n[class*=\"_panelList\"] {\n  gap: 2px;\n}\nbutton[class*=\"_panelRow\"] {\n  border-radius: 0;\n  border-left: 2px solid transparent;\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  letter-spacing: 0.1em;\n}\nbutton[class*=\"_panelRow\"]:hover {\n  border-left-color: var(--eva-accent);\n  background: linear-gradient(90deg, var(--eva-accent-soft), transparent 88%);\n  color: var(--eva-accent);\n}\n[class*=\"_panelTitle\"] {\n  font-weight: 500;\n}\n[class*=\"_panelGlyph\"] {\n  color: inherit;\n  opacity: 0.85;\n}\n\n/* --- workspace tree --- */\n[class*=\"_sectionHeader\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n  padding-bottom: 4px;\n}\n[class*=\"_sectionLabel\"] {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_iconButton\"] {\n  border-radius: 2px;\n}\n[class*=\"_iconButton\"]:hover {\n  color: var(--eva-accent);\n}\n\ndiv[class*=\"_sessionRow\"],\ndiv[class*=\"_projectRow\"] {\n  position: relative;\n  border-radius: 0;\n  border-left: 2px solid transparent;\n  transition: background 0.14s, border-color 0.14s, color 0.14s;\n}\ndiv[class*=\"_sessionRow\"]:hover,\ndiv[class*=\"_projectRow\"]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\ndiv[class*=\"_sessionRow\"][class*=\"_selected\"] {\n  background: linear-gradient(\n    90deg,\n    var(--dsw-specific-sidebar-nav-item-active),\n    transparent 94%\n  );\n  border-left-color: var(--eva-accent);\n}\ndiv[class*=\"_sessionRow\"][class*=\"_selected\"]::after {\n  content: \"\";\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  width: 5px;\n  height: 5px;\n  margin-top: -2.5px;\n  background: var(--eva-accent);\n  transform: rotate(45deg);\n  box-shadow: 0 0 8px var(--eva-glow);\n  pointer-events: none;\n}\ndiv[class*=\"_sessionRow\"] [class*=\"_title\"],\ndiv[class*=\"_projectRow\"] [class*=\"_title\"] {\n  font-size: 13px;\n}\ndiv[class*=\"_sessionRow\"] [class*=\"_time\"] {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.04em;\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_folder\"] {\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_folderActive\"] {\n  color: var(--eva-accent);\n}\n\n/* --- sidebar foot --- */\n[class*=\"_footArea\"] {\n  border-top: 1px solid var(--dsw-alias-border-l1);\n  padding-top: 6px;\n}\n[class*=\"_footerActions\"] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n[class*=\"_avatar\"] {\n  border-radius: 2px !important;\n  box-shadow: 0 0 0 1px var(--eva-accent), 0 0 10px var(--eva-glow);\n}\n\n/* --- conversation header --- */\nheader[class*=\"_header\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n  background: linear-gradient(180deg, var(--dsw-alias-bg-base), transparent);\n}\n[class*=\"_titleRow\"] {\n  font-family: var(--eva-font-hud);\n  letter-spacing: 0.04em;\n}\n[data-slot=\"conversation.header\"] button {\n  border-radius: 2px;\n}\n\n/* --- hero / empty state --- */\n[class*=\"_headline\"] {\n  position: relative;\n  padding-bottom: 12px;\n}\n[class*=\"_headline\"]::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 1px;\n  background: linear-gradient(\n    90deg,\n    transparent,\n    var(--eva-accent) 18%,\n    var(--eva-accent) 82%,\n    transparent\n  );\n  opacity: 0.4;\n}\n[class*=\"_titleGroup\"] > span:first-child {\n  font-family: var(--eva-font-display);\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  color: var(--dsw-alias-label-primary);\n  text-shadow: 0 0 28px var(--eva-glow);\n}\n[class*=\"_previewBadge\"] {\n  border: 0;\n  border-radius: 0;\n  padding: 1px 8px 0;\n  background: repeating-linear-gradient(\n    45deg,\n    var(--eva-hazard) 0 5px,\n    var(--eva-on-hazard) 5px 10px\n  );\n  color: var(--eva-on-hazard);\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n}\n[class*=\"_heroWorkspaceRow\"] button {\n  border: 1px solid transparent;\n  border-radius: 0;\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.1em;\n  color: var(--dsw-alias-label-secondary);\n  transition: color 0.14s, border-color 0.14s, background 0.14s, box-shadow 0.14s;\n}\n[class*=\"_heroWorkspaceRow\"] button:hover {\n  border-color: var(--eva-accent);\n  background: var(--eva-accent-soft);\n  color: var(--eva-accent);\n  box-shadow: 0 0 14px var(--eva-glow);\n}\n\n/* --- composer --- */\n[data-composer-card] {\n  position: relative;\n  border-radius: 0;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-input-major);\n  box-shadow:\n    0 0 0 1px rgba(5, 4, 9, 0.2),\n    0 18px 44px rgba(0, 0, 0, 0.28),\n    0 0 26px var(--eva-glow);\n  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);\n  transition: border-color 0.18s, box-shadow 0.18s;\n}\n[data-composer-card]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 16px;\n  height: 1px;\n  background: linear-gradient(90deg, transparent, var(--eva-accent), transparent 90%);\n  opacity: 0.55;\n  pointer-events: none;\n}\n[data-composer-card]:focus-within {\n  border-color: var(--eva-accent);\n  box-shadow:\n    0 0 0 1px var(--eva-accent),\n    0 18px 44px rgba(0, 0, 0, 0.32),\n    0 0 30px var(--eva-glow);\n}\n[data-lexical-editor] {\n  caret-color: var(--eva-accent);\n}\n[data-composer-placeholder] {\n  font-family: var(--eva-font-hud);\n  font-size: 13px;\n  letter-spacing: 0.04em;\n  opacity: 0.72;\n}\n[data-composer-card] > [class*=\"_row\"] {\n  border-top: 1px solid var(--dsw-alias-border-l1);\n}\n[data-composer-card] button {\n  border-radius: 2px;\n}\n[data-slot=\"conversation.composer.bar\"] button[class*=\"_primary\"] {\n  background: var(--eva-accent) !important;\n  color: var(--eva-on-accent) !important;\n  border-radius: 0;\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 7px 100%, 0 calc(100% - 7px));\n  box-shadow: 0 0 18px var(--eva-glow);\n}\n[data-slot=\"conversation.composer.bar\"] button[class*=\"_primary\"]:hover {\n  background: var(--eva-accent-strong) !important;\n}\n[data-slot=\"conversation.composer.bar\"] button[class*=\"_primary\"]:focus-visible {\n  outline: 1px solid var(--eva-accent);\n  outline-offset: 2px;\n}\n[data-slot=\"conversation.input.model\"] button,\n[data-slot=\"conversation.input.permission\"] button {\n  border-radius: 2px;\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.06em;\n}\n[data-slot=\"conversation.input.model\"] button:hover,\n[data-slot=\"conversation.input.permission\"] button:hover {\n  color: var(--eva-accent);\n}\n[class*=\"_triggerEffort\"] {\n  border-radius: 1px;\n  background: var(--eva-hazard);\n  color: var(--eva-on-hazard);\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n[class*=\"_add\"] {\n  border-radius: 2px;\n}\n\n/* --- dialogs / portalled surfaces --- */\n[role=\"dialog\"] {\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 2px;\n}\n[class*=\"_mask\"] {\n  backdrop-filter: blur(2px);\n}\n\n/* =====================================================================\n   KEYFRAMES\n   ===================================================================== */\n\n@keyframes eva-pulse {\n  0%,\n  100% {\n    opacity: 0.35;\n    transform: scale(0.85);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes eva-syncbar {\n  from {\n    height: 25%;\n  }\n  to {\n    height: 100%;\n  }\n}\n@keyframes eva-tick {\n  0%,\n  100% {\n    transform: scaleY(0.55);\n    opacity: 0.45;\n  }\n  50% {\n    transform: scaleY(1);\n    opacity: 1;\n  }\n}\n@keyframes eva-scan {\n  from {\n    top: -140px;\n  }\n  to {\n    top: 100%;\n  }\n}\n@keyframes eva-float {\n  0%,\n  100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-3px);\n  }\n}\n@keyframes eva-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes eva-launch-out {\n  from {\n    opacity: 1;\n    clip-path: inset(0 0 0 0);\n  }\n  to {\n    opacity: 0;\n    clip-path: inset(0 0 100% 0);\n  }\n}\n@keyframes eva-slat-in {\n  from {\n    transform: scaleY(0);\n    opacity: 0.15;\n  }\n  to {\n    transform: scaleY(1);\n    opacity: 1;\n  }\n}\n@keyframes eva-slat-out {\n  from {\n    transform: scaleY(1);\n  }\n  to {\n    transform: scaleY(0);\n  }\n}\n@keyframes eva-row-in {\n  from {\n    opacity: 0;\n    transform: translateX(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes eva-go {\n  0% {\n    opacity: 0;\n    transform: translateX(-50%) scale(1.5);\n    letter-spacing: 0.9em;\n  }\n  30% {\n    opacity: 1;\n    transform: translateX(-50%) scale(1);\n  }\n  72% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(-50%) scale(1.02);\n  }\n}\n@keyframes eva-hazard-slide {\n  to {\n    background-position: 64px 0;\n  }\n}\n@keyframes eva-flash {\n  0% {\n    opacity: 0;\n  }\n  18% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-hud *,\n  .eva-rail *,\n  .eva-hero__mark,\n  .eva-launch * {\n    animation: none !important;\n    transition: none !important;\n  }\n  .eva-hud__scan,\n  .eva-hud__scanlines {\n    display: none;\n  }\n}\n\n/* --- conversation transcript: bubbles, tabs, meta --- */\ndiv[class*=\"_bubble\"] {\n  border-radius: 0;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-left: 2px solid var(--eva-accent);\n  background: linear-gradient(\n    135deg,\n    var(--dsw-specific-bubble),\n    var(--dsw-alias-bg-layer-2)\n  );\n  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.16), 0 0 18px var(--eva-glow);\n}\nbutton[class*=\"_tab\"] {\n  border-radius: 0;\n  border-bottom: 2px solid transparent;\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  transition: color 0.14s, border-color 0.14s;\n}\nbutton[class*=\"_tab\"]:hover {\n  color: var(--eva-accent);\n}\nbutton[class*=\"_tab\"][class*=\"_tabActive\"] {\n  color: var(--eva-accent);\n  border-bottom-color: var(--eva-accent);\n  font-weight: 600;\n}\n[class*=\"_tablist\"] {\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n}\n[class*=\"_markdown\"] {\n  letter-spacing: 0.006em;\n}\n[class*=\"_chevron\"],\n[class*=\"_arrow\"] {\n  color: var(--dsw-alias-label-tertiary);\n}\n[class*=\"_rowActions\"] button {\n  border-radius: 2px;\n}\n[class*=\"_rowActions\"] button:hover {\n  color: var(--eva-accent);\n}\n\n/* --- menus / popovers (rendered beside <body>, outside #root) --- */\n[role=\"menu\"],\n[role=\"listbox\"] {\n  border: 1px solid var(--dsw-alias-border-l1);\n  border-radius: 2px;\n  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(5, 4, 9, 0.16);\n}\n[role=\"menuitem\"] {\n  border-radius: 2px;\n  font-family: var(--eva-font-hud);\n  font-size: 12px;\n  letter-spacing: 0.04em;\n}\n[role=\"menuitem\"]:hover,\n[role=\"menuitem\"][data-highlighted=\"true\"] {\n  color: var(--eva-accent);\n}\n\n/* =====================================================================\n   MECHA CHROME — cockpit frame, status rail, unit tag, panel hardware.\n   These additions make the post-launch UI read as a machine interior:\n   a persistent bottom telemetry rail, edge frame rails with engraved\n   labels, a unit tag in the header, and bolts / hazard details on the\n   input hatch and message plates.\n   ===================================================================== */\n\n/* --- edge frame rails --- */\n.eva-frame-rail {\n  position: absolute;\n  top: 56px;\n  bottom: calc(var(--eva-status-h) + 46px);\n  width: 10px;\n  pointer-events: none;\n  opacity: 0.55;\n  background: repeating-linear-gradient(\n    180deg,\n    var(--eva-hud-ink) 0 1px,\n    transparent 1px 12px\n  );\n}\n.eva-frame-rail--l {\n  left: 4px;\n}\n.eva-frame-rail--r {\n  right: 4px;\n}\n.eva-frame-rail__text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  writing-mode: vertical-rl;\n  font-style: normal;\n  font-size: 7px;\n  letter-spacing: 0.5em;\n  white-space: nowrap;\n  color: var(--eva-hud-ink);\n}\n.eva-hud[data-fx=\"lite\"] .eva-frame-rail {\n  opacity: 0.28;\n}\n.eva-hud[data-fx=\"off\"] .eva-frame-rail {\n  display: none;\n}\n\n/* --- bottom status rail (shell.bottom, 26px, reduces column height) --- */\n.eva-status {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  height: var(--eva-status-h);\n  box-sizing: border-box;\n  padding: 0 14px;\n  overflow: hidden;\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: var(--dsw-alias-label-tertiary);\n  background: var(--dsw-alias-bg-layer-1);\n  border-top: 1px solid var(--dsw-alias-border-l1);\n  pointer-events: none;\n}\n.eva-status::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: repeating-linear-gradient(45deg, var(--eva-hazard) 0 6px, transparent 6px 12px);\n  opacity: 0.32;\n}\n.eva-status__unit {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--dsw-alias-label-primary);\n  font-weight: 700;\n  letter-spacing: 0.24em;\n}\n.eva-status__hex {\n  width: 10px;\n  height: 10px;\n  background: var(--eva-accent);\n  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);\n  box-shadow: 0 0 9px var(--eva-glow);\n}\n.eva-status__rule {\n  width: 1px;\n  height: 12px;\n  background: var(--dsw-alias-border-l2);\n}\n.eva-status__tag {\n  color: var(--eva-accent);\n  opacity: 0.85;\n}\n.eva-status__sep {\n  width: 14px;\n  height: 1px;\n  background: var(--dsw-alias-border-l2);\n}\n.eva-status__metric {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.eva-status__metric b {\n  font-weight: 600;\n  color: var(--dsw-alias-label-secondary);\n  font-variant-numeric: tabular-nums;\n}\n.eva-status__bars {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 1px;\n  height: 9px;\n}\n.eva-status__bars i {\n  display: block;\n  width: 2px;\n  height: 35%;\n  background: var(--eva-accent);\n  animation: eva-syncbar 1.6s ease-in-out infinite alternate;\n}\n.eva-status__bars i:nth-child(2n) {\n  animation-delay: 0.2s;\n}\n.eva-status__bars i:nth-child(3n) {\n  animation-delay: 0.42s;\n}\n.eva-status__bars i:nth-child(5n) {\n  animation-delay: 0.66s;\n}\n.eva-status__grow {\n  flex: 1;\n}\n.eva-status__wave {\n  display: inline-flex;\n  width: 54px;\n  height: 12px;\n  color: var(--eva-accent);\n  opacity: 0.7;\n}\n.eva-status__wave svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.eva-status__clock {\n  color: var(--dsw-alias-label-secondary);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.12em;\n}\n.eva-status__cycle {\n  color: var(--eva-accent);\n  opacity: 0.7;\n}\n.eva-status__hazard {\n  width: 30px;\n  height: 6px;\n  background: repeating-linear-gradient(45deg, var(--eva-hazard) 0 5px, transparent 5px 10px);\n  opacity: 0.45;\n}\n@media (max-width: 1180px) {\n  .eva-status__metric--wide {\n    display: none;\n  }\n}\n@media (max-width: 900px) {\n  .eva-status__tag,\n  .eva-status__wave,\n  .eva-status__hazard {\n    display: none;\n  }\n}\n\n/* --- header unit tag (conversation.header.leading) --- */\n.eva-headtag {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-right: 10px;\n  padding: 3px 8px;\n  border: 1px solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n  font-family: var(--eva-font-hud);\n  font-size: 9px;\n  letter-spacing: 0.18em;\n  color: var(--dsw-alias-label-secondary);\n  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));\n}\n.eva-headtag__led {\n  width: 5px;\n  height: 5px;\n  background: var(--eva-accent);\n  box-shadow: 0 0 6px var(--eva-glow);\n  animation: eva-pulse 2.4s ease-in-out infinite;\n}\n.eva-headtag__unit {\n  color: var(--dsw-alias-label-primary);\n  font-weight: 700;\n}\n.eva-headtag__sub {\n  opacity: 0.55;\n}\n\n/* --- panel hardware: input hatch bolts --- */\n[data-composer-card]::after {\n  content: \"\";\n  position: absolute;\n  inset: 6px;\n  pointer-events: none;\n  opacity: 0.7;\n  background-image:\n    radial-gradient(circle at 1.5px 1.5px, var(--dsw-alias-border-l3) 1.2px, transparent 1.9px),\n    radial-gradient(circle at calc(100% - 1.5px) 1.5px, var(--dsw-alias-border-l3) 1.2px, transparent 1.9px),\n    radial-gradient(circle at 1.5px calc(100% - 1.5px), var(--dsw-alias-border-l3) 1.2px, transparent 1.9px),\n    radial-gradient(\n      circle at calc(100% - 1.5px) calc(100% - 1.5px),\n      var(--dsw-alias-border-l3) 1.2px,\n      transparent 1.9px\n    );\n}\n\n/* --- message plates: angular cut + inner hairline --- */\ndiv[class*=\"_bubble\"] {\n  clip-path: polygon(\n    0 0,\n    calc(100% - 10px) 0,\n    100% 10px,\n    100% 100%,\n    10px 100%,\n    0 calc(100% - 10px)\n  );\n  box-shadow: inset 0 0 0 1px var(--eva-glow), 0 10px 26px rgba(0, 0, 0, 0.14);\n}\n\n/* --- workspace region: armour seam under the section header --- */\n[class*=\"_regionArea\"] {\n  position: relative;\n}\n[class*=\"_regionArea\"]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 12px;\n  right: 12px;\n  height: 1px;\n  pointer-events: none;\n  background: linear-gradient(90deg, transparent, var(--dsw-alias-border-l2), transparent);\n  opacity: 0.55;\n}\n\n/* =====================================================================\n   LIGHT (\"white hangar\") OVERRIDES — the launch console is dark; the light\n   scheme keeps the same geometry with violet ink and no CRT grain.\n   ===================================================================== */\n\nbody:not([data-ds-dark-theme]) .eva-hud {\n  color: var(--eva-accent);\n}\nbody:not([data-ds-dark-theme]) .eva-corner {\n  border-color: var(--eva-accent);\n  opacity: 0.3;\n}\nbody:not([data-ds-dark-theme]) .eva-hud__hr {\n  background: linear-gradient(90deg, transparent, rgba(106, 31, 168, 0.4), transparent);\n  opacity: 0.4;\n}\nbody:not([data-ds-dark-theme]) .eva-hud__scanlines,\nbody:not([data-ds-dark-theme]) .eva-hud__scan,\nbody:not([data-ds-dark-theme]) .eva-hud__vignette {\n  display: none;\n}\nbody:not([data-ds-dark-theme]) .eva-rail {\n  color: rgba(75, 29, 122, 0.6);\n}\nbody:not([data-ds-dark-theme]) .eva-rail__value,\nbody:not([data-ds-dark-theme]) .eva-rail__stat b,\nbody:not([data-ds-dark-theme]) .eva-rail__clock,\nbody:not([data-ds-dark-theme]) .eva-rail__wave,\nbody:not([data-ds-dark-theme]) .eva-rail__cycle {\n  color: #4b1d7a;\n  text-shadow: none;\n}\nbody:not([data-ds-dark-theme]) .eva-rail__ticks i {\n  background: linear-gradient(180deg, rgba(75, 29, 122, 0.8), rgba(75, 29, 122, 0.12));\n}\nbody:not([data-ds-dark-theme]) .eva-rail__sep {\n  background: rgba(75, 29, 122, 0.35);\n}\nbody:not([data-ds-dark-theme]) .eva-foot__btn:hover {\n  color: #4b1d7a;\n  border-color: rgba(75, 29, 122, 0.4);\n  background: rgba(75, 29, 122, 0.06);\n  box-shadow: 0 0 12px rgba(75, 29, 122, 0.1) inset;\n}\nbody:not([data-ds-dark-theme]) .eva-foot__btn:focus-visible {\n  outline-color: #4b1d7a;\n}\nbody:not([data-ds-dark-theme]) .eva-brandname__sub {\n  color: #4b1d7a;\n  opacity: 0.75;\n}\nbody:not([data-ds-dark-theme]) .eva-brandmark svg {\n  filter: drop-shadow(0 0 5px rgba(106, 31, 168, 0.3));\n}\nbody:not([data-ds-dark-theme]) .eva-hero__glow {\n  background: radial-gradient(circle, rgba(106, 31, 168, 0.26), transparent 70%);\n}\nbody:not([data-ds-dark-theme]) .eva-hero__tag {\n  color: #4b1d7a;\n  text-shadow: none;\n}\nbody:not([data-ds-dark-theme]) .eva-hero__text {\n  border-left-color: rgba(75, 29, 122, 0.35);\n}\nbody:not([data-ds-dark-theme]) .eva-hero__jp {\n  color: #7a2fb0;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-hud__scan {\n    display: none;\n  }\n}\n\n\n/* =====================================================================\n   BERSERK MODE — Unit-01 loses control.\n   body[data-eva-berserk] is toggled by the status-rail switch.  It remaps\n   the whole palette (green → alarm red, calm violet → blood violet), turns\n   the frame into a warning display and overrides the few literal-green\n   details that the calm skin hard-codes.\n   ===================================================================== */\n\nbody[data-eva-berserk] {\n  --eva-alarm: #c21212;\n  --eva-alarm-soft: rgba(194, 18, 18, 0.1);\n  --eva-alert-bg: rgba(255, 250, 248, 0.92);\n  --eva-green: #c21212;\n  --eva-green-signal: #d94a1e;\n  --eva-lilac: #b06a5f;\n  --eva-acid: #e0a800;\n  --eva-amber: #c26a00;\n  --eva-bone: #2a1110;\n  --eva-hud-ink: rgba(140, 15, 15, 0.6);\n  --eva-hud-ink-dim: rgba(140, 15, 15, 0.3);\n  --eva-accent: #c21212;\n  --eva-accent-strong: #8f0b0b;\n  --eva-accent-soft: rgba(194, 18, 18, 0.08);\n  --eva-glow: rgba(194, 18, 18, 0.18);\n  --eva-on-accent: #ffffff;\n  --eva-line: #e3c9c4;\n\n  --dsw-alias-bg-base: #f7efea;\n  --dsw-alias-bg-layer-1: #fbf5f1;\n  --dsw-alias-bg-layer-2: #fffdfc;\n  --dsw-alias-bg-layer-3: #ffffff;\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: #f6ebe5;\n  --dsw-alias-bg-multi-select: #f6ebe5;\n  --dsw-alias-border-l1: #e3c9c4;\n  --dsw-alias-border-l2: #cda6a0;\n  --dsw-alias-border-l3: #b8847c;\n  --dsw-alias-border-l4: #9c625a;\n  --dsw-alias-brand-primary: #c21212;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #c21212;\n  --dsw-alias-brand-text: #2a1110;\n  --dsw-alias-label-primary: #2a1110;\n  --dsw-alias-label-secondary: #6a4642;\n  --dsw-alias-label-tertiary: #8f6a64;\n  --dsw-alias-label-caption: #a07a72;\n  --dsw-alias-label-dimmed: #d8c0ba;\n  --dsw-alias-state-business-primary: #c21212;\n  --dsw-alias-state-business-tertiary: #f5ded9;\n  --dsw-alias-state-success-primary: #8a5300;\n  --dsw-alias-state-warn-primary: #8a5300;\n  --dsw-alias-state-error-primary: #a10d0d;\n  --dsw-alias-state-idle-primary: #a0807a;\n  --dsw-alias-button-primary-fill: #c21212;\n  --dsw-alias-button-primary-hover: #8f0b0b;\n  --dsw-alias-button-primary-dimmed: #f0dad5;\n  --dsw-alias-button-contrast-fill: #d94a1e;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #f7ebe6;\n  --dsw-alias-button-ghost-active-fill: #f2e2dc;\n  --dsw-alias-button-ghost-active-hover: #ebd5ce;\n  --dsw-alias-button-ghost-active-border: #cda6a0;\n  --dsw-alias-interactive-bg-hover: rgba(194, 18, 18, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(194, 18, 18, 0.12);\n  --dsw-alias-interactive-bg-hover-solid: #f4e6e1;\n  --dsw-alias-interactive-bg-hover-accent: rgba(194, 18, 18, 0.14);\n  --dsw-specific-sidebar-fill: #f1e4de;\n  --dsw-specific-sidebar-nav-item-hover: #ecdcd5;\n  --dsw-specific-sidebar-nav-item-active: #e6d1c9;\n  --dsw-specific-sidebar-nav-item-active-accent: #dfc6bd;\n  --dsw-specific-bubble: #f0e0da;\n  --dsw-specific-bubble-highlight: #e6cdc5;\n  --dsw-specific-input-major: #fffdfc;\n  --dsw-specific-selector: #f6ece7;\n  --dsw-specific-tip: #f6ece7;\n  --dsw-specific-menu: rgba(255, 253, 252, 0.95);\n  --dsw-menu-surface-fill: rgba(255, 251, 249, 0.95);\n  --dsw-alias-menu-group-header-fill: rgba(248, 238, 233, 0.96);\n  --dsw-alias-menu-icon: #6a1a16;\n  --dsw-alias-scrollbar-bg-l1: #e0cbc5;\n  --dsw-alias-scrollbar-bg-l2: #cfb3ac;\n  --dsw-alias-scrollbar-hover-l1: #c21212;\n  --dsw-alias-scrollbar-hover-l2: #8f0b0b;\n  --dsw-alias-settings-card-fill: #fffdfc;\n  --dsw-alias-settings-card-stroke: rgba(194, 18, 18, 0.18);\n  --dsw-alias-markdown-code-block: #faf2ee;\n  --dsw-alias-markdown-code-block-banner: #f2e4de;\n  --dsw-alias-markdown-inline-code: rgba(194, 18, 18, 0.08);\n  --dsw-alias-markdown-tag: rgba(194, 18, 18, 0.1);\n  --dsw-alias-markdown-placeholder: #f2e4de;\n  --dsw-alias-toast-bg: #35131a;\n  --dsw-alias-toast-label: #fbeeea;\n  --dsw-alias-tooltip-bg: #35131a;\n  --dsw-alias-switch-thumb: #c21212;\n  --dsw-alias-turn-trigger-bg: #f2e4de;\n  --dsw-alias-turn-trigger-bg-hover: rgba(194, 18, 18, 0.08);\n  --dsw-alias-bg-mask-1: rgba(70, 20, 16, 0.34);\n}\n\nbody[data-ds-dark-theme][data-eva-berserk] {\n  --eva-alarm: #ff3b3b;\n  --eva-alarm-soft: rgba(255, 59, 59, 0.12);\n  --eva-alert-bg: rgba(40, 5, 8, 0.82);\n  --eva-green: #ff3b3b;\n  --eva-green-signal: #ff7a1a;\n  --eva-lilac: #ff9d94;\n  --eva-acid: #ffd400;\n  --eva-amber: #ffb347;\n  --eva-bone: #f6e4e4;\n  --eva-hud-ink: rgba(255, 59, 59, 0.55);\n  --eva-hud-ink-dim: rgba(255, 59, 59, 0.28);\n  --eva-accent: #ff3b3b;\n  --eva-accent-strong: #ff7a1a;\n  --eva-accent-soft: rgba(255, 59, 59, 0.1);\n  --eva-glow: rgba(255, 59, 59, 0.22);\n  --eva-on-accent: #160406;\n  --eva-line: #4a1a22;\n\n  --dsw-alias-bg-base: #0a0406;\n  --dsw-alias-bg-layer-1: #140608;\n  --dsw-alias-bg-layer-2: #1c0a0c;\n  --dsw-alias-bg-layer-3: #260d10;\n  --dsw-alias-bg-overlay: #2a0f13;\n  --dsw-alias-bg-module-platform: #1c0a0c;\n  --dsw-alias-bg-multi-select: #140608;\n  --dsw-alias-border-l1: #4a1a22;\n  --dsw-alias-border-l2: #6b2530;\n  --dsw-alias-border-l3: #8e2f3c;\n  --dsw-alias-border-l4: #b03a48;\n  --dsw-alias-brand-primary: #ff3b3b;\n  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff3b3b;\n  --dsw-alias-brand-text: #f6e4e4;\n  --dsw-alias-label-primary: #f7e9e9;\n  --dsw-alias-label-secondary: #c9a6a6;\n  --dsw-alias-label-tertiary: #9a7777;\n  --dsw-alias-label-caption: #8a6868;\n  --dsw-alias-label-dimmed: #3a2626;\n  --dsw-alias-state-business-primary: #ff3b3b;\n  --dsw-alias-state-business-tertiary: #3a1418;\n  --dsw-alias-state-success-primary: #ffb347;\n  --dsw-alias-state-warn-primary: #ffd400;\n  --dsw-alias-state-error-primary: #ff2d2d;\n  --dsw-alias-state-idle-primary: #8a6a6a;\n  --dsw-alias-button-primary-fill: #ff3b3b;\n  --dsw-alias-button-primary-hover: #ff7a1a;\n  --dsw-alias-button-primary-dimmed: #3a1518;\n  --dsw-alias-button-contrast-fill: #ffd400;\n  --dsw-alias-button-elevated-fill: #2a0f13;\n  --dsw-alias-button-floating-fill: #1c0a0c;\n  --dsw-alias-button-floating-hover: #2a0f13;\n  --dsw-alias-button-ghost-active-fill: #2a0f13;\n  --dsw-alias-button-ghost-active-hover: #351216;\n  --dsw-alias-button-ghost-active-border: #8e2f3c;\n  --dsw-alias-interactive-bg-hover: rgba(255, 59, 59, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(255, 59, 59, 0.14);\n  --dsw-alias-interactive-bg-hover-solid: #260d10;\n  --dsw-alias-interactive-bg-hover-accent: rgba(255, 59, 59, 0.2);\n  --dsw-specific-sidebar-fill: #120508;\n  --dsw-specific-sidebar-nav-item-hover: #200a0e;\n  --dsw-specific-sidebar-nav-item-active: #2c0f14;\n  --dsw-specific-sidebar-nav-item-active-accent: #37131a;\n  --dsw-specific-bubble: #241013;\n  --dsw-specific-bubble-highlight: #301418;\n  --dsw-specific-input-major: #180a0c;\n  --dsw-specific-selector: #200c0e;\n  --dsw-specific-tip: #200c0e;\n  --dsw-specific-menu: rgba(38, 13, 16, 0.94);\n  --dsw-menu-surface-fill: rgba(38, 13, 16, 0.94);\n  --dsw-alias-menu-group-header-fill: rgba(48, 18, 22, 0.95);\n  --dsw-alias-menu-icon: #f0c9c9;\n  --dsw-alias-scrollbar-bg-l1: #3a1418;\n  --dsw-alias-scrollbar-bg-l2: #4a1a22;\n  --dsw-alias-scrollbar-hover-l1: #ff3b3b;\n  --dsw-alias-scrollbar-hover-l2: #ff7a1a;\n  --dsw-alias-settings-card-fill: #180a0c;\n  --dsw-alias-settings-card-stroke: rgba(255, 59, 59, 0.18);\n  --dsw-alias-markdown-code-block: #120608;\n  --dsw-alias-markdown-code-block-banner: #1c0a0c;\n  --dsw-alias-markdown-inline-code: rgba(255, 59, 59, 0.12);\n  --dsw-alias-markdown-tag: rgba(255, 59, 59, 0.16);\n  --dsw-alias-markdown-placeholder: #260d10;\n  --dsw-alias-toast-bg: #2a0f13;\n  --dsw-alias-toast-label: #f6e4e4;\n  --dsw-alias-tooltip-bg: #2a0f13;\n  --dsw-alias-switch-thumb: #ff3b3b;\n  --dsw-alias-turn-trigger-bg: #1c0a0c;\n  --dsw-alias-turn-trigger-bg-hover: rgba(255, 59, 59, 0.1);\n  --dsw-alias-bg-mask-1: rgba(8, 2, 3, 0.66);\n}\n\nbody[data-ds-dark-theme][data-eva-berserk] {\n  background-image:\n    radial-gradient(900px 560px at 18% -10%, rgba(255, 45, 45, 0.16), transparent 62%),\n    radial-gradient(760px 520px at 88% 112%, rgba(255, 122, 26, 0.08), transparent 64%),\n    repeating-linear-gradient(0deg, rgba(255, 220, 220, 0.028) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(255, 220, 220, 0.028) 0 1px, transparent 1px 46px);\n}\nbody:not([data-ds-dark-theme])[data-eva-berserk] {\n  background-image:\n    radial-gradient(900px 560px at 18% -10%, rgba(194, 18, 18, 0.1), transparent 62%),\n    repeating-linear-gradient(0deg, rgba(194, 18, 18, 0.04) 0 1px, transparent 1px 46px),\n    repeating-linear-gradient(90deg, rgba(194, 18, 18, 0.04) 0 1px, transparent 1px 46px);\n}\n\n/* --- berserk HUD details --- */\nbody[data-eva-berserk] .eva-corner {\n  border-color: var(--eva-alarm);\n  opacity: 0.6;\n}\nbody[data-eva-berserk] .eva-hud__hr {\n  background: linear-gradient(90deg, transparent, var(--eva-alarm), transparent);\n  opacity: 0.55;\n}\nbody[data-eva-berserk] .eva-hud__scan {\n  background: linear-gradient(\n    180deg,\n    transparent,\n    var(--eva-alarm-soft) 48%,\n    rgba(255, 212, 0, 0.05) 52%,\n    var(--eva-alarm-soft) 56%,\n    transparent\n  );\n  animation-duration: 5.5s;\n}\nbody[data-eva-berserk] .eva-hud__scanlines {\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(60, 0, 0, 0.4) 0 1px,\n    transparent 1px 3px\n  );\n  opacity: 0.25;\n}\nbody[data-eva-berserk] .eva-hud__vignette {\n  background: radial-gradient(125% 105% at 50% 45%, transparent 50%, rgba(40, 0, 4, 0.6) 100%);\n  opacity: 0.8;\n}\nbody[data-eva-berserk] .eva-brandmark svg {\n  filter: drop-shadow(0 0 7px var(--eva-alarm));\n}\nbody[data-eva-berserk] .eva-hero__mark {\n  filter: drop-shadow(0 0 16px rgba(255, 45, 45, 0.55)) drop-shadow(0 0 4px rgba(255, 212, 0, 0.3));\n  animation-duration: 2.4s;\n}\nbody[data-eva-berserk] .eva-rail__ticks i {\n  background: linear-gradient(180deg, var(--eva-alarm), rgba(255, 59, 59, 0.12));\n}\nbody[data-eva-berserk] .eva-rail__hazard {\n  background: repeating-linear-gradient(\n    45deg,\n    rgba(255, 212, 0, 0.75) 0 4px,\n    rgba(90, 0, 0, 0.9) 4px 8px\n  );\n  opacity: 0.6;\n}\nbody[data-eva-berserk] .eva-foot__btn:hover {\n  color: var(--eva-alarm);\n  border-color: var(--eva-alarm);\n  background: var(--eva-alarm-soft);\n  box-shadow: 0 0 12px var(--eva-alarm-soft) inset;\n}\n\n/* --- HUD warning edge + alert chip --- */\n.eva-hud__edge {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: 0;\n  box-shadow:\n    inset 0 0 0 1px var(--eva-alarm-soft),\n    inset 0 0 140px var(--eva-alarm-soft);\n}\nbody[data-eva-berserk] .eva-hud__edge {\n  opacity: 1;\n  animation: eva-berserk-breathe 2.6s ease-in-out infinite;\n}\n.eva-hud__alert {\n  position: absolute;\n  top: 48px;\n  right: 16px;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 4px 9px;\n  border: 1px solid var(--eva-alarm);\n  background: var(--eva-alert-bg);\n  color: var(--eva-alarm);\n  font-size: 9px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  box-shadow: 0 0 16px var(--eva-alarm-soft);\n  animation: eva-berserk-flicker 2.8s steps(1) infinite;\n}\n.eva-hud__alert b {\n  font-weight: 700;\n  letter-spacing: 0.26em;\n}\n.eva-hud__alert i {\n  font-style: normal;\n  color: var(--eva-hazard);\n}\n\n/* --- status rail switch --- */\n.eva-status__main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n}\n.eva-status__berserk {\n  pointer-events: auto;\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: none;\n  height: 18px;\n  margin-left: 4px;\n  padding: 0 9px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-secondary);\n  font-family: var(--eva-font-hud);\n  font-size: 8.5px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  cursor: pointer;\n  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));\n  transition: color 0.15s, background 0.15s, border-color 0.15s, box-shadow 0.15s;\n}\n.eva-status__berserk:hover {\n  color: var(--eva-alarm);\n  border-color: var(--eva-alarm);\n  box-shadow: 0 0 12px var(--eva-alarm-soft);\n}\n.eva-status__berserk[data-on=\"1\"] {\n  border-color: var(--eva-alarm);\n  background: var(--eva-alarm);\n  color: var(--eva-on-accent);\n  box-shadow: 0 0 16px var(--eva-alarm-soft);\n  animation: eva-berserk-pulse 1.2s ease-in-out infinite;\n}\n.eva-status__berserkLed {\n  display: inline-block;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: currentColor;\n  box-shadow: 0 0 7px currentColor;\n}\n.eva-status__berserkLabel {\n  line-height: 1;\n}\n.eva-status[data-berserk=\"1\"] .eva-status__tag,\n.eva-status[data-berserk=\"1\"] .eva-status__metric b,\n.eva-status[data-berserk=\"1\"] .eva-status__clock,\n.eva-status[data-berserk=\"1\"] .eva-status__cycle {\n  color: var(--eva-alarm);\n}\n.eva-status[data-berserk=\"1\"] .eva-status__hex {\n  background: var(--eva-alarm);\n  box-shadow: 0 0 10px var(--eva-alarm);\n}\n.eva-status[data-berserk=\"1\"] .eva-status__bars i,\n.eva-status[data-berserk=\"1\"] .eva-status__wave {\n  background: var(--eva-alarm);\n  color: var(--eva-alarm);\n  animation-duration: 0.5s;\n}\n.eva-status[data-berserk=\"1\"] .eva-status__hazard {\n  background: repeating-linear-gradient(\n    45deg,\n    var(--eva-alarm) 0 5px,\n    transparent 5px 10px\n  );\n  opacity: 0.85;\n}\n\n/* --- header tag in berserk --- */\n.eva-headtag[data-berserk=\"1\"] {\n  border-color: var(--eva-alarm);\n  color: var(--eva-alarm);\n}\n.eva-headtag[data-berserk=\"1\"] .eva-headtag__led {\n  background: var(--eva-alarm);\n  box-shadow: 0 0 8px var(--eva-alarm);\n  animation-duration: 0.8s;\n}\n.eva-headtag[data-berserk=\"1\"] .eva-headtag__unit {\n  color: var(--eva-alarm);\n}\n\n/* --- berserk activation burst --- */\n.eva-burst {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  overflow: hidden;\n  pointer-events: none;\n  animation: eva-fade-in 0.18s ease-out both;\n}\n.eva-burst[data-leave=\"1\"] {\n  animation: eva-burst-out 0.55s ease-in both;\n}\n.eva-burst__flash {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    62% 62% at 50% 50%,\n    rgba(255, 59, 59, 0.85),\n    rgba(120, 0, 8, 0.35) 45%,\n    transparent 72%\n  );\n  animation: eva-burst-flash 1.9s ease-out both;\n}\n.eva-burst__grid {\n  position: absolute;\n  inset: 0;\n  background-image:\n    repeating-linear-gradient(0deg, rgba(255, 59, 59, 0.12) 0 1px, transparent 1px 26px),\n    repeating-linear-gradient(90deg, rgba(255, 59, 59, 0.1) 0 1px, transparent 1px 26px);\n  opacity: 0.55;\n  animation: eva-burst-grid 0.9s linear infinite;\n}\n.eva-burst__ring {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 68vmin;\n  height: 68vmin;\n  margin: -34vmin 0 0 -34vmin;\n  border: 2px solid rgba(255, 59, 59, 0.55);\n  border-radius: 50%;\n  animation: eva-burst-ring 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;\n}\n.eva-burst__ring--2 {\n  border-width: 1px;\n  animation-delay: 0.25s;\n}\n.eva-burst__core {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  text-align: center;\n  animation: eva-burst-shake 0.42s steps(2) 4;\n}\n.eva-burst__tag {\n  font-family: var(--eva-font-hud);\n  font-size: 10px;\n  letter-spacing: 0.5em;\n  color: var(--eva-hazard);\n}\n.eva-burst__title {\n  font-family: var(--eva-font-display);\n  font-size: clamp(64px, 11vw, 150px);\n  font-weight: 900;\n  letter-spacing: 0.22em;\n  color: var(--eva-alarm);\n  text-shadow: 0 0 46px rgba(255, 59, 59, 0.65), 0 0 10px rgba(255, 255, 255, 0.4);\n}\n.eva-burst__sub {\n  font-family: var(--eva-font-hud);\n  font-size: 11px;\n  letter-spacing: 0.5em;\n  color: #f6e4e4;\n  opacity: 0.9;\n}\n.eva-burst__bars {\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 3px;\n  height: 26px;\n  margin-top: 6px;\n}\n.eva-burst__bars i {\n  display: block;\n  width: 3px;\n  height: calc(20% + var(--i) * 8%);\n  background: var(--eva-alarm);\n  animation: eva-burst-bar 0.5s ease-in-out infinite alternate;\n  animation-delay: calc(var(--i) * -0.08s);\n}\n.eva-burst__hazard {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 14px;\n  background: repeating-linear-gradient(45deg, #ffd400 0 10px, #12030a 10px 20px);\n  opacity: 0.9;\n  animation: eva-hazard-slide 4s linear infinite;\n}\n\n@keyframes eva-berserk-breathe {\n  0%,\n  100% {\n    opacity: 0.35;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes eva-berserk-flicker {\n  0%,\n  88%,\n  100% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 0.35;\n  }\n  92% {\n    opacity: 1;\n  }\n  94% {\n    opacity: 0.2;\n  }\n  96% {\n    opacity: 1;\n  }\n}\n@keyframes eva-berserk-pulse {\n  0%,\n  100% {\n    box-shadow: 0 0 10px var(--eva-alarm-soft);\n  }\n  50% {\n    box-shadow: 0 0 22px var(--eva-alarm-soft);\n  }\n}\n@keyframes eva-burst-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes eva-burst-flash {\n  0% {\n    opacity: 0;\n  }\n  12% {\n    opacity: 1;\n  }\n  38% {\n    opacity: 0.55;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes eva-burst-grid {\n  to {\n    background-position: 0 26px, 26px 0;\n  }\n}\n@keyframes eva-burst-ring {\n  0% {\n    opacity: 0.9;\n    transform: scale(0.25);\n  }\n  70% {\n    opacity: 0.9;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.25);\n  }\n}\n@keyframes eva-burst-shake {\n  0% {\n    transform: translate(0, 0);\n  }\n  25% {\n    transform: translate(-3px, 2px);\n  }\n  50% {\n    transform: translate(3px, -2px);\n  }\n  75% {\n    transform: translate(-2px, -3px);\n  }\n  100% {\n    transform: translate(0, 0);\n  }\n}\n@keyframes eva-burst-bar {\n  from {\n    height: 18%;\n  }\n  to {\n    height: 100%;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .eva-burst *,\n  body[data-eva-berserk] .eva-hud__edge,\n  body[data-eva-berserk] .eva-hud__alert,\n  body[data-eva-berserk] .eva-hero__mark,\n  .eva-status__berserk[data-on=\"1\"] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n\n/* berserk-only extra texture */\nbody[data-eva-berserk] [class*=\"_sidebarCol\"]::after {\n  background: repeating-linear-gradient(\n    135deg,\n    var(--eva-alarm) 0 3px,\n    rgba(255, 212, 0, 0.6) 3px 6px\n  );\n  opacity: 0.5;\n}\nbody[data-eva-berserk] .eva-status::before {\n  background: repeating-linear-gradient(\n    45deg,\n    var(--eva-alarm) 0 6px,\n    transparent 6px 12px\n  );\n  opacity: 0.5;\n}\nbody[data-eva-berserk] .eva-hud__edge {\n  box-shadow:\n    inset 0 0 0 1px rgba(255, 59, 59, 0.35),\n    inset 0 0 160px rgba(255, 59, 59, 0.28);\n}\nbody[data-eva-berserk] .eva-hud__edge::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(\n    115deg,\n    transparent 46%,\n    rgba(255, 59, 59, 0.07) 50%,\n    transparent 54%\n  );\n  background-size: 280% 280%;\n  animation: eva-berserk-sweep 3.6s linear infinite;\n}\n@keyframes eva-berserk-sweep {\n  from {\n    background-position: 0% 0%;\n  }\n  to {\n    background-position: 100% 100%;\n  }\n}\n\n/* =====================================================================\n   BERSERK OVERLOAD — stronger frame shake + glitch tear stripes.\n   The frame transform makes the whole console shudder; horizontal RGB/tear\n   bands sweep across it at irregular intervals.  Both are disabled for\n   prefers-reduced-motion.\n   ===================================================================== */\n\nbody[data-eva-berserk][data-eva-berserk-shake] #root > div[data-slot=\"root\"] > [class*=\"_frame\"] {\n  transform-origin: 50% 50%;\n  animation: eva-berserk-shake 1.15s steps(1, end) 4 forwards;\n  will-change: transform;\n}\n\n@keyframes eva-berserk-shake {\n  0% {\n    transform: scale(1.02) translate3d(0, 0, 0);\n  }\n  8% {\n    transform: scale(1.02) translate3d(-4px, 2px, 0);\n  }\n  16% {\n    transform: scale(1.02) translate3d(4px, -2px, 0);\n  }\n  24% {\n    transform: scale(1.02) translate3d(-3px, 3px, 0);\n  }\n  32% {\n    transform: scale(1.02) translate3d(3px, -3px, 0);\n  }\n  40% {\n    transform: scale(1.02) translate3d(-4px, -2px, 0);\n  }\n  52% {\n    transform: scale(1.02) translate3d(2px, 2px, 0);\n  }\n  64% {\n    transform: scale(1.02) translate3d(-11px, 5px, 0);\n  }\n  68% {\n    transform: scale(1.02) translate3d(11px, -6px, 0);\n  }\n  72% {\n    transform: scale(1.02) translate3d(-8px, 6px, 0);\n  }\n  76% {\n    transform: scale(1.02) translate3d(8px, -4px, 0);\n  }\n  80% {\n    transform: scale(1.02) translate3d(-4px, 2px, 0);\n  }\n  88% {\n    transform: scale(1.02) translate3d(2px, -2px, 0);\n  }\n  100% {\n    transform: scale(1.02) translate3d(0, 0, 0);\n  }\n}\n\n.eva-hud__glitch {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n.eva-hud__glitch i {\n  position: absolute;\n  left: -12%;\n  right: -12%;\n  height: 2px;\n  opacity: 0;\n  mix-blend-mode: screen;\n  background: linear-gradient(\n    90deg,\n    transparent 0%,\n    rgba(255, 45, 45, 0.92) 26%,\n    rgba(255, 212, 0, 0.55) 50%,\n    rgba(255, 59, 59, 0.8) 66%,\n    transparent 88%\n  );\n  box-shadow: 0 0 10px rgba(255, 59, 59, 0.55);\n  animation: eva-glitch-band 3.2s steps(1, end) infinite;\n}\n.eva-hud__glitch i:nth-child(1) {\n  top: 13%;\n  height: 3px;\n  animation-delay: 0.15s;\n  animation-duration: 2.9s;\n}\n.eva-hud__glitch i:nth-child(2) {\n  top: 28%;\n  height: 14px;\n  opacity: 0.5;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(255, 45, 45, 0.55) 0 2px,\n    transparent 2px 6px\n  );\n  animation-delay: 0.9s;\n  animation-duration: 3.7s;\n}\n.eva-hud__glitch i:nth-child(3) {\n  top: 44%;\n  height: 10px;\n  background: repeating-linear-gradient(\n    90deg,\n    rgba(255, 45, 45, 0.75) 0 18px,\n    rgba(255, 212, 0, 0.35) 18px 26px,\n    transparent 26px 44px\n  );\n  animation-delay: 1.7s;\n  animation-duration: 4.3s;\n}\n.eva-hud__glitch i:nth-child(4) {\n  top: 61%;\n  height: 2px;\n  animation-delay: 2.4s;\n  animation-duration: 3.1s;\n}\n.eva-hud__glitch i:nth-child(5) {\n  top: 76%;\n  height: 5px;\n  animation-delay: 0.55s;\n  animation-duration: 3.9s;\n}\n.eva-hud__glitch i:nth-child(6) {\n  top: 88%;\n  height: 3px;\n  animation-delay: 1.25s;\n  animation-duration: 4.7s;\n}\n.eva-hud__glitch::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  mix-blend-mode: screen;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(255, 45, 45, 0.22) 0 2px,\n    rgba(255, 212, 0, 0.06) 2px 4px,\n    transparent 4px 9px\n  );\n  opacity: 0;\n  animation: eva-glitch-flash 4.2s steps(1, end) infinite;\n}\n.eva-hud__glitch::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: -160px;\n  height: 160px;\n  background: linear-gradient(180deg, transparent, rgba(255, 45, 45, 0.16), transparent);\n  animation: eva-glitch-roll 4.2s linear infinite;\n}\n\n@keyframes eva-glitch-band {\n  0% {\n    opacity: 0;\n    transform: translateX(0) scaleY(1);\n  }\n  3% {\n    opacity: 1;\n    transform: translateX(-18px) scaleY(1.5);\n  }\n  6% {\n    opacity: 0;\n    transform: translateX(12px);\n  }\n  9% {\n    opacity: 0.85;\n    transform: translateX(-9px);\n  }\n  12% {\n    opacity: 0;\n  }\n  48% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0.95;\n    transform: translateX(20px) scaleY(0.8);\n  }\n  53% {\n    opacity: 0;\n    transform: translateX(-10px);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes eva-glitch-flash {\n  0%,\n  84% {\n    opacity: 0;\n  }\n  86% {\n    opacity: 0.95;\n  }\n  88% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 0.75;\n  }\n  92% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes eva-glitch-roll {\n  to {\n    transform: translateY(calc(100vh + 240px));\n  }\n}\n\n/* =====================================================================\n   COLLAPSED SIDEBAR — the 56 px rail puts the native window controls over\n   the header area, so the unit tag, the top-left bracket and the left frame\n   rail are removed there and the footer actions become a compact 2×2 pad.\n   ===================================================================== */\n\nbody:has([data-collapsed=\"true\"]) .eva-headtag {\n  display: none;\n}\nbody:has([data-collapsed=\"true\"]) .eva-corner--tl {\n  display: none;\n}\nbody:has([data-collapsed=\"true\"]) .eva-frame-rail--l {\n  display: none;\n}\nbody:has([data-collapsed=\"true\"]) .eva-brandmark svg {\n  max-width: 22px;\n  max-height: 22px;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot {\n  display: grid;\n  grid-template-columns: repeat(2, 16px);\n  gap: 3px;\n  justify-items: center;\n  align-items: center;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot__btn {\n  width: 16px;\n  height: 16px;\n  min-width: 16px;\n  padding: 0;\n  border-radius: 1px;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot__glyph {\n  font-size: 8px;\n}\nbody:has([data-collapsed=\"true\"]) .eva-foot__label {\n  display: none;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  body[data-eva-berserk][data-eva-berserk-shake] #root > div[data-slot=\"root\"] > [class*=\"_frame\"],\n  .eva-hud__glitch i,\n  .eva-hud__glitch::after,\n  .eva-hud__glitch::before {\n    animation: none !important;\n  }\n}\n";
    const ART = {"head":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" width=\"120\" height=\"120\" fill=\"none\" role=\"img\" aria-label=\"Original Unit-01 style mecha head emblem\">\n  <defs>\n    <linearGradient id=\"eva01HeadArmor\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#7A2FB0\"/>\n      <stop offset=\".58\" stop-color=\"#4B1D7A\"/>\n      <stop offset=\"1\" stop-color=\"#1A0B2E\"/>\n    </linearGradient>\n  </defs>\n\n  \n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" opacity=\".5\">\n    <path d=\"M3 90h10M3 96h6M107 90h10M111 96h6M3 83h4M113 83h4\"/>\n  </g>\n\n  \n  <path d=\"M44 24 31 15 28 21 39 30Z\" fill=\"#1A0B2E\" stroke=\"#7A2FB0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M76 24 89 15 92 21 81 30Z\" fill=\"#1A0B2E\" stroke=\"#7A2FB0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M54 25 64 23.5 67.5 1.5 60 3Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M58 22.5 63 22 65 8 62 8.5Z\" fill=\"#4B1D7A\"/>\n  \n\n  \n  <g stroke=\"#4B1D7A\" stroke-width=\"2\" stroke-linejoin=\"miter\">\n    <path d=\"M8 118 20 97 48 91 56 104 54 118Z\" fill=\"#1A0B2E\"/>\n    <path d=\"M112 118 100 97 72 91 64 104 66 118Z\" fill=\"#1A0B2E\"/>\n  </g>\n  <path d=\"M17 105 24 100 27 103 20 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M103 105 96 100 93 103 100 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M28 96 36 94M92 96 84 94\" stroke=\"#6B5F80\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M53 78H67L69 95H51Z\" fill=\"#6B5F80\" stroke=\"#2E2340\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54.5 82H65.5M54 87.5H66\" stroke=\"#2E2340\" stroke-width=\"1.5\"/>\n  <path d=\"M46 92H74L80 107H40Z\" fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M51 96H69L71 102H49Z\" fill=\"#050409\"/>\n  <path d=\"M58 98h4v3h-4Z\" fill=\"#9DFF4A\"/>\n\n  \n  <path d=\"M52 15 68 15 78 21 87 38 84 50 88 62 79 79 67 88 53 88 41 79 32 62 36 50 33 38 42 21Z\"\n        fill=\"url(#eva01HeadArmor)\" stroke=\"#B98BE0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <g stroke=\"#6B5F80\" stroke-width=\"1.5\" stroke-linecap=\"square\">\n    <path d=\"M36.5 48 41.5 48M35.5 53 40.5 53.6M34.5 58 39.5 58.6\"/>\n  </g>\n\n  \n  <path d=\"M45 26 75 26 79 40 60 44 41 40Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 28.5v13\" stroke=\"#E9E2F5\" stroke-width=\"1.5\"/>\n  <path d=\"M50 32.5 56.5 32.5M70 32.5 63.5 32.5\" stroke=\"#B98BE0\" stroke-width=\"1.5\"/>\n  <path d=\"M45.5 30.5h3v3h-3Z\" fill=\"#050409\" stroke=\"#FF6B1A\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M43 41 77 41 73 66 47 66Z\" fill=\"#050409\" stroke=\"#2E2340\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M44 44 76 44\" stroke=\"#1A0B2E\" stroke-width=\"2\"/>\n\n  \n  <path d=\"M60 40 77 40 73 66 60 66Z\" fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M64 44 70 45 68 58 63 62Z\" fill=\"#7A2FB0\"/>\n  <path d=\"M64 66 70 64.5\" stroke=\"#B98BE0\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M44.5 48.5 59.8 46 60.2 55.5 46 58.5Z\" fill=\"#9DFF4A\" stroke=\"#4DFFB0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M45.5 49.7 59 47.3\" stroke=\"#C6FF00\" stroke-width=\"1.2\"/>\n\n  \n  <path d=\"M47 66 73 66 77 77 67 87 53 87 43 77Z\" fill=\"#1A0B2E\" stroke=\"#B98BE0\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M60 67.5v6\" stroke=\"#B98BE0\" stroke-width=\"1\"/>\n  <g fill=\"#050409\">\n    <path d=\"M51 77 53.4 76.6 53.8 84.5 51.6 84.9Z\"/>\n    <path d=\"M55.2 76.6 57.6 76.2 58 84.1 55.8 84.5Z\"/>\n    <path d=\"M59.4 76.2 61.8 75.9 62.2 83.7 60 84.1Z\"/>\n    <path d=\"M63.6 75.9 66 75.6 66.2 83.3 64.2 83.6Z\"/>\n  </g>\n\n  \n  <circle cx=\"90\" cy=\"61\" r=\"7\" fill=\"#1A0B2E\" stroke=\"#6B5F80\" stroke-width=\"2\"/>\n  <circle cx=\"90\" cy=\"61\" r=\"2.8\" fill=\"#FF6B1A\"/>\n  <path d=\"M90 53.5v2M90 66.5v2M82.5 61h2M95.5 61h2\" stroke=\"#6B5F80\" stroke-width=\"1.5\"/>\n  <path d=\"M97 58.5 104 56 106 63 99 65.5Z\" fill=\"#6B5F80\" stroke=\"#2E2340\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M98.5 60 103 58.6\" stroke=\"#FF6B1A\" stroke-width=\"2\"/>\n</svg>","icon":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\" width=\"128\" height=\"128\" role=\"img\" aria-label=\"Unit-01 plugin icon\">\n  \n  <rect width=\"128\" height=\"128\" fill=\"#0A0612\"/>\n  <path d=\"M16 6H112L122 16V112L112 122H16L6 112V16Z\" fill=\"#120A22\" stroke=\"#2E2340\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M14 104 23 95 27 99 18 108Z\" fill=\"#FFD400\"/>\n  <path d=\"M114 104 105 95 101 99 110 108Z\" fill=\"#FFD400\"/>\n\n  <g transform=\"translate(4 8) scale(.94)\">\n  \n  <path d=\"M40 31 24 19 20 29 34 42Z\" fill=\"#1A0B2E\" stroke=\"#7A2FB0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M54 25 71 20 86 2 72 6Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M59 23 68 20 75 9 70 10Z\" fill=\"#4B1D7A\"/>\n\n  \n  <path d=\"M64 18 86 29 96 54 92 74 82 94 64 106 46 94 36 74 32 54 42 29Z\"\n        fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M64 20 84 30 86 40 64 44 42 40 44 30Z\" fill=\"#7A2FB0\" stroke=\"#B98BE0\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M64 44 88 50 86 76 64 92 42 76 40 50Z\" fill=\"#050409\" stroke=\"#2E2340\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n\n  \n  <path d=\"M64 44 88 50 86 76 64 92 63 68 64 55Z\" fill=\"#4B1D7A\" stroke=\"#B98BE0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M70 55 81 58 80 73 70 79Z\" fill=\"#7A2FB0\"/>\n\n  \n  <path d=\"M43 57 62 52 63 70 45 75Z\" fill=\"#9DFF4A\" stroke=\"#4DFFB0\" stroke-width=\"3\" stroke-linejoin=\"miter\"/>\n  <path d=\"M44.5 59.5 61 54.5\" stroke=\"#C6FF00\" stroke-width=\"2.5\"/>\n\n  \n  <g fill=\"#050409\">\n    <path d=\"M53 94 57 93 57 102 53.5 102.8Z\"/>\n    <path d=\"M60 93 64 92.6 64 101.6 60.4 102Z\"/>\n    <path d=\"M67 92.6 71 92.4 70.8 101.2 67.2 101.6Z\"/>\n  </g>\n\n  \n  <circle cx=\"96\" cy=\"63\" r=\"8.5\" fill=\"#1A0B2E\" stroke=\"#6B5F80\" stroke-width=\"3\"/>\n  <circle cx=\"96\" cy=\"63\" r=\"3.5\" fill=\"#FF6B1A\"/>\n  <path d=\"M96 51.5v2.5M96 72v2.5M84.5 63H87M105 63h2.5\" stroke=\"#6B5F80\" stroke-width=\"2.5\"/>\n  </g>\n</svg>","badge":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 56\" width=\"200\" height=\"56\" role=\"img\" aria-label=\"EVA-01 HUD badge\">\n  \n  <path d=\"M12 1H178L199 28 178 55H12L1 28Z\" fill=\"currentColor\"/>\n  <path d=\"M12 1H178L199 28 178 55H12L1 28Z\" fill=\"none\" stroke=\"#050409\" stroke-width=\"2\" stroke-linejoin=\"miter\"/>\n  <path d=\"M15 6H175L190 28 175 50H15L5 28Z\" fill=\"#050409\" fill-opacity=\".8\"/>\n  <path d=\"M15 6H175L190 28 175 50H15L5 28Z\" fill=\"none\" stroke=\"#B98BE0\" stroke-opacity=\".45\" stroke-width=\"1\"/>\n\n  \n  <path d=\"M22 9 34 16V36L22 43 10 36V16Z\" fill=\"#1A0B2E\" stroke=\"#6B5F80\" stroke-width=\"1.5\" stroke-linejoin=\"miter\"/>\n  <path d=\"M22 14 28 17V24L22 27 16 24V17Z\" fill=\"#4B1D7A\"/>\n\n  \n  <path class=\"accent\" fill=\"#9DFF4A\" d=\"M14.5 27 28 22.8 29 30.5 15.5 34.7Z M40 40H118L115 43H40Z\"/>\n\n  <text x=\"40\" y=\"16\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"7.5\" letter-spacing=\"1.6\" fill=\"#6B5F80\">LAUNCH SEQUENCE</text>\n  <text x=\"40\" y=\"35\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"21\" font-weight=\"700\" letter-spacing=\"2.4\" fill=\"#E9E2F5\">EVA-01</text>\n  <text x=\"189\" y=\"35\" text-anchor=\"end\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"14\" letter-spacing=\"1\" fill=\"#B98BE0\">初号機</text>\n  <text x=\"189\" y=\"16\" text-anchor=\"end\" font-family=\"ui-monospace, Menlo, monospace\" font-size=\"7\" letter-spacing=\"1.4\" fill=\"#6B5F80\">SYNC 100%</text>\n  <path d=\"M172 45h13M175 49h10\" stroke=\"#6B5F80\" stroke-width=\"1.5\"/>\n</svg>","hazard":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" role=\"img\" aria-label=\"Seamless 45 degree hazard stripes\">\n  \n  <rect width=\"24\" height=\"24\" fill=\"#050409\"/>\n  <g stroke=\"#FFD400\" stroke-width=\"2.83\" stroke-linecap=\"butt\">\n    <path d=\"M -30 -54 L 54 30\"/>\n    <path d=\"M -30 -46 L 54 38\"/>\n    <path d=\"M -30 -38 L 54 46\"/>\n    <path d=\"M -30 -30 L 54 54\"/>\n    <path d=\"M -30 -22 L 54 62\"/>\n    <path d=\"M -30 -14 L 54 70\"/>\n    <path d=\"M -30 -6 L 54 78\"/>\n  </g>\n</svg>","waveform":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 220 28\" width=\"220\" height=\"28\" fill=\"none\" role=\"img\" aria-label=\"Sync ratio HUD waveform\">\n  \n  <path d=\"M8 25.5H212\" stroke=\"currentColor\" stroke-width=\"1\" opacity=\".35\"/>\n  <g stroke=\"currentColor\" stroke-width=\"1\" opacity=\".3\">\n    <path d=\"M8 22.5v3M56 22.5v3M104 22.5v3M152 22.5v3M200 22.5v3M212 22.5v3\"/>\n  </g>\n\n  \n  <g fill=\"currentColor\">\n    <rect x=\"17\" y=\"16\" width=\"6\" height=\"9\" opacity=\".55\"/>\n    <rect x=\"29\" y=\"10\" width=\"6\" height=\"15\"/>\n    <rect x=\"41\" y=\"19\" width=\"6\" height=\"6\" opacity=\".55\"/>\n    <rect x=\"53\" y=\"5\" width=\"6\" height=\"20\"/>\n    <rect x=\"65\" y=\"14\" width=\"6\" height=\"11\" opacity=\".7\"/>\n    <rect x=\"77\" y=\"8\" width=\"6\" height=\"17\"/>\n    <rect x=\"89\" y=\"21\" width=\"6\" height=\"4\" opacity=\".55\"/>\n    <rect x=\"101\" y=\"6\" width=\"6\" height=\"19\"/>\n    <rect x=\"113\" y=\"12\" width=\"6\" height=\"13\" opacity=\".7\"/>\n    <rect x=\"125\" y=\"4\" width=\"6\" height=\"21\"/>\n    <rect x=\"137\" y=\"17\" width=\"6\" height=\"8\" opacity=\".55\"/>\n    <rect x=\"149\" y=\"11\" width=\"6\" height=\"14\"/>\n    <rect x=\"161\" y=\"7\" width=\"6\" height=\"18\" opacity=\".85\"/>\n    <rect x=\"173\" y=\"18\" width=\"6\" height=\"7\" opacity=\".55\"/>\n    <rect x=\"185\" y=\"13\" width=\"6\" height=\"12\"/>\n    <rect x=\"197\" y=\"20\" width=\"6\" height=\"5\" opacity=\".7\"/>\n  </g>\n\n  \n  <path d=\"M122 3h12l-6 -2.5Z\" fill=\"currentColor\"/>\n  <path d=\"M65 16.5h6\" stroke=\"#050409\" stroke-width=\"1.5\"/>\n\n  \n  <path d=\"M8 8V4h5M212 8V4h-5\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".6\"/>\n</svg>"};

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
