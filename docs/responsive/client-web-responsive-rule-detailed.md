# Client Web Responsive Rule

## 1. Core Position

这套响应式规则的核心思路如下：

- Figma 已经给出了 `1440 / 834 / 402` 三套标准视觉稿
- 这三套稿件应被视为三个断点层级的视觉锚点，而不是三组只能静态落地的唯一尺寸
- 前端开发应先严格还原三套标准稿
- 在每个断点区间内部，再根据设备实际屏宽做动态响应式缩放

这是一种可行且合理的方案。

原因很简单：

- 设计稿解决的是“这个断点层级下页面应该长什么样”
- 响应式规则解决的是“在这个层级范围内，页面如何随屏宽自然变化”

因此，前端不需要被过度约束到很多固定细则，只需要明确：

- 断点怎么切
- 每个断点对应哪套 Figma 稿
- 断点区间内哪些东西可以动态缩放
- 哪些结构切换必须在跨断点时发生

## 2. Breakpoint Mapping

建议沿用当前项目的断点区间逻辑：

- Mobile：`<= 640px`
- Tablet：`641px - 1150px`
- Desktop：`1151px - 2559px`
- Ultra-wide：`>= 2560px`

与 Figma 的映射关系：

- Mobile 区间以 `402` 稿为视觉锚点
- Tablet 区间以 `834` 稿为视觉锚点
- Desktop 区间以 `1440` 稿为视觉锚点
- Ultra-wide 在 Desktop 规则之上继续沿用现有 2K 锁定逻辑

这里的“锚点”含义是：

- 页面结构、排列方式、层级关系以对应稿件为准
- 但在该区间内不要求所有设备都死锁到稿件尺寸
- 而是允许容器、留白、字号、图片、卡片尺寸做平滑变化

## 3. General Responsive Strategy

### 3.1 First match the standard frame

前端开发的第一步不是先写“自适应算法”，而是先把三套标准稿画准：

- Desktop 标准稿
- Tablet 标准稿
- Mobile 标准稿

只有当三个标准稿都成立，后续在区间内部做动态缩放才有稳定基础。

### 3.2 Then scale within the range

每个断点区间内部允许做动态响应式缩放。

推荐理解方式：

- 断点之间是“切版”
- 断点之内是“缩放”

也就是说：

- 从 Desktop 到 Tablet，要切换版式
- 从 Tablet 到 Mobile，也要切换版式
- 但在 Desktop 自己的区间内部，可以按屏宽流式变化
- 在 Tablet 自己的区间内部，也可以按屏宽流式变化
- 在 Mobile 自己的区间内部，也可以按屏宽流式变化

### 3.3 Remove unnecessary rigid rules

像圆角值这种规则，如果不是这一轮前端实现的关键风险点，可以去掉。

原因：

- Figma 三套稿件已经能给出足够明确的视觉结果
- 圆角属于样式细节，开发在还原标准稿时自然会跟随组件样式实现
- 真正需要统一的是断点切换与缩放方法，而不是过度细化每个视觉 token

因此，本轮规则文档不再强调固定圆角规则。

## 4. What should change at breakpoint boundaries

跨断点时，应该发生的是“布局结构切换”，而不是只缩字号。

必须在断点切换时调整的内容：

- 导航结构
- CTA 排列方式
- 栅格列数
- 卡片的文图布局方向
- Footer 的列结构
- 轮播或展示组件的可见窗口数量

这些属于结构层面的变化，不能只靠等比缩放解决。

## 5. What may scale dynamically inside a range

在同一断点区间内部，以下内容可以做动态缩放：

- 内容容器宽度
- 安全边距
- section 上下留白
- 标题与正文的字号
- 卡片间距
- 卡片内 padding
- 图片尺寸
- mockup 尺寸
- carousel 可见区域宽度

这些内容推荐通过：

- CSS 变量
- `clamp()`
- 百分比宽度
- `vw` 与最大最小值组合

来实现平滑变化。

## 6. Section-Level Rules

### 6.1 Header

- Desktop：
  - 对齐 Desktop 稿
  - 横向导航
  - 右侧保留语言切换与 CTA
- Tablet：
  - 对齐 Tablet 稿
  - 仍保留横向导航
  - 只收紧间距、字号、按钮尺寸
- Mobile：
  - 对齐 Mobile 稿
  - 切换为 logo + hamburger

规则重点：

- Header 的核心变化是跨断点切结构
- 同一断点区间内只做尺寸级缩放

### 6.2 Hero

- Desktop：
  - 以 Desktop 稿为标准
  - 标题、说明、CTA、mockup 的结构保持 desktop 版
  - 在 Desktop 区间内允许继续流式缩放
- Tablet：
  - 以 Tablet 稿为标准
  - CTA 保持横排
  - mockup 与文本一起收缩到 tablet 视觉节奏
- Mobile：
  - 以 Mobile 稿为标准
  - CTA 改为纵排
  - mockup 改为更窄的移动端视觉卡片

规则重点：

- Hero 在断点之间必须切布局
- 但在每个区间内部，文字、按钮、mockup 都可以随屏宽平滑调整

### 6.3 Logo Cloud

- Desktop / Tablet：
  - 保持横向 logo strip
  - tablet 只做尺寸和 gap 收缩
- Mobile：
  - 保持横向滚动或 marquee

规则重点：

- 结构变化很小，主要做尺寸缩放

### 6.4 Key Features

- Desktop：
  - 使用 desktop 版 3 列结构
- Tablet：
  - 使用 tablet 版结构
  - 保持平板版卡片比例与间距
- Mobile：
  - 改成单列堆叠

