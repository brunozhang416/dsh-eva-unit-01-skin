# EVA Unit-01 Launch Skin · 初号机启动皮肤

把 **DeepSeek Harness Web GUI** 整体改造成「初号机启动控制台」的皮肤插件（Cordis bundle，Host 半空 + Client 半纯前端）。

- 包名：`dsh-eva-unit-01-skin`
- 形态：Client 侧皮肤插件，不改 Host、不接后端、不含遥测
- 适配：Harness Desktop / Web 客户端（深色、浅色两套配色都做了独立设计）

## 特性

### 七幕开屏启动序列（约 13.7s）

`システム起動 → パイロット搭乗 → プラグ挿入 → 神経接続 → シンクロ率 100% → 初号機 起動 → 発進`

- 第一幕：MAGI 自检终端、旋转仪表、启动进度
- 第二幕：插入栓剖面、LCL 注液上升与气泡、A10 夹钳合拢
- 第三幕：插入栓下压、双侧装甲夹钳锁定、`LOCKED` 钢印
- 第四幕：双路神经波形描线、同步率 0 → 86%
- 第五幕：环形同步表盘冲满 100%
- 第六幕：初号机头像亮眼、装甲张开、电源级联
- 第七幕：弹射轨道、`発進` 巨字 + 闪光，整屏上收露出主界面

跳过方式：右上 `SKIP`、`Esc`、`Space`、`Enter`；点画面其他位置不会误跳过。系统开启「减少动态效果」时改为 2.7s 静态三拍，不会只剩黑屏。

![パイロット搭乗 — amber LCL injection](docs/launch-amber-lcl.jpg)

### 机甲化主界面

- 底部全宽遥测条：`EVA-01 / 発進管制 / SYNC / MAGI / POWER / A.T. FIELD / LCL / 波形 / 时钟 / CYCLE`
- 对话头部 `EVA-01 TEST TYPE` 编号牌、左右边缘刻度导轨 + 竖排雕刻标签
- 输入舱 45° 切角、四角螺栓、聚焦绿光；消息板切角 + 内衬发光
- 侧栏右缘黄黑警示条、工作区装甲接缝、会话行方形化
- 输入框上方同步率导轨（SYNC / MAGI / POWER / A.T. / 波形 / 时钟）

### 失控模式（BERSERK / 暴走）

入口（两个，同一状态）：底部遥测条最右侧 `⚠ 暴走`；侧栏底部控制组第 4 个 `⚠ 暴走`。

- 全站从紫/绿切换到血红/琥珀（深浅两套都有对应设计）
- 进入时约 2s `制御不能` 爆闪 + `UNIT-01 BERSERK // CONTROL LOST`
- 画面抖动为**一次性 5s**（常规 ±4px、每 1.15s 一次 ±11px 剧烈抽动，`scale(1.02)` 预放大避免露白边），5s 后自动收住，只保留红色暴走界面
- 故障条纹：6 条水平撕裂带 + 每 4.2s 整屏红色扫描线闪断 + 纵向滚动故障带
- 常驻告警牌、红色 HUD 边框、状态遥测改为 `SYNC 412.0% / MAGI FAILED / POWER OVERLOAD / A.T. FIELD COLLAPSED / LCL LEAK`
- 状态持久化；再次点击退出；`prefers-reduced-motion` 下抖动/闪断关闭

### 侧边栏折叠适配

折叠态下 macOS 原生窗口按钮会压到内容区左上角，皮肤会自动：

- 隐藏头部编号牌，把位置让给系统窗口按钮与宿主导航
- 隐藏左上角 HUD 准星与左侧边缘导轨
- 品牌头像缩到 22px；底部 4 个控制按钮改为 2×2 紧凑布局

## 安装

### 方式一：Plugin Manager（推荐）

1. 打开 Harness：**设置 → 插件 → 添加插件**
2. 填仓库地址：`https://github.com/brunozhang416/dsh-eva-unit-01-skin`
3. 在「已安装插件」中启用 **EVA 初号机启动皮肤**
4. 刷新页面（`⌘R` / `Ctrl+R`），首屏会播放完整启动序列

### 方式二：本地目录

```bash
git clone https://github.com/brunozhang416/dsh-eva-unit-01-skin.git
```

设置 → 插件 → 添加插件 → 填入克隆后的本地目录绝对路径 → 启用。

### 卸载

设置 → 插件 → 关闭「EVA 初号机启动皮肤」。主题令牌层、样式表与所有 Slot 贡献会随插件一起移除，界面恢复原样。

## 控制

| 入口 | 作用 |
| --- | --- |
| 侧栏底部 `▶ 起動` | 重播完整七幕启动序列 |
| 侧栏底部 `◈ HUD` | HUD 强度循环：`◈ 完整 → ◇ 精简 → ○ 关闭` |
| 侧栏底部 `◐ MODE` | 明暗快速切换（写入 Harness 主题偏好；恢复跟随系统请到 设置 → 通用设置 → 外观） |
| 侧栏底部 / 底部遥测条 `⚠ 暴走` | 切换失控模式（状态持久化） |

页面状态键：`localStorage: eva01.hud.fx`、`eva01.berserk`。

## 开发

```bash
node build.mjs --check   # 内联 src/skin.css + art/*.svg 到 client.js，并做语法/清单校验
```

| 文件 | 说明 |
| --- | --- |
| `src/client.template.js` | Client 半源码（React createElement，无 JSX；构建时注入 CSS/SVG） |
| `src/skin.css` | 全部样式：EVA 设计令牌、宿主界面皮肤、HUD、启动序列、暴走模式、折叠适配 |
| `art/*.svg` | 原创矢量素材：初号机头像、插件图标、HUD 徽章、警示条纹、波形 |
| `client.js` | 构建产物（Harness 加载的浏览器模块） |
| `index.js` | Host 半（空实现，皮肤不需要 Host 能力） |
| `cordis.patch.yml` | Bundle patch，插入 `dsh-eva-unit-01-skin` 行 |

## 兼容性与边界（如实记录）

- **宿主类名会随版本重建而变**：组件内部定位使用 `[class*="_localName"]`（如 `_sessionRow` / `_bubble` / `_headline`）与稳定的 `[data-slot]` / `[data-*]` / `role` 锚点；类名轮换时外观会降级为纯令牌配色，不会破坏布局或功能。
- 主题令牌优先走 `ctx.theme.overrideTokens()` 的 alias token，其余令牌由皮肤样式表在 `body` / `body[data-ds-dark-theme]` 上补齐。
- 启动序列、HUD、故障条纹均为 `pointer-events: none`，不拦截交互；启动序列播放期间会临时拦截底层点击，结束即恢复。
- 所有美术为**原创矢量素材**，不含官方 EVA/NERV 素材。
- 已验证环境：DeepSeek Harness Desktop（macOS；深浅两套主题、hero/对话两态、侧栏折叠、设置面板、插件管理页、添加插件弹窗、启动重播、减少动效、暴走爆闪/抖动/故障条纹）。

## License

[MIT](LICENSE) © 2026 brunozhang416
