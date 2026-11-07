---
id: r-cloudflare-workers
order: 101
name:
  zh: "Cloudflare 免费档"
tag:
  zh: "Workers / Pages 免费部署 · 全球边缘 · 不用绑卡"
desc:
  zh: "不要 VPS 也能白嫖一套「全球服务器」——Cloudflare 免费档把 Workers（边缘函数，每天 10 万次请求）、Pages（静态站托管，流量和请求不限量）一起送，叠加免费 CDN、DNS、SSL、R2 对象存储和 D1/KV。最爽的是注册不要信用卡，部署一行 wrangler 命令，全球节点就近响应。serverless 路子，跟传统 VPS 互补。"
logo: CL
url: "https://www.cloudflare.com/plans/free/"
badge:
  zh: "免费"
provider: "Cloudflare 免费档"
requirements: "Workers 免费档有每日请求数和单次 CPU 时长上限，跑重计算 / 长任务会被掐；是 serverless 不是常驻虚拟机，没法 SSH 进去当传统 VPS 用；部分高级特性（更高 CPU 时长、Durable Objects 等）要付费档。"
region: [cn, overseas]
detail:
  quota: "Workers 免费档每天 10 万次请求、单次 10ms CPU；Pages 静态托管的请求与带宽不限量、每月 500 次构建、可绑 100 个自定义域名；另含免费 CDN / DNS / 通用 SSL、R2 对象存储免费额度（约 10G 存储）、KV 与 D1 数据库免费档。具体配额以官方 plans 页为准。"
  limit: "Workers 免费档有每日请求数和单次 CPU 时长上限，跑重计算 / 长任务会被掐；是 serverless 不是常驻虚拟机，没法 SSH 进去当传统 VPS 用；部分高级特性（更高 CPU 时长、Durable Objects 等）要付费档。"
  avoid: "免费够个人项目和中小流量，但请求量冲上去要么限流要么得升 $5 付费档；Pages 构建次数每月有上限，频繁推送会用完；它是函数 / 静态托管思路，想要「一台能装软件的机器」请看 Oracle / GCP 那两条。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - server
tags:
  - "Cloudflare"
  - "CND"
---

## 教程

### 注册 Cloudflare 账号

上 Cloudflare 官网注册账号（邮箱即可，免费档不用绑卡）。

### 安装 wrangler 并登录

装命令行工具 wrangler，登录后一行命令部署：

### 部署 Workers

npm i -g wrangler

### 改用 Pages 连 Git 部署

wrangler login

### 绑定自定义域名

wrangler deploy # Workers 项目，或用 Pages 连 Git 自动构建

### 验证全球访问

静态站走 Pages 更省事：后台 Workers & Pages → 连接 Git 仓库，选好构建命令，推代码就自动部署、自动分配 *.pages.dev 域名，也能绑自己的域名。
