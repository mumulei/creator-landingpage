# Creator Landing Page (Paico Unicorn)

Welcome to the Creator Landing Page project! This repository contains the source code for the high-conversion, visually stunning landing page built with React, Vite, and Unicorn Studio (WebGL).

## 📐 基础规范 (Guidelines)

为了保证后续维护和迭代的顺利进行，接手的开发者（或 Agent）请严格遵守以下开发规范：

### 1. 动效与交互 (Animations & Interactions)
- **CSS 优先**：所有的微交互和入场动画均通过 CSS `@keyframes` 驱动，位于 `index.css` 底部。
- **Transform 签名严格对齐 (🚨 关键规则)**：
  如果一个元素有由 CSS `@keyframes` 驱动的入场动画，请确保 `from` 和 `to` 的 `transform` 函数列表**完全一致**。
  例如，如果是 3D 透视动画，请这样写：
  ```css
  from { transform: perspective(1200px) translateY(150px) rotateX(15deg) scale(0.95); }
  to   { transform: perspective(1200px) translateY(0) rotateX(0deg) scale(1); }
  ```
  **绝对不要**在 `to` 中省略 `perspective` 或 `rotateX` 等属性。否则，浏览器会将其退化为 Matrix 矩阵插值，在 WebGL 画布持续重绘引发复合层重新计算时，会产生肉眼可见的 4-6px 抖动偏移！
- **可访问性兼容**：所有的动画必须包裹在 `@media (prefers-reduced-motion: no-preference)` 媒体查询中。

### 2. 响应式与 2K 适配布局 (Responsive & 2K Adaptive Layout)
- **断点与缩放规范 (Breakpoints & Scaling)**：
  - **Mobile 移动端 (≤ 640px)**：折叠为全屏汉堡菜单，圆角在任何卡片或图片上强制锁定为 `8px` 以保证视觉一致性。文字大小和行高进行缩减（如 section title 缩至 `28px`），卡片转为单列垂直平铺。安全边距 `--safe-padding` 锁定为 `20px`。
  - **Tablet 平板端 (641px - 1150px)**：介于 `641px` 与 `1024px` 之间时优化导航栏间距与字号，防止链接溢出换行。安全边距 `--safe-padding` 锁定为 `40px`。
  - **Desktop 桌面流式缩放端 (1151px - 2560px)**：使用 CSS 变量（如 `--safe-padding: 5.7vw`，以及 `--section-padding-y`、`--title-font-size`、`--scale-grid-gap`、`--scale-card-height` 等）随屏幕宽度等比流式缩放容器、组件间距和字体大小。
  - **Ultra-Wide 超 2K 极限端 (> 2560px)**：一旦屏幕宽度超出 2K (`2560px`)，所有容器和组件的响应式缩放将**停止**，尺寸锁定（例如安全边距锁定在 `146px`，内容最大宽度锁定在 `2268px` 并水平居中）。此时，**只有左右安全外边距继续向外扩展**以吸收超宽屏的剩余空间，同时各 Section 背景色仍然保持 `100%` 全屏宽度填充，保证视觉背景的连续性。
- **Hero 区域自动裁剪与缩放**：
  - 首屏 `.hero` 容器高度限制为 `100vh` 且 `overflow: hidden; clip-path: inset(0);`，通过底部的纯白渐变遮罩与后续 Section 自然融合。
  - 在桌面端，Hero 内部的文字容器 `.hero-copy`、标题字号 (`clamp`)、CTA 按钮尺寸和 Mockup 外壳 `.hero-mockup-shell` 同样使用流式 Clamp 或百分比设定，随着屏幕宽度在桌面段内等比放大，在超 2K 后锁定最大宽度并居中，确保 1920 屏幕下也能展现极其合理的视觉比例。

