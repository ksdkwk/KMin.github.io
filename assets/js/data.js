window.KMIN_DATA = {
  "meta": {
    "stats": {
      "resources": null,
      "tools": null,
      "posts": null,
      "projects": 6,
      "sync": 12
    },
    "updated": "2025-11",
    "schema": 2
  },
  "categories": {
    "resource": [
      {
        "id": "all",
        "label": {
          "zh": "全部",
          "en": "All"
        }
      },
      {
        "id": "server",
        "label": {
          "zh": "云服务器",
          "en": "Servers"
        }
      },
      {
        "id": "domain",
        "label": {
          "zh": "域名/TLS",
          "en": "Domain & TLS"
        }
      },
      {
        "id": "mirror",
        "label": {
          "zh": "国内镜像源",
          "en": "CN Mirrors"
        }
      },
      {
        "id": "api",
        "label": {
          "zh": "API 羊毛",
          "en": "API Freebies"
        }
      },
      {
        "id": "learn",
        "label": {
          "zh": "学生/学习资源",
          "en": "Student & Learning"
        }
      },
      {
        "id": "google",
        "label": {
          "zh": "Google 服务",
          "en": "Google"
        }
      }
    ],
    "baipiao": [
      {
        "id": "all",
        "label": {
          "zh": "全部",
          "en": "All"
        }
      },
      {
        "id": "quota",
        "label": {
          "zh": "免费额度",
          "en": "Free quota"
        }
      },
      {
        "id": "api",
        "label": {
          "zh": "免费 API",
          "en": "Free API"
        }
      },
      {
        "id": "event",
        "label": {
          "zh": "限时活动",
          "en": "Limited events"
        }
      },
      {
        "id": "lottery",
        "label": {
          "zh": "抽奖福利",
          "en": "Giveaways"
        }
      }
    ],
    "charity": [
      {
        "id": "all",
        "label": {
          "zh": "全部",
          "en": "All"
        }
      },
      {
        "id": "mirror",
        "label": {
          "zh": "公益镜像",
          "en": "Public mirrors"
        }
      },
      {
        "id": "api",
        "label": {
          "zh": "公益 API",
          "en": "Public API"
        }
      },
      {
        "id": "tool",
        "label": {
          "zh": "公益工具",
          "en": "Public tools"
        }
      }
    ],
    "tool": [
      {
        "id": "all",
        "label": {
          "zh": "全部",
          "en": "All"
        }
      },
      {
        "id": "dev",
        "label": {
          "zh": "开发",
          "en": "Dev"
        }
      },
      {
        "id": "design",
        "label": {
          "zh": "设计",
          "en": "Design"
        }
      },
      {
        "id": "productivity",
        "label": {
          "zh": "效率",
          "en": "Productivity"
        }
      },
      {
        "id": "system",
        "label": {
          "zh": "系统",
          "en": "System"
        }
      }
    ]
  },
  "resources": [
    {
      "name": {
        "zh": "Cloudflare Workers",
        "en": "Cloudflare Workers"
      },
      "tag": {
        "zh": "Serverless · 全球边缘",
        "en": "Serverless · Global edge"
      },
      "desc": {
        "zh": "每天 10 万次免费请求，写个小 API、反代或定时任务完全够用，绑定自定义域名也免费。",
        "en": "100k free requests per day. Enough for a small API, a reverse proxy, or cron jobs — custom domains included."
      },
      "logo": "CF",
      "url": "https://workers.cloudflare.com/",
      "badge": {
        "zh": "长期可薅",
        "en": "Long-term"
      },
      "tags": [
        "云服务器",
        "免费额度",
        "长期有效"
      ],
      "provider": "Cloudflare",
      "requirements": "需注册 Cloudflare 账号；免费额度每日 10 万次请求，超出按量计费。"
    },
    {
      "name": {
        "zh": "GitHub Pages",
        "en": "GitHub Pages"
      },
      "tag": {
        "zh": "静态托管 · 免费 HTTPS",
        "en": "Static hosting · Free HTTPS"
      },
      "desc": {
        "zh": "这个站点就跑在上面。公开仓库直接推代码即可发布，自带 CDN 和证书，零成本。",
        "en": "This very site runs here. Push to a public repo and it deploys — CDN and TLS included, at no cost."
      },
      "logo": "GH",
      "url": "https://pages.github.com/",
      "badge": {
        "zh": "在用",
        "en": "In use"
      },
      "tags": [
        "云服务器",
        "静态托管",
        "长期有效"
      ],
      "provider": "GitHub",
      "requirements": "仓库需为公开仓库；单站 1GB、月流量 100GB；不支持服务端逻辑。"
    },
    {
      "name": {
        "zh": "阿里云 / 腾讯云学生机",
        "en": "Alibaba / Tencent student plans"
      },
      "tag": {
        "zh": "轻量服务器 · 需认证",
        "en": "Lightweight VPS · Verified"
      },
      "desc": {
        "zh": "学生认证后能拿到很便宜的轻量应用服务器，适合练手和跑小服务；名额和价格每年都在变。",
        "en": "Steep discounts on lightweight VPS after student verification. Good for practice projects; quotas and prices change yearly."
      },
      "logo": "AL",
      "url": "https://www.aliyun.com/",
      "badge": {
        "zh": "需认证",
        "en": "Verified only"
      },
      "tags": [
        "云服务器",
        "限时活动",
        "学生认证",
        "现在可薅"
      ],
      "provider": "阿里云 / 腾讯云",
      "requirements": "需通过学生身份认证；首年优惠价，续费恢复原价，购买前先算三年总价。"
    },
    {
      "name": {
        "zh": "OpenRouter 免费模型",
        "en": "OpenRouter free models"
      },
      "tag": {
        "zh": "LLM API · 有速率限制",
        "en": "LLM API · Rate limited"
      },
      "desc": {
        "zh": "一批标注 :free 的模型可以直接调用，适合做原型和小工具；并发和每日额度会随模型调整。",
        "en": "A set of :free models you can call directly — great for prototypes. Concurrency and daily quotas shift between models."
      },
      "logo": "OR",
      "url": "https://openrouter.ai/",
      "badge": {
        "zh": "限速",
        "en": "Rate limited"
      },
      "tags": [
        "API 羊毛",
        "免费额度",
        "现在可薅"
      ],
      "provider": "OpenRouter",
      "requirements": "需注册并创建 API Key；:free 模型有每分钟与每日调用上限，超额需充值。"
    },
    {
      "name": {
        "zh": "GitHub REST API",
        "en": "GitHub REST API"
      },
      "tag": {
        "zh": "开发 API · 需 Token",
        "en": "Developer API · Token"
      },
      "desc": {
        "zh": "未认证每小时 60 次，带 Token 5000 次。做个人主页的动态数据（仓库、star 数）足够。",
        "en": "60 req/h unauthenticated, 5,000 with a token. Plenty for pulling repo or star counts into a personal page."
      },
      "logo": "API",
      "url": "https://docs.github.com/rest",
      "badge": {
        "zh": "稳定",
        "en": "Stable"
      },
      "tags": [
        "API 羊毛",
        "开发接口",
        "长期有效"
      ],
      "provider": "GitHub",
      "requirements": "未认证 60 次/小时，带 Token 5000 次/小时；请勿高频轮询，建议加缓存。"
    },
    {
      "name": {
        "zh": "Google Fonts / 图标库",
        "en": "Google Fonts & icons"
      },
      "tag": {
        "zh": "字体 · 完全免费",
        "en": "Fonts · Free"
      },
      "desc": {
        "zh": "自托管或直接引 CDN 都行，做静态站必备。注意国内访问速度，必要时换镜像。",
        "en": "Self-host or use the CDN. Essential for static sites — mind the access speed in some regions."
      },
      "logo": "GF",
      "url": "https://fonts.google.com/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "tags": [
        "API 羊毛",
        "免费额度",
        "长期有效"
      ],
      "provider": "Google",
      "requirements": "CDN 引入方式在部分地区访问较慢，建议自托管字体文件或换用镜像。"
    },
    {
      "name": {
        "zh": "清华 TUNA 镜像",
        "en": "Tsinghua TUNA mirror"
      },
      "tag": {
        "zh": "镜像站 · 校园网友好",
        "en": "Mirror · Campus friendly"
      },
      "desc": {
        "zh": "系统源、PyPI、Docker 镜像都有，装环境时换上游能省很多等待。",
        "en": "OS repos, PyPI and Docker images all in one place — switching upstream saves a lot of waiting."
      },
      "logo": "TU",
      "url": "https://mirrors.tuna.tsinghua.edu.cn/",
      "badge": {
        "zh": "长期",
        "en": "Long-term"
      },
      "tags": [
        "国内镜像源",
        "公益镜像",
        "长期有效"
      ],
      "provider": "清华大学 TUNA 协会",
      "requirements": "公益服务，请勿用于压测或批量抓取；同步有延迟，重要依赖建议配多个上游。"
    },
    {
      "name": {
        "zh": "npmmirror",
        "en": "npmmirror"
      },
      "tag": {
        "zh": "npm 镜像 · 国内加速",
        "en": "npm mirror · Fast"
      },
      "desc": {
        "zh": "装依赖卡住时换这个源，企业内网和低带宽环境提升明显。",
        "en": "Switch to this registry when installs stall — noticeably faster on slow or restricted networks."
      },
      "logo": "NP",
      "url": "https://npmmirror.com/",
      "badge": {
        "zh": "在用",
        "en": "In use"
      },
      "tags": [
        "国内镜像源",
        "公益镜像",
        "长期有效"
      ],
      "provider": "阿里巴巴",
      "requirements": "替换 npm registry 即可；私有包请仍走官方源，避免发布失败。"
    },
    {
      "name": {
        "zh": "Docker Hub 镜像代理",
        "en": "Docker Hub proxies"
      },
      "tag": {
        "zh": "容器镜像 · 时有变动",
        "en": "Container images · Unstable"
      },
      "desc": {
        "zh": "公开可用的加速地址换得比较频繁，建议同时配置多个备用，别把单个地址写死。",
        "en": "Public accelerators rotate often. Configure several fallbacks instead of hard-coding a single endpoint."
      },
      "logo": "DK",
      "url": "https://docs.docker.com/",
      "badge": {
        "zh": "需自备",
        "en": "Bring your own"
      },
      "tags": [
        "国内镜像源",
        "公益镜像",
        "失效"
      ],
      "provider": "社区维护",
      "requirements": "公共加速地址变动频繁，已在本文标注失效；请自行寻找可用代理并配置多个备用。"
    },
    {
      "name": {
        "zh": "Let's Encrypt",
        "en": "Let's Encrypt"
      },
      "tag": {
        "zh": "免费证书 · 90 天自动续",
        "en": "Free TLS · 90-day auto-renew"
      },
      "desc": {
        "zh": "配合 acme.sh 或 certbot 全自动续期，自建服务的 HTTPS 基本靠它。",
        "en": "Pair with acme.sh or certbot for fully automatic renewal. The backbone of self-hosted HTTPS."
      },
      "logo": "LE",
      "url": "https://letsencrypt.org/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "tags": [
        "域名/TLS",
        "免费证书",
        "长期有效"
      ],
      "provider": "ISRG",
      "requirements": "证书有效期 90 天，需配置自动续期；单域名每周签发次数有上限。"
    },
    {
      "name": {
        "zh": "免费域名 / 子域",
        "en": "Free domains & subdomains"
      },
      "tag": {
        "zh": "二级域名 · 稳定性一般",
        "en": "Subdomains · Varies"
      },
      "desc": {
        "zh": "eu.org、DNS 服务商赠送的一级域名等，适合临时项目；长期站点建议直接买域名。",
        "en": "eu.org and provider-gifted domains suit temporary projects. For anything long-lived, buy a real domain."
      },
      "logo": "DM",
      "url": "https://nic.eu.org/",
      "badge": {
        "zh": "慎用",
        "en": "Caution"
      },
      "tags": [
        "域名/TLS",
        "限时活动",
        "现在可薅"
      ],
      "provider": "eu.org 等",
      "requirements": "免费二级域名审核周期长且稳定性一般；长期项目建议直接购买付费域名。"
    },
    {
      "name": {
        "zh": "MDN / 现代 JS 教程",
        "en": "MDN & modern JS docs"
      },
      "tag": {
        "zh": "文档 · 随时可查",
        "en": "Docs · Always there"
      },
      "desc": {
        "zh": "写前端绕不开的权威参考，比大多数博客都准。遇到不确定的 API 先查这里。",
        "en": "The reference you cannot avoid writing for the web — more reliable than most blog posts."
      },
      "logo": "MD",
      "url": "https://developer.mozilla.org/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "tags": [
        "学生/学习资源",
        "免费额度",
        "长期有效"
      ],
      "provider": "Mozilla",
      "requirements": "纯文档站点，无需注册；内容以英文为主，部分页面有中文翻译。"
    },
    {
      "name": {
        "zh": "Vercel / Netlify",
        "en": "Vercel / Netlify"
      },
      "tag": {
        "zh": "静态部署 · 自动 CI",
        "en": "Static deploy · Auto CI"
      },
      "desc": {
        "zh": "连上 Git 仓库就能自动构建发布，PR 预览链接很好用，个人项目免费额度足够。",
        "en": "Connect a repo and it builds on push. Preview deploys per PR; the free tier covers personal projects."
      },
      "logo": "VC",
      "url": "https://vercel.com/",
      "badge": {
        "zh": "免费额度",
        "en": "Free tier"
      },
      "tags": [
        "云服务器",
        "免费额度",
        "长期有效"
      ],
      "provider": "Vercel / Netlify",
      "requirements": "个人项目免费；商用需确认条款；超额会暂停服务到下个计费周期。"
    },
    {
      "name": {
        "zh": "Supabase",
        "en": "Supabase"
      },
      "tag": {
        "zh": "后端即服务 · 免费库",
        "en": "BaaS · Free DB"
      },
      "desc": {
        "zh": "免费的 Postgres 加鉴权和存储，做小项目不用自己搭后端；闲置项目会被暂停。",
        "en": "Free Postgres with auth and storage — no backend to build. Idle projects get paused."
      },
      "logo": "SB",
      "url": "https://supabase.com/",
      "badge": {
        "zh": "会休眠",
        "en": "Sleeps"
      },
      "tags": [
        "云服务器",
        "免费额度",
        "现在可薅"
      ],
      "provider": "Supabase",
      "requirements": "免费库闲置约一周会被暂停，需手动恢复；生产环境请升级付费计划。"
    },
    {
      "name": {
        "zh": "DeepSeek 开放平台",
        "en": "DeepSeek Platform"
      },
      "tag": {
        "zh": "LLM API · 按量计费",
        "en": "LLM API · Pay per use"
      },
      "desc": {
        "zh": "价格低、兼容 OpenAI 协议，写小工具和脚本时接入成本很小，新用户常有赠送额度。",
        "en": "Low cost and OpenAI-compatible, so wiring it into scripts is cheap. New accounts often get credit."
      },
      "logo": "DS",
      "url": "https://platform.deepseek.com/",
      "badge": {
        "zh": "低价",
        "en": "Low cost"
      },
      "tags": [
        "API 羊毛",
        "免费额度",
        "长期有效"
      ],
      "provider": "DeepSeek",
      "requirements": "按 token 计费，需先充值；注册赠送额度有有效期，注意查看到期时间。"
    },
    {
      "name": {
        "zh": "Public APIs 清单",
        "en": "Public APIs list"
      },
      "tag": {
        "zh": "接口合集 · 社区维护",
        "en": "API directory · Community"
      },
      "desc": {
        "zh": "按领域分类的公开接口大全，找练手项目的数据源很方便，注意核对可用性。",
        "en": "A categorised directory of public APIs — handy for practice projects. Verify availability first."
      },
      "logo": "PA",
      "url": "https://github.com/public-apis/public-apis",
      "badge": {
        "zh": "开源",
        "en": "Open source"
      },
      "tags": [
        "API 羊毛",
        "开发接口",
        "长期有效"
      ],
      "provider": "社区（GitHub）",
      "requirements": "清单为社区维护，接口可用性需自行验证；部分接口需申请 Key 或有调用限制。"
    },
    {
      "name": {
        "zh": "USTC / 阿里云镜像",
        "en": "USTC & Aliyun mirrors"
      },
      "tag": {
        "zh": "镜像站 · 备用上游",
        "en": "Mirror · Backup upstream"
      },
      "desc": {
        "zh": "主镜像抽风时的备选，装系统、拉依赖多配几个源能少踩很多坑。",
        "en": "Backups for when the primary mirror misbehaves. Configure a few sources and installs stop hurting."
      },
      "logo": "US",
      "url": "https://mirrors.ustc.edu.cn/",
      "badge": {
        "zh": "备用",
        "en": "Backup"
      },
      "tags": [
        "国内镜像源",
        "公益镜像",
        "长期有效"
      ],
      "provider": "中科大 / 阿里云",
      "requirements": "公益服务，请控制请求频率；建议作为主镜像的备用上游一起配置。"
    },
    {
      "name": {
        "zh": "jsDelivr / unpkg",
        "en": "jsDelivr / unpkg"
      },
      "tag": {
        "zh": "CDN · 前端资源",
        "en": "CDN · Front-end assets"
      },
      "desc": {
        "zh": "直接从 npm / GitHub 引资源，做演示页省事；生产环境建议自托管关键依赖。",
        "en": "Pull assets straight from npm or GitHub — great for demos. Self-host critical deps in production."
      },
      "logo": "JD",
      "url": "https://www.jsdelivr.com/",
      "badge": {
        "zh": "慎用于生产",
        "en": "Not for prod"
      },
      "tags": [
        "国内镜像源",
        "公益镜像",
        "现在可薅"
      ],
      "provider": "jsDelivr / unpkg",
      "requirements": "仅建议用于演示与开发；生产环境请自托管关键依赖，避免 CDN 故障影响站点。"
    },
    {
      "name": {
        "zh": "Cloudflare DNS",
        "en": "Cloudflare DNS"
      },
      "tag": {
        "zh": "免费 DNS · 带加速",
        "en": "Free DNS · With CDN"
      },
      "desc": {
        "zh": "免费托管解析并附带 CDN 与基础防护，自建站点的常规搭配。",
        "en": "Free authoritative DNS with CDN and basic protection — the usual companion for self-hosted sites."
      },
      "logo": "CD",
      "url": "https://www.cloudflare.com/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "tags": [
        "域名/TLS",
        "免费额度",
        "长期有效"
      ],
      "provider": "Cloudflare",
      "requirements": "需将域名的 NS 指向 Cloudflare；免费版不含高级 WAF 与自定义证书托管。"
    },
    {
      "name": {
        "zh": "freeCodeCamp",
        "en": "freeCodeCamp"
      },
      "tag": {
        "zh": "学习 · 完全免费",
        "en": "Learning · Fully free"
      },
      "desc": {
        "zh": "成体系的前端与后端课程，带项目和认证，入门比零散看视频扎实。",
        "en": "Structured front-end and back-end curriculum with projects and certificates — sturdier than scattered videos."
      },
      "logo": "FC",
      "url": "https://www.freecodecamp.org/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "tags": [
        "学生/学习资源",
        "免费额度",
        "长期有效"
      ],
      "provider": "freeCodeCamp",
      "requirements": "完全免费，需注册账号保存进度；课程以英文为主，完成项目可获得认证。"
    },
    {
      "name": {
        "zh": "Roadmap.sh",
        "en": "Roadmap.sh"
      },
      "tag": {
        "zh": "学习路线 · 社区维护",
        "en": "Learning paths · Community"
      },
      "desc": {
        "zh": "把技能拆成一张张路线图，用来查漏补缺比漫无目的刷教程高效。",
        "en": "Turns skills into roadmaps — far better for spotting gaps than aimless tutorial browsing."
      },
      "logo": "RM",
      "url": "https://roadmap.sh/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "tags": [
        "学生/学习资源",
        "免费额度",
        "长期有效"
      ],
      "provider": "社区（GitHub）",
      "requirements": "纯参考路线图，无需注册；内容由社区贡献，具体技术选型仍需自行判断。"
    },
    {
      "name": {
        "zh": "Google Colab",
        "en": "Google Colab"
      },
      "tag": {
        "zh": "免费 GPU · 需 Google 账号",
        "en": "Free GPU · Google account"
      },
      "desc": {
        "zh": "免费档就能白嫖 T4 GPU 跑模型，跑完记得及时释放；长时间闲置会被回收。",
        "en": "The free tier gives you a T4 GPU for training runs. Release the runtime when done — idle sessions get reclaimed."
      },
      "logo": "GC",
      "url": "https://colab.research.google.com/",
      "badge": {
        "zh": "免费 GPU",
        "en": "Free GPU"
      },
      "tags": [
        "Google 服务",
        "免费额度",
        "长期有效"
      ],
      "provider": "Google",
      "requirements": "需 Google 账号；免费 GPU 会话闲置约 90 分钟会被回收，单次最长 12 小时。"
    },
    {
      "name": {
        "zh": "Google Cloud 免费层",
        "en": "Google Cloud free tier"
      },
      "tag": {
        "zh": "云服务 · 首年赠金",
        "en": "Cloud · First-year credit"
      },
      "desc": {
        "zh": "新账号有 300 美元试用金，另有一批长期免费额度（e2-micro 实例等），注意绑定卡会扣验证费。",
        "en": "New accounts get $300 in credit plus a set of always-free services. Card verification may leave a small hold."
      },
      "logo": "GC",
      "url": "https://cloud.google.com/free",
      "badge": {
        "zh": "限新号",
        "en": "New accounts"
      },
      "tags": [
        "Google 服务",
        "限时活动",
        "现在可薅"
      ],
      "provider": "Google Cloud",
      "requirements": "需绑定信用卡验证（可能产生小额预授权）；300 美元试用金有效期 90 天。"
    },
    {
      "name": {
        "zh": "Google NotebookLM",
        "en": "Google NotebookLM"
      },
      "tag": {
        "zh": "AI 笔记 · 有额度上限",
        "en": "AI notes · Quota capped"
      },
      "desc": {
        "zh": "把文档、链接丢进去做资料整理和问答，免费额度够个人用，重度使用会碰到上限。",
        "en": "Feed documents and links in for summarising and Q&A. The free quota handles personal use; heavy use hits the cap."
      },
      "logo": "NL",
      "url": "https://notebooklm.google.com/",
      "badge": {
        "zh": "限额度",
        "en": "Capped"
      },
      "tags": [
        "Google 服务",
        "现在可薅"
      ],
      "provider": "Google",
      "requirements": "免费额度按每日提问次数限制；上传文档有数量与体积上限。"
    },
    {
      "name": {
        "zh": "Google AI Studio",
        "en": "Google AI Studio"
      },
      "tag": {
        "zh": "LLM 调试 · 免费额度",
        "en": "LLM playground · Free tier"
      },
      "desc": {
        "zh": "Gemini 模型的调试台，免费额度按分钟和每日限额给，写原型够用。",
        "en": "A playground for Gemini models with per-minute and daily free limits — enough for prototypes."
      },
      "logo": "AS",
      "url": "https://aistudio.google.com/",
      "badge": {
        "zh": "免费额度",
        "en": "Free tier"
      },
      "tags": [
        "Google 服务",
        "免费额度",
        "长期有效"
      ],
      "provider": "Google",
      "requirements": "免费额度按每分钟与每日请求数限制；超出后需绑定结算账号启用付费。"
    },
    {
      "name": {
        "zh": "雨云 / 学生机",
        "en": "Rainyun / student VPS"
      },
      "tag": {
        "zh": "国内轻量 · 低价活动",
        "en": "CN lightweight · Promo"
      },
      "desc": {
        "zh": "国内小厂的轻量服务器，常年有首年低价活动；选之前先看口碑和续费价，别只看首月。",
        "en": "Small domestic providers run cheap first-year offers. Check reputation and renewal pricing, not just month one."
      },
      "logo": "RY",
      "url": "https://www.rainyun.com/",
      "badge": {
        "zh": "看续费价",
        "en": "Check renewal"
      },
      "tags": [
        "云服务器",
        "限时活动",
        "现在可薅"
      ],
      "provider": "雨云",
      "requirements": "首年低价，续费价格明显上涨；购买前务必确认续费价与退款政策。"
    },
    {
      "name": {
        "zh": "搬瓦工 / BandwagonHost",
        "en": "BandwagonHost"
      },
      "tag": {
        "zh": "海外 VPS · 按年付",
        "en": "Overseas VPS · Annual"
      },
      "desc": {
        "zh": "老牌海外 VPS，价格透明、按年付更划算；适合跑稳定的小服务，注意线路差异。",
        "en": "A long-standing overseas VPS host with transparent pricing. Annual plans are cheaper; line quality varies by plan."
      },
      "logo": "BW",
      "url": "https://bandwagonhost.com/",
      "badge": {
        "zh": "稳定",
        "en": "Stable"
      },
      "tags": [
        "云服务器",
        "限时活动",
        "长期有效"
      ],
      "provider": "BandwagonHost",
      "requirements": "按年付更划算；不同套餐线路差异较大，购买前确认机房与线路。"
    }
  ],
  "tools": [
    {
      "name": "VS Code",
      "icon": "VS",
      "category": "dev",
      "desc": {
        "zh": "主力编辑器，装几个插件就能覆盖前端、脚本和 Markdown 写作。",
        "en": "Main editor. A handful of extensions covers front-end work, scripts and Markdown writing."
      },
      "tags": {
        "zh": [
          "免费",
          "跨平台"
        ],
        "en": [
          "Free",
          "Cross-platform"
        ]
      },
      "free": true,
      "url": "https://code.visualstudio.com/"
    },
    {
      "name": "Git",
      "icon": "GT",
      "category": "dev",
      "desc": {
        "zh": "版本管理的基础设施，GitHub Pages 部署流程也绕不开它。",
        "en": "The foundation of version control — and the path to deploying on GitHub Pages."
      },
      "tags": {
        "zh": [
          "开源",
          "必备"
        ],
        "en": [
          "Open source",
          "Essential"
        ]
      },
      "free": true,
      "url": "https://git-scm.com/"
    },
    {
      "name": "Figma",
      "icon": "FG",
      "category": "design",
      "desc": {
        "zh": "画页面草图、导出 SVG 图标，免费额度对个人项目够用。",
        "en": "Sketch layouts and export SVG icons. The free tier is enough for personal projects."
      },
      "tags": {
        "zh": [
          "免费额度",
          "协作"
        ],
        "en": [
          "Free tier",
          "Collaboration"
        ]
      },
      "free": true,
      "url": "https://www.figma.com/"
    },
    {
      "name": "uTools",
      "icon": "UT",
      "category": "productivity",
      "desc": {
        "zh": "快捷启动器加插件市场，剪贴板、翻译、截图一步到位。",
        "en": "A launcher with a plugin market — clipboard, translation and screenshots in one keystroke."
      },
      "tags": {
        "zh": [
          "免费",
          "国产"
        ],
        "en": [
          "Free",
          "Local"
        ]
      },
      "free": true,
      "url": "https://u.tools/"
    },
    {
      "name": "Obsidian",
      "icon": "OB",
      "category": "productivity",
      "desc": {
        "zh": "本地 Markdown 笔记，双链整理资料；文件都在本地，不怕平台跑路。",
        "en": "Local Markdown notes with backlinks. Your files stay on disk, immune to platform shifts."
      },
      "tags": {
        "zh": [
          "免费",
          "本地优先"
        ],
        "en": [
          "Free",
          "Local-first"
        ]
      },
      "free": true,
      "url": "https://obsidian.md/"
    },
    {
      "name": "PowerToys",
      "icon": "PT",
      "category": "system",
      "desc": {
        "zh": "Windows 上的效率增强包，窗口布局、批量重命名、取色器都很好用。",
        "en": "An efficiency pack for Windows: window layouts, bulk rename and a colour picker."
      },
      "tags": {
        "zh": [
          "开源",
          "Windows"
        ],
        "en": [
          "Open source",
          "Windows"
        ]
      },
      "free": true,
      "url": "https://github.com/microsoft/PowerToys"
    },
    {
      "name": "Windows Terminal",
      "icon": "WT",
      "category": "system",
      "desc": {
        "zh": "多标签、分屏和自定义配色，配合 WSL 用起来比自带终端顺很多。",
        "en": "Tabs, panes and custom themes — far smoother than the built-in console, especially with WSL."
      },
      "tags": {
        "zh": [
          "开源",
          "Windows"
        ],
        "en": [
          "Open source",
          "Windows"
        ]
      },
      "free": true,
      "url": "https://github.com/microsoft/terminal"
    },
    {
      "name": "7-Zip",
      "icon": "7Z",
      "category": "system",
      "desc": {
        "zh": "老牌压缩工具，格式支持全、没广告，装系统后第一批必装之一。",
        "en": "The veteran archiver: broad format support, no ads. One of the first things I install."
      },
      "tags": {
        "zh": [
          "开源",
          "轻量"
        ],
        "en": [
          "Open source",
          "Lightweight"
        ]
      },
      "free": true,
      "url": "https://www.7-zip.org/"
    },
    {
      "name": "Fira Code / JetBrains Mono",
      "icon": "FC",
      "category": "design",
      "desc": {
        "zh": "带连字的等宽字体，写代码时辨识度更好，编辑器里换一下就知道差别。",
        "en": "Ligature monospace fonts that make code easier to scan — swap them in your editor to feel it."
      },
      "tags": {
        "zh": [
          "开源",
          "字体"
        ],
        "en": [
          "Open source",
          "Font"
        ]
      },
      "free": true,
      "url": "https://github.com/tonsky/FiraCode"
    },
    {
      "name": "Excalidraw",
      "icon": "EX",
      "category": "design",
      "desc": {
        "zh": "手绘风格白板，画架构图和流程示意很快，不用登录也能直接用。",
        "en": "A hand-drawn style whiteboard for quick architecture sketches — usable without signing in."
      },
      "tags": {
        "zh": [
          "开源",
          "在线"
        ],
        "en": [
          "Open source",
          "Web"
        ]
      },
      "free": true,
      "url": "https://excalidraw.com/"
    },
    {
      "name": "Everything",
      "icon": "EV",
      "category": "productivity",
      "desc": {
        "zh": "秒级全盘文件名搜索，Windows 上找文件的神器，资源占用很低。",
        "en": "Instant whole-disk filename search for Windows. Minimal footprint, indispensable."
      },
      "tags": {
        "zh": [
          "免费",
          "Windows"
        ],
        "en": [
          "Free",
          "Windows"
        ]
      },
      "free": true,
      "url": "https://www.voidtools.com/"
    },
    {
      "name": "Docker Desktop",
      "icon": "DK",
      "category": "dev",
      "desc": {
        "zh": "本地跑容器最简单的方式，环境隔离后「在我机器上是好的」这类问题少很多。",
        "en": "The easiest way to run containers locally. Environment isolation kills most \"works on my machine\" bugs."
      },
      "tags": {
        "zh": [
          "免费额度",
          "容器"
        ],
        "en": [
          "Free tier",
          "Containers"
        ]
      },
      "free": true,
      "url": "https://www.docker.com/products/docker-desktop/"
    },
    {
      "name": "Postman / Hoppscotch",
      "icon": "PM",
      "category": "dev",
      "desc": {
        "zh": "调接口必备，Hoppscotch 是开源替代，浏览器里直接能用、更轻。",
        "en": "Essential for API work. Hoppscotch is the open-source alternative — lighter and browser-based."
      },
      "tags": {
        "zh": [
          "免费",
          "API"
        ],
        "en": [
          "Free",
          "API"
        ]
      },
      "free": true,
      "url": "https://hoppscotch.io/"
    }
  ],
  "baipiao": [
    {
      "name": {
        "zh": "DeepSeek 新用户赠送额度",
        "en": "DeepSeek new-user credit"
      },
      "tag": {
        "zh": "免费额度 · 注册即得",
        "en": "Free credit · On signup"
      },
      "desc": {
        "zh": "注册开放平台账号就送一批 token 额度，够把一个小工具跑通再决定要不要充值。",
        "en": "Signing up grants a batch of tokens — enough to finish a small tool before deciding on top-ups."
      },
      "logo": "DS",
      "url": "https://platform.deepseek.com/",
      "badge": {
        "zh": "可领",
        "en": "Claim"
      },
      "expire": {
        "zh": "长期有效",
        "en": "Ongoing"
      },
      "tags": [
        "免费额度",
        "现在可薅"
      ],
      "pageCat": "quota"
    },
    {
      "name": {
        "zh": "Cloudflare R2 免费额度",
        "en": "Cloudflare R2 free tier"
      },
      "tag": {
        "zh": "对象存储 · 每月免费",
        "en": "Object storage · Monthly free"
      },
      "desc": {
        "zh": "每月 10GB 存储加免出网流量，放图片和静态附件基本不用花钱。",
        "en": "10GB storage plus zero egress fees each month. Images and static assets cost nothing in practice."
      },
      "logo": "R2",
      "url": "https://www.cloudflare.com/developer-platform/r2/",
      "badge": {
        "zh": "每月刷新",
        "en": "Monthly reset"
      },
      "expire": {
        "zh": "长期有效",
        "en": "Ongoing"
      },
      "tags": [
        "免费额度",
        "现在可薅"
      ],
      "pageCat": "quota"
    },
    {
      "name": {
        "zh": "GitHub Student Pack",
        "en": "GitHub Student Pack"
      },
      "tag": {
        "zh": "学生认证 · 一堆权益",
        "en": "Student verified · Bundle"
      },
      "desc": {
        "zh": "学生认证后能拿到 Copilot、域名、云服务等一大堆免费权益，一次申请能用几年。",
        "en": "Student verification unlocks Copilot, domains, cloud credits and more — one application lasts years."
      },
      "logo": "SP",
      "url": "https://education.github.com/pack",
      "badge": {
        "zh": "需学生证",
        "en": "Student ID"
      },
      "expire": {
        "zh": "按学年复核",
        "en": "Yearly recheck"
      },
      "tags": [
        "免费额度",
        "长期有效"
      ],
      "pageCat": "quota"
    },
    {
      "name": {
        "zh": "OpenRouter 免费模型池",
        "en": "OpenRouter free models"
      },
      "tag": {
        "zh": "免费 API · 有限速",
        "en": "Free API · Rate limited"
      },
      "desc": {
        "zh": "标注 :free 的模型可以直接调，适合做原型；并发和每日次数会随模型变化。",
        "en": "Models marked :free are callable directly — good for prototypes. Concurrency and daily caps vary by model."
      },
      "logo": "OR",
      "url": "https://openrouter.ai/",
      "badge": {
        "zh": "限速",
        "en": "Rate limited"
      },
      "expire": {
        "zh": "随时可能调整",
        "en": "May change"
      },
      "tags": [
        "免费 API",
        "长期有效"
      ],
      "pageCat": "api"
    },
    {
      "name": {
        "zh": "Hugging Face 免费 Inference",
        "en": "Hugging Face free Inference"
      },
      "tag": {
        "zh": "模型 API · 每月额度",
        "en": "Model API · Monthly quota"
      },
      "desc": {
        "zh": "每月少量免费推理额度，跑分类、向量、小模型够用；大模型基本不用想。",
        "en": "A small monthly inference allowance — fine for classifiers, embeddings and small models, not for large ones."
      },
      "logo": "HF",
      "url": "https://huggingface.co/",
      "badge": {
        "zh": "每月刷新",
        "en": "Monthly reset"
      },
      "expire": {
        "zh": "每月刷新",
        "en": "Monthly reset"
      },
      "tags": [
        "免费 API",
        "现在可薅"
      ],
      "pageCat": "api"
    },
    {
      "name": {
        "zh": "Vercel 免费额度",
        "en": "Vercel free plan"
      },
      "tag": {
        "zh": "部署 · 100GB 流量",
        "en": "Deploy · 100GB bandwidth"
      },
      "desc": {
        "zh": "个人项目免费额度很够用，超过会暂停到下个月；商用需看清条款。",
        "en": "Plenty for personal projects; exceeding the cap pauses until next month. Read the terms before commercial use."
      },
      "logo": "VC",
      "url": "https://vercel.com/pricing",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "expire": {
        "zh": "长期有效",
        "en": "Ongoing"
      },
      "tags": [
        "免费额度",
        "现在可薅"
      ],
      "pageCat": "quota"
    },
    {
      "name": {
        "zh": "各家云厂商首年套餐",
        "en": "Cloud first-year promos"
      },
      "tag": {
        "zh": "限时活动 · 首年低价",
        "en": "Limited · First-year price"
      },
      "desc": {
        "zh": "阿里云、腾讯云常年有 99 元档的首年机器，续费会回原价，买之前先算三年总价。",
        "en": "Alibaba and Tencent run cheap first-year instances. Renewal reverts to list price — price out three years first."
      },
      "logo": "CL",
      "url": "https://www.aliyun.com/",
      "badge": {
        "zh": "看续费",
        "en": "Renewal"
      },
      "expire": {
        "zh": "活动制",
        "en": "Campaign-based"
      },
      "tags": [
        "限时活动",
        "长期有效"
      ],
      "pageCat": "event"
    },
    {
      "name": {
        "zh": "域名注册商首年优惠",
        "en": "Registrar first-year deals"
      },
      "tag": {
        "zh": "限时活动 · 首年 1 折",
        "en": "Limited · 90% off year one"
      },
      "desc": {
        "zh": "新顶级域名首年经常几块钱，续费几十上百。只做短期项目可以薅，长期站别图这个。",
        "en": "New TLDs often cost a few yuan in year one and far more on renewal. Fine for short projects, not for long-lived sites."
      },
      "logo": "DM",
      "url": "https://www.namesilo.com/",
      "badge": {
        "zh": "首年制",
        "en": "Year one only"
      },
      "expire": {
        "zh": "随时调整",
        "en": "Changes often"
      },
      "tags": [
        "限时活动",
        "长期有效"
      ],
      "pageCat": "event"
    },
    {
      "name": {
        "zh": "接口调试工具送额度",
        "en": "API tool credits"
      },
      "tag": {
        "zh": "抽奖福利 · 官方活动",
        "en": "Giveaway · Official event"
      },
      "desc": {
        "zh": "部分 API 聚合平台会做注册送额度的活动，金额不大，够验证一次想法。",
        "en": "Some API aggregators run signup-credit events. The amounts are small but enough to validate an idea."
      },
      "logo": "CR",
      "url": "https://openrouter.ai/",
      "badge": {
        "zh": "看活动页",
        "en": "See events"
      },
      "expire": {
        "zh": "活动制",
        "en": "Campaign-based"
      },
      "tags": [
        "抽奖福利",
        "长期有效"
      ],
      "pageCat": "lottery"
    },
    {
      "name": {
        "zh": "AI 平台内测资格",
        "en": "AI beta access"
      },
      "tag": {
        "zh": "抽奖福利 · 名额有限",
        "en": "Giveaway · Limited spots"
      },
      "desc": {
        "zh": "新模型上线前常放内测名额，官方 Discord 或社区会发邀请码，靠运气。",
        "en": "Beta slots open before model launches; codes appear on official Discord or community channels. Luck-based."
      },
      "logo": "BT",
      "url": "https://discord.com/",
      "badge": {
        "zh": "已结束",
        "en": "Ended"
      },
      "expire": {
        "zh": "已结束",
        "en": "Ended"
      },
      "tags": [
        "抽奖福利",
        "失效"
      ],
      "pageCat": "lottery"
    }
  ],
  "charity": [
    {
      "name": {
        "zh": "中科大开源镜像",
        "en": "USTC open-source mirror"
      },
      "tag": {
        "zh": "公益镜像 · 教育网",
        "en": "Public mirror · Campus network"
      },
      "desc": {
        "zh": "由高校维护、面向公众开放，系统源和常用仓库都全，教育网内速度很快。",
        "en": "Maintained by a university and open to the public. Full OS repos and common package sets; very fast on campus networks."
      },
      "logo": "US",
      "url": "https://mirrors.ustc.edu.cn/",
      "badge": {
        "zh": "长期",
        "en": "Long-term"
      },
      "org": {
        "zh": "中国科学技术大学",
        "en": "USTC"
      },
      "tags": [
        "公益镜像",
        "长期有效"
      ],
      "pageCat": "mirror"
    },
    {
      "name": {
        "zh": "清华 TUNA 镜像",
        "en": "Tsinghua TUNA mirror"
      },
      "tag": {
        "zh": "公益镜像 · 老牌稳定",
        "en": "Public mirror · Long-standing"
      },
      "desc": {
        "zh": "国内最早的公益镜像之一，覆盖系统、语言包、容器镜像，文档也写得很清楚。",
        "en": "One of the earliest public mirrors in China, covering OS repos, language packages and container images with clear docs."
      },
      "logo": "TU",
      "url": "https://mirrors.tuna.tsinghua.edu.cn/",
      "badge": {
        "zh": "长期",
        "en": "Long-term"
      },
      "org": {
        "zh": "清华大学",
        "en": "Tsinghua University"
      },
      "tags": [
        "公益镜像",
        "长期有效"
      ],
      "pageCat": "mirror"
    },
    {
      "name": {
        "zh": "阿里云开源镜像站",
        "en": "Aliyun open-source mirror"
      },
      "tag": {
        "zh": "公益镜像 · 商用带宽",
        "en": "Public mirror · Commercial CDN"
      },
      "desc": {
        "zh": "阿里云出带宽的公益镜像，全国访问都还算快，适合给团队配置统一源。",
        "en": "A public mirror backed by Alibaba Cloud bandwidth. Reasonably fast nationwide — good for team-wide source configuration."
      },
      "logo": "AL",
      "url": "https://developer.aliyun.com/mirror/",
      "badge": {
        "zh": "长期",
        "en": "Long-term"
      },
      "org": {
        "zh": "阿里云",
        "en": "Alibaba Cloud"
      },
      "tags": [
        "公益镜像",
        "长期有效"
      ],
      "pageCat": "mirror"
    },
    {
      "name": {
        "zh": "公共 DNS 服务",
        "en": "Public DNS resolvers"
      },
      "tag": {
        "zh": "公益 API · 免注册",
        "en": "Public API · No signup"
      },
      "desc": {
        "zh": "114、223.5.5.5、1.1.1.1 这类公共解析服务，排障时换一个就能快速判断是不是本地 DNS 的锅。",
        "en": "Resolvers like 114, 223.5.5.5 and 1.1.1.1. Swapping one in during troubleshooting quickly rules out local DNS issues."
      },
      "logo": "DN",
      "url": "https://www.cloudflare.com/1.1.1.1/",
      "badge": {
        "zh": "免注册",
        "en": "No signup"
      },
      "org": {
        "zh": "多家机构",
        "en": "Multiple orgs"
      },
      "tags": [
        "公益 API",
        "长期有效"
      ],
      "pageCat": "api"
    },
    {
      "name": {
        "zh": "公共时间同步 NTP",
        "en": "Public NTP pool"
      },
      "tag": {
        "zh": "公益 API · 基础设施",
        "en": "Public API · Infrastructure"
      },
      "desc": {
        "zh": "自建服务时间漂移会引发一堆诡异问题，配一个可靠的上游能省掉很多排查。",
        "en": "Clock drift on self-hosted services causes bizarre failures. A reliable upstream saves a lot of debugging."
      },
      "logo": "NT",
      "url": "https://www.ntppool.org/",
      "badge": {
        "zh": "免注册",
        "en": "No signup"
      },
      "org": {
        "zh": "NTP Pool 社区",
        "en": "NTP Pool"
      },
      "tags": [
        "公益 API",
        "长期有效"
      ],
      "pageCat": "api"
    },
    {
      "name": {
        "zh": "Can I use",
        "en": "Can I use"
      },
      "tag": {
        "zh": "公益工具 · 兼容性查询",
        "en": "Public tool · Compatibility"
      },
      "desc": {
        "zh": "查 CSS/JS 特性在各浏览器的支持情况，写前端不踩兼容坑的必备工具，免费无广告。",
        "en": "Check browser support for CSS and JS features. Free, ad-free, and essential for avoiding compatibility traps."
      },
      "logo": "CU",
      "url": "https://caniuse.com/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "org": {
        "zh": "社区维护",
        "en": "Community"
      },
      "tags": [
        "公益工具",
        "长期有效"
      ],
      "pageCat": "tool"
    },
    {
      "name": {
        "zh": "Regex101",
        "en": "Regex101"
      },
      "tag": {
        "zh": "公益工具 · 正则调试",
        "en": "Public tool · Regex debugger"
      },
      "desc": {
        "zh": "带逐段解释的正则调试器，支持多语言语法，写完直接复制走。",
        "en": "A regex debugger with step-by-step explanations and multi-language syntax. Copy the result straight out."
      },
      "logo": "RE",
      "url": "https://regex101.com/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "org": {
        "zh": "社区维护",
        "en": "Community"
      },
      "tags": [
        "公益工具",
        "长期有效"
      ],
      "pageCat": "tool"
    },
    {
      "name": {
        "zh": "Carbon / Ray.so",
        "en": "Carbon / Ray.so"
      },
      "tag": {
        "zh": "公益工具 · 代码截图",
        "en": "Public tool · Code shots"
      },
      "desc": {
        "zh": "把代码片段生成好看的图片，写文档和发帖时用得上，都不需要注册。",
        "en": "Turn code snippets into presentable images for docs and posts. No account required."
      },
      "logo": "CB",
      "url": "https://carbon.now.sh/",
      "badge": {
        "zh": "免费",
        "en": "Free"
      },
      "org": {
        "zh": "社区维护",
        "en": "Community"
      },
      "tags": [
        "公益工具",
        "长期有效"
      ],
      "pageCat": "tool"
    }
  ],
  "posts": [
    {
      "date": "2025-11-02",
      "title": {
        "zh": "用 GitHub Pages 从零搭个人主页",
        "en": "Building a personal site on GitHub Pages"
      },
      "excerpt": {
        "zh": "从仓库结构到自定义域名，把踩过的坑一次写清楚。",
        "en": "From repo layout to a custom domain — every pitfall written down once."
      },
      "tags": {
        "zh": [
          "部署",
          "静态站"
        ],
        "en": [
          "Deploy",
          "Static"
        ]
      },
      "url": "#notes"
    },
    {
      "date": "2025-10-18",
      "title": {
        "zh": "免费额度到底能撑多久",
        "en": "How long do free tiers really last"
      },
      "excerpt": {
        "zh": "整理了大半年用过的免费服务，哪些还活着、哪些已经不能薅了。",
        "en": "Half a year of free services: which ones survive and which quietly closed."
      },
      "tags": {
        "zh": [
          "资源",
          "复盘"
        ],
        "en": [
          "Resources",
          "Review"
        ]
      },
      "url": "#notes"
    },
    {
      "date": "2025-09-27",
      "title": {
        "zh": "纯 CSS 实现卡片阴影与悬浮感",
        "en": "Card shadows and lift with pure CSS"
      },
      "excerpt": {
        "zh": "不用框架，用 box-shadow 和 transform 做出有手感的界面。",
        "en": "No framework needed: box-shadow and transform give the interface real feel."
      },
      "tags": {
        "zh": [
          "CSS",
          "前端"
        ],
        "en": [
          "CSS",
          "Front-end"
        ]
      },
      "url": "#notes"
    },
    {
      "date": "2025-09-05",
      "title": {
        "zh": "把笔记从云端搬回本地",
        "en": "Moving notes back to local storage"
      },
      "excerpt": {
        "zh": "本地优先的笔记方案实践，以及迁移时要注意的格式问题。",
        "en": "Hands-on with a local-first note workflow, plus the format issues migration raises."
      },
      "tags": {
        "zh": [
          "工具",
          "笔记"
        ],
        "en": [
          "Tools",
          "Notes"
        ]
      },
      "url": "#notes"
    },
    {
      "date": "2025-08-16",
      "title": {
        "zh": "把导航栏做成可复用的组件",
        "en": "Turning the navbar into a reusable component"
      },
      "excerpt": {
        "zh": "单页站点的导航最容易越写越乱，拆成数据驱动后清爽很多。",
        "en": "Navigation on a single-page site gets messy fast; data-driving it made it clean again."
      },
      "tags": {
        "zh": [
          "重构",
          "前端"
        ],
        "en": [
          "Refactor",
          "Front-end"
        ]
      },
      "url": "#notes"
    },
    {
      "date": "2025-07-03",
      "title": {
        "zh": "暗色主题不是把颜色反过来",
        "en": "Dark mode is not inverted colours"
      },
      "excerpt": {
        "zh": "对比度、边界和阴影在暗色下都要重新调，直接反转只会更难读。",
        "en": "Contrast, borders and shadows all need rework — a naive inversion just gets harder to read."
      },
      "tags": {
        "zh": [
          "CSS",
          "主题"
        ],
        "en": [
          "CSS",
          "Theme"
        ]
      },
      "url": "#notes"
    }
  ],
  "timeline": [
    {
      "time": {
        "zh": "2025 · 现在",
        "en": "2025 · Now"
      },
      "text": {
        "zh": "维护这个站点，持续整理免费资源与工具清单。",
        "en": "Maintaining this site and curating free resources."
      }
    },
    {
      "time": {
        "zh": "2024",
        "en": "2024"
      },
      "text": {
        "zh": "开始把各种自建服务和脚本收纳成一套工作流。",
        "en": "Consolidated self-hosted services and scripts into one workflow."
      }
    },
    {
      "time": {
        "zh": "2022",
        "en": "2022"
      },
      "text": {
        "zh": "第一次自己部署网站，从此喜欢上折腾。",
        "en": "Deployed a website for the first time — and got hooked."
      }
    }
  ],
  "skills": [
    "HTML / CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Git",
    "Linux",
    "Docker",
    "Figma",
    "Nginx"
  ]
};
