# Hero 背景实现说明

这份文档只说明当前 Hero 区域背景相关的 3 个实现点：

1. 背景从视频切换为 `MeshGradient`
2. 在 `MeshGradient` 上方叠加整屏白色渐变遮罩
3. Hero 滚出视口后自动暂停 shader 动画

## 代码基准文件

- `src/components/blinds-aurora-background.jsx`
- `src/App.jsx`
- `src/index.css`

## 1. 背景从视频切换为 MeshGradient

当前 Hero 背景已经不再使用视频方案，而是改为 `@paper-design/shaders-react` 提供的 `MeshGradient`。

依赖：

```bash
npm install @paper-design/shaders-react
```

当前实现：

```jsx
import { MeshGradient } from "@paper-design/shaders-react";

<MeshGradient
  width={1280}
  height={720}
  colors={["#ffe5fd", "#ff8ade", "#ffadef", "#ff9ee7"]}
  distortion={0.7}
  swirl={0.6}
  grainMixer={0}
  grainOverlay={0}
  speed={isActive ? 1.2 : 0}
  scale={0.88}
  rotation={360}
  offsetX={-0.16}
/>
```

当前 `MeshGradient` 挂载在 `BlindsAuroraBackground` 组件中。

## 2. 叠加整屏白色渐变遮罩

为了让 Hero 顶部更干净、文字可读性更稳定，当前在 `MeshGradient` 上方叠加了一层整屏白色渐变遮罩。

对应样式：

```css
.creatorial-hero-bg__gradient {
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}
```

效果说明：

- 顶部白色遮罩最明显
- 中部仍保留轻度白雾过渡
- 底部完全退掉，让背景颜色自然露出

这层遮罩只负责 Hero 背景氛围控制，不负责 Hero 底部与下一段内容的过渡。

## 3. Hero 滚出视口后暂停 shader

为了减少无效持续渲染，当前 Hero 使用 `IntersectionObserver` 控制 shader 的播放状态。

`App.jsx` 中的逻辑：

```jsx
const [heroRef, isHeroInView] = useSectionInView(0.08);

<BlindsAuroraBackground isActive={isHeroInView} />
<section className="hero" ref={heroRef}>
```

`BlindsAuroraBackground` 中通过 `isActive` 控制 `speed`：

```jsx
speed={isActive ? 1.2 : 0}
```

行为规则：

- Hero 在视口内时，shader 正常播放
- Hero 滚出视口后，shader 速度切到 `0`
- Hero 回到视口后，shader 恢复播放

## 给开发的执行结论

如果后续只需要维护 Hero 背景，请只关注这 3 个点：

1. `MeshGradient` 参数本身
2. `.creatorial-hero-bg__gradient` 的整屏白色遮罩
3. `IntersectionObserver + isActive` 的视口暂停逻辑