### 3. 精确卡片动效与 CSS 遮罩方案 (Key Features Animations & CSS Mask)
- **卡片 2 (Flexible pricing) 变色与位移**：
  - 过渡动作从 `5%` 延长至约 **`11%` (0.66s)**，选用 **`cubic-bezier(0.25, 1, 0.5, 1)`** (easeOutQuart) 曲线，消除生硬的弹跳感，令卡片如奶油般平顺地“揉”进目标坐标。
  - **CSS 遮罩 (Mask) 重构**：为避免 CSS 滤镜 `filter: brightness() saturate()` 在不同浏览器和色彩配置下的偏差，将 `<img>` 替换为带有 `mask-image` / `-webkit-mask-image` 的遮罩 `<span>` 元素。在关键帧中直接通过修改背景色 `background-color` 精准无偏地渲染鲜艳色 **`#F20093`** 和默认浅色 **`#F9A6D8`**。
  - **防简写失效规范 (🚨 关键规则)**：部分浏览器由于 CSS 简写 `mask` 含有未决 CSS 变量而会直接解析失败并退化为“纯色方块”。必须将属性拆分为**长属性格式**（`mask-image`, `mask-repeat`, `mask-position`, `mask-size`）并使用双引号包裹 `url()` 参数。
- **卡片 3 (Launch Campaigns Faster) 飞入与文字展收**：
  - **飞入优化 (Throw & Catch)**：在 `17%`（滑出）使用 ease-in 并在 `19.5%`（顶部飞入）使用 ease-out 双重时序，消除了卡片回弹到顶部时的 `500ms` 生硬顿挫。
  - **主副描述动态展收**：当卡片轮换到最底部主位置时，通过 CSS 过渡变量平滑折叠灰色占位条并展开真实的文本描述小字。

### 4. Apple 级平滑圆角 (Apple-like Smooth Corners)
- **极致的视觉追求**：为了摆脱标准 CSS `border-radius` 带来的工业切割感，项目中引入了 `react-smooth-corners` 插件。
- **使用场景**：在关键的卡片外壳（如首屏 Mockup 视窗）使用 `<SmoothCorners corners={{ radius: 16, smoothing: 0.6 }}>`，通过底层实现超椭圆（Squircle）算法，带来了媲美 iOS 系统级别丝滑无断点的圆角过渡体验。

---

## ⚠️ 避坑指南：WebGL 渲染与 GPU 复合边界冲突 (The WebGL Compositor Pitfall)

如果你需要在页面底部添加新内容或修改结构，请务必注意这个曾在本项目中引发过严重“闪烁（Flickering / Jumping）”的底层系统级 Bug！

### 🐛 症状
当页面滚动到底部极限时，移动鼠标，整个页面的滚动高度会疯狂跳动 30%，产生剧烈闪烁。

### 🔎 原因
1. **GPU 复合边界突破**：Mockup 区域比首屏大，虽然主线程中它被 `.hero` 的 `overflow: hidden` 裁剪，但由于 Mockup 的动画使用了 3D `transform`，它被提升为一个 GPU 复合层（Composited Layer）。Safari/Chrome 的 GPU 合成引擎在计算页面的“可滚动物理高度”时，把被隐藏的下半部分体积也算进去了（多出约 300px 高度）。
2. **WebGL 重绘触发重算**：背景层启用了 Unicorn Studio 的 WebGL 鼠标交互，只要鼠标移动，WebGL Canvas 就会高频 requestAnimationFrame 重绘。
3. **触底弹性冲突**：当用户滚到绝对最底边时，WebGL 的重绘导致 GPU 与主线程在“最大滚动高度”上打架，从而引发滚动锚定（Scroll Anchoring）错误，疯狂把页面往上抬高。

### 🛡️ 防御措施
为了解决这个问题，我们采取了以下组合拳，**请绝对不要移除它们**：
1. **GPU 级强裁切**：在 `.hero` 容器上除了 `overflow: hidden`，还必须带有 `clip-path: inset(0);`。这会强制要求 GPU 合成器在计算 bounding box 时无情切断所有逃逸的 3D 层体积。
2. **防弹跳缓冲占位区 (Scroll Boundary Buffer)**：在 `KeyFeatures` 之后，我们**永远**需要一个足够的缓冲空间（比如 `100vh` 的无描边占位屏、或者未来真实的完整 Footer 组件）。这让页面底部边界远离 WebGL 的首屏活动范围，彻底消除底部物理边界带来的弹性碰撞问题。

---

## 🚀 启动项目
```bash
npm install
npm run dev
```

构建生产环境：
```bash
npm run build
```
