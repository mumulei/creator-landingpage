# Hero 背景动画实现说明

这份文档只说明 `Hero` 背景动画的实现方式，供前端开发直接接入和维护。

## 涉及文件

- `/Users/mumulei/Downloads/antigravity/creator-landingpage/src/App.jsx`
- `/Users/mumulei/Downloads/antigravity/creator-landingpage/src/components/blinds-aurora-background.jsx`
- `/Users/mumulei/Downloads/antigravity/creator-landingpage/src/index.css`

## 使用方式

`Hero` 背景动画通过 `BlindsAuroraBackground` 组件挂载。

在页面中使用：

```jsx
<BlindsAuroraBackground />
```

挂载位置在：

- `src/App.jsx`

## 动画实现

背景动画由 `src/components/blinds-aurora-background.jsx` 负责。

当前实现流程：

1. 组件挂载后执行 `loadUnicornStudio()`
2. 动态注入动画脚本
3. 调用 `studio.init()`
4. 在目标容器内生成 `canvas`
5. 检测到 `canvas` 后，为容器追加 `is-ready`，再显示动画

关键代码：

```jsx
const UNICORN_SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";
const PAICO_PROJECT_ID = "D3Vd49nwPvID5Nz0VKLr";
```

```jsx
<div
  ref={embedRef}
  className={`creatorial-hero-bg__unicorn${isReady ? " is-ready" : ""}`}
  data-us-project={PAICO_PROJECT_ID}
  data-us-scale="1"
/>
```

## 样式结构

动画层和覆盖层样式定义在：

- `src/index.css`

主要类名：

- `.creatorial-hero-bg`
- `.creatorial-hero-bg__unicorn`
- `.creatorial-hero-bg__unicorn.is-ready`
- `.creatorial-hero-bg__gradient`
- `.creatorial-hero-bg__blur`
- `.creatorial-hero-bg__glow`
- `.creatorial-hero-bg__bottom-border`

其中：

- `.creatorial-hero-bg__unicorn`
  - 动画容器，默认透明
- `.creatorial-hero-bg__unicorn.is-ready`
  - 动画准备完成后显示
- 其余覆盖层
  - 用于顶部渐变、模糊、柔光和底部分割线

## 开发维护

后续如果需要继续维护这套背景动画，只需要关注两部分：

1. `src/components/blinds-aurora-background.jsx`
   - 管理脚本加载、动画挂载、容器状态切换
2. `src/index.css`
   - 管理背景层级、透明度和覆盖层样式
