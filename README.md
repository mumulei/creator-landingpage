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

### 2. 响应式布局 (Responsive Design)
- **断点规范**：
  - Desktop: `> 920px`
  - Tablet: `≤ 920px` (调整间距、缩放字体)
  - Mobile: `≤ 640px` (启用汉堡菜单，文字排版重构)
- **Hero 区域的自动裁剪机制**：
  首屏 `.hero` 被严格限制为 `height: 100vh` 和 `overflow: hidden; clip-path: inset(0);`。
  内部的 `.hero-mockup-shell` 没有 `max-height` 限制，超出首屏底部的区域将被自动裁剪。我们利用 `.hero::after` 绝对定位在最底部的纯白渐变遮罩 (`#ffffff`)，实现了截断与背景的完美自然融合。

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
2. **防弹跳缓冲占位区 (Scroll Boundary Buffer)**：在 `LogoCloud` 之后，我们**永远**需要一个足够的缓冲空间（比如 `100vh` 的占位屏、或者未来真实的完整 Footer 组件）。这让页面底部边界远离 WebGL 的首屏活动范围，彻底消除底部物理边界带来的弹性碰撞问题。

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
