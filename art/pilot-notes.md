# Pilot layer — file notes

1. Avatars — `pilot-avatar.svg`, `asuka-avatar.svg`, `rei-avatar.svg`: 120×120 bust chips, transparent background, A10/interface clips at the temples, designed to read at 24×24 and hold up at 160 px.
2. Portraits — `pilot-portrait.svg` (white/blue plugsuit, launch sequence), `pilot-casual.svg` (navy jacket, auth gate), `asuka-portrait.svg` (red suit, arms crossed), `rei-portrait.svg` (white/ice suit, hands at sides): 240×320, transparent, corner HUD ticks, at most one gradient each.
3. Icons and motifs — `a10-clip.svg`: 24×24 single clamp, every mark `currentColor`; `at-field.svg`: 240×240 concentric hexagon gate backdrop, all strokes `currentColor`.
4. Mecha heads — `head.svg` (original Unit-01 emblem) plus `head-02.svg` (red/orange) and `head-03.svg` (white/ice/black): same 120×120 geometry, palette-swap recolours of our own artwork only.
5. Palettes — pilot: suit white `#EAF0FA`, blue `#2F5FE0`, red collar `#FF2D2D`, amber `#FFB347`; Asuka: red `#D6293E`, orange `#FF7A1A`, white `#F4EDEF`, deep `#2A0A10`; Rei: white `#EDF3FA`, ice `#7FC4E8`, pale blue `#3D7EA6`, red accent `#C93A4B`; heads per variant.
6. Recolouring — avatars/portraits use literal hexes (search-replace a value to retheme); `a10-clip.svg` and `at-field.svg` follow the parent CSS `color`; the only gradients are `pilotSuitGrade` and `pilotCasualNavy`; IDs are prefixed `pilot*` / `eva0*` to survive inlining.
7. Sizing — avatars 24–32 px in HUD rows or 96–160 px as chips; portraits at ≥120 px wide; `pilot-casual.svg` is the authentication-gate art while `pilot-portrait.svg` stays in the launch sequence.
8. Originality — every path is hand-authored original vector geometry (the Unit-02/03 heads are palette swaps of our own `head.svg`); no traced or cropped official art, no external fonts, images or references, and no quoted series text.
