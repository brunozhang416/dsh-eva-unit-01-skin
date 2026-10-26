# NOTICE

## Third-party media (excluded from this repository's MIT license)

The following files are reused from
[`seaison/dsh-plugin-eva-theme`](https://github.com/seaison/dsh-plugin-eva-theme)
at the project owner's explicit request, for the pilot-selection screen:

- `assets/entry-plug.svg` — original file `assets/svg/eva-entry-plug.svg`

That project's `LICENSE` covers code under MIT but explicitly excludes third-party
media assets, and its `NOTICE.md`/`docs/assets.md` record the provenance of the
entry plug artwork. All rights remain with their respective
authors; this repository only redistributes them with attribution for a
non-commercial fan project. The entry plug SVG was additionally repaired to be
valid standalone XML (a valueless `data-boot-unit` attribute) and given an
internal `<style>` fallback for its CSS variables.

`assets/avatar-shinji.png`, `assets/portrait-shinji.png`,
`assets/avatar-asuka.png`, `assets/portrait-asuka.png`,
`assets/avatar-rei.png` and `assets/portrait-rei.png` are crops / transparent
line-art conversions of images supplied directly by the project owner for this
personal fan project (Shinji in his room with headphones/SDAT; Asuka in her red
plugsuit; Rei as a blue line-art sketch). Copyright remains with the supplier;
they are included at the owner's explicit request and are not covered by this
repository's MIT license.

## Music, voice and the rest

All music and sound effects are synthesised at runtime by `src/audio.js` from an
original composition; no audio files are shipped. Pilot "voice" is the operating
system's TTS reading original lines written for this plugin. No official
Evangelion recordings, voice-actor performances or official artwork are included.
Evangelion, NERV, the character names and unit numbers are referenced as homage
in a non-commercial fan project.
