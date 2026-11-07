---
id: r-cloudflare-tunnels
order: 108
name:
  zh: "Cloudflare Tunnels 免费内网穿透"
tag:
  zh: "cloudflared · 自建服务公网访问"
desc:
  zh: "Cloudflare Tunnel 让家里电脑、NAS、本地开发服务或小服务器主动连接 Cloudflare，再通过自定义域名把 HTTP 服务公开到公网，不需要在路由器开入站端口或暴露源站 IP。适合临时演示、Webhook 调试和带访问控制的个人服务；稳定入口需自备并接入 Cloudflare 的域名。"
logo: CF
url: "https://cloudflare.com/"
badge:
  zh: "免费"
provider: "Cloudflare"
requirements: "不是一台可 SSH 的免费 VPS，也不是把所有内网端口随意暴露到公网的工具。公开 Web 服务通常需要一个已接入 Cloudflare 的自定义域名；Quick Tunnel 的随机 trycloudflare.com 地址适合临时测试，不适合正式入口。"
region: [cn, overseas]
detail:
  usage: "Cloudflare Tunnel 可由本地的 cloudflared 主动建立到 Cloudflare 的出站连接，再把公开域名的请求代理到本地 HTTP 服务。临时 Quick Tunnel 可用于短时试跑；长期使用应创建和管理命名 Tunnel，具体免费资格、功能和限制以 Cloudflare 账户及官方文档为准。"
  limit: "不是一台可 SSH 的免费 VPS，也不是把所有内网端口随意暴露到公网的工具。公开 Web 服务通常需要一个已接入 Cloudflare 的自定义域名；Quick Tunnel 的随机 trycloudflare.com 地址适合临时测试，不适合正式入口。"
  avoid: "Tunnel 解决的是公网入口和隐藏源站，不等于应用本身已经安全。NAS、路由器、数据库、远程桌面或后台管理页必须加认证、HTTPS、访问策略和最小权限；不要把高权限服务直接公开。DNSHE 域名只有在能修改 NS 并成功接入 Cloudflare 后，才适合拿来当自定义入口。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - tunnel
tags:
  - "cloudflare"
---

## 教程

### 接入域名

在 Cloudflare 控制台添加自己的域名，并按提示完成 nameserver 接入；

### 创建命名 Tunnel

到 Zero Trust / Networks / Tunnels 创建一个命名 Tunnel；

### 安装并运行 cloudflared

在本地设备安装 cloudflared，按控制台生成的命令或 token 运行连接器；

### 绑定公网 hostname

给 Tunnel 添加公网 hostname，例如 demo.example.com，并把它指向本地 http://localhost:3000；

### 验证公网访问

用手机流量打开域名，确认公网访问、登录保护和业务功能都正常。
