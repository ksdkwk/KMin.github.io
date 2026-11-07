---
id: r-cloudflare-workers
order: 1
name:
  zh: Cloudflare Workers
tag:
  zh: Serverless · 全球边缘
  en: Serverless · Global edge
desc:
  zh: 每天 10 万次免费请求，写个小 API、反代或定时任务完全够用，绑定自定义域名也免费。
  en: 100k free requests per day. Enough for a small API, a reverse proxy, or cron jobs — custom domains included.
logo: CF
url: https://workers.cloudflare.com/
badge:
  zh: 长期可薅
  en: Long-term
provider: Cloudflare
requirements: 需注册 Cloudflare 账号；免费额度每日 10 万次请求，超出按量计费。
tags:
  - 云服务器
  - 免费额度
detail:
  quota: 每天 10 万次请求，超出后按 $5/百万次计费；静态资源请求不计费。
  limit: 免费版单次请求 CPU 时间上限 10ms（付费 30s）；不支持长连接和文件系统写入。
  avoid: 免费额度按 UTC 每日 0 点重置，不是 24 小时滚动窗口；Workers KV 另有独立额度，注意不要混算。
  valid: 长期有效，官方未公布截止时间。
  scope: 2026-11 官方文档确认：免费计划每日 10 万次请求，含自定义域名绑定。
---

## 教程

### 注册 Cloudflare 账号

访问 dash.cloudflare.com，用邮箱注册并完成验证。

### 开通 Workers

左侧菜单进入「Workers & Pages」，首次使用会引导创建子域（形如 your-name.workers.dev）。

### 创建第一个 Worker

点「Create application」→「Create Worker」，直接在线编辑代码并点「Deploy」。

### 绑定自定义域名

在 Worker 的 Settings → Triggers → Custom Domains 里添加你的域名，需该域名已托管在 Cloudflare。

### 查看用量

在 Workers & Pages 概览页可以看到当天的请求数与免费额度剩余情况。
