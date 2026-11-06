# KMin · 个人主页

纯静态个人博客 / 资源导航站，托管在 **GitHub Pages**。
线上地址：<https://ksdkwk.github.io/KMin.github.io/>

---

## 一、这套站点怎么组织的

核心设计是**内容与骨架完全分离**：

```
  content/*.md  ──build──>  data/*.json  ──fetch──>  浏览器渲染
  （你维护）                （自动生成）              （页面骨架）
```

| 层 | 位置 | 谁负责 |
| --- | --- | --- |
| **内容层** | `content/` 下的 Markdown | 你手动编辑 |
| **数据层** | `data/` 下的 JSON | 构建脚本自动生成，**不要手改** |
| **骨架层** | `*.html` + `assets/css` + `assets/js` | 开发修改，日常不用碰 |

**关键点**：构建只在你本机跑一次。GitHub Pages 上跑的是纯静态文件，不需要 Node、不需要后端。

---

## 二、我要改内容，怎么做

### 步骤（三步）

```bash
# 1. 编辑 Markdown
content/resources/r-001.md

# 2. 编译成 JSON
node build-content.js

# 3. 本地预览
python -m http.server 8000
# 打开 http://localhost:8000/
```

> 改完推送前记得 commit `content/` 和 `data/` 两个目录。

### 各内容对应的目录

| 想改什么 | 编辑目录 | 编译产物 |
| --- | --- | --- |
| 资源（免费 API、云服务等） | `content/resources/*.md` | `data/resources.json` |
| 白嫖福利 | `content/baipiao/*.md` | `data/baipiao.json` |
| 公益站 | `content/charity/*.md` | `data/charity.json` |
| 工具推荐 | `content/tools/*.md` | `data/tools.json` |
| 笔记 | `content/posts/*.md` | `data/posts.json` |
| 分类定义 | `data/categories.json` | （直接手改） |
| 站点统计、更新日期 | `data/site.json` | （直接手改） |
| 关于页时间线、技能 | `data/about.json` | （直接手改） |

---

## 三、Markdown 文件怎么写

每个文件由两部分组成：**YAML 头信息** + **正文**。

### 完整示例（资源类）

```markdown
---
id: r-028
name:
  zh: "新的服务名称"
  en: "New Service Name"
tag:
  zh: "一句话定位"
  en: "One-liner"
desc:
  zh: "详细说明，会显示在卡片上"
  en: "Detailed description"
logo: NS
url: "https://example.com/"
badge:
  zh: "获取方式"
  en: "Access"
provider: "提供方名称"
requirements: "使用要求，显示在红色框里"
tags:
  - "云服务器"
  - "免费额度"
  - "长期有效"
detail:
  quota: "额度说明"
  limit: "使用限制"
  avoid: "避坑提示"
  valid: "有效期"
  scope: "信息来源与核实时间"
---

## 教程

### 第一步标题

第一步的具体操作说明。

### 第二步标题

第二步的具体操作说明。
```

### 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 详情页地址用，`detail.html?id=r-028`，**不能重复** |
| `name` | 是 | 名称，`zh` 必填，`en` 可省略（省略时英文站显示中文） |
| `tag` | 否 | 副标题 |
| `desc` | 是 | 简介，卡片正文 |
| `logo` | 否 | 左上角方块的 1-2 个字母 |
| `url` | 是 | 官网地址 |
| `badge` | 否 | 获取方式标签 |
| `provider` | 否 | 来源，显示为 `by xxx` |
| `requirements` | 否 | 使用要求，红色框 |
| `tags` | 是 | 标签数组，见下文 |
| `detail` | 否 | 详情页数据表 |
| `## 教程` | 否 | 正文里的教程段落 |

---

## 四、tags 标签规则

`tags` 决定卡片出现在哪些筛选中。**每条必须有且仅有一个状态标签**：

| 状态标签 | 含义 | 颜色 |
| --- | --- | --- |
| `长期有效` | 长期开放 | 绿 |
| `现在可薅` | 活动进行中 | 橙 |
| `失效` | 已结束 | 灰 |

**分类标签**（决定顶部筛选按钮，必须与 `data/categories.json` 对应）：

```
云服务器    域名/TLS    国内镜像源    API 羊毛    学生/学习资源    Google 服务
```

**自定义标签**：如 `免费额度`、`限时活动`、`学生认证`，点一下就按它筛选。

### 示例

```yaml
tags:
  - "云服务器"        # 分类标签
  - "限时活动"        # 自定义标签
  - "学生认证"        # 自定义标签
  - "现在可薅"        # 状态标签（唯一）
```

---

## 五、教程怎么写（重要）

教程写在 Markdown 正文里，用 `## 教程` 开头，每个步骤用 `### 标题`：

```markdown
## 教程

### 注册账号

访问官网，用邮箱注册并完成验证。

### 创建项目

登录后点「Create」，填写名称。
```

**没有教程的条目**（如镜像站、下载源）：正文留空即可，详情页会自动隐藏教程区。

> 镜像源这类没有「领取」动作的条目，用 `detail.usage`（用途）代替 `detail.quota`（额度）。

---

## 六、工具、笔记、白嫖、公益站的特殊字段

### 工具 `content/tools/*.md`

```yaml
---
name: "VS Code"
icon: VS
category: dev          # dev / design / productivity / system
desc:
  zh: "中文说明"
  en: "English desc"
tags:
  zh: ["免费", "跨平台"]
  en: ["Free", "Cross-platform"]
free: true
url: "https://code.visualstudio.com/"
---
```

### 白嫖 `content/baipiao/*.md`

在资源字段基础上增加：

```yaml
expire:
  zh: "长期有效"
  en: "Ongoing"
category: quota        # quota / api / event / lottery
```

