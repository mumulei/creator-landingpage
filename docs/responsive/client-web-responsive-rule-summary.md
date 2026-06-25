# Client Web Responsive Rule Summary

## Responsive Rule

- `1440 / 834 / 402` 分别作为 Desktop / Tablet / Mobile 的标准视觉稿
- 前端先严格还原这三套稿件
- 再在各自断点区间内部按屏宽做动态缩放

## Breakpoints

- Mobile：`<= 640px`
- Tablet：`641px - 1150px`
- Desktop：`1151px - 2559px`
- Ultra-wide：`>= 2560px`

## Key Principle

- 跨断点：切布局
- 断点内：做缩放

## What changes across breakpoints

- Header 导航形态
- CTA 排列方式
- 栅格列数
- 卡片布局方向
- Footer 列结构
- Showcase 可见卡数

## What can scale inside a breakpoint

- 容器宽度
- 边距
- 字号
- gap / padding
- 图片和 mockup 尺寸

## Notes

- 不需要在文档里强调固定圆角规则
- Desktop 可继续保留现有流式缩放
- `>= 2560px` 可继续保留现有 2K 锁定逻辑：
  - `--safe-padding` 锁到 `146px`
  - Hero 关键内容宽度锁到 `2268px`
  - mockup 外壳高度锁到 `1897px`
  - 更宽屏幕只增加左右留白，背景继续全屏铺开

## One-line delivery rule

先画准三套标准稿，再做区间内动态响应式缩放。
