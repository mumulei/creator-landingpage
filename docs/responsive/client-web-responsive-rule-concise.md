# Client Web Responsive Rule Concise

## 1. Rule Summary

这次响应式实现不需要给前端很多细碎限制，只需要明确一条主规则：

- `1440 / 834 / 402` 是 Desktop / Tablet / Mobile 的标准视觉锚点
- 前端先严格还原三套标准稿
- 再在各自断点区间内部，根据实际屏宽做动态响应式缩放

## 2. Breakpoints

- Mobile：`<= 640px`
- Tablet：`641px - 1150px`
- Desktop：`1151px - 2559px`
- Ultra-wide：`>= 2560px`

对应关系：

- Desktop 对齐 `1440` 稿
- Tablet 对齐 `834` 稿
- Mobile 对齐 `402` 稿
- `>= 2560px` 保留现有 2K 锁定逻辑

## 3. How to implement

前端实现顺序：

1. 先把三套标准稿画准
2. 再定义断点切换
3. 再在每个断点区间内部做动态缩放

## 4. Layout switching rule

跨断点时切换的是布局结构，不只是字号。

需要在断点切换时变化的内容：

- Header 导航形态
- CTA 横排或纵排
- 栅格列数
- 卡片文图排布
- Footer 列结构
- Showcase 可见卡片数量

## 5. In-range scaling rule

在同一断点区间内，可以动态缩放：

- 容器宽度
- 安全边距
- section 留白
- 字号
- gap
- padding
- 图片和 mockup 尺寸

推荐用：

- CSS variables
- `clamp()`
- 百分比
- `vw + min/max` 组合

## 6. Existing 2K lock rule

当前项目已有一套明确的超宽屏锁定逻辑，建议保留：

- 触发点：`>= 2560px`
- 组件停止继续放大
- 全局关键变量锁定为固定值，例如：
  - `--safe-padding: 146px`
  - `--section-padding-y: 213px`
  - `--title-font-size: 64px`
  - `--scale-grid-gap: 57px`
- Hero 关键内容宽度锁定：
  - `.hero-copy: 2268px`
  - `.hero-mockup-shell: 2268px`
- Hero mockup 外壳高度锁定：
  - `.hero-mockup-shell__frame: 1897px`
- 超出内容最大宽度后的额外屏宽，只用于增加左右留白
- 背景继续全屏铺开

## 7. Section guidance

- Header：
  - desktop/tablet 保持横向导航
  - mobile 切 hamburger
- Hero：
  - desktop/tablet 保持对应稿件结构
  - mobile CTA 改纵排
- Key Features：
  - desktop/tablet 对应各自稿件
  - mobile 单列
- Scale UGC：
  - desktop/tablet 对应各自稿件
  - mobile 单列
- How It Works：
  - desktop 为左右结构
  - mobile 改文案上、图片下
- Creator Showcase：
  - 三端都保持中心聚焦
  - 只调整卡片尺寸和可见数量
- Footer：
  - desktop/tablet 多列
  - mobile 单列

## 8. What to remove

本轮文档不需要强调固定圆角值之类的细节规则。

原因是：

- Figma 三套稿件已经足够定义视觉样式
- 前端当前更需要的是断点规则和缩放方法

## 9. Final Sentence

前端只需要遵循这条规则：先按 `1440 / 834 / 402` 三套标准稿实现 Desktop / Tablet / Mobile，再在各自断点区间内部做动态缩放，跨断点时切结构，断点之内做平滑响应适配。
