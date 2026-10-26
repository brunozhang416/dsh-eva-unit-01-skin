# EVA Unit-01 — design tokens

Authoritative palette. Copy the whole `:root` block into the plugin's base CSS.
Do not invent new hues; mix only via the derived tokens below.

## Palette as CSS custom properties

```css
:root {
  /* --- core palette (authoritative) --- */
  --eva-void:          #050409;  /* page / void black            */
  --eva-purple-deep:   #1A0B2E;  /* recesses, deep panels        */
  --eva-purple-mid:    #4B1D7A;  /* primary armour / surfaces    */
  --eva-purple-hot:    #7A2FB0;  /* lit facets, rings            */
  --eva-lilac:         #B98BE0;  /* outlines, secondary labels   */
  --eva-green:         #9DFF4A;  /* unit green: eye, primary CTA */
  --eva-green-signal:  #4DFFB0;  /* signal green: live, sync     */
  --eva-acid:          #C6FF00;  /* peak highlights only         */
  --eva-orange:        #FF6B1A;  /* cable / warning orange       */
  --eva-red:           #FF2D2D;  /* destructive, errors          */
  --eva-yellow:        #FFD400;  /* hazard stripes               */
  --eva-bone:          #E9E2F5;  /* primary text                 */
  --eva-steel:         #6B5F80;  /* metal, inactive, mute text   */
  --eva-amber:         #FFB347;  /* timers, warm accents         */

  /* --- semantic / derived (do not add raw hexes elsewhere) --- */
  --eva-bg:            var(--eva-void);
  --eva-bg-raised:     #0B0716;                 /* 1 step above void       */
  --eva-surface:       #120A22;                 /* cards, composer         */
  --eva-surface-2:     var(--eva-purple-deep);  /* nested panels           */
  --eva-line:          #2E2340;                 /* 1px hairlines           */
  --eva-text:          var(--eva-bone);
  --eva-text-dim:      var(--eva-steel);
  --eva-focus:         var(--eva-green);
  --eva-danger:        var(--eva-red);
  --eva-glow:          rgba(157, 255, 74, .18); /* keep <= .2 opacity      */
  /* derived neutrals: elevation/hairlines only, never brand colour:
     #0B0716, #120A22, #2E2340 */

  /* --- geometry: 45-degree cuts, only these sizes --- */
  --eva-cut-sm:  6px;
  --eva-cut-md: 10px;
  --eva-cut-lg: 16px;
  --eva-cut-xl: 24px;

  /* --- type --- */
  --eva-font-mono: ui-monospace, "SFMono-Regular", "SF Mono", Menlo,
                   "Cascadia Mono", "Roboto Mono", "Noto Sans Mono", monospace;
  --eva-font-display: "DIN Condensed", "Arial Narrow", "Helvetica Neue",
                   Inter, system-ui, sans-serif;
  --eva-font-body: system-ui, -apple-system, "Segoe UI", Roboto,
                   "Helvetica Neue", "PingFang SC", "Noto Sans SC",
                   "Hiragino Sans", "Noto Sans JP", sans-serif;

  /* --- motion --- */
  --eva-ease: cubic-bezier(.2, .8, .2, 1);
  --eva-dur: 180ms;
}
```

## Typography

| Role | Stack | Rules |
| --- | --- | --- |
| HUD mono labels | `var(--eva-font-mono)` | 10–12px, uppercase, `letter-spacing:.12em`, colour `--eva-text-dim` or `--eva-green-signal` for live states |
| Display headings | `var(--eva-font-display)` | 24–44px, uppercase, `letter-spacing:.04em`, `font-stretch:condensed`, colour `--eva-bone`; pair with a 2px green rail above |
| Body / chat | `var(--eva-font-body)` | 13–15px, line-height 1.6, colour `--eva-bone`, dim meta via `--eva-text-dim` |

All stacks are system-only — no downloads. Never ship a font file with the skin.

## Radius, angles, spacing

- Radius: **0** everywhere. The only exception is a 1px optical softening may be omitted entirely.
- Angles: **90 / 45 / 135 degrees only**. Hazard stripes are exactly 45°, chevrons 90°.
- Cuts: corner cut with `clip-path`, x-offset = y-offset (a true 45° cut): `6px` (chips/tags), `10px` (buttons/inputs), `16px` (panels/cards), `24px` (hero panels).
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48`. Panel padding `12px 14px` (compact) or `16px 20px` (roomy). Grid gap `8px` or `12px`.
- Stroke weights: `1px` hairlines (borders, rules), `2px` accent rails (active item, message edge), `3px` emblem strokes (never render an emblem below 24px).
- Corner ticks: `6px × 1px` pairs at panel corners, colour `--eva-steel` at 60% opacity; they replace rounded corners as the "detail" language.

```css
/* reusable 45-degree cut utilities */
.eva-cut-md { clip-path: polygon(0 0, calc(100% - var(--eva-cut-md)) 0, 100% var(--eva-cut-md),
  100% 100%, var(--eva-cut-md) 100%, 0 calc(100% - var(--eva-cut-md))); }
.eva-cut-tr { clip-path: polygon(0 0, calc(100% - var(--eva-cut-md)) 0, 100% var(--eva-cut-md),
  100% 100%, 0 100%); }
