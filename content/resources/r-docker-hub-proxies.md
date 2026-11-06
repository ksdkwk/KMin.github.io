---
id: r-docker-hub-proxies
order: 9
name:
  zh: Docker Hub 镜像代理
  en: Docker Hub proxies
tag:
  zh: 容器镜像 · 时有变动
  en: Container images · Unstable
desc:
  zh: 公开可用的加速地址换得比较频繁，建议同时配置多个备用，别把单个地址写死。
  en: Public accelerators rotate often. Configure several fallbacks instead of hard-coding a single endpoint.
logo: DK
url: https://docs.docker.com/
badge:
  zh: 需自备
  en: Bring your own
provider: 社区维护
requirements: 公共加速地址变动频繁，已在本文标注失效；请自行寻找可用代理并配置多个备用。
tags:
  - 国内镜像源
  - 公益镜像
  - 失效
detail:
  usage: Docker Hub 官方镜像的国内加速代理，配置 registry-mirrors 后拉取速度提升明显。
  limit: 公共加速地址变动频繁，可用性不稳定，不建议作为唯一来源。
  avoid: 很多公开加速器已停止服务，配置前先测试连通性；生产环境建议自建或使用付费镜像服务。
  valid: 本项目前处于失效状态，仅作资料留存。
  scope: 2026-11 整理，已标注失效。
---