### 公益站 `content/charity/*.md`

```yaml
org:
  zh: "清华大学"
  en: "Tsinghua University"
category: mirror       # mirror / api / tool
```

### 笔记 `content/posts/*.md`

```yaml
---
date: 2025-11-02
title:
  zh: "标题"
excerpt:
  zh: "摘要"
tags:
  zh: ["部署", "静态站"]
url: "#notes"
---

正文可以用 Markdown 写。
```

---

## 七、常用命令

```bash
node build-content.js          # 编译全部
node build-content.js --watch  # 监听变化自动编译
node build-content.js --check  # 只校验格式，不写文件
python -m http.server 8000     # 本地预览
```

有 `package.json` 的话也可以：

```bash
npm run build     # 编译
npm run watch     # 监听
npm run check     # 校验
npm run serve     # 预览
```

---

## 八、添加一条新资源的完整流程

1. 在 `content/resources/` 新建文件 `r-028.md`
2. 按上面的模板填写 YAML 和正文
3. 运行 `node build-content.js`
4. 本地预览确认
5. `git add content/ data/ && git commit -m "content: 新增 xxx" && git push`
6. 等 1 分钟，线上自动更新

> 新增条目请确认 `id` 不与现有重复。资源用 `r-` 开头、白嫖 `b-`、公益 `c-`。

---

## 九、YAML 写法注意事项

YAML 比 JSON 宽松，但仍有坑：

| 情况 | 错误写法 | 正确写法 |
| --- | --- | --- |
| 文本含冒号 | `desc: 说明: 这是例子` | `desc: "说明: 这是例子"` |
| 文本以特殊符号开头 | `desc: #标签` | `desc: "#标签"` |
| 文本含双引号 | `desc: 他说"你好"` | `desc: "他说\\"你好\\""` |
| 只想写中文 | `name: 服务名` | `name: 服务名`（可以，不必加引号） |

**建议**：不确定时统一加双引号 `"..."` 最保险。

改完运行 `node build-content.js --check` 能看到每个文件是否解析成功。

---

## 十、GitHub Pages 部署（已配置自动构建）

### 工作方式

仓库里有 `.github/workflows/deploy.yml`，每次 push 到 `main` 会自动：

1. 检出代码
2. 运行 `node build-content.js` 把 Markdown 编译成 JSON
3. 把站点打包发布到 GitHub Pages

**你只需要提交 `content/` 下的 Markdown，不用在本地跑构建命令。**

### 日常维护流程

```bash
# 1. 编辑 Markdown
#    content/resources/r-xxx.md 等

# 2. 提交并推送
git add content/
git commit -m "content: 新增 xxx"
git push

# 3. 等 1-2 分钟，线上自动更新
```

GitHub Actions 页面可以看到构建进度：仓库 → **Actions** 标签页。

### 首次启用需要改一个设置

工作流使用 `actions/deploy-pages` 部署，需要把仓库的 Pages 来源改成 Actions：

1. 打开仓库 **Settings → Pages**
2. **Source** 从 `Deploy from a branch` 改成 **`GitHub Actions`**
3. 保存

> 如果不改这一步，工作流会跑但部署失败，提示 "Get Pages site failed"。

### 本地预览（可选）

改了内容想先在本地看效果：

```bash
node build-content.js          # 先编译
python -m http.server 8000     # 起服务
# 打开 http://localhost:8000/
```

### 两种模式对比

| | 手动模式（之前） | 自动模式（现在） |
| --- | --- | --- |
| 改完要跑构建吗 | 要 | 不要 |
| 提交哪些目录 | `content/` + `data/` | 只提交 `content/` |
| 部署触发 | 提交 `data/` 变更 | push 任意改动 |
| 适合 | 本地调试 | 日常维护 |

> `data/*.json` 仍保留在仓库里，是为了本地预览方便。线上由 Actions 重新生成，即使忘了本地编译也不影响。

---

## 十一、目录结构

```
KMin.github.io/
├─ content/              ★ 内容源文件（Markdown，日常只改这里）
│  ├─ resources/         资源 .md
│  ├─ baipiao/           白嫖 .md
│  ├─ charity/           公益站 .md
│  ├─ tools/             工具 .md
│  └─ posts/             笔记 .md
├─ data/                 ★ 构建产物（JSON，不要手改）
│  ├─ resources.json
│  ├─ baipiao.json
│  ├─ charity.json
│  ├─ tools.json
│  ├─ posts.json
│  ├─ categories.json    分类定义（手改）
│  ├─ site.json          站点统计（手改）
│  └─ about.json         关于页（手改）
├─ build-content.js      ★ 构建脚本
├─ package.json          npm 脚本
├─ assets/
│  ├─ css/style.css      样式
│  └─ js/
│     ├─ data-loader.js  读取 JSON
│     └─ main.js         渲染与交互
├─ index.html            首页
├─ resources.html        资源页
├─ baipiao.html          白嫖页
├─ charity.html          公益站页
├─ tools.html            工具页
├─ notes.html            笔记页
├─ about.html            关于页
├─ detail.html           详情页（?id=xxx）
├─ 404.html
└─ .nojekyll
```

---

## 十二、为什么不用现成框架

| 方案 | 取舍 |
| --- | --- |
| **当前方案**（Markdown → JSON → 静态页） | 零依赖、零构建工具链，Markdown 写内容，GitHub Pages 直接托管 |
| Hexo / Hugo | 需要装框架，模板语法学习成本高，但生态大 |
| Next.js 静态导出 | 需要 React，改动成本高 |
| Headless CMS（如 Strapi） | 需要跑服务端，违背纯静态前提 |

当前方案在「纯静态」和「好维护」之间取了平衡：**内容写 Markdown，页面仍是纯 HTML/CSS/JS**。