```

## Styling recipes

### 1. Sidebar — launch-control rail

```css
.eva-sidebar {
  position: relative;
  background: linear-gradient(90deg, var(--eva-bg-raised), var(--eva-bg) 70%);
  border-right: 1px solid var(--eva-line);
}
.eva-sidebar::before {            /* hazard tooth rail, left edge */
  content: ""; position: absolute; inset: 0 auto 0 0; width: 3px;
  background: repeating-linear-gradient(45deg, var(--eva-yellow) 0 3px, transparent 3px 6px);
  opacity: .45;
}
.eva-sidebar__item {
  position: relative; display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; color: var(--eva-text-dim);
  font: 600 11px/1 var(--eva-font-mono); letter-spacing: .12em; text-transform: uppercase;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px));
}
.eva-sidebar__item[aria-current="true"] {
  color: var(--eva-bone);
  background: linear-gradient(90deg, rgba(75, 29, 122, .6), transparent 85%);
  box-shadow: inset 2px 0 0 var(--eva-green);
}
.eva-sidebar__item[aria-current="true"]::after {
  content: ""; position: absolute; right: 12px; width: 6px; height: 6px;
  background: var(--eva-green); transform: rotate(45deg);
}
```

### 2. Composer — sync-ratio input block

```css
.eva-composer {
  background: var(--eva-surface);
  border: 1px solid var(--eva-line);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .55);
}
.eva-composer:focus-within {
  border-color: var(--eva-purple-hot);
  box-shadow: 0 0 0 1px var(--eva-green), 0 0 18px var(--eva-glow);
}
.eva-composer__send {
  background: var(--eva-green); color: #06110A; border: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  font: 700 11px/1 var(--eva-font-mono); letter-spacing: .1em; text-transform: uppercase;
}
.eva-composer__hint {
  font: 500 10px/1 var(--eva-font-mono); letter-spacing: .14em;
  color: var(--eva-text-dim); text-transform: uppercase;
}
```

### 3. Buttons

```css
.eva-btn {
  --btn-cut: 10px;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px; border: 0; cursor: pointer;
  font: 700 11px/1 var(--eva-font-mono); letter-spacing: .1em; text-transform: uppercase;
  clip-path: polygon(0 0, calc(100% - var(--btn-cut)) 0, 100% var(--btn-cut), 100% 100%, 0 100%);
  transition: background var(--eva-dur) var(--eva-ease), box-shadow var(--eva-dur) var(--eva-ease);
}
.eva-btn--primary { background: var(--eva-green); color: #06110A; }
.eva-btn--primary:hover { background: var(--eva-acid); box-shadow: 0 0 18px var(--eva-glow); }
.eva-btn--ghost {
  background: transparent; color: var(--eva-lilac); box-shadow: inset 0 0 0 1px var(--eva-purple-hot);
}
.eva-btn--ghost:hover { color: var(--eva-bone); box-shadow: inset 0 0 0 1px var(--eva-green); }
.eva-btn--danger { background: var(--eva-orange); color: var(--eva-void); }
.eva-btn:focus-visible { outline: 2px solid var(--eva-green); outline-offset: 2px; }
```

### 4. Message bubble

```css
.eva-msg {
  position: relative; padding: 11px 14px;
  background: var(--eva-surface); border: 1px solid var(--eva-line);
  color: var(--eva-text);
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
}
.eva-msg--user {
  background: linear-gradient(135deg, var(--eva-purple-mid), var(--eva-purple-deep));
  border-color: var(--eva-purple-hot);
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px);
}
.eva-msg--unit::before {           /* assistant = the Unit speaking */
  content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; width: 2px;
  background: var(--eva-green);
}
.eva-msg__meta {
  margin-bottom: 6px;
  font: 500 10px/1 var(--eva-font-mono); letter-spacing: .14em;
  color: var(--eva-text-dim); text-transform: uppercase;
}
```

### 5. Badge — `badge-hex.svg` inline

```html
<span class="eva-badge" style="color: var(--eva-purple-mid)">
  <!-- inline badge-hex.svg here -->
</span>
```

```css
.eva-badge { display: inline-flex; height: 28px; color: var(--eva-purple-mid); }
.eva-badge svg { display: block; height: 100%; width: auto; }
.eva-badge .accent { fill: var(--eva-green); }       /* recolour eye + rule */
.eva-badge--hot { color: var(--eva-purple-hot); }    /* whole-plate recolour */
```

The plate is `fill="currentColor"`: set `color` on the wrapper. The single
`class="accent"` path is the green eye + baseline rule and recolours on its own.

### 6. Scanline overlay

```css
.eva-scan {
  position: fixed; inset: 0; z-index: 60; pointer-events: none;
  background:
    repeating-linear-gradient(to bottom, rgba(5, 4, 9, .32) 0 1px, transparent 1px 3px),
    radial-gradient(120% 80% at 50% 0%, rgba(157, 255, 74, .05), transparent 60%);
}
.eva-scan::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(157, 255, 74, .06), transparent);
  animation: eva-sweep 7s linear infinite;
}
@keyframes eva-sweep { from { transform: translateY(-40%); } to { transform: translateY(40%); } }
@media (prefers-reduced-motion: reduce) { .eva-scan::after { animation: none; } }
```

Keep the overlay ≤ 6% opacity, `pointer-events:none` always, and never blend over
the composer text caret. Scanlines are atmosphere, not a filter over reading text.

## Inline-SVG notes

- Gradient IDs are prefixed (`eva01HeadArmor`). If the same artwork is inlined
  twice, rename the ID or move the gradient to a single shared `<defs>`.
- `icon.svg` has an opaque background and can be used directly as a favicon/chip.
- `head.svg` is transparent; place it on `--eva-bg` or `--eva-bg-raised`.
- `hazard.svg` is a 24×24 tile: use `background-repeat: repeat` at 100% size, or
  `background-size: 24px 24px`.
