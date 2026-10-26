# EVA Unit-01 — art pack (original artwork, local use only)

1. `head.svg` — main bust emblem: angular purple mecha head, one green eye, crest horn, cable port; viewBox `0 0 120 120`, transparent bg, one gradient (`eva01HeadArmor`). Reads at 40px and 160px.
2. `icon.svg` — square plugin chip/favicon; viewBox `0 0 128 128`, opaque cut-corner plate, same head simplified for 24–32px.
3. `badge-hex.svg` — HUD badge: angular plate + "EVA-01" + 初号機; viewBox `0 0 200 56`; plate is `fill="currentColor"` and exactly one path has `class="accent"` (eye + rule) for recolouring.
4. `hazard.svg` — seamless 45° hazard-stripe tile, black/yellow; viewBox `0 0 24 24`; repeat at 24×24.
5. `waveform.svg` — sync-ratio tape, 16 bars, peak marker; viewBox `0 0 220 28`; everything is `currentColor`.
6. `palette.md` — `:root` tokens (`--eva-*`), system font stacks, cut/angle/spacing rules, 6 copy-ready CSS recipes.
7. `launch-copy.md` — 16-line launch table (stage / 日本語 / 中文 / English / ms) plus the hero tagline.
Colours are fixed in `head.svg` and `icon.svg`; `badge-hex.svg` and `waveform.svg` recolour through CSS `color` (currentColor).
All files are self-contained SVGs: no `<image>`, no external refs, no web fonts; IDs are prefixed to survive inlining.
The artwork is original geometry drawn for this skin — not a copy of any licensed logo, character line art, or trademark.
