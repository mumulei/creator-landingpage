# Creatorial-landingpage

Welcome to the Creatorial-landingpage project! This repository contains the source code for the high-conversion, visually stunning landing page built with React, Vite, and SmoothCorners.

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
  **绝对不要**在 `to` 中省略 `perspective` 或 `rotateX` 等属性。否则，浏览器会将其退化为 Matrix 矩阵插值，产生肉眼可见的 4-6px 抖动偏移！
- **可访问性兼容**：在 `index.css` 底部声明了全局 `@media (prefers-reduced-motion: reduce)` 规则，当用户系统开启减弱动态效果时，所有动画和 transition 的 duration 会被统一重置为 `0.01ms` 强制覆盖，无需每个动画类进行带条件的包裹。

### 2. 响应式与 2K 适配布局 (Responsive & 2K Adaptive Layout)
- **断点与缩放规范 (Breakpoints & Scaling)**：
  - **Mobile 移动端 (≤ 640px)**：汉堡菜单，所有卡片及主要圆角（如 How It Works、Creator Showcase 等）统一声明为 **`24px`** 平滑圆角以保持极佳的视觉协调感，小标志及装饰图锁定为 `8px` 圆角。文字大小缩减（H2 标题缩至 `28px`），安全边距 `--safe-padding` 锁定为 `20px`。
  - **Tablet 平板端 (641px - 1150px)**：优化导航栏间距与字号，安全边距 `--safe-padding` 锁定为 `40px`。
  - **Desktop 桌面流式缩放端 (1151px - 2559px)**：使用 CSS 变量（如 `--safe-padding: 5.7vw`，以及 `--section-padding-y`、`--title-font-size`、`--scale-grid-gap`、`--scale-card-height` 等）随屏幕宽度等比流式缩放容器、组件间距和字体大小。
  - **Ultra-Wide 超 2K 极限端 (≥ 2560px)**：一旦屏幕宽度超出 2K (`2560px`)，所有容器和组件的响应式缩放将**停止**，尺寸锁定（例如安全边距锁定在 `146px`，内容最大宽度锁定在 `2268px` 并水平居中）。此时，**只有左右安全外边距继续向外扩展**以吸收超宽屏的剩余空间，同时各 Section 背景色仍然保持 `100%` 全屏宽度填充，保证视觉背景的连续性。
- **Hero 区域自动裁剪与缩放**：
  - 首屏 `.hero` 容器高度限制为 `100vh` 且 `overflow: hidden; clip-path: inset(0);`，通过底部的纯白渐变遮罩与后续 Section 自然融合。
  - 在桌面端，Hero 内部的文字容器 `.hero-copy`、标题字号 (`clamp`)、CTA 按钮尺寸和 Mockup 外壳 `.hero-mockup-shell` 同样使用流式 Clamp 或百分比设定，随着屏幕宽度在桌面段内等比放大，在超 2K 后锁定最大宽度并居中，确保 1920 屏幕下也能展现极其合理的视觉比例。

### 3. 精确卡片动效与 CSS 遮罩方案 (Key Features Animations & CSS Mask)
- **卡片 2 (Flexible pricing) 变色与位移**：
  - 动画名为 `@keyframes rotatePricing`，过渡区间为 `0%, 22%` -> `33.33%, 56%` -> `66.66%, 89%` 进行循环位移与渐变。
  - **CSS 遮罩 (Mask) 重构**：为避免不同浏览器下的偏色，将 `<img>` 替换为带有 `mask-image` / `-webkit-mask-image` 的遮罩 `<span>` 元素，在 CSS 中通过 `--mask-url` 配合长属性声明直接修改 `background-color` 来渲染。
  - **长属性格式 (🚨 关键规则)**：必须将属性拆分为**长属性格式**（`mask-image`, `mask-repeat`, `mask-position`, `mask-size`）并使用双引号包裹 `url()` 参数。
- **卡片 3 (Launch Campaigns Faster) 飞入与文字展收**：
  - 动画名为 `@keyframes cardRotate`，位移百分比为 `0%, 18.67%` -> `21.83%` -> `25%, 43.67%` -> `50%, 68.67%` -> `75%, 93.67%`。在相应区间使用 `cubic-bezier(0.55, 0.055, 0.675, 0.19)` 与 `cubic-bezier(0.215, 0.61, 0.355, 1)` 等时序曲线消除了卡片回弹到顶部时的生硬顿挫。
  - **主副描述动态展收**：卡片轮换到最底部主位置时，通过 CSS 过渡变量平滑折叠灰色占位条并展开真实的文本描述。

### 4. Apple 级平滑圆角 (Apple-like Smooth Corners)
- **极致的视觉追求**：项目中引入了 **`@lisse/react`** 插件（导出 `<SmoothCorners>`）。
- **主要使用场景**：在关键的卡片外壳（如首屏 Mockup 视窗）及全站的主要 Action 按钮（如 Topbar、Hero、Ready to Scale 区域）上均使用 `<SmoothCorners corners={{ radius: 24, smoothing: 0.6 }}>`，并加上 `asChild` 属性将超椭圆平滑圆角应用到子级 `<a>` 标签上，保证完美的药丸形/圆角视觉体验。
- **防弹性塌陷规范**：对于 Flex 容器或需要 100% 宽高拉伸的嵌套图片容器（例如 How It Works 步骤卡片内大图的外边框），由于 SmoothCorners 组件的 wrapper 结构容易导致弹性高度塌陷为正方形，必须降级使用标准的 CSS `border-radius: 16px` 进行兼容。

### 5. 顶栏动态渐进式物理模糊 (Gradient Blur Top)
- **物理渐变模糊遮罩**：在页面顶部配置了独立的 `GradientBlurTop` 组件，渲染了 8 层相互重叠的遮罩。
- **模糊强度与交互防遮挡**：模糊半径以指数级别翻倍（最大 **`64px`**），通过 `pointer-events: none` 穿透交互，保证在遮挡顶部文字滚动的同时完全不影响 Topbar (Z-index: 30) 的鼠标悬浮与点击。

### 6. 页脚与底纹发光背景融合 (ReadyToScale & Footer Integration)
- **连续极光背景与 ASCII 字符底纹**：将 `ReadyToScale` 和 `Footer` 放置于统一的包裹容器 `.ready-footer-wrap` 中，在包裹容器的伪类上叠加 `ascii-art.png` 作为多重背景底图，配合 `linear-gradient` 的遮罩防止遮挡文字；同时将 `ReadyToScale` 背景重设为 `transparent` 移除遮挡，实现在页面最底部完美呈现连续的紫色斜向发光背景。

---

## 🎥 首屏背景与渲染优化 (Background & Rendering Optimization)

在重构过程中，首屏动画与大背景进行了升级和优化，去除了传统的复杂 3D 渲染，采用轻量化的视频与 CSS 混合渲染：
- **自适应视频背景**：Hero 区域改用本地公共资源视频 `hero-bg.mp4` 进行全屏自动循环静音播放，相比传统 WebGL 渲染极大减轻了 GPU 混合合成器的计算压力，解决了在 Safari/Chrome 上的高频帧重绘冲突。
- **GPU 级强裁切与缓冲**：为了防止 Mockup 的 3D 入场 `transform` 动画层溢出，从而被浏览器误判并累加页面可滚动高度，我们保留了 `.hero` 容器上的 `overflow: hidden` 与 `clip-path: inset(0)` 强裁切逻辑，彻底消除了底部触底弹性抖动问题。

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
