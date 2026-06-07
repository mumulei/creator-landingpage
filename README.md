# Creator Landing Page (Paico UGC 落地页优化版)

本项目是经过深度视觉升级、响应式改进、性能与 SEO 优化后的 Paico UGC (User Generated Content) 产品落地页。为了让接手的 Agent 或开发者能够快速上手，特在此整理了项目的目录结构、动效规范、响应式裁剪机制等核心开发标准。

---

## 📁 目录结构规范

```bash
paico-unicorn-landing/
├── index.html                  # 预连字体、LCP 优化与 SEO Meta 标签
├── src/
│   ├── App.jsx                 # 页面主结构、移动端汉堡菜单逻辑与滚动状态监听
│   ├── main.jsx                # 入口 JS
│   ├── index.css               # 【核心】全局样式系统、动画定义与响应式媒体查询
│   ├── assets/                 # 图片及 SVG 图标资源
│   │   └── Brands.png          # 首屏高清精修版 Mockup 主产品图 (LCP 关键路径)
│   └── components/
│       ├── logo-cloud.jsx      # Logo 跑马灯组件 (带悬停暂停功能，防 CLS)
│       └── blinds-aurora-background.jsx # WebGL 极光流体背景组件 (自适应 100vh)
```

---

## 🎬 动效与交互规范

动效设计旨在营造高端、生动的 Premium 视觉感，遵循以下过渡规则：

### 1. Hero 文本及 CTA 入场动效
- **实现方式**：通用 CSS 动画 `@keyframes fadeInUp`，在 0.8 秒内实现透明度 `0 -> 1` 且垂直向上平移 `20px`。
- **错落感控制**：在 [App.jsx](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/src/App.jsx) 中，对 `h1` 的两行文字、副标题 `p` 和 CTA 按钮区域分别应用了不同的 `animation-delay`（分别为 `0.1s`, `0.25s`, `0.4s`, `0.55s`），形成从上至下平滑入场的视觉流。

### 2. Mockup 3D 透视入场动效
- **实现方式**：自定义 CSS 动画 `@keyframes floatUpPerspective`，配合父容器 [`.hero-mockup-shell`](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/src/index.css#L408) 上的 3D 透视设定（`perspective: 1200px`）。
- **动效轨迹**：在 1.2 秒内，从下方向上平移，同时带有 `15deg`（移动端为 `5deg`）的 X 轴 3D 旋转及轻微缩放，最终平滑定位在 `translateY(6.9rem)`（移动端为 `3rem`）处，极具科技感。

### 3. Hover 微交互反馈
- **按钮上浮**：深色按钮（`.hero-cta--dark`）及品红按钮（`.solid-link--magenta`）在悬停时，会应用 `translateY(-2px)` 的微小上浮，同时其投影范围和扩散度（`box-shadow`）平滑放大，提供清晰的物理点击感。
- **导航栏悬停**：顶栏导航链接在 Hover 时带有轻微的上滑（`translateY(-1px)`）和文字颜色深浅变化。
- **跑马灯 Logo 墙**：当鼠标指针悬停在 Logo 跑马灯上时，动画将自动减速暂停（通过 `.logo-marquee:hover .logo-marquee__track { animation-play-state: paused; }` 实现），提升用户探索交互感。

### 4. 减弱动画支持 (A11y)
- 全局支持媒体查询 `@media (prefers-reduced-motion: reduce)`。当用户在其系统设置中启用了“减弱动态效果”时，所有入场动画、透视和过渡将被禁用，防止产生眩晕感。

---

## 📱 响应式与首屏裁剪规范

首屏采用了**父级高度卡死 + 物理裁切 + 底部背景色遮罩**的现代高端布局设计：

### 1. 父级 100vh 物理截断 (100vh Strict Clipping)
为了在大屏（如 1440x900）以及 Pad 和手机端将 Mockup 控制在首屏的视觉底部，且不压缩变形：
- [`.hero`](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/src/index.css#L312) 容器在所有设备下均强制设为 `height: 100vh; overflow: hidden;`。
- 彻底**移除**了 Mockup 图片容器自身的任何 `max-height` 限制，使其自然舒展。
- 任何超出 `100vh` 首屏边界的 Mockup 底部部分，都会由 `.hero` 容器自动进行物理裁切，确保首屏视觉高度高度一致。

### 2. 全视口底渐变遮罩 (Global Bottom Mask)
- **定位与层次**：绝对定位在 [`.hero::after`](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/src/index.css#L318) 伪元素上，`bottom: 0` 且 `z-index: 20`（确保浮在 Mockup 图层上方）。
- **色值融合**：背景为自透明渐变至页面底色 `#f7f7f7` 的 `linear-gradient(to bottom, rgba(247, 247, 247, 0) 0%, #f7f7f7 100%)`。此设计可以完美覆盖在 Mockup 截断的下边缘、描边与投影上，使其极其柔和、纯净地融化到页面底色中。
- **多端遮罩高度自适应**：
  - **桌面端**：高度为 `180px`
  - **平板端 (≤ 920px)**：高度为 `120px`
  - **手机端 (≤ 640px)**：高度为 `80px`

### 3. 多端靠底与排版间距压缩 (Pad/Phone Spacing Adaptation)
由于平板和手机端屏幕较矮，为了在 `100vh` 范围内完美露出 Mockup 的第一行核心卡片（Spotify, Tiktok 等），我们采取了**压缩上方间距**的机制：
- **平板端 (≤ 920px)**：`.hero` 的 `padding-top` 压缩至 `6rem`。
- **手机端 (≤ 640px)**：`.hero` 的 `padding-top` 压缩至 `4.8rem`；`.hero-body` 的 `margin-top` 压缩至 `1rem`；`.hero-mockup-shell` 的 `margin-top` 压缩至 `1.2rem`。
- **优化效果**：这使得核心卡片在 Pad 和手机首屏底部刚好完美露全，且下方的 Logos 区域（`.trusted-cloud`）紧贴在首屏 `100vh` 边界的下方自然浮现（手机端 `margin-top: 1.5rem`），布局无任何白色空白大断层。

### 4. 极光背景自适应高度
- 为了在大屏和移动端下避免背景极光在 900px 处被硬生生切断，WebGL 渲染背景容器 [`.paico-hero-bg`](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/src/index.css#L44) 的高度设置为了 `100vh`。WebGL 场景会自动填充首屏，表现极佳。

---

## ⚡ 性能、SEO 与无障碍标准

- **LCP 性能优化**：
  - 主产品 Mockup 图在 [App.jsx](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/src/App.jsx) 中声明了 `fetchPriority="high"`。
  - 为主图设置了明确的 `width="1320" height="820"`（Logo 图片设置了 `height="40"`），以防止 Cumulative Layout Shift (CLS)。
  - 在 [index.html](file:///Users/mulei/Downloads/codex/paico-unicorn-landing/index.html) 头部添加了对字体服务器 `api.fontshare.com` 和 `fonts.googleapis.com` 的 `preconnect` 预连接。
- **SEO Meta 标签**：
  - 包含了品牌描述性 `<title>` 标题与 `description` 描述。
  - 规范了 Open Graph 分享协议（`og:title`, `og:description`, `og:image` 等）。
- **语义化与无障碍**：
  - 核心模块完全使用 HTML5 语义化元素（`<header>`, `<main>`, `<section>`, `<nav>`）。
  - 所有交互组件均具备唯一的 `id`，且为图标等提供了适当的 `aria-hidden="true"` 以及无障碍 label。
