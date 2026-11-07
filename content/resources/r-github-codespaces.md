---
id: r-github-codespaces
order: 110
name:
  zh: "GitHub Codespaces 免费云开发环境"
tag:
  zh: "每月 120 核时 · 浏览器里的真 Linux + VS Code"
desc:
  zh: "GitHub 给个人账号每月白送 120 核时的云端开发容器——浏览器里打开就是一台真 Ubuntu，VS Code 界面直接连，能装软件、跑服务、开端口预览。2 核机型约够 60 小时/月，4 核约 30 小时。不是常驻服务器，但当临时开发机、跑脚本、连远程白嫖一台 Linux 用，太方便。"
logo: GH
url: "https://github.com/features/codespaces"
badge:
  zh: "每月 120 核时"
provider: "GitHub"
requirements: "是「开发容器」不是常驻 VPS——闲置一段时间自动 stop、长期不用会被删（停机后数据默认保留 30 天）；免费核时按机器规格折算，开大机器烧得快；超额需绑卡才会继续（默认不超不扣）。"
region: [cn, overseas]
detail:
  usage: "个人账号每月免费 120 核时（core-hours）+ 15 GB·月 存储。核时按机型折算：2 核机器约 60 小时/月、4 核约 30 小时、8 核约 15 小时。每个 Codespace 是一台独立的 Ubuntu 容器，含 VS Code（浏览器 / 桌面 / JetBrains 均可连）。具体额度以官方计费页为准。"
  limit: "是「开发容器」不是常驻 VPS——闲置一段时间自动 stop、长期不用会被删（停机后数据默认保留 30 天）；免费核时按机器规格折算，开大机器烧得快；超额需绑卡才会继续（默认不超不扣）。"
  avoid: "别拿它当长期在线的服务器挂服务，闲置必停；核时是「核数 × 小时」，手滑开 8 核会四倍速烧额度，日常用 2 核够了；想长期跑后台进程请看 Oracle / GCP，Codespaces 的定位是临时开发机。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - dev-cloud
---

## 教程

### 准备 GitHub 账号

有 GitHub 账号就行（免费账号即享额度，开发用途不强制绑卡）。

### 创建 Codespace

打开任意仓库，点绿色 Code → Codespaces → Create codespace，稍等就进了浏览器里的 VS Code；空手玩可以建个空仓库或 fork 一个模板。

### 使用终端与端口转发

进去后就是标准终端 + 编辑器，sudo 权限齐全，装环境、起服务、Ports 面板转发端口在线预览，都行。
