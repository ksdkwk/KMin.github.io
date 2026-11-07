---
id: r-aws-free-tier
order: 100
name:
  zh: "AWS 亚马逊云 Free Tier"
tag:
  zh: "最高 $200 + 30 多项长期免费服务"
desc:
  zh: "亚马逊云现在不是EC2 永久免费：2025 年 7 月后，新账户可选最长 6 个月的 Free Plan，先得 $100、完成指定任务最多再得 $100；同时保留 30 多项按月限额的 Always Free 服务。适合学云计算、跑轻量函数和数据库实验，但想长期白嫖必须分清新人额度、长期月度额度和超额计费。"
logo: AWS
url: "https://aws.amazon.com/free/"
badge:
  zh: "新人权益"
provider: "AWS"
requirements: "Free Plan 不是永久账号，6 个月到期或额度耗尽会关闭；EC2 对 2025-07-15 以后新账户主要消耗 Credits，并非永久免费的 VPS。要在到期后保留资源，需升级 Paid Plan；Always Free 超额部分会按量收费。"
region: [overseas]
detail:
  quota: "新账户注册即得 $100 AWS Credits，完成控制台指定的 5 项探索任务最多再得 $100；Free Plan 最长 6 个月或额度用完即结束。另有 30 多项 Always Free 服务提供长期月度免费用量，具体项目和额度随官方清单调整。"
  limit: "Free Plan 不是永久账号，6 个月到期或额度耗尽会关闭；EC2 对 2025-07-15 以后新账户主要消耗 Credits，并非永久免费的 VPS。要在到期后保留资源，需升级 Paid Plan；Always Free 超额部分会按量收费。"
  avoid: "注册需要支付方式做身份验证；不要把「最高 $200」当现金或永久免费余额，额外 $100 要完成指定任务。中国北京 / 宁夏区域不适用全球版 Free Plan 与 Credits；升级付费计划后务必设置 Budget 和账单告警，避免 Always Free 超额产生费用。"
  valid: "长期有效"
  scope: "整理自原文档，2026-11。"
categories:
  - server
tags:
  - "AWS"
  - "新人权益"
---

## 教程

### 注册新账户

打开 AWS Free Tier 注册入口，创建一个此前没有使用过 AWS Free Tier 的新账户；

### 验证支付方式并选 Free Plan

按流程填写支付方式完成身份验证，然后选择 Free Plan，不要误选 Paid Plan；

### 完成探索任务领 Credits

进入 AWS Console 首页的 Explore AWS 区域，查看可赚取额外 Credits 的任务和完成期限；

### 设置预算告警

在 Billing and Cost Management 里确认剩余额度、Free Plan 到期日，并创建 AWS Budget 预算提醒；

### 确认 Free Tier 标识

创建资源前先确认页面带有 Free Tier 标识，使用后及时停止或删除不再需要的 EC2、磁盘、公网 IPv4 等资源。
