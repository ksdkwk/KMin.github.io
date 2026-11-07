---
id: b-oracle-always-free
order: 103
name:
  zh: "Oracle 甲骨文云永久免费"
tag:
  zh: "Always Free · 最多 4 核 ARM + 24G 内存 · 常驻不限时"
desc:
  zh: "白嫖圈的常青树——甲骨文云的 Always Free 档不是 12 个月试用，是只要不删就一直白嫖。最香的是那台 ARM Ampere A1：最多 4 核 + 24G 内存可以拆成 1~4 台机器随你分，外加 2 台 AMD 小鸡、200G 块存储、每月 10T 出站流量。注册要张能过验证的卡，ARM 机型常年「抢不到容量」得蹲，但白到手就是一台能常驻的真服务器。"
logo: OR
url: "https://www.oracle.com/cloud/free/"
badge:
  zh: "永久免费"
provider: "Oracle"
requirements: "ARM A1 在热门区常年「Out of host capacity」抢不到，得换区或挂脚本蹲容量；账号注册时选的区域之后基本锁死；官方对长期闲置的 Always Free 实例有回收政策，别开了不管。"
region: [overseas]
detail:
  quota: "Always Free 永久免费档（与 30 天 $300 试用额度分开）：2 台 AMD VM.Standard.E2.1.Micro（各 1/8 OCPU + 1G 内存）+ ARM Ampere A1 共 4 核 / 24G 内存（可拆成 1~4 台）+ 200G 块存储 + 10G 对象存储 + 每月 10T 出站流量 + 2 个自治数据库。具体配额以官方 Always Free 页为准。"
  limit: "ARM A1 在热门区常年「Out of host capacity」抢不到，得换区或挂脚本蹲容量；账号注册时选的区域之后基本锁死；官方对长期闲置的 Always Free 实例有回收政策，别开了不管。"
  avoid: "注册要绑信用卡 / 借记卡过验证（会有约 $1 预授权），国内卡偶尔被拒，换张 Visa 多试；别把 30 天 $300 试用额度和永久免费搞混——试用到期机器不会停，但超出 Always Free 规格的部分会开始计费，建账号后进控制台把账单告警设上。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - server
tags:
  - "Oracle"
---

## 教程

### 上 甲骨文云官网注册账号

上 甲骨文云官网注册账号，绑一张能过验证的信用卡 / 借记卡（仅验证身份，不主动扣费，会有约 $1 预授权后退回）。

### 注册时选的区域之后基本改不了

注册时选的区域之后基本改不了，挑一个你常用、且 ARM 容量相对宽松的区（日本东京 / 大阪、韩国、新加坡国内连着顺，但人多抢得凶；美区容量松些但延迟高）。

### 进控制台 → Compute → Ins

进控制台 → Compute → Instances 建实例，镜像选 Ubuntu / Oracle Linux，机型挑 VM.Standard.A1.Flex（ARM）填核数和内存，或 E2.1.Micro（AMD 小鸡）。建好分配公网 IP、放行安全组端口即用。
