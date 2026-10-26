# NOTICE

## Third-party media (excluded from this repository's MIT license)

The following files are reused from
[`seaison/dsh-plugin-eva-theme`](https://github.com/seaison/dsh-plugin-eva-theme)
at the project owner's explicit request, for the pilot-selection screen:

- `assets/avatar-asuka.png` — original file `assets/images/asuka-avatar-closed-eyes.png`
- `assets/avatar-rei.png` — original file `assets/images/rei-avatar-closed-eyes.png`
- `assets/portrait-asuka.png` — original file `assets/images/asuka-portrait-lineart.png`
- `assets/portrait-rei.png` — original file `assets/images/rei-portrait-lineart.png`
- `assets/entry-plug.svg` — original file `assets/svg/eva-entry-plug.svg`
- `assets/nerv-emergency.svg` — original file `assets/svg/nerv-emergency.svg` (central NERV/motto/clock text removed so the UI can render live text)

That project's `LICENSE` covers code under MIT but explicitly excludes third-party
media assets, and its `NOTICE.md`/`docs/assets.md` record the provenance of the
character line art and the entry plug. All rights remain with their respective
authors; this repository only redistributes them with attribution for a
non-commercial fan project. The entry plug SVG was additionally repaired to be
valid standalone XML (a valueless `data-boot-unit` attribute) and given an
internal `<style>` fallback for its CSS variables.

`assets/avatar-shinji.png` and `assets/portrait-shinji.png` are crops of an
illustration supplied directly by the project owner for this personal fan
project (the seated Shinji in a room with headphones and SDAT). Copyright remains
with the supplier; they are included at the owner's explicit request and are not
covered by this repository's MIT license.

## Music, voice and the rest

All music and sound effects are synthesised at runtime by `src/audio.js` from an
original composition; no audio files are shipped. Pilot "voice" is the operating
system's TTS reading original lines written for this plugin. No official
Evangelion recordings, voice-actor performances or official artwork are included.
Evangelion, NERV, the character names and unit numbers are referenced as homage
in a non-commercial fan project.
