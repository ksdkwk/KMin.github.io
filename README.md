# KMin · 个人主页

纯静态个人博客 / 成果展示站，零依赖、零构建，直接托管在 **GitHub Pages** 上。

线上地址：<https://ksdkwk.github.io/KMin.github.io/>

---

## 一、技术选型

| 项 | 说明 |
| --- | --- |
| 技术栈 | 原生 HTML + CSS + JavaScript（无构建、无框架、无依赖） |
| 资源 | 所有图标均为内联 SVG，不依赖任何 CDN 或在线字体 |
| 托管 | GitHub Pages（纯静态文件直出） |
| 兼容性 | Chrome / Edge / Firefox / Safari 最近两个大版本，尊重 `prefers-reduced-motion` |

遵循 GitHub Pages 的官方限制：不含服务端逻辑；全部资源使用相对路径，本地预览与线上部署都能正常访问。

> 仓库名为 `KMin.github.io`，是 GitHub Pages 的**用户主页仓库**，站点直接挂在域名根路径 `https://ksdkwk.github.io/` 下，不是子路径。若仓库改回普通名字（如 `KMin`），地址会变成 `https://ksdkwk.github.io/KMin/`，届时需同步修改 `index.html` 的 canonical / og:url 与 `robots.txt`。

---

## 二、目录结构

```
KMin.github.io/
├─ index.html           # 主页面（单页 + 锚点导航）
├─ 404.html             # GitHub Pages 自定义 404
├─ .nojekyll            # 关闭 Jekyll 处理，避免下划线目录被忽略
├─ robots.txt
├─ README.md
└─ assets/
   ├─ css/
   │  └─ style.css      # 全部样式（设计令牌 / 组件 / 响应式 / 暗色主题）
   ├─ js/
   │  ├─ data.js        # ★ 唯一内容数据源
   │  └─ main.js        # 渲染与交互
   └─ img/
      └─ favicon.svg
```

**维护原则**：内容与表现分离。新增一条资源 / 工具 / 笔记，只改 `assets/js/data.js`，页面自动渲染，不用动 HTML。

首页统计数字（收录条目 / 工具推荐 / 笔记篇数）默认按数组真实长度自动计算；`data.js` 的 `meta.stats` 里给某个键写具体数字即可覆盖为该展示值。

---

## 三、本地预览

直接双击 `index.html` 可看，但推荐起本地静态服务，行为与线上一致：

```bash
# Python 3
python -m http.server 8000

# 或 Node.js
npx serve .
```

打开 <http://localhost:8000/>。

> `404.html` 用绝对路径 `/` 跳回首页，本地预览时链接指向本地服务根，属正常现象。

---

## 四、部署到 GitHub Pages

### 方式 A：仓库根目录（当前采用）

1. 仓库：`https://github.com/ksdkwk/KMin.github.io`
2. 推送到 `main` 分支：

```bash
git add .
git commit -m "feat: 初始化个人主页"
git push -u origin main
```

3. 仓库 **Settings → Pages**
4. **Source** 选 `Deploy from a branch`
5. **Branch** 选 `main`，目录选 `/ (root)`，点 **Save**
6. 等待 1–3 分钟，访问 `https://ksdkwk.github.io/`（用户主页仓库，根路径即站点）

### 方式 B：`gh-pages` 分支

把发布内容单独放到 `gh-pages` 分支，Pages 的 Branch 指向 `gh-pages`。适合以后接入构建流程。

### 首次部署注意事项

- 仓库需为 **Public**（私有仓库使用 Pages 需要 Pro）
- 样式丢失通常是漏推 `assets/` 目录
- 更新后 CDN 刷新约需 30–90 秒

---

## 五、功能说明

| 功能 | 说明 | 位置 |
| --- | --- | --- |
| 中英切换 | 右上角 CN / US 下拉列表（位于主题按钮右侧），切换全站文案并记忆 | `main.js` #3 |
| 明暗主题 | 右上角日 / 月按钮，跟随系统偏好，手动选择后记忆 | `main.js` #2 |
| 站点搜索 | 放大镜或 `/`、`Ctrl+K` 呼出，实时过滤资源、工具、笔记 | `main.js` #6 |
| 分类筛选 | 资源 / 工具按分类过滤，带条数统计 | `main.js` #5 |
| 导航高亮 | 滚动时自动点亮当前区块对应的导航项 | `main.js` #7 |
| 入场动画 | IntersectionObserver 渐入，尊重系统减弱动效设置 | `main.js` #8 |
| 响应式 | 1080 / 900 / 640 / 400 四档断点，≤900px 折叠为汉堡菜单 | `style.css` #14 |
| 无障碍 | 语义化标签、跳过链接、aria 状态、键盘可操作、焦点可见 | 全站 |

---

## 六、二次开发

### 新增一条资源

编辑 `assets/js/data.js` 的 `resources` 数组：

```js
{
  name:   { zh: "名称", en: "Name" },
  tag:    { zh: "一句话定位", en: "One-liner" },
  desc:   { zh: "说明", en: "Description" },
  logo:   "缩写",            // 卡片左上角占位字母
  category: "cloud",         // 必须属于 categories.resource 已有的 id
  status: "ok",              // ok = 可薅 / warn = 有限制 / off = 已失效
  url:    "https://...",
  badge:  { zh: "标签", en: "Badge" }
}
```

### 新增一个分类

在 `categories.resource` 或 `categories.tool` 追加 `{ id: 'xxx', label: { zh, en } }`，筛选按钮自动出现。

### 语言切换怎么加文案

页面文案集中在 `main.js` 顶部的 `I18N` 对象里，`zh` / `en` 两份键名必须一一对应。

- 静态文本：给元素加 `data-i18n="键名"`（纯文本）、`data-i18n-html="键名"`（含标签）、`data-i18n-aria`、`data-i18n-placeholder`
- 数据文件里的双语字段写成 `{ zh: "...", en: "..." }`，渲染时按当前语言自动取值

### 修改配色

颜色集中在 `style.css` 顶部的 `:root`（亮色）与 `html[data-theme="dark"]`（暗色）。主色为 `--accent`，改一处全站生效。

### 修改社交链接 / 邮箱

在 `index.html` 搜索 `github.com/ksdkwk` 与 `mailto:` 替换。

### 增加新页面

新建 `about.html` 等页面复用 `assets/css/style.css`，把导航中的锚点 `#about` 改为 `about.html` 即可。路径保持相对引用。

---

## 七、内容更新流程

```
改 assets/js/data.js
   ↓
本地 python -m http.server 8000 预览
   ↓
git add . && git commit -m "content: 更新资源"
   ↓
git push
   ↓
GitHub Pages 自动重新发布（约 1 分钟）
```

---

## 八、许可

站点代码与内容采用 MIT 许可；引用的第三方资源归各自所有者。
