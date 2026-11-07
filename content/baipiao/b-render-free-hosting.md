---
id: b-render-free-hosting
order: 105
name:
  zh: "Render 免费托管"
tag:
  zh: "静态站永久免费 + 免费 Web 服务 · 连 Git 一键部署"
desc:
  zh: "Render 把 Heroku 那套「连 Git 自动部署」做得更顺，还留了免费档：静态站永久免费、带全球 CDN；免费 Web 服务给 512M 内存，缺点是闲置 15 分钟休眠、冷启动慢。拿来挂个人项目、demo、小工具的后端正合适，不想碰服务器运维的首选。"
logo: RE
url: "https://render.com/"
badge:
  zh: "免费托管"
provider: "Render"
requirements: "免费 Web 服务闲置即休眠，下次请求要等几十秒冷启动，不适合要求随叫随到的服务；免费数据库有时限 / 容量限制；规格小，跑重负载会 OOM。"
region: [overseas]
detail:
  quota: "静态站点免费、带全球 CDN 与自动 HTTPS；免费 Web 服务实例 512M 内存、共享 CPU，闲置约 15 分钟后休眠、有请求再冷启动；免费实例时长按月份配额。免费 PostgreSQL / Redis 有额度但存在时限政策。具体配额与是否变动以官方 pricing 页为准。"
  limit: "免费 Web 服务闲置即休眠，下次请求要等几十秒冷启动，不适合要求随叫随到的服务；免费数据库有时限 / 容量限制；规格小，跑重负载会 OOM。"
  avoid: "别拿免费 Web 服务挂需要保活的关键业务——休眠 + 冷启动是硬伤；想保活得升付费档或自己定时 ping（也可能违反免费档政策）；免费 PostgreSQL 的留存期政策变过几次，重要数据务必另外备份。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - server
tags:
  - "静态站"
  - "免费托管"
---

## 教程

### 上 Render 官网用 GitHub 

上 Render 官网用 GitHub / GitLab / 邮箱注册。

### New → Static Site（静态

New → Static Site（静态站）或 New → Web Service（后端服务），授权连上你的仓库。

### 填构建命令和启动命令（常见框架有预设）

填构建命令和启动命令（常见框架有预设），选 Free 实例档，点部署。构建完会分配一个 *.onrender.com 域名，也能绑自定义域名 + 免费证书。