规则重点：

- Desktop 与 Tablet 可以都是 3 列，但尺寸体系不同
- Mobile 需要明确改成单列结构

### 6.5 Scale UGC

- Desktop：
  - 使用 desktop 版 3 列
- Tablet：
  - 使用 tablet 版 3 列
  - 允许缩小 gap、padding、装饰图
- Mobile：
  - 改单列

规则重点：

- 这里的关键不是固定数值，而是确保 mobile 不再继承 desktop/tablet 的列结构

### 6.6 How It Works

- Desktop：
  - 使用左文案右图片的大卡结构
- Tablet：
  - 使用 tablet 版对应结构
  - 保持平板的纵向节奏和信息密度
- Mobile：
  - 改成文案在上、图片在下的单列卡片

规则重点：

- 这是典型的“断点之间切结构，断点之内做缩放”的 section

### 6.7 Creator Showcase

- Desktop：
  - 中心卡最大
  - 两侧卡做辅助预览
- Tablet：
  - 保持中心聚焦逻辑
  - 可减少同时可见的卡片数量
- Mobile：
  - 保持中心卡 + 两侧露出
  - CTA 放在轮播下方

规则重点：

- 视觉逻辑保持一致
- 真正变化的是可见窗口、卡片尺寸和间距

### 6.8 Footer

- Desktop：
  - 使用 desktop 多列 footer
- Tablet：
  - 仍保留多列
  - 只做收缩，不提前塌成 mobile
- Mobile：
  - 改单列
  - 社交和版权上下排列

规则重点：

- Footer 的结构切换只应发生在 mobile

## 7. Desktop Dynamic Scaling Rule

Desktop 区间内可以继续保留当前项目已有的流式缩放方式。

推荐原则：

- `1440` 作为 desktop 标准参考面
- 当屏宽在 `1151 - 2559` 之间时：
  - 容器宽度、padding、gap、字号、mockup 可按比例动态变化
  - 但必须维持 desktop 稿的版式关系不变
- 当屏宽 `>= 2560`：
  - 停止组件继续放大
  - 保持内容最大宽度锁定
  - 左右额外空间交给外边距吸收
  - 背景保持全屏延展

## 8. Existing 2K Lock Rule

当前项目里“2K 锁定逻辑”的实现可以明确补充给前端，避免理解偏差。

现有代码中的关键值如下：

- 触发条件：`@media (min-width: 2560px)`
- 全局变量锁定：
  - `--safe-padding: 146px`
  - `--section-padding-y: 213px`
  - `--title-font-size: 64px`
  - `--subtitle-font-size: 28.4px`
  - `--subtitle-max-width: 568px`
  - `--section-margin-bottom: 114px`
  - `--scale-grid-gap: 57px`
  - `--scale-card-height: 348px`
  - `--scale-card-padding: 57px`
  - `--how-header-padding-top: 142px`

关键容器锁定：

- `.hero-copy` 最大宽度：`2268px`
- `.hero-mockup-shell` 最大宽度：`2268px`
- 多个外层 section 容器保持 `max-width: 2560px`
- `topbar` 与部分内容层继续通过 `max-width: 2560px` + `margin/padding` 保持居中

Hero 相关锁定：

- `.hero` 仍保持 `height: 100vh`
- `.creatorial-hero-bg` 仍保持 `height: 100vh`，`max-height: 1000px`
- `.hero-mockup-shell__frame` 在 `>=2560px` 时固定为 `height: 1897px`

这套逻辑的真实含义是：

- `1151px - 2559px` 内，页面是流式放大的
- 一旦到 `2560px`，组件本身停止继续放大
- 内容区宽度和主要 spacing 锁定到最大值
- 更宽的屏幕只继续增加左右留白
- 背景层依然铺满全屏，不会跟着内容宽度一起收窄

建议前端按这个原则理解：

- 2K 锁定不是新的版式
- 它是 Desktop 版式在超宽屏下的“尺寸上限保护”
- 因此它应保留在 Desktop 规则之后，而不是单独设计第四套页面

## 9. Tablet Dynamic Scaling Rule

Tablet 区间推荐同样允许动态缩放，只是锚点换成 `834`。

推荐原则：

- `834` 作为 tablet 视觉参考面
- 在 `641 - 1150` 区间内：
  - 容器、留白、字号、图片、卡片尺寸可平滑变化
  - 但结构必须始终保持 tablet 稿的组织方式

也就是说：

- Tablet 不应该继续用 Desktop 布局挤压
- Tablet 也不应该过早向 Mobile 结构坍塌

## 10. Mobile Dynamic Scaling Rule

Mobile 区间也可以有一定动态缩放空间，锚点为 `402`。

推荐原则：

- `402` 作为 mobile 标准参考面
- 在 `<= 640` 区间内：
  - 字号、padding、图片尺寸、按钮宽度可微调
  - 但整体结构保持 mobile 稿逻辑

Mobile 的核心是：

- 单列
- 更短的信息宽度
- 更强的垂直滚动节奏

## 11. Developer Execution Order

推荐前端按这个顺序实现：

1. 先把 Desktop / Tablet / Mobile 三套标准稿分别还原
2. 再定义断点切换规则
3. 再在每个断点区间内补充动态缩放变量
4. 最后保留 Ultra-wide 的 2K 锁定策略

## 12. Final Rule

最终交付给前端的规则可以浓缩为一句话：

以 `1440 / 834 / 402` 作为三端视觉锚点，跨断点时切换布局结构，断点区间内部按屏宽做动态等比响应缩放；先画准三套标准稿，再补区间内的自适应规则。
