# Pilot voice lines — original copy

Twelve short captions for the nervous pilot layer. Each line is an original
sentence written for this skin (nothing quoted from the series), kept short
enough to be spoken by a TTS voice in one breath and read on a 2-line caption.

| event | 日本語 | 中文 | English |
| --- | --- | --- | --- |
| gate | ゲートの前で、足が止まる | 在闸门前，脚迈不动。 | My legs stop at the gate. |
| boot | システム、起動した…？ | 系统…启动了吗？ | System… booted? |
| pilot | パイロット、搭乗します | 驾驶员，开始登机。 | Pilot, boarding now. |
| plug | プラグ、入るの…怖い | 插入栓要进去了…好怕。 | The plug's closing in… I'm scared. |
| neural | 神経、つながってく… | 神经…正在接上。 | Nerves… linking up. |
| sync | シンクロ率、上がってる | 同步率在往上走。 | Sync ratio is climbing. |
| activate | 初号機が、動き出した | 初号机…动起来了。 | Unit-01 is moving. |
| launch | 発進、します…！ | 要…出发了！ | Launching…! |
| welcome | 来てくれた…うれしい | 你来了…我很高兴。 | You came… I'm glad. |
| berserk_on | 止まらない、誰か止めて | 停不下来…谁来拦住它！ | It won't stop… someone stop it! |
| berserk_off | …戻った、の？ | ……回来了吗？ | …We're back? |
| complete | 生きてる…よかった | 还活着…太好了。 | I'm alive… thank goodness. |

`welcome` is the pilot greeting the user on app open; `complete` is the quiet
line after a finished task. Every Japanese line is ≤ 14 characters.

## Pilot tagline

| 日本語 | 中文 | English |
| --- | --- | --- |
| 怖いけど、乗る。 | 害怕，但还是上去。 | Scared — but I'll get in. |

Use as the layer's one-line title under `pilot-avatar.svg`; do not wrap the
Japanese line, it is designed to sit on one line.

## Suggested subtitle style

| element | spec |
| --- | --- |
| 日本語 (primary) | 15px / line-height 1.5 / `#E9E2F5` / `letter-spacing:.02em` |
| 中文 (secondary) | 12px / line-height 1.5 / `#BFD8FF` / `letter-spacing:.02em` |
| English (tertiary) | 10px uppercase / mono / `#FFB347` / `letter-spacing:.14em` |
| plate | `rgba(5,4,9,.72)`, 1px `#2E2340` border, 6px amber `#FF6B1A` left bar, one 6px cut corner |
| rhythm | 1.4 s per line, 2.4 s for `berserk_on` / `berserk_off`, 120 ms fade-in, no bounce |

## Delivery notes (TTS)

- Teen boy, hesitant, half-breath: let the sentence trail off on the `…`, never
  shout except on `berserk_on`.
- `発進` is one word — keep a short pause before the final `します`.
- If only one line fits, show the Japanese; the English is the accessibility
  fallback and should never truncate mid-word.
