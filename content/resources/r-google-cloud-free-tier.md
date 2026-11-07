---
id: r-google-cloud-free-tier
order: 102
name:
  zh: "Google Cloud 永久免费小鸡"
tag:
  zh: "e2-micro · 美国三区 · 谷歌全家桶另送 $300"
desc:
  zh: "谷歌云的 Always Free 里藏着一台永久免费的 e2-micro 小鸡——每月一台、限美国 us-west1 / us-central1 / us-east1 三个区，配 30G 标准硬盘。规格小（共享 2 核 + 1G 内存），但谷歌的网真顶，拿来挂轻量服务、做跳板很稳。新账号另有 90 天 $300 试用额度可叠着玩。"
logo: GC
url: "https://cloud.google.com/free"
badge:
  zh: "永久免费"
provider: "Google Cloud"
requirements: "永久免费只认那三个美区 + e2-micro 这一种规格，换区或升配立刻按量计费；免费出站流量每月仅 1G、且发往中国大陆 / 澳洲不算在内；$300 是 90 天试用、到期不续，别和永久免费混。"
region: [overseas]
detail:
  quota: "Always Free 永久免费：每月 1 台 e2-micro 实例（共享核心 + 1G 内存），仅限美国 us-west1（俄勒冈）/ us-central1（爱荷华）/ us-east1（南卡）三区；含 30G 标准持久磁盘、5G 快照、每月 1G 从北美出站流量（不含中国大陆 / 澳洲）。另送新用户 90 天 $300 试用额度（与永久免费分开）。具体以官方 Free 页为准。"
  limit: "永久免费只认那三个美区 + e2-micro 这一种规格，换区或升配立刻按量计费；免费出站流量每月仅 1G、且发往中国大陆 / 澳洲不算在内；$300 是 90 天试用、到期不续，别和永久免费混。"
  avoid: "要绑卡且默认开「自动升级到付费账号」——只想白嫖永久免费的，留意别手滑触发计费项目；e2-micro 是共享 CPU、突发性能有限，跑重负载会被限速；区域和机型一字之差就脱离免费档，建实例时盯紧选项。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - server
tags:
  - "google"
---

## 教程

### 开通并绑卡验证

上 Google Cloud 官网用谷歌账号开通，绑卡验证（同样是预授权验证，不主动扣）。

### 创建 e2-micro 实例

进 Console → Compute Engine → 创建实例，区域必须选那三个美区之一，机型在 E2 系列里挑 e2-micro，磁盘用标准持久盘、别超 30G。

### 确认落在 Always Free

镜像选 Debian / Ubuntu，建好放行防火墙端口即用。建完去 Billing 确认这台落在「Always Free」里、没产生费用。
