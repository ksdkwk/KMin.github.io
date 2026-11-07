---
id: b-cloudflare-r2-free-tier
order: 2
name:
  zh: "Cloudflare R2 免费额度"
  en: "Cloudflare R2 free tier"
tag:
  zh: "对象存储 · 每月免费"
  en: "Object storage · Monthly free"
desc:
  zh: "每月 10GB 存储加免出网流量，放图片和静态附件基本不用花钱。"
  en: "10GB storage plus zero egress fees each month. Images and static assets cost nothing in practice."
logo: R2
url: "https://www.cloudflare.com/developer-platform/r2/"
badge:
  zh: "每月刷新"
  en: "Monthly reset"
expire:
  zh: "长期有效"
  en: "Ongoing"
categories:
  - api
  - server
region: [cn, overseas]
tags:
  - "免费 API"
  - "VPS/服务器"
  - "需绑卡"
detail:
  quota: "每月 10GB 存储 + 每月 100 万次 A 类操作 + 1000 万次 B 类操作，出网流量全免。"
  limit: "需绑定支付方式（可用虚拟卡）；超出额度按量计费。"
  avoid: "出网免费是 R2 的核心优势，但操作次数和存储量仍有上限，大文件频繁读写要注意。"
  valid: "长期有效，月度重置。"
  scope: "2026-11 整理自 Cloudflare 官方定价页。"
---

## 教程

### 注册 Cloudflare 账号

访问 dash.cloudflare.com 注册。

### 进入 R2 控制台

左侧菜单找「R2 Object Storage」，首次使用需绑定支付方式。

### 创建存储桶

点「Create bucket」，填名称，选择区域（建议选离用户近的）。

### 配置访问

在 Settings 里可以开启公开访问，或用 API Token 做私有访问。
