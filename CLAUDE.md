# CLAUDE.md - Agent 指导与开发规范

此文件为 AI 助手（Agent）特别编写，包含了本项目的关键命令、代码规范和底层设计避坑指南。请在进行任何修改前仔细阅读。

## 🚀 关键命令

- **本地开发**：`npm run dev`（启动 Vite 开发服务器）
- **项目构建**：`npm run build`（打包生产环境代码）
- **类型检查/代码格式**：`npm run lint`（如果配置了相关的 ESLint 规则）

## ⚠️ 核心避坑指南 (CRITICAL WARNINGS)

### 1. WebGL 滚动与 GPU 复合边界冲突 (WebGL Scroll flickering Fix)
**状况**：页面滚到底部时，WebGL 交互与 GPU 合成器冲突，会导致页面大范围抖动/闪烁。
**规则**：
- **不允许删除底部的 100vh 占位屏**：最底部的 `.scroll-buffer-section`（在 `App.jsx` 中位于 `<KeyFeatures />` 之下）必须保留。它没有任何描边与分割线，完美融入白色背景。它为 WebGL 提供了弹性缓冲物理高度，绝对不要自作主张将其删除！
- **Hero 容器强裁剪**：首屏 `.hero` 上必须保留 `overflow: hidden; clip-path: inset(0);`，以阻止 GPU 合成器扩展 bounding box。

### 2. Transform 签名必须严格对齐 (Animation Transform Matching)
**规则**：
- 任何通过 CSS 驱动的入场/循环动画，在 `@keyframes` 的 `from` 和 `to` 里的 `transform` 函数列表必须**完全一致**。
- **绝对不要**在 `to` 里省略 `perspective()`、`rotateX()` 或 `scale()` 等参数，否则会因矩阵退化插值导致 WebGL 交互时产生 4-6px 抖动！

### 3. Git 自动化静默推送规范 (Git Quiet Push Guideline)
**规则**：
- **Token 存储**：若进行 `git push` 时遇到远程仓库密码认证失效错误，可从本地 AI 专属配置目录文件 [/.git_token.json](file:///Users/mulei/.gemini/antigravity/.git_token.json) 中读取 Base64 编码的 GitHub 访问令牌（PAT）。
- **推送流程**：
  1. 读取并进行 Base64 解码：`echo -n "<base64_string>" | base64 --decode`
  2. 临时将 URL 改为嵌入 Token 的地址：`git remote set-url origin https://<token>@github.com/mumulei/creator-landingpage.git`
  3. 推送代码：`git push origin main`
  4. **必须执行清理恢复**：为了用户的本地安全，推送成功后，**务必立即将 URL 改回默认地址**：`git remote set-url origin https://github.com/mumulei/creator-landingpage.git`

## 🎨 设计与还原规范

- **Key Features** 区域已实现 1:1 像素级 Figma 设计稿对齐，包括点阵地图定位、社交平台层叠卡片精确绝对定位。除非用户要求，否则请勿修改此部分的定位、阴影或大小。
- 卡片 3 社交堆叠在移动端（`< 920px`）和极窄屏（`< 380px`）下已通过 transform 缩放实现响应式，任何破坏此结构的行为都可能导致移动端溢出。
