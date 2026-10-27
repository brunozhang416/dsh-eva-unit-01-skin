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

`assets/berserk-01.png` and `assets/berserk-02.png` are Unit-01/Unit-02
berserk illustrations supplied by the project owner; backgrounds were removed
with the system foreground-mask API. They are included at the owner's request
and are not covered by this repository's MIT license.


`assets/berserk-02-red.png` is the new Unit-02 berserk artwork supplied by the
project owner; the black background and typography were removed with the
system foreground-mask API. It is included at the owner's request and is not
covered by this repository's MIT license.

`assets/avatar-shinji.png`, `assets/portrait-shinji.png`,
`assets/avatar-asuka.png`, `assets/portrait-asuka.png`,
`assets/avatar-rei.png` and `assets/portrait-rei.png` are crops / transparent
line-art conversions of images supplied directly by the project owner for this
personal fan project (Shinji in his room with headphones/SDAT; Asuka in her red
plugsuit; Rei in her plugsuit inside the entry plug). Copyright remains with the supplier;
they are included at the owner's explicit request and are not covered by this
repository's MIT license.


`assets/angel-ascend.png` is a transparent cutout of the winged angel/figure
from a poster reference image supplied by the project owner, used for the
"使徒、襲来" opening card. Copyright remains with the original author; it is
included at the owner's request and is not covered by this repository's MIT
license.


`assets/berserk-00.png` is the LILITH-on-the-cross artwork supplied by the
project owner; the black card background was removed with the system
foreground-mask API and the red cross was retained. It is included at the
owner's request and is not covered by this repository's MIT license.


`assets/evangelion.mp3` is the launch-sequence BGM track supplied by the
project owner. It is embedded in the client bundle at the owner's request and
is not covered by this repository's MIT license. The intro Angel cue, system
TTS and all SFX remain generated at runtime.


`assets/decisive-battle.mp3` is the chat-page BGM track supplied by the
project owner. It is embedded in the client bundle at the owner's request and
is not covered by this repository's MIT license.


`assets/asuka-scream.mp3` is the Unit-02 berserk clip supplied by the project
owner. It is embedded in the client bundle at the owner's request and is not
covered by this repository's MIT license.


`assets/unit01-berserk.mp3` is a 5-second excerpt cut from the owner-supplied
`decisive-battle.mp3` for the Unit-01 berserk cue. It is embedded at the
owner's request and is not covered by this repository's MIT license.

## Music, voice and the rest

All music and sound effects are synthesised at runtime by `src/audio.js` from an
original composition; no audio files are shipped. Pilot "voice" is the operating
system's TTS reading original lines written for this plugin. No official
Evangelion recordings, voice-actor performances or official artwork are included.
Evangelion, NERV, the character names and unit numbers are referenced as homage
in a non-commercial fan project.
