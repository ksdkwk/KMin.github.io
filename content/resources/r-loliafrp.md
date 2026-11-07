---
id: r-loliafrp
order: 109
name:
  zh: "LoliaFRP 洛链映射免费内网穿透"
tag:
  zh: "签到领流量 · 国内海外节点 · 公测"
desc:
  zh: "LoliaFRP（洛链映射）是 Lolia Team 等发起的公益 FRP 项目，公测期免费提供 TCP / UDP / HTTP / HTTPS 隧道，节点由捐赠者维护，支持图形客户端、CLI 和原版 frpc。国内节点按法规要实名，部分海外节点也要求认证；国内节点不能拿 TCP 隧道搭网站，建站要走海外节点。单隧道限速 80Mbps，每天签到领随机流量，适合 MC 联机、远程桌面、NAS 和本地调试。"
logo: LO
url: "https://lolia.link/"
badge:
  zh: "公测免费"
provider: "Lolia Team"
requirements: "国内节点按法规要求实名，需是支付宝实名用户，认证费用由支付宝收取，不支持微信；部分海外节点也要求实名。国内节点禁止用 TCP 隧道搭 HTTP/HTTPS 网站，需改用海外节点。"
region: [cn, overseas]
detail:
  usage: "公测期免费。每天在面板签到可领随机流量，实际到账以仪表盘为准；单隧道限速 80Mbps，捐赠者可解除；可用隧道数、流量和节点能力以登录后的面板为准。"
  limit: "国内节点按法规要求实名，需是支付宝实名用户，认证费用由支付宝收取，不支持微信；部分海外节点也要求实名。国内节点禁止用 TCP 隧道搭 HTTP/HTTPS 网站，需改用海外节点。"
  avoid: "免费公益 FRP 不适合正式生产 SLA。映射前先给服务加认证和 HTTPS，别把数据库、RDP、SSH、NAS 后台直接裸奔。HTTP(S) 用 HTTP(S) 隧道，不要用 TCP 隧道穿透 Web；同一节点同一域名只能由一个 frpc 转发，重复启动会报 router config conflict。遇到 TLS SNI 被 RST 导致 EOF / session shutdown，可把 transport.tls.serverName 设为空格，Lolia CLI 已内置。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - tunnel
tags:
  - "签到领流量"
  - "远程桌面"
  - "NAS"
---

## 教程

### 注册并登录控制台

打开 LoliaFRP 官网，进 控制台 注册 / 登录；

### 确认节点实名要求

看目标节点是否要求实名，需要就先完成认证；

### 创建隧道

在面板创建隧道，选协议（TCP / UDP / HTTP / HTTPS）、节点和本地服务地址；

### 安装客户端

装客户端：官方提供 Windows / macOS / Linux 图形客户端、Lolia CLI，也可以直接用原版 frpc；Android 也有社区客户端；

### 本地验证服务

在本机确认服务能访问，例如 http://127.0.0.1:8080，再按面板给的配置启动隧道；

### 通过公网地址复测

用手机流量或另一条网络测公网地址，别只在同一个 Wi-Fi 里自测。

### 自定义域名与 HTTPS

如果不想装新客户端，原版 frpc 也能连，Lolia 说保持与原版配置兼容；但官方 CLI 内置了一些避坑项（比如 SNI 处理），新手用官方客户端更省事。
