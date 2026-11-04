/* ==========================================================================
   data.js · 站点内容数据（唯一数据源）
   改内容只改这个文件，页面会自动重新渲染。
   字段说明：
     resources[]  name/tag/desc 支持 {zh, en} 双语；logo 为占位字母
                  status: "ok"(现在还能薅) | "warn"(名额紧张/有限制) | "off"(已失效留档)
     tools[]      tags 双语；free 标记是否免费/开源
     posts[]      笔记列表
     timeline[]   关于页时间线
     skills[]     技能标签
   ========================================================================== */
window.KMIN_DATA = {
  meta: {
    // 首页 / 首屏展示的统计数字。
    //   resources / tools / posts → null 表示自动按数组真实长度计算（推荐，增删后数字自动同步）
    //   想显示"累计收录"这类大于当前条目的数字时，直接把它改成具体数字即可
    //   projects = 开源作品数，sync = 距上次同步的分钟数
    stats: { resources: null, tools: null, posts: null, projects: 6, sync: 12 },
    // 最近一次内容更新时间，用于首屏文案
    updated: "2025-11"
  },

  categories: {
    resource: [
      { id: "all", label: { zh: "全部", en: "All" } },
      { id: "cloud", label: { zh: "云服务", en: "Cloud" } },
      { id: "api", label: { zh: "免费 API", en: "Free API" } },
      { id: "mirror", label: { zh: "镜像站", en: "Mirrors" } },
      { id: "domain", label: { zh: "域名/证书", en: "Domain" } },
      { id: "learn", label: { zh: "学习资源", en: "Learning" } }
    ],
    tool: [
      { id: "all", label: { zh: "全部", en: "All" } },
      { id: "dev", label: { zh: "开发", en: "Dev" } },
      { id: "design", label: { zh: "设计", en: "Design" } },
      { id: "productivity", label: { zh: "效率", en: "Productivity" } },
      { id: "system", label: { zh: "系统", en: "System" } }
    ]
  },

  resources: [
    {
      name: { zh: "Cloudflare Workers", en: "Cloudflare Workers" },
      tag: { zh: "Serverless · 全球边缘", en: "Serverless · Global edge" },
      desc: {
        zh: "每天 10 万次免费请求，写个小 API、反代或定时任务完全够用，绑定自定义域名也免费。",
        en: "100k free requests per day. Enough for a small API, a reverse proxy, or cron jobs — custom domains included."
      },
      logo: "CF", category: "cloud", status: "ok", url: "https://workers.cloudflare.com/",
      badge: { zh: "长期可薅", en: "Long-term" }
    },
    {
      name: { zh: "GitHub Pages", en: "GitHub Pages" },
      tag: { zh: "静态托管 · 免费 HTTPS", en: "Static hosting · Free HTTPS" },
      desc: {
        zh: "这个站点就跑在上面。公开仓库直接推代码即可发布，自带 CDN 和证书，零成本。",
        en: "This very site runs here. Push to a public repo and it deploys — CDN and TLS included, at no cost."
      },
      logo: "GH", category: "cloud", status: "ok", url: "https://pages.github.com/",
      badge: { zh: "在用", en: "In use" }
    },
    {
      name: { zh: "阿里云 / 腾讯云学生机", en: "Alibaba / Tencent student plans" },
      tag: { zh: "轻量服务器 · 需认证", en: "Lightweight VPS · Verified" },
      desc: {
        zh: "学生认证后能拿到很便宜的轻量应用服务器，适合练手和跑小服务；名额和价格每年都在变。",
        en: "Steep discounts on lightweight VPS after student verification. Good for practice projects; quotas and prices change yearly."
      },
      logo: "AL", category: "cloud", status: "warn", url: "https://www.aliyun.com/",
      badge: { zh: "需认证", en: "Verified only" }
    },
    {
      name: { zh: "OpenRouter 免费模型", en: "OpenRouter free models" },
      tag: { zh: "LLM API · 有速率限制", en: "LLM API · Rate limited" },
      desc: {
        zh: "一批标注 :free 的模型可以直接调用，适合做原型和小工具；并发和每日额度会随模型调整。",
        en: "A set of :free models you can call directly — great for prototypes. Concurrency and daily quotas shift between models."
      },
      logo: "OR", category: "api", status: "warn", url: "https://openrouter.ai/",
      badge: { zh: "限速", en: "Rate limited" }
    },
    {
      name: { zh: "GitHub REST API", en: "GitHub REST API" },
      tag: { zh: "开发 API · 需 Token", en: "Developer API · Token" },
      desc: {
        zh: "未认证每小时 60 次，带 Token 5000 次。做个人主页的动态数据（仓库、star 数）足够。",
        en: "60 req/h unauthenticated, 5,000 with a token. Plenty for pulling repo or star counts into a personal page."
      },
      logo: "API", category: "api", status: "ok", url: "https://docs.github.com/rest",
      badge: { zh: "稳定", en: "Stable" }
    },
    {
      name: { zh: "Google Fonts / 图标库", en: "Google Fonts & icons" },
      tag: { zh: "字体 · 完全免费", en: "Fonts · Free" },
      desc: {
        zh: "自托管或直接引 CDN 都行，做静态站必备。注意国内访问速度，必要时换镜像。",
        en: "Self-host or use the CDN. Essential for static sites — mind the access speed in some regions."
      },
      logo: "GF", category: "api", status: "ok", url: "https://fonts.google.com/",
      badge: { zh: "免费", en: "Free" }
    },
    {
      name: { zh: "清华 TUNA 镜像", en: "Tsinghua TUNA mirror" },
      tag: { zh: "镜像站 · 校园网友好", en: "Mirror · Campus friendly" },
      desc: {
        zh: "系统源、PyPI、Docker 镜像都有，装环境时换上游能省很多等待。",
        en: "OS repos, PyPI and Docker images all in one place — switching upstream saves a lot of waiting."
      },
      logo: "TU", category: "mirror", status: "ok", url: "https://mirrors.tuna.tsinghua.edu.cn/",
      badge: { zh: "长期", en: "Long-term" }
    },
    {
      name: { zh: "npmmirror", en: "npmmirror" },
      tag: { zh: "npm 镜像 · 国内加速", en: "npm mirror · Fast" },
      desc: {
        zh: "装依赖卡住时换这个源，企业内网和低带宽环境提升明显。",
        en: "Switch to this registry when installs stall — noticeably faster on slow or restricted networks."
      },
      logo: "NP", category: "mirror", status: "ok", url: "https://npmmirror.com/",
      badge: { zh: "在用", en: "In use" }
    },
    {
      name: { zh: "Docker Hub 镜像代理", en: "Docker Hub proxies" },
      tag: { zh: "容器镜像 · 时有变动", en: "Container images · Unstable" },
      desc: {
        zh: "公开可用的加速地址换得比较频繁，建议同时配置多个备用，别把单个地址写死。",
        en: "Public accelerators rotate often. Configure several fallbacks instead of hard-coding a single endpoint."
      },
      logo: "DK", category: "mirror", status: "off", url: "https://docs.docker.com/",
      badge: { zh: "需自备", en: "Bring your own" }
    },
    {
      name: { zh: "Let's Encrypt", en: "Let's Encrypt" },
      tag: { zh: "免费证书 · 90 天自动续", en: "Free TLS · 90-day auto-renew" },
      desc: {
        zh: "配合 acme.sh 或 certbot 全自动续期，自建服务的 HTTPS 基本靠它。",
        en: "Pair with acme.sh or certbot for fully automatic renewal. The backbone of self-hosted HTTPS."
      },
      logo: "LE", category: "domain", status: "ok", url: "https://letsencrypt.org/",
      badge: { zh: "免费", en: "Free" }
    },
    {
      name: { zh: "免费域名 / 子域", en: "Free domains & subdomains" },
      tag: { zh: "二级域名 · 稳定性一般", en: "Subdomains · Varies" },
      desc: {
        zh: "eu.org、DNS 服务商赠送的一级域名等，适合临时项目；长期站点建议直接买域名。",
        en: "eu.org and provider-gifted domains suit temporary projects. For anything long-lived, buy a real domain."
      },
      logo: "DM", category: "domain", status: "warn", url: "https://nic.eu.org/",
      badge: { zh: "慎用", en: "Caution" }
    },
    {
      name: { zh: "MDN / 现代 JS 教程", en: "MDN & modern JS docs" },
      tag: { zh: "文档 · 随时可查", en: "Docs · Always there" },
      desc: {
        zh: "写前端绕不开的权威参考，比大多数博客都准。遇到不确定的 API 先查这里。",
        en: "The reference you cannot avoid writing for the web — more reliable than most blog posts."
      },
      logo: "MD", category: "learn", status: "ok", url: "https://developer.mozilla.org/",
      badge: { zh: "免费", en: "Free" }
    },
    {
      name: { zh: "Vercel / Netlify", en: "Vercel / Netlify" },
      tag: { zh: "静态部署 · 自动 CI", en: "Static deploy · Auto CI" },
      desc: {
        zh: "连上 Git 仓库就能自动构建发布，PR 预览链接很好用，个人项目免费额度足够。",
        en: "Connect a repo and it builds on push. Preview deploys per PR; the free tier covers personal projects."
      },
      logo: "VC", category: "cloud", status: "ok", url: "https://vercel.com/",
      badge: { zh: "免费额度", en: "Free tier" }
    },
    {
      name: { zh: "Supabase", en: "Supabase" },
      tag: { zh: "后端即服务 · 免费库", en: "BaaS · Free DB" },
      desc: {
        zh: "免费的 Postgres 加鉴权和存储，做小项目不用自己搭后端；闲置项目会被暂停。",
        en: "Free Postgres with auth and storage — no backend to build. Idle projects get paused."
      },
      logo: "SB", category: "cloud", status: "warn", url: "https://supabase.com/",
      badge: { zh: "会休眠", en: "Sleeps" }
    },
    {
      name: { zh: "DeepSeek 开放平台", en: "DeepSeek Platform" },
      tag: { zh: "LLM API · 按量计费", en: "LLM API · Pay per use" },
      desc: {
        zh: "价格低、兼容 OpenAI 协议，写小工具和脚本时接入成本很小，新用户常有赠送额度。",
        en: "Low cost and OpenAI-compatible, so wiring it into scripts is cheap. New accounts often get credit."
      },
      logo: "DS", category: "api", status: "ok", url: "https://platform.deepseek.com/",
      badge: { zh: "低价", en: "Low cost" }
    },
    {
      name: { zh: "Public APIs 清单", en: "Public APIs list" },
      tag: { zh: "接口合集 · 社区维护", en: "API directory · Community" },
      desc: {
        zh: "按领域分类的公开接口大全，找练手项目的数据源很方便，注意核对可用性。",
        en: "A categorised directory of public APIs — handy for practice projects. Verify availability first."
      },
      logo: "PA", category: "api", status: "ok", url: "https://github.com/public-apis/public-apis",
      badge: { zh: "开源", en: "Open source" }
    },
    {
      name: { zh: "USTC / 阿里云镜像", en: "USTC & Aliyun mirrors" },
      tag: { zh: "镜像站 · 备用上游", en: "Mirror · Backup upstream" },
      desc: {
        zh: "主镜像抽风时的备选，装系统、拉依赖多配几个源能少踩很多坑。",
        en: "Backups for when the primary mirror misbehaves. Configure a few sources and installs stop hurting."
      },
      logo: "US", category: "mirror", status: "ok", url: "https://mirrors.ustc.edu.cn/",
      badge: { zh: "备用", en: "Backup" }
    },
    {
      name: { zh: "jsDelivr / unpkg", en: "jsDelivr / unpkg" },
      tag: { zh: "CDN · 前端资源", en: "CDN · Front-end assets" },
      desc: {
        zh: "直接从 npm / GitHub 引资源，做演示页省事；生产环境建议自托管关键依赖。",
        en: "Pull assets straight from npm or GitHub — great for demos. Self-host critical deps in production."
      },
      logo: "JD", category: "mirror", status: "warn", url: "https://www.jsdelivr.com/",
      badge: { zh: "慎用于生产", en: "Not for prod" }
    },
    {
      name: { zh: "Cloudflare DNS", en: "Cloudflare DNS" },
      tag: { zh: "免费 DNS · 带加速", en: "Free DNS · With CDN" },
      desc: {
        zh: "免费托管解析并附带 CDN 与基础防护，自建站点的常规搭配。",
        en: "Free authoritative DNS with CDN and basic protection — the usual companion for self-hosted sites."
      },
      logo: "CD", category: "domain", status: "ok", url: "https://www.cloudflare.com/",
      badge: { zh: "免费", en: "Free" }
    },
    {
      name: { zh: "freeCodeCamp", en: "freeCodeCamp" },
      tag: { zh: "学习 · 完全免费", en: "Learning · Fully free" },
      desc: {
        zh: "成体系的前端与后端课程，带项目和认证，入门比零散看视频扎实。",
        en: "Structured front-end and back-end curriculum with projects and certificates — sturdier than scattered videos."
      },
      logo: "FC", category: "learn", status: "ok", url: "https://www.freecodecamp.org/",
      badge: { zh: "免费", en: "Free" }
    },
    {
      name: { zh: "Roadmap.sh", en: "Roadmap.sh" },
      tag: { zh: "学习路线 · 社区维护", en: "Learning paths · Community" },
      desc: {
        zh: "把技能拆成一张张路线图，用来查漏补缺比漫无目的刷教程高效。",
        en: "Turns skills into roadmaps — far better for spotting gaps than aimless tutorial browsing."
      },
      logo: "RM", category: "learn", status: "ok", url: "https://roadmap.sh/",
      badge: { zh: "免费", en: "Free" }
    }
  ],

  tools: [
    {
      name: "VS Code", icon: "VS", category: "dev",
      desc: {
        zh: "主力编辑器，装几个插件就能覆盖前端、脚本和 Markdown 写作。",
        en: "Main editor. A handful of extensions covers front-end work, scripts and Markdown writing."
      },
      tags: { zh: ["免费", "跨平台"], en: ["Free", "Cross-platform"] },
      free: true, url: "https://code.visualstudio.com/"
    },
    {
      name: "Git", icon: "GT", category: "dev",
      desc: {
        zh: "版本管理的基础设施，GitHub Pages 部署流程也绕不开它。",
        en: "The foundation of version control — and the path to deploying on GitHub Pages."
      },
      tags: { zh: ["开源", "必备"], en: ["Open source", "Essential"] },
      free: true, url: "https://git-scm.com/"
    },
    {
      name: "Figma", icon: "FG", category: "design",
      desc: {
        zh: "画页面草图、导出 SVG 图标，免费额度对个人项目够用。",
        en: "Sketch layouts and export SVG icons. The free tier is enough for personal projects."
      },
      tags: { zh: ["免费额度", "协作"], en: ["Free tier", "Collaboration"] },
      free: true, url: "https://www.figma.com/"
    },
    {
      name: "uTools", icon: "UT", category: "productivity",
      desc: {
        zh: "快捷启动器加插件市场，剪贴板、翻译、截图一步到位。",
        en: "A launcher with a plugin market — clipboard, translation and screenshots in one keystroke."
      },
      tags: { zh: ["免费", "国产"], en: ["Free", "Local"] },
      free: true, url: "https://u.tools/"
    },
    {
      name: "Obsidian", icon: "OB", category: "productivity",
      desc: {
        zh: "本地 Markdown 笔记，双链整理资料；文件都在本地，不怕平台跑路。",
        en: "Local Markdown notes with backlinks. Your files stay on disk, immune to platform shifts."
      },
      tags: { zh: ["免费", "本地优先"], en: ["Free", "Local-first"] },
      free: true, url: "https://obsidian.md/"
    },
    {
      name: "PowerToys", icon: "PT", category: "system",
      desc: {
        zh: "Windows 上的效率增强包，窗口布局、批量重命名、取色器都很好用。",
        en: "An efficiency pack for Windows: window layouts, bulk rename and a colour picker."
      },
      tags: { zh: ["开源", "Windows"], en: ["Open source", "Windows"] },
      free: true, url: "https://github.com/microsoft/PowerToys"
    },
    {
      name: "Windows Terminal", icon: "WT", category: "system",
      desc: {
        zh: "多标签、分屏和自定义配色，配合 WSL 用起来比自带终端顺很多。",
        en: "Tabs, panes and custom themes — far smoother than the built-in console, especially with WSL."
      },
      tags: { zh: ["开源", "Windows"], en: ["Open source", "Windows"] },
      free: true, url: "https://github.com/microsoft/terminal"
    },
    {
      name: "7-Zip", icon: "7Z", category: "system",
      desc: {
        zh: "老牌压缩工具，格式支持全、没广告，装系统后第一批必装之一。",
        en: "The veteran archiver: broad format support, no ads. One of the first things I install."
      },
      tags: { zh: ["开源", "轻量"], en: ["Open source", "Lightweight"] },
      free: true, url: "https://www.7-zip.org/"
    },
    {
      name: "Fira Code / JetBrains Mono", icon: "FC", category: "design",
      desc: {
        zh: "带连字的等宽字体，写代码时辨识度更好，编辑器里换一下就知道差别。",
        en: "Ligature monospace fonts that make code easier to scan — swap them in your editor to feel it."
      },
      tags: { zh: ["开源", "字体"], en: ["Open source", "Font"] },
      free: true, url: "https://github.com/tonsky/FiraCode"
    },
    {
      name: "Excalidraw", icon: "EX", category: "design",
      desc: {
        zh: "手绘风格白板，画架构图和流程示意很快，不用登录也能直接用。",
        en: "A hand-drawn style whiteboard for quick architecture sketches — usable without signing in."
      },
      tags: { zh: ["开源", "在线"], en: ["Open source", "Web"] },
      free: true, url: "https://excalidraw.com/"
    },
    {
      name: "Everything", icon: "EV", category: "productivity",
      desc: {
        zh: "秒级全盘文件名搜索，Windows 上找文件的神器，资源占用很低。",
        en: "Instant whole-disk filename search for Windows. Minimal footprint, indispensable."
      },
      tags: { zh: ["免费", "Windows"], en: ["Free", "Windows"] },
      free: true, url: "https://www.voidtools.com/"
    },
    {
      name: "Docker Desktop", icon: "DK", category: "dev",
      desc: {
        zh: "本地跑容器最简单的方式，环境隔离后「在我机器上是好的」这类问题少很多。",
        en: "The easiest way to run containers locally. Environment isolation kills most \"works on my machine\" bugs."
      },
      tags: { zh: ["免费额度", "容器"], en: ["Free tier", "Containers"] },
      free: true, url: "https://www.docker.com/products/docker-desktop/"
    },
    {
      name: "Postman / Hoppscotch", icon: "PM", category: "dev",
      desc: {
        zh: "调接口必备，Hoppscotch 是开源替代，浏览器里直接能用、更轻。",
        en: "Essential for API work. Hoppscotch is the open-source alternative — lighter and browser-based."
      },
      tags: { zh: ["免费", "API"], en: ["Free", "API"] },
      free: true, url: "https://hoppscotch.io/"
    }
  ],

  posts: [
    {
      date: "2025-11-02",
      title: { zh: "用 GitHub Pages 从零搭个人主页", en: "Building a personal site on GitHub Pages" },
      excerpt: {
        zh: "从仓库结构到自定义域名，把踩过的坑一次写清楚。",
        en: "From repo layout to a custom domain — every pitfall written down once."
      },
      tags: { zh: ["部署", "静态站"], en: ["Deploy", "Static"] },
      url: "#notes"
    },
    {
      date: "2025-10-18",
      title: { zh: "免费额度到底能撑多久", en: "How long do free tiers really last" },
      excerpt: {
        zh: "整理了大半年用过的免费服务，哪些还活着、哪些已经不能薅了。",
        en: "Half a year of free services: which ones survive and which quietly closed."
      },
      tags: { zh: ["资源", "复盘"], en: ["Resources", "Review"] },
      url: "#notes"
    },
    {
      date: "2025-09-27",
      title: { zh: "纯 CSS 实现卡片阴影与悬浮感", en: "Card shadows and lift with pure CSS" },
      excerpt: {
        zh: "不用框架，用 box-shadow 和 transform 做出有手感的界面。",
        en: "No framework needed: box-shadow and transform give the interface real feel."
      },
      tags: { zh: ["CSS", "前端"], en: ["CSS", "Front-end"] },
      url: "#notes"
    },
    {
      date: "2025-09-05",
      title: { zh: "把笔记从云端搬回本地", en: "Moving notes back to local storage" },
      excerpt: {
        zh: "本地优先的笔记方案实践，以及迁移时要注意的格式问题。",
        en: "Hands-on with a local-first note workflow, plus the format issues migration raises."
      },
      tags: { zh: ["工具", "笔记"], en: ["Tools", "Notes"] },
      url: "#notes"
    },
    {
      date: "2025-08-16",
      title: { zh: "把导航栏做成可复用的组件", en: "Turning the navbar into a reusable component" },
      excerpt: {
        zh: "单页站点的导航最容易越写越乱，拆成数据驱动后清爽很多。",
        en: "Navigation on a single-page site gets messy fast; data-driving it made it clean again."
      },
      tags: { zh: ["重构", "前端"], en: ["Refactor", "Front-end"] },
      url: "#notes"
    },
    {
      date: "2025-07-03",
      title: { zh: "暗色主题不是把颜色反过来", en: "Dark mode is not inverted colours" },
      excerpt: {
        zh: "对比度、边界和阴影在暗色下都要重新调，直接反转只会更难读。",
        en: "Contrast, borders and shadows all need rework — a naive inversion just gets harder to read."
      },
      tags: { zh: ["CSS", "主题"], en: ["CSS", "Theme"] },
      url: "#notes"
    }
  ],

  timeline: [
    {
      time: { zh: "2025 · 现在", en: "2025 · Now" },
      text: { zh: "维护这个站点，持续整理免费资源与工具清单。", en: "Maintaining this site and curating free resources." }
    },
    {
      time: { zh: "2024", en: "2024" },
      text: { zh: "开始把各种自建服务和脚本收纳成一套工作流。", en: "Consolidated self-hosted services and scripts into one workflow." }
    },
    {
      time: { zh: "2022", en: "2022" },
      text: { zh: "第一次自己部署网站，从此喜欢上折腾。", en: "Deployed a website for the first time — and got hooked." }
    }
  ],

  skills: ["HTML / CSS", "JavaScript", "TypeScript", "Node.js", "Python", "Git", "Linux", "Docker", "Figma", "Nginx"]
};
