---
id: b-orkestr-free-tier
order: 104
name:
  zh: "Orkestr 欧盟免费服务器"
tag:
  zh: "512MB 容器 · 100GB 月流量 · 免绑卡"
desc:
  zh: "Orkestr Starter 是一个无需信用卡的永久免费容器托管档，可部署 1 个项目与 1 个环境，提供 0.25 vCPU、512MB 内存、每月 100GB 流量和 300 分钟构建时间，还能添加约 256MB 的 Postgres 或 Redis。它会在空闲时休眠，适合个人网站、轻量 API 和演示项目，不是能长期 SSH 登录的传统 VPS。"
logo: OK
url: "console.orkestr.eu/register"
badge:
  zh: "永久免费"
provider: "Orkestr"
requirements: "免费应用空闲时会休眠，重新访问可能遇到冷启动；月流量达到 100GB 后应用暂停服务，次月 1 日自动恢复；构建用完 300 分钟后本月不能继续发布新版本。Starter 只有 1 个项目和环境，不提供常驻运行保证。"
region: [overseas]
detail:
  quota: "Starter 免费档可创建 1 个项目和 1 个环境，容器规格为 0.25 vCPU / 512MB；每月含 100GB 流量、300 分钟构建时间、1 个自定义域名与自动 SSL，并可选约 256MB 的 Postgres 或 Redis 附加服务。"
  limit: "免费应用空闲时会休眠，重新访问可能遇到冷启动；月流量达到 100GB 后应用暂停服务，次月 1 日自动恢复；构建用完 300 分钟后本月不能继续发布新版本。Starter 只有 1 个项目和环境，不提供常驻运行保证。"
  avoid: "Orkestr 是从 Git 仓库部署应用的容器 PaaS，不是提供 root 权限和固定公网 IP 的传统 VPS。平台托管与 Agent Sandbox 是两个独立产品；Sandbox 的赠送额度、有效期和规格不要与永久免费 Starter 混为一谈。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - server
---

## 教程

### 怎么部署第一个项目

怎么部署第一个项目

### 打开上面的注册入口

打开上面的注册入口，创建账号并完成邮箱验证。

### 在控制台连接 GitHub

在控制台连接 GitHub、GitLab、Bitbucket 或 Codeberg 中存放代码的账号。

### 新建项目

新建项目，选择仓库和要发布的分支。

### 让平台自动识别 Node.js

让平台自动识别 Node.js、Python、Go、PHP 等项目；仓库已有 Dockerfile 时也可直接使用。

### 核对环境变量后开始部署

核对环境变量后开始部署，成功后访问平台分配的 *.orkestr.run HTTPS 地址。

### 需要自己的域名时

需要自己的域名时，在项目设置中绑定域名并按提示配置 DNS，SSL 会自动签发。
