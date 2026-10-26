# EVA Unit-01 — launch-sequence copy

16 boot lines, in order. `ms` is the suggested dwell for a scripted launch
overlay; total ≈ **8.9 s** if played back-to-back, ≈ 6 s if you overlap 30%.
Use `--eva-font-mono`, 10–12px, uppercase, `letter-spacing:.12em` for the
English column; Japanese/Chinese get `letter-spacing:0` and a 1px lift.

| # | stage | 日本語 | 中文 | English | ms |
| --- | --- | --- | --- | --- | --- |
| 1 | boot | システム起動 | 系统启动 | SYSTEM BOOT | 600 |
| 2 | boot | 神経接続 開始 | 神经连接开始 | NEURAL LINK START | 520 |
| 3 | boot | 電力 供給 | 电源接入 | POWER FEED | 420 |
| 4 | MAGI check | マギ 照合 | MAGI 校验 | MAGI CHECK | 700 |
| 5 | sync start | シンクロ 開始 | 同步开始 | SYNC START | 560 |
| 6 | sync start | シンクロ率 上昇 | 同步率上升 | SYNC RATIO RISING | 620 |
| 7 | sync 100% | シンクロ率 100% | 同步率 100% | SYNC 100% | 760 |
| 8 | sync 100% | パイロット 適合 | 驾驶员适配 | PILOT MATCHED | 520 |
| 9 | power | 主電源 接続 | 主电源连接 | MAIN POWER CONNECT | 460 |
| 10 | power | 電圧 安定 | 电压稳定 | VOLTAGE STABLE | 380 |
| 11 | launch | 初号機 起動 | 初号机 启动 | UNIT-01 ACTIVATED | 900 |
| 12 | launch | 発進 | 出发 | LAUNCH | 1000 |
| 13 | status tick | 装甲 正常 | 装甲正常 | ARMOR NOMINAL | 320 |
| 14 | status tick | 冷却系 正常 | 冷却系统正常 | COOLANT NOMINAL | 320 |
| 15 | status tick | 通信 確立 | 通信建立 | COMMS LOCKED | 320 |
| 16 | status tick | 全系統 正常 | 全系统正常 | ALL SYSTEMS GREEN | 520 |

## Stage accent colours

| stage | accent | where it shows |
| --- | --- | --- |
| boot | `--eva-lilac` | labels only, no glow |
| MAGI check | `--eva-steel` → `--eva-green-signal` on pass | thin progress rule |
| sync start | `--eva-green-signal` | waveform / rising ratio |
| sync 100% | `--eva-green` + `--eva-acid` peak | flash the ratio once, then settle |
| power | `--eva-amber` | voltage ticks |
| launch | `--eva-green` → `--eva-orange` on 発進 | 2px full-width rail, then decay |
| status tick | `--eva-steel` | checkmarks, 1px rules |

## Hero tagline

| 日本語 | 中文 | English |
| --- | --- | --- |
| 起動——初号機、発進。 | 启动——初号机，出发。 | Ignite — Unit-01, launch. |

Suggested placement: hero heading under the emblem, display stack, 28–40px,
uppercase for the English line only; the Japanese line is the primary and
should stay on one line (do not wrap between 初号機 and 発進).

## Playback notes

- Fire lines on a single timeline; never stagger by more than 80 ms per line or
  the launch loses the machine-gun control-room feel.
- 発進 (LAUNCH) should land with a 120 ms white/green flash capped at 8% opacity.
- Respect `prefers-reduced-motion`: skip the flash, keep the copy.
- The sequence is for a local skin; "MAGI" and "初号機" here are plain stage
  labels, not reproduced marks or logos.
