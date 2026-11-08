/* ==========================================================================
   main.js · 站点交互与渲染（多页面版）
   模块：0.工具函数 1.国际化 2.主题 3.语言下拉 4.移动菜单 4.5 二级导航
        5.内容渲染（按页面分发） 6.搜索 7.滚动与导航高亮 8.入场动画 9.启动
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var DATA = window.KMIN_DATA || {};

  /** 当前页面：由 <body data-page="..."> 决定，缺省按文件名推断 */
  var PAGE = (function () {
    if (document.body && document.body.dataset && document.body.dataset.page) {
      return document.body.dataset.page;
    }
    var f = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return f.replace(/\.html$/, '') || 'index';
  })();

  /* ---------- 0. 工具函数 ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /** 取双语字段，缺失时回退到另一语言，再回退到空串 */
  function pick(v, lang) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.zh || v.en || '';
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function on(target, type, handler, opts) {
    if (target) target.addEventListener(type, handler, opts);
  }

  /** 从 URL 读取查询参数（如 tools.html?cat=dev） */
  function param(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  /* ---------- 1. 国际化 ---------- */
  var I18N = {
    zh: {
      'a11y.skip': '跳到主要内容',
      'nav.home': '首页', 'nav.resources': '资源', 'nav.tools': '工具', 'nav.notes': '笔记', 'nav.about': '关于',
      'nav.baipiao': '白嫖', 'nav.charity': '公益站',
      'nav.tools.all': '全部工具', 'nav.tools.dev': '开发', 'nav.tools.design': '设计',
      'nav.tools.productivity': '效率', 'nav.tools.system': '系统软件', 'nav.tools.iso': '系统镜像',
      'nav.baipiao.all': '全部白嫖', 'nav.baipiao.server': 'VPS/服务器', 'nav.baipiao.api': '免费 API',
      'nav.baipiao.student': '学生权益',
      'ui.search': '搜索', 'ui.theme': '切换主题', 'ui.lang': '切换语言', 'ui.menu': '菜单', 'ui.top': '回到顶部',
      'common.viewAll': '查看全部',
      'common.count': '共 {n} 条',
      'common.filtered': '{n} / {total} 条',
      'common.all': '全部',
      'hero.eyebrow': 'KMIN · 个人主页与数字花园',
      'hero.title': '把热爱的事，<mark class="hl">做成作品</mark>。',
      'hero.desc': '这里是我的数字花园：开源作品、免费资源清单，还有那些真的每天在用的工具，全都整理在一处。',
      'hero.cta1': '逛逛资源库', 'hero.cta2': '了解我',
      'hero.meta': '已收录 <b data-count="resources">21</b> 条资源 · 持续维护 <b>4</b> 年 · 最近更新 <b>2025-11</b>',
      'hero.fc1': '免费额度', 'hero.fc1.unit': '/ 月', 'hero.fc2': '收录条目', 'hero.fc3': '最近同步',
      'hero.fc3.unit': '分钟前', 'hero.badge': 'KMin 认证',
      'stats.live': '数据活着', 'stats.syncUnit': '分钟前同步',
      'stats.resources': '收录条目', 'stats.tools': '工具推荐', 'stats.projects': '开源作品',
      'start.title': '从这里开始',
      'start.desc': '四个入口覆盖站点主要内容，卡片上的数字会随内容自动更新。',
      'start.c1.title': '资源导航', 'start.c1.desc': '免费 API、服务器、镜像站与域名，标注现在还能不能薅。', 'start.c1.unit': '条收录',
      'start.c2.title': '工具推荐', 'start.c2.desc': '真正每天在用的软件与在线工具，标了免费额度或开源。', 'start.c2.unit': '个工具',
      'start.c3.title': '最新笔记', 'start.c3.desc': '折腾过程、踩坑复盘与阶段性总结，想到就写。', 'start.c3.unit': '篇笔记',
      'start.c4.title': '关于我', 'start.c4.desc': '在做什么、会什么、怎么联系，一站看完。', 'start.c4.unit': '年折腾',
      'res.title': '资源导航',
      'res.desc': '能用、稳定、现在还能薅的才收录；失效或名额已满的会直接标出来。',
      'tools.title': '工具推荐',
      'tools.desc': '只推每天真的在用的，能免费或开源的一律标明。',
      'notes.title': '最新笔记',
      'notes.desc': '记录折腾过程、踩坑复盘和阶段性总结。',
      'about.title': '关于我',
      'about.role': '写代码的 / 折腾免费额度的',
      'about.bio1': '你好，我是 KMin。白天写代码，晚上折腾各种免费额度和自建服务。',
      'about.bio2': '这个站点用来存放心得和资源，顺便当作自己的数字名片。内容会持续更新，欢迎在 GitHub 上找我。',
      'about.mail': '发邮件',
      'about.now.title': '现在在做什么', 'about.skills.title': '会用一点的东西',
      'footer.tagline': '手写 HTML / CSS / JS，托管在 GitHub Pages，零依赖、零服务器。',
      'footer.license': '内容遵循 MIT 许可',
      'search.placeholder': '搜索资源、工具或笔记…',
      'search.hint': '输入关键词即时过滤，回车打开第一条结果。',
      'search.empty': '没有找到相关内容，换个关键词试试。',
      'search.type.resource': '资源', 'search.type.tool': '工具', 'search.type.post': '笔记',
      'search.type.baipiao': '白嫖', 'search.type.charity': '公益',
      'period.ended': '活动已结束',
      'period.filter.all': '所有时间', 'period.filter.active': '长期有效', 'period.filter.expired': '已失效',
      'filter.expand': '展开全部', 'filter.collapse': '收起',
      'unit.entry': '条', 'unit.tool': '个',

      'detail.guide': '使用说明',
      'detail.guideClaim': '领取教程',
      'detail.guideUse': '使用方式',
      'detail.guideTip': '以上步骤基于公开资料整理，具体请以官方页面为准。',
      'detail.visitOfficial': '访问官网',
      'detail.back': '返回列表',
      'detail.backToList': '返回资源列表',
      'detail.notFound': '没有找到这个条目',
      'detail.notFoundDesc': '链接可能已经失效，或者这条内容已被移除。',
      'detail.quota': '额度',
      'detail.items': '收录内容',
      'detail.more': '补充',
      'detail.usage': '用途',
      'detail.limit': '限制',
      'detail.avoid': '避坑',
      'detail.valid': '有效期',
      'detail.scope': '核实范围',
      'resPage.requirements': '使用要求',
      'resPage.site': '官网直达',
      'resPage.visit': '访问',
      'resPage.detail': '详情',
      'resPage.spec.cat': '分类',
      'resPage.spec.status': '状态',
      'resPage.spec.source': '来源',
      'resPage.spec.badge': '获取',
      'resPage.title': '免费资源库',
      'resPage.desc': '能用、稳定、现在还能薅的才收录。每条都标注当前状态，失效或名额已满的直接标出来，省你一个个试。',
      'resPage.stat1': '收录', 'resPage.stat2': '可用', 'resPage.stat3': '已结束',
      'resPage.filter': '在本页筛选资源…',
      'resPage.empty': '没有匹配的资源。换个关键词，或切回「全部」。',
      'resPage.statsLabel': '资源统计',

      'toolsPage.title': '日常在用的工具',
      'toolsPage.desc': '只推我自己装过、用超过一个月的。免费额度和开源性都标在卡片上，不用再去官网翻价格页。',
      'toolsPage.stat1': '收录', 'toolsPage.stat2': '免费/开源', 'toolsPage.stat3': '分类',
      'toolsPage.filter': '在本页筛选工具…',
      'toolsPage.empty': '没有匹配的工具。换个关键词，或切回「全部」。',

      'notesPage.title': '折腾记录',
      'notesPage.desc': '踩过的坑、验证过的做法、临时结论。写下来主要是为了三个月后的自己还看得懂。',
      'notesPage.stat1': '篇数', 'notesPage.stat2': '最近', 'notesPage.stat3': '标签',
      'notesPage.filter': '在本页筛选笔记…',
      'notesPage.empty': '没有匹配的笔记。换个关键词试试。',

      'bpPage.title': '白嫖专区',
      'bpPage.desc': '低价或免费服务器、免费 API、学生权益集中放这里。每条都标了有效期口径，一条可以同时属于多个分类。',
      'bpPage.stat1': '在列', 'bpPage.stat2': '可用', 'bpPage.stat3': '已结束',
      'bpPage.filter': '在本页筛选白嫖项目…',
      'bpPage.empty': '没有匹配的项目。换个关键词，或切回「全部」。',
      'bpPage.note': '提示：活动类条目时效性强，看到就尽快领取；本站只做信息汇总，不代领也不担保。',
      'bpPage.expire': '有效期',

      'chPage.title': '公益站合集',
      'chPage.desc': '由高校、公司和社区自掏成本维护、面向所有人开放的服务。不要滥用，也别拿去做压测。',
      'chPage.stat1': '收录', 'chPage.stat2': '镜像', 'chPage.stat3': '工具/API',
      'chPage.filter': '在本页筛选公益站…',
      'chPage.empty': '没有匹配的站点。换个关键词，或切回「全部」。',
      'chPage.note': '这些服务靠维护者自己掏带宽和服务器成本，请控制请求频率，遇到问题先看对方的公告。',
      'chPage.org': '维护方',

      'aboutPage.title': '关于我',
      'aboutPage.desc': '写代码的，顺带折腾免费额度和自建服务。这个站点是我的数字名片，也是内容仓库。',
      'aboutPage.storyTitle': '我在做什么',
      'aboutPage.story3': '资源页里的每条记录都自己验证过一遍才写进去；工具页只放真的装了、用了一个月以上的。宁可少收，也不想让你点进去发现是坑。',
      'aboutPage.elsewhere': '在别处',
      'aboutPage.email': '主邮箱',
      'aboutPage.email2': '备用邮箱',
      'aboutPage.copy': '复制',
      'aboutPage.copied': '已复制',
      'aboutPage.copyMail': '复制邮箱地址',
      'aboutPage.entries': '{n} 条收录',
      'aboutPage.site': '这个站点',
      'aboutPage.spec1': '技术栈', 'aboutPage.spec2': '依赖', 'aboutPage.spec3': '托管', 'aboutPage.spec4': '更新',
      'aboutPage.none': '零'
    },
    en: {
      'a11y.skip': 'Skip to main content',
      'nav.home': 'Home', 'nav.resources': 'Resources', 'nav.tools': 'Tools', 'nav.notes': 'Notes', 'nav.about': 'About',
      'nav.baipiao': 'Freebies', 'nav.charity': 'Public goods',
      'nav.tools.all': 'All tools', 'nav.tools.dev': 'Development', 'nav.tools.design': 'Design',
      'nav.tools.productivity': 'Productivity', 'nav.tools.system': 'System software', 'nav.tools.iso': 'OS images',
      'nav.baipiao.all': 'All freebies', 'nav.baipiao.server': 'VPS & Servers', 'nav.baipiao.api': 'Free API',
      'nav.baipiao.student': 'Student perks',
      'ui.search': 'Search', 'ui.theme': 'Toggle theme', 'ui.lang': 'Switch language', 'ui.menu': 'Menu', 'ui.top': 'Back to top',
      'common.viewAll': 'View all',
      'common.count': '{n} items',
      'common.filtered': '{n} of {total}',
      'common.all': 'All',
      'hero.eyebrow': 'KMIN · PERSONAL SITE & DIGITAL GARDEN',
      'hero.title': 'Turning what I love into <mark class="hl">real work</mark>.',
      'hero.desc': 'My digital garden: open-source projects, a curated list of free resources, and the tools I actually use every day — all in one place.',
      'hero.cta1': 'Browse resources', 'hero.cta2': 'About me',
      'hero.meta': '<b data-count="resources">21</b> resources collected · maintained for <b>4</b> years · updated <b>2025-11</b>',
      'hero.fc1': 'Free tier', 'hero.fc1.unit': '/ mo', 'hero.fc2': 'Entries', 'hero.fc3': 'Last sync',
      'hero.fc3.unit': 'min ago', 'hero.badge': 'KMin verified',
      'stats.live': 'Live data', 'stats.syncUnit': 'min ago',
      'stats.resources': 'entries', 'stats.tools': 'tools', 'stats.projects': 'projects',
      'start.title': 'Start here',
      'start.desc': 'Four entry points cover the site. Numbers update as content grows.',
      'start.c1.title': 'Resources', 'start.c1.desc': 'Free APIs, servers, mirrors and domains — each marked with its current status.', 'start.c1.unit': 'entries',
      'start.c2.title': 'Tools', 'start.c2.desc': 'Software I use daily, with free tiers or open source noted.', 'start.c2.unit': 'tools',
      'start.c3.title': 'Latest notes', 'start.c3.desc': 'Tinkering logs, lessons learned and periodic summaries.', 'start.c3.unit': 'notes',
      'start.c4.title': 'About me', 'start.c4.desc': 'What I do, what I know, how to reach me.', 'start.c4.unit': 'years',
      'res.title': 'Resources',
      'res.desc': 'Only what works and is still free is listed; expired or limited offers are flagged.',
      'tools.title': 'Tools',
      'tools.desc': 'Only tools I actually use — free or open source is always marked.',
      'notes.title': 'Latest notes',
      'notes.desc': 'Tinkering logs, post-mortems and periodic summaries.',
      'about.title': 'About me',
      'about.role': 'Developer / free-tier tinkerer',
      'about.bio1': "Hi, I'm KMin. I write code by day and tinker with free tiers and self-hosted services by night.",
      'about.bio2': 'This site stores my notes and resources and doubles as a digital business card. It keeps growing — find me on GitHub.',
      'about.mail': 'Email me',
      'about.now.title': 'What I am doing now', 'about.skills.title': 'Things I know a bit about',
      'footer.tagline': 'Hand-written HTML / CSS / JS, hosted on GitHub Pages. No dependencies, no servers.',
      'footer.license': 'Content under the MIT license',
      'search.placeholder': 'Search resources, tools or notes…',
      'search.hint': 'Results filter as you type. Press Enter to open the first one.',
      'search.empty': 'Nothing found. Try another keyword.',
      'search.type.resource': 'Resource', 'search.type.tool': 'Tool', 'search.type.post': 'Note',
      'search.type.baipiao': 'Freebie', 'search.type.charity': 'Public',
      'period.ended': 'Ended',
      'period.filter.all': 'All dates', 'period.filter.active': 'Active', 'period.filter.expired': 'Expired',
      'filter.expand': 'Show all', 'filter.collapse': 'Collapse',
      'unit.entry': 'entries', 'unit.tool': 'tools',

      'detail.guide': 'How to use',
      'detail.guideClaim': 'How to claim',
      'detail.guideUse': 'Getting started',
      'detail.guideTip': 'Steps compiled from public sources; always confirm on the official page.',
      'detail.visitOfficial': 'Visit official site',
      'detail.back': 'Back to list',
      'detail.backToList': 'Back to resources',
      'detail.notFound': 'Entry not found',
      'detail.notFoundDesc': 'The link may be broken, or this entry has been removed.',
      'detail.quota': 'Quota',
      'detail.items': 'Included',
      'detail.more': 'More',
      'detail.usage': 'What it is for',
      'detail.limit': 'Limits',
      'detail.avoid': 'Watch out',
      'detail.valid': 'Validity',
      'detail.scope': 'Verified',
      'resPage.requirements': 'Requirements',
      'resPage.site': 'Official site',
      'resPage.visit': 'Visit',
      'resPage.detail': 'Details',
      'resPage.spec.cat': 'Category',
      'resPage.spec.status': 'Status',
      'resPage.spec.source': 'Provider',
      'resPage.spec.badge': 'Access',
      'resPage.title': 'Free resource library',
      'resPage.desc': 'Only what works and is still free gets listed. Every entry carries its current status, so you do not have to test them one by one.',
      'resPage.stat1': 'Listed', 'resPage.stat2': 'Available', 'resPage.stat3': 'Ended',
      'resPage.filter': 'Filter resources on this page…',
      'resPage.empty': 'No matching resources. Try another keyword, or switch back to All.',
      'resPage.statsLabel': 'Resource statistics',

      'toolsPage.title': 'Tools I use daily',
      'toolsPage.desc': 'Only tools I installed myself and used for over a month. Free tiers and open-source status are on each card.',
      'toolsPage.stat1': 'Listed', 'toolsPage.stat2': 'Free / OSS', 'toolsPage.stat3': 'Categories',
      'toolsPage.filter': 'Filter tools on this page…',
      'toolsPage.empty': 'No matching tools. Try another keyword, or switch back to All.',

      'notesPage.title': 'Tinkering log',
      'notesPage.desc': 'Pitfalls hit, approaches verified, conclusions drawn. Written down mainly so future me can still follow.',
      'notesPage.stat1': 'Notes', 'notesPage.stat2': 'Latest', 'notesPage.stat3': 'Tags',
      'notesPage.filter': 'Filter notes on this page…',
      'notesPage.empty': 'No matching notes. Try another keyword.',

      'bpPage.title': 'Freebie board',
      'bpPage.desc': 'Cheap or free servers, free APIs and student perks that still work, collected in one place. Each entry states its validity, and one entry can belong to several categories.',
      'bpPage.stat1': 'Listed', 'bpPage.stat2': 'Available', 'bpPage.stat3': 'Ended',
      'bpPage.filter': 'Filter freebies on this page…',
      'bpPage.empty': 'No matching entries. Try another keyword, or switch back to All.',
      'bpPage.note': 'Offers expire fast — claim when you see them. This site only lists information; it does not claim on your behalf or guarantee anything.',
      'bpPage.expire': 'Valid',

      'chPage.title': 'Public goods',
      'chPage.desc': 'Services funded by universities, companies and communities, open to everyone. Do not abuse them, and do not load-test them.',
      'chPage.stat1': 'Listed', 'chPage.stat2': 'Mirrors', 'chPage.stat3': 'Tools & APIs',
      'chPage.filter': 'Filter public services on this page…',
      'chPage.empty': 'No matching services. Try another keyword, or switch back to All.',
      'chPage.note': 'These services run on bandwidth and servers their maintainers pay for. Keep request rates sane and read their notices first.',
      'chPage.org': 'Run by',

      'aboutPage.title': 'About me',
      'aboutPage.desc': 'I write code and tinker with free tiers and self-hosted services. This site is my business card and my archive.',
      'aboutPage.storyTitle': 'What I am working on',
      'aboutPage.story3': 'Every resource is verified before it goes in; tools only make the list after a month of real use. I would rather list less than send you into a dead end.',
      'aboutPage.elsewhere': 'Elsewhere',
      'aboutPage.email': 'Primary email',
      'aboutPage.email2': 'Backup email',
      'aboutPage.copy': 'Copy',
      'aboutPage.copied': 'Copied',
      'aboutPage.copyMail': 'Copy email address',
      'aboutPage.entries': '{n} entries',
      'aboutPage.site': 'This site',
      'aboutPage.spec1': 'Stack', 'aboutPage.spec2': 'Dependencies', 'aboutPage.spec3': 'Hosting', 'aboutPage.spec4': 'Updated',
      'aboutPage.none': 'None'
    }
  };

  var state = {
    lang: 'zh',
    theme: 'light',
    // 资源 / 白嫖 / 公益站：属性标签是多选（数组），时间标签是单选（与属性标签 AND）
    resourceFilter: [],
    baipiaoFilter: [],
    charityFilter: [],
    resourcePeriod: 'all',
    baipiaoPeriod: 'all',
    charityPeriod: 'all',
    // 地区标签：多选（数组），与属性标签、时间标签三者是 AND 关系
    resourceRegion: [],
    baipiaoRegion: [],
    charityRegion: [],
    // 各维度的标签展开状态（默认展开；仅当标签超过一行时才出现切换按钮）
    expanded: {},
    // 工具：属性标签也改为多选（与资源/白嫖/公益站一致）
    toolFilter: [],
    // 笔记：仍是单选
    noteFilter: 'all',
    resourceQuery: '',
    toolQuery: '',
    noteQuery: '',
    baipiaoQuery: '',
    charityQuery: ''
  };

  /** 时效筛选的三个互斥取值 */
  var PERIOD_OPTIONS = ['all', 'active', 'expired'];

  /**
   * 地区标签（与属性标签、时间标签并列的第三个维度，同样可多选）。
   *
   * 卡片自带的地域归属是数组，只有两种值：
   *     ['cn']              只在中国大陆
   *     ['overseas']        只在港澳台及国外
   *     ['cn','overseas']   不限地区（全球通用）
   *
   * 筛选栏三个标签：
   *     全球           → 不做地区过滤，显示全部
   *     中国大陆       → 只保留归属里含 cn 的
   *     港澳台及国外   → 只保留归属里含 overseas 的
   *   多选取并集（OR）；「全球」优先级最高，勾上即取消地区限制。
   */
  function matchRegion(item, pickedRegions) {
    if (!pickedRegions || !pickedRegions.length) return true;
    if (pickedRegions.indexOf('global') !== -1) return true;

    var owned = item.region;
    if (!Array.isArray(owned) || !owned.length) owned = ['cn', 'overseas'];
    return pickedRegions.some(function (want) {
      return owned.indexOf(want) !== -1;
    });
  }

  function t(key, vars) {
    var dict = I18N[state.lang] || I18N.zh;
    var s = dict[key] != null ? dict[key] : (I18N.zh[key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return s;
  }

  function applyStaticText() {
    $$('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    $$('[data-i18n-html]').forEach(function (node) {
      node.innerHTML = t(node.getAttribute('data-i18n-html'));
    });
    $$('[data-i18n-aria]').forEach(function (node) {
      node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria')));
    });
    $$('[data-i18n-placeholder]').forEach(function (node) {
      node.setAttribute('placeholder', t(node.getAttribute('data-i18n-placeholder')));
    });
    // aboutPage.entries 里带计数占位，单独处理
    $$('[data-i18n="aboutPage.entries"]').forEach(function (node) {
      node.textContent = t('aboutPage.entries', { n: (DATA.resources || []).length });
    });
  }

  /* ---------- 2. 主题 ---------- */
  function setTheme(theme, persist) {
    state.theme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', state.theme);
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#16150f' : '#f6f0e1');
    var btn = $('#themeBtn');
    if (btn) btn.setAttribute('aria-pressed', String(state.theme === 'dark'));
    if (persist) {
      try { localStorage.setItem('kmin-theme', state.theme); } catch (e) {}
    }
  }

  function initTheme() {
    state.theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(state.theme, false);
    on($('#themeBtn'), 'click', function () {
      setTheme(state.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------- 3. 语言下拉 ---------- */
  function setLang(lang, persist) {
    state.lang = lang === 'en' ? 'en' : 'zh';
    root.setAttribute('data-lang', state.lang);
    root.setAttribute('lang', state.lang === 'zh' ? 'zh-CN' : 'en');

    var code = $('#langCode');
    if (code) code.textContent = state.lang === 'zh' ? 'CN' : 'US';
    $('#langBtn').setAttribute('aria-label', t('ui.lang'));

    $$('.lang-opt').forEach(function (btn) {
      btn.setAttribute('aria-selected', String(btn.getAttribute('data-lang-opt') === state.lang));
    });

    applyStaticText();
    renderAll();
    renderSearch();

    if (persist) {
      try { localStorage.setItem('kmin-lang', state.lang); } catch (e) {}
    }
  }

  function initLang() {
    var box = $('#lang');
    var btn = $('#langBtn');
    var menu = $('#langMenu');
    if (!box || !btn) return;

    function close() {
      box.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function open() {
      box.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    on(btn, 'click', function (e) {
      e.stopPropagation();
      if (box.classList.contains('is-open')) close(); else open();
    });

    on(menu, 'click', function (e) {
      var opt = e.target.closest('[data-lang-opt]');
      if (!opt) return;
      setLang(opt.getAttribute('data-lang-opt'), true);
      close();
      btn.focus();
    });

    on(document, 'click', function (e) {
      if (!box.contains(e.target)) close();
    });

    on(box, 'keydown', function (e) {
      if (e.key === 'Escape') { close(); btn.focus(); }
    });

    state.lang = root.getAttribute('data-lang') === 'en' ? 'en' : 'zh';
    var code = $('#langCode');
    if (code) code.textContent = state.lang === 'zh' ? 'CN' : 'US';
    btn.setAttribute('aria-label', t('ui.lang'));
    $$('.lang-opt').forEach(function (b2) {
      b2.setAttribute('aria-selected', String(b2.getAttribute('data-lang-opt') === state.lang));
    });
  }

  /* ---------- 4. 移动菜单 ---------- */
  function initMenu() {
    var nav = $('#primaryNav');
    var btn = $('#menuBtn');
    if (!nav || !btn) return;

    function close() {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
    function open() {
      nav.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    on(btn, 'click', function () {
      if (nav.classList.contains('is-open')) close(); else open();
    });

    on(nav, 'click', function (e) {
      // 二级菜单内部点击、以及「工具」这个带下拉的触发项，都不应收起整块导航
      if (e.target.closest('.nav-sub')) return;
      if (e.target.closest('.nav-item.has-sub > .nav-link')) return;
      if (e.target.closest('a')) close();
    });

    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) close();
    });
  }

  /* ---------- 4.5 二级导航（工具分类） ---------- */
  function initSubNav() {
    var items = $$('.nav-item.has-sub');
    if (!items.length) return;

    var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;

    items.forEach(function (item) {
      var trigger = $('.nav-link', item);
      var sub = $('.nav-sub', item);
      if (!trigger || !sub) return;

      function close() {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
      function open() {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      // 桌面悬停展开；触屏或键盘通过点击/聚焦展开
      on(item, 'mouseenter', function () {
        if (!isTouch && window.innerWidth > 900) open();
      });
      on(item, 'mouseleave', function () {
        if (!isTouch && window.innerWidth > 900) close();
      });

      on(trigger, 'click', function (e) {
        // 让「工具」仍可跳转到工具页；只有触屏/移动端才拦截为展开
        if (isTouch || window.innerWidth <= 900) {
          e.preventDefault();
          if (item.classList.contains('is-open')) close(); else open();
        }
      });

      on(item, 'keydown', function (e) {
        if (e.key === 'Escape') { close(); trigger.focus(); }
      });

      on(document, 'click', function (e) {
        if (!item.contains(e.target)) close();
      });
    });
  }

  /* ---------- 5. 内容渲染 ---------- */

  /**
   * 时效标签（四段式，由构建期算好的 period 决定）：
   *   无 from 无 to → 「长期有效」
   *   有 from 无 to → 「2026.11.8 -- ∞」
   *   无 from 有 to → 「2026.11.10结束」
   *   两者都有      → 「2026.11.8 -- 2026.11.10」
   * 结束日期已过 → 卡片置灰并追加「活动已结束」标签
   */
  var PERIOD_FALLBACK = { from: '', to: '', shape: 'long' };

  /** 取条目的时效区间（兼容老数据：没有 period 就当作长期有效） */
  function getPeriod(item) {
    return (item && item.period) || PERIOD_FALLBACK;
  }

  /** 时效区间的展示文字，按当前语言取 */
  function getPeriodLabel(item) {
    var p = item.periodLabel;
    if (p && (p.zh || p.en)) return pick(p, state.lang);
    return periodLabelFallback(getPeriod(item));
  }

  /** 前端兜底：数据没带 periodLabel 时按同一套规则现算，保证老缓存也不出错 */
  function periodLabelFallback(per) {
    if (per.from && per.to) return per.from + ' -- ' + per.to;
    if (per.from) return per.from + ' -- ∞';
    if (per.to) return per.to + (state.lang === 'en' ? ' ended' : '结束');
    return state.lang === 'en' ? 'Long-term' : '长期有效';
  }

  /**
   * 是否已过期。
   * 一律按「当前时间」现算，不依赖构建期写死的 item.expired：
   * 站点是静态部署的，构建一次可能放很久，日期一到就该自动变灰，
   * 不能等到下次重新构建才更新。
   */
  function isExpired(item) {
    var per = getPeriod(item);
    if (!per.to) return false;
    var parts = String(per.to).split('.');
    if (parts.length !== 3) return !!(item && item.expired);
    var end = new Date(+parts[0], +parts[1] - 1, +parts[2], 23, 59, 59, 999);
    return Date.now() > end.getTime();
  }

  /** 状态徽章的样式类：长期/未结束按可用来算，过期才算失效 */
  function periodClass(item) {
    return isExpired(item) ? 'is-off' : 'is-ok';
  }

  /** 取卡片上的标签（时效已独立成徽章，不再混在 tags 里） */
  function getContentTags(item) {
    return tagArray(item);
  }

  /** 把 tags 归一成字符串数组：兼容「纯数组」与「{zh:[], en:[]} 双语对象」两种写法 */
  function tagArray(item) {
    var raw = item && item.tags;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(String);
    // 双语对象：把 zh 与 en 合并去重
    var out = [];
    ['zh', 'en'].forEach(function (k) {
      var arr = raw[k];
      if (Array.isArray(arr)) {
        arr.forEach(function (v) {
          var s = String(v);
          if (out.indexOf(s) === -1) out.push(s);
        });
      }
    });
    return out;
  }

  /**
   * 通用筛选（三类列表共用）：
   *   - 属性标签：多选，命中其中任意一个即保留（OR）
   *   - 时间标签：单选，与属性标签是 AND 关系——先按属性筛，再按时间筛
   *   - 关键词：同时搜标题、简介、副标题与全部标签
   */
  function filterList(list, cats, query, labelMap, period, regions) {
    var q = (query || '').trim().toLowerCase();
    var picked = Array.isArray(cats) ? cats : (cats && cats !== 'all' ? [cats] : []);

    return list.filter(function (item) {
      // tags 有两种形态：资源/白嫖/公益站是纯字符串数组，工具是 {zh:[], en:[]} 双语对象
      var tags = tagArray(item);

      // ① 属性标签：多选时任一命中即可
      if (picked.length) {
        // 一篇可以属于多个分类：先比 categories 数组，再退回单值 category
        var itemCats = item.categories && item.categories.length ? item.categories : [item.category];
        var hit = picked.some(function (id) {
          if (itemCats.indexOf(id) !== -1) return true;
          // 「Office/WPS」合并标签：命中 Office 或 WPS 任意一个都算
          if (id === 'office') {
            return tags.indexOf('Office') !== -1 || tags.indexOf('WPS') !== -1;
          }
          var labelZh = labelMap ? labelMap[id] : null;
          return labelZh ? tags.indexOf(labelZh) !== -1 : false;
        });
        if (!hit) return false;
      }

      // ② 时间标签：与属性标签叠加，互斥取值
      if (period && period !== 'all') {
        var expired = isExpired(item);
        if (period === 'expired' && !expired) return false;
        if (period === 'active' && expired) return false;
      }

      // ③ 地区标签：与属性、时间三个维度叠加（AND）
      if (!matchRegion(item, regions)) return false;

      if (!q) return true;
      var hay = [
        pick(item.name, 'zh'), pick(item.name, 'en'),
        pick(item.desc, 'zh'), pick(item.desc, 'en'),
        pick(item.tag, 'zh'), pick(item.tag, 'en')
      ].concat(tags).join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  /** 分类 id → 中文标签名，供 filterList 做标签匹配 */
  function catLabelMap(key) {
    var map = {};
    ((DATA.categories && DATA.categories[key]) || []).forEach(function (c) {
      map[c.id] = pick(c.label, 'zh');
    });
    return map;
  }

  /** 首页只展示前 N 条（由容器上的 data-limit 控制），独立页不设上限 */
  function applyLimit(list, sel) {
    var grid = $(sel);
    var limit = grid && grid.getAttribute('data-limit');
    return limit ? list.slice(0, parseInt(limit, 10)) : list;
  }

  /**
   * 三类列表（资源 / 白嫖 / 公益站）的页面级配置。
   * 数据键、状态键、容器选择器集中登记一次，渲染逻辑只有一份，
   * 新增一类列表时只要在这里加一行，再写个统计回调即可。
   */
  var LIST_GROUPS = {
    tool: {
      dataKey: 'tools', catKey: 'tool', labelKey: 'toolsPage',
      filterKey: 'toolFilter', queryKey: 'toolQuery',
      grid: '#toolGrid', count: '#toolCount', empty: '#toolEmpty',
      search: '#toolSearch', topBox: '#toolTopFilters',
      page: 'tools.html'
    },
    resource: {
      dataKey: 'resources', catKey: 'resource', labelKey: 'resPage',
      filterKey: 'resourceFilter', periodKey: 'resourcePeriod', queryKey: 'resourceQuery',
      grid: '#resourceGrid', count: '#resourceCount', empty: '#resourceEmpty',
      search: '#resourceSearch',
      topBox: '#resourceTopFilters',
      periodTopBox: '#resourcePeriodTop', periodBox: '#resourcePeriodFilters',
      regionTopBox: '#resourceRegionTop', regionBox: '#resourceRegionFilters', regionKey: 'resourceRegion',
      page: 'resources.html'
    },
    baipiao: {
      dataKey: 'baipiao', catKey: 'baipiao', labelKey: 'bpPage',
      filterKey: 'baipiaoFilter', periodKey: 'baipiaoPeriod', queryKey: 'baipiaoQuery',
      grid: '#baipiaoGrid', count: '#baipiaoCount', empty: '#baipiaoEmpty',
      search: '#baipiaoSearch',
      topBox: '#baipiaoTopFilters',
      periodTopBox: '#baipiaoPeriodTop', periodBox: '#baipiaoPeriodFilters',
      regionTopBox: '#baipiaoRegionTop', regionBox: '#baipiaoRegionFilters', regionKey: 'baipiaoRegion',
      page: 'baipiao.html'
    },
    charity: {
      dataKey: 'charity', catKey: 'charity', labelKey: 'chPage',
      filterKey: 'charityFilter', periodKey: 'charityPeriod', queryKey: 'charityQuery',
      grid: '#charityGrid', count: '#charityCount', empty: '#charityEmpty',
      search: '#charitySearch',
      topBox: '#charityTopFilters',
      periodTopBox: '#charityPeriodTop', periodBox: '#charityPeriodFilters',
      regionTopBox: '#charityRegionTop', regionBox: '#charityRegionFilters', regionKey: 'charityRegion',
      page: 'charity.html'
    }
  };

  /** 统一列表渲染：筛选 → 限流 → 逐条交给 buildEntryCard → 计数 + 统计 */
  function renderEntryGrid(groupKey) {
    var g = LIST_GROUPS[groupKey];
    if (!g) return;
    var grid = $(g.grid);
    if (!grid) return;

    var all = DATA[g.dataKey] || [];
    var list = filterList(
      all,
      state[g.filterKey],
      state[g.queryKey],
      catLabelMap(g.catKey),
      g.periodKey ? state[g.periodKey] : 'all',
      g.regionKey ? state[g.regionKey] : []
    );
    var shown = applyLimit(list, g.grid);

    grid.innerHTML = '';
    if (!shown.length) {
      var empty = $(g.empty);
      if (empty) empty.hidden = false;
      updateCount(g.count, 0, all.length);
      updateGroupStats(groupKey, all);
      return;
    }
    var emptyEl = $(g.empty);
    if (emptyEl) emptyEl.hidden = true;

    shown.forEach(function (item, i) {
      grid.appendChild(buildEntryCard(item, i, groupKey));
    });

    updateCount(g.count, shown.length, all.length);
    updateGroupStats(groupKey, all);
  }

  /**
   * 各列表页顶部的统计数字。
   * 每个 group 提供一个 run(all) 回调，由 renderEntryGrid 统一调用，
   * 这样卡片渲染与统计口径互不干扰，新增列表只要追加一项。
   */
  var GROUP_STATS = {
    resource: { run: function (all) { updateStatusCounts(all); } },
    baipiao: {
      run: function (all) {
        var claimable = 0, ended = 0;
        all.forEach(function (x) {
          if (isExpired(x)) ended++; else claimable++;
        });
        setText('[data-total]', all.length);
        setText('[data-claimable-count]', claimable);
        setText('[data-ended-count]', ended);
      }
    },
    charity: {
      run: function (all) {
        var mirrors = 0;
        all.forEach(function (x) { if (x.category === 'mirror') mirrors++; });
        setText('[data-charity-total]', all.length);
        setText('[data-cat-mirror]', mirrors);
        setText('[data-cat-other]', all.length - mirrors);
      }
    }
  };

  function setText(sel, value) {
    $$(sel).forEach(function (n) { n.textContent = String(value); });
  }

  function updateGroupStats(groupKey, all) {
    var conf = GROUP_STATS[groupKey];
    if (conf && typeof conf.run === 'function') conf.run(all);
  }

  function renderResources() { renderEntryGrid('resource'); }

  /* ---------- 5.1 统一卡片组件（资源 / 白嫖 / 公益站共用） ---------- */

  /**
   * 每组卡片额外展示哪一条「元信息」。
   * 资源显示使用要求（红框），白嫖显示有效期，公益站显示维护方，
   * 三者结构一致，只是取值字段和文案不同。
   */
  var ENTRY_META = {
    resource: { field: 'requirements', labelKey: 'resPage.requirements', style: 'req' },
    baipiao: { field: 'expire', labelKey: 'bpPage.expire', style: 'meta' },
    charity: { field: 'org', labelKey: 'chPage.org', style: 'meta' }
  };

  /** 从 url 里取出域名，作为「官网直达」按钮上的可见文字，比一句「访问」信息量大 */
  function siteHost(url) {
    var s = String(url || '').trim();
    if (!s || s === '#') return '';
    try {
      return new URL(s, location.href).hostname.replace(/^www\./, '');
    } catch (e) {
      return s.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '');
    }
  }

  /** 渲染一条卡片；groupKey 决定附加元信息与标签筛选的作用域 */
  function buildEntryCard(item, i, groupKey) {
    var card = el('article', 'res-card entry-card');
    card.style.animationDelay = Math.min((i || 0) * 20, 200) + 'ms';

    var nameText = pick(item.name, state.lang) || item.name || '';
    var descText = pick(item.desc, state.lang);
    var subText = pick(item.tag, state.lang);
    var badgeText = pick(item.badge, state.lang);
    var statusTag = getPeriodLabel(item);
    var statusCls = periodClass(item);
    var expired = isExpired(item);
    // 过期卡片整卡置灰（只改视觉，不动布局与交互）
    if (expired) card.classList.add('is-expired');

    // 标签去重 + 去掉状态标签（状态已经在徽章上单独展示）
    var tags = getContentTags(item).filter(function (tg, idx, arr) {
      return arr.indexOf(tg) === idx;
    });

    // 头部只放主分类标签，其余全部放到卡片底部的标签行；
    // 只有一个标签时头部不重复展示，避免同一枚标签出现两次
    var headTag = tags.length > 1 ? tags[0] : '';
    var footTags = tags.length > 1 ? tags.slice(1) : tags;

    var meta = ENTRY_META[groupKey] || ENTRY_META.resource;
    var metaRaw = item[meta.field];
    var metaText = typeof metaRaw === 'string' ? metaRaw : pick(metaRaw, state.lang);

    // 时效已经由右上角徽章统一表达：附加信息行若与徽章完全同义就不重复渲染，
    // 例如白嫖卡原来的「有效期 · 长期有效」。文案不同则保留（如「按学年复核」）。
    if (metaText && String(metaText).trim() === String(statusTag).trim()) metaText = '';

    // 头部右侧的来源署名（资源用 provider，其余组留空不显示）
    var credit = item.provider || '';

    card.innerHTML =
      '<div class="rc-head">' +
        '<span class="rc-logo">' + esc(item.logo || nameText.slice(0, 2)) + '</span>' +
        '<div class="rc-titles">' +
          '<h3 class="rc-name">' + esc(nameText) + '</h3>' +
          (subText ? '<p class="rc-sub">' + esc(subText) + '</p>' : '') +
        '</div>' +
        '<span class="status ' + statusCls + '"><i aria-hidden="true"></i>' + esc(statusTag) + '</span>' +
        (credit ? '<span class="rc-provider">by ' + esc(credit) + '</span>' : '') +
        (headTag
          ? '<div class="rc-head-tags"><button type="button" class="pill-tag" data-tag="' + esc(headTag) + '">' + esc(headTag) + '</button></div>'
          : '') +
      '</div>' +

      '<p class="rc-summary">' + esc(descText) + '</p>' +

      (metaText
        ? '<div class="' + (meta.style === 'req' ? 'rc-req' : 'rc-meta') + '">' +
            '<span class="' + (meta.style === 'req' ? 'rc-req-label' : 'rc-meta-label') + '">' + esc(t(meta.labelKey)) + '</span>' +
            esc(metaText) +
          '</div>'
        : '') +

      '<div class="rc-actions">' +
        '<a class="rc-site" href="' + esc(item.url || '#') + '" target="_blank" rel="noopener noreferrer"' +
          ' title="' + esc(siteHost(item.url)) + '" aria-label="' + esc(nameText + ' · ' + t('resPage.site')) + '">' +
          '<span class="rc-site-label">' + esc(t('resPage.site')) + '</span>' +
          '<span class="rc-site-text">' + esc(siteHost(item.url)) + '</span>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
        '</a>' +
      '</div>' +

      '<div class="rc-foot">' +
        '<div class="rc-foot-tags">' +
          footTags.map(function (tg) {
            return '<button type="button" class="pill-tag" data-tag="' + esc(tg) + '">' + esc(tg) + '</button>';
          }).join('') +
          // 过期卡片追加一枚不可点击的「活动已结束」标识
          (expired
            ? '<span class="pill-tag is-expired-tag">' + esc(t('period.ended')) + '</span>'
            : '') +
        '</div>' +
        '<div class="rc-foot-right">' +
          (badgeText ? '<span class="rc-badge">' + esc(badgeText) + '</span>' : '') +
          '<a class="rc-detail" href="detail.html?id=' + encodeURIComponent(item.id || '') + '">' +
            '<span>' + esc(t('resPage.detail')) + '</span>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          '</a>' +
        '</div>' +
      '</div>';

    // 点任意标签 → 在当前页按该标签筛选
    $$('[data-tag]', card).forEach(function (btn) {
      on(btn, 'click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setFilterByTag(btn.getAttribute('data-tag'), groupKey);
      });
    });

    return card;
  }

  /**
   * 点击标签：优先切到对应分类，没有对应分类就退回关键词搜索。
   * groupKey 决定在哪个列表里生效——白嫖页点标签不会再跳去资源页。
   */
  function setFilterByTag(tagName, groupKey) {
    var key = groupKey || 'resource';
    var g = LIST_GROUPS[key];
    if (!g) return;

    var cats = (DATA.categories && DATA.categories[g.catKey]) || [];
    var matched = cats.filter(function (c) { return pick(c.label, 'zh') === tagName; });

    if (matched.length) {
      // 点卡片标签 = 把该分类加入已选集合（多选语义，不清空其它已选）
      var list = Array.isArray(state[g.filterKey]) ? state[g.filterKey].slice() : [];
      if (list.indexOf(matched[0].id) === -1) list.push(matched[0].id);
      state[g.filterKey] = list;
      state[g.queryKey] = '';
      var input = $(g.search);
      if (input) input.value = '';
    } else {
      state[g.filterKey] = [];
      state[g.queryKey] = tagName;
      var box = $(g.search);
      if (box) box.value = tagName;
    }

    renderFilters();
    renderEntryGrid(key);

    var target = $(g.grid);
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /** 顶部统计：可用（未过期，含长期有效）/ 失效（结束日期已过） */
  function updateStatusCounts(list) {
    var now = 0, off = 0;
    list.forEach(function (item) {
      if (isExpired(item)) off++;
      else now++;
    });
    $$('[data-now-count]').forEach(function (n) { n.textContent = String(now); });
    $$('[data-off-count]').forEach(function (n) { n.textContent = String(off); });
  }

  function renderTools() {
    var grid = $('#toolGrid');
    if (!grid) return;

    var all = DATA.tools || [];
    // 必须传 labelMap，否则 Linux / Windows / Office 这类「标签型筛选」匹配不到
    var list = filterList(all, state.toolFilter, state.toolQuery, catLabelMap('tool'));
    var shown = applyLimit(list, '#toolGrid');

    grid.innerHTML = '';
    if (!shown.length) {
      var empty = $('#toolEmpty');
      if (empty) empty.hidden = false;
      updateCount('#toolCount', 0, all.length);
      return;
    }
    var emptyEl = $('#toolEmpty');
    if (emptyEl) emptyEl.hidden = true;

    shown.forEach(function (item, i) {
      var node = el('article', 'tool-item');
      node.style.animationDelay = Math.min(i * 24, 220) + 'ms';

      var tags = (pick(item.tags, state.lang) || []).map(function (tag) {
        return '<span class="tag">' + esc(tag) + '</span>';
      }).join('');

      node.innerHTML =
        '<span class="tool-icon" aria-hidden="true">' + esc(item.icon || '') + '</span>' +
        '<div class="tool-body">' +
          '<h3 class="tool-name">' + esc(item.name) +
            (item.free ? '<span class="tag tag-accent">' + (state.lang === 'zh' ? '免费 / 开源' : 'Free / OSS') + '</span>' : '') +
          '</h3>' +
          '<p class="tool-desc">' + esc(pick(item.desc, state.lang)) + '</p>' +
          '<div class="tool-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="tool-actions">' +
          '<a class="res-go" href="' + esc(item.url || '#') + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(item.name) + '" title="' +
            esc(siteHost(item.url)) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
          '</a>' +
          // 详情按钮：跳转 detail.html?id=xxx，与白嫖/公益站卡片一致
          (item.id
            ? '<a class="rc-detail tool-detail" href="detail.html?id=' + encodeURIComponent(item.id) + '">' +
                '<span>' + esc(t('resPage.detail')) + '</span>' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
              '</a>'
            : '') +
        '</div>';
      grid.appendChild(node);
    });

    updateCount('#toolCount', shown.length, all.length);
    updateToolCounts(all);
  }

  function updateToolCounts(list) {
    var free = list.filter(function (i) { return i.free; }).length;
    var cats = {};
    list.forEach(function (i) { if (i.category) cats[i.category] = 1; });
    $$('[data-free-count]').forEach(function (n) { n.textContent = String(free); });
    $$('[data-cat-count]').forEach(function (n) { n.textContent = String(Object.keys(cats).length); });
  }

  function renderBaipiao() { renderEntryGrid('baipiao'); }
  function renderCharity() { renderEntryGrid('charity'); }

  function renderPosts() {
    var list = $('#postList');
    if (!list) return;

    var all = DATA.posts || [];
    var filtered = all.filter(function (post) {
      if (state.noteFilter !== 'all') {
        var tags = pick(post.tags, state.lang) || [];
        if (tags.indexOf(state.noteFilter) === -1) return false;
      }
      var q = (state.noteQuery || '').trim().toLowerCase();
      if (!q) return true;
      return [
        pick(post.title, 'zh'), pick(post.title, 'en'),
        pick(post.excerpt, 'zh'), pick(post.excerpt, 'en')
      ].join(' ').toLowerCase().indexOf(q) !== -1;
    });

    var shown = applyLimit(filtered, '#postList');

    list.innerHTML = '';
    if (!shown.length) {
      var empty = $('#noteEmpty');
      if (empty) empty.hidden = false;
      updateCount('#noteCount', 0, all.length);
      return;
    }
    var emptyEl = $('#noteEmpty');
    if (emptyEl) emptyEl.hidden = true;

    shown.forEach(function (post) {
      var tags = (pick(post.tags, state.lang) || []).map(function (tag) {
        return '<span class="tag">' + esc(tag) + '</span>';
      }).join('');

      var item = el('a', 'post-item');
      item.href = post.url && post.url !== '#notes' ? post.url : 'notes.html';
      item.innerHTML =
        '<time class="post-date" datetime="' + esc(post.date) + '">' + esc(post.date) + '</time>' +
        '<div class="post-main">' +
          '<h3 class="post-title">' + esc(pick(post.title, state.lang)) + '</h3>' +
          '<p class="post-excerpt">' + esc(pick(post.excerpt, state.lang)) + '</p>' +
        '</div>' +
        '<div class="post-tags">' + tags + '</div>';
      list.appendChild(item);
    });

    updateCount('#noteCount', shown.length, all.length);
    updateNoteStats(all);
  }

  function updateNoteStats(list) {
    var latest = '—';
    list.forEach(function (p) { if (p.date > latest || latest === '—') latest = p.date; });
    $$('[data-latest-date]').forEach(function (n) { n.textContent = latest; });

    var tags = {};
    list.forEach(function (p) {
      (pick(p.tags, state.lang) || []).forEach(function (tg) { tags[tg] = 1; });
    });
    $$('[data-tag-count]').forEach(function (n) { n.textContent = String(Object.keys(tags).length); });
  }

  /** 结果计数文案 */
  function updateCount(sel, shown, total) {
    var node = $(sel);
    if (!node) return;
    node.textContent = shown === total
      ? t('common.count', { n: shown })
      : t('common.filtered', { n: shown, total: total });
  }

  /**
   * 判断某条目是否属于某个分类。
   * 统一数据接口后，资源/白嫖/公益站都有 category 字段（分类 id），
   * 只有工具仍用 category 表示「开发/设计」这类工具分组，规则一致。
   */
  function countByCategory(item, cat, groupKey) {
    // 一篇可以属于多个分类
    var cats = item.categories && item.categories.length ? item.categories : [item.category];
    if (cats.length && cats[0] && cats.indexOf(cat.id) !== -1) return true;

    // 工具的分类之外的「标签类筛选」（Linux / Windows / Office/WPS 等）：
    // 分类没命中时，再按标签名匹配一次，让这些标签也能筛出卡片
    var labelZh = pick(cat.label, 'zh');
    var tags = tagArray(item);

    // 「Office/WPS」是个合并标签：命中 Office 或 WPS 任意一个都算
    if (cat.id === 'office') {
      return tags.indexOf('Office') !== -1 || tags.indexOf('WPS') !== -1;
    }
    return tags.indexOf(labelZh) !== -1;
  }

  function renderFilters() {
    var configs = [
      // 第 4 项：'multi' 表示属性标签可多选，并额外渲染时间维度筛选
      ['#resourceFilters', 'resource', 'resourceFilter', 'multi'],
      ['#toolFilters', 'tool', 'toolFilter', 'multi'],
      ['#baipiaoFilters', 'baipiao', 'baipiaoFilter', 'multi'],
      ['#charityFilters', 'charity', 'charityFilter', 'multi']
    ];

    configs.forEach(function (cfg) {
      var box = $(cfg[0]);
      if (!box) return;
      var cats = (DATA.categories && DATA.categories[cfg[1]]) || [];
      var sourceMap = {
        resource: DATA.resources || [],
        tool: DATA.tools || [],
        baipiao: DATA.baipiao || [],
        charity: DATA.charity || []
      };
      var source = sourceMap[cfg[1]] || [];

      box.innerHTML = '';
      var isMulti = cfg[3] === 'multi';
      // 顶级标签（全部）单独一列，二级标签放另一列
      var topBox = isMulti ? $((LIST_GROUPS[cfg[1]] || {}).topBox) : null;
      if (topBox) topBox.innerHTML = '';

      cats.forEach(function (cat) {
        var count = cat.id === 'all'
          ? source.length
          : source.filter(function (it) { return countByCategory(it, cat, cfg[1]); }).length;

        var active = isMulti
          ? (cat.id === 'all' ? !state[cfg[2]].length : state[cfg[2]].indexOf(cat.id) !== -1)
          : state[cfg[2]] === cat.id;

        // 「全部」是顶级标签，其余是二级标签
        var isTop = cat.id === 'all';
        var cls = 'chip' + (isTop ? ' chip-top' : '') + (active ? ' is-active' : '');

        var btn = el('button', cls);
        btn.type = 'button';
        btn.setAttribute('aria-pressed', String(active));
        btn.setAttribute('data-cat', cat.id);
        btn.innerHTML = esc(pick(cat.label, state.lang)) + '<span class="chip-count">' + count + '</span>';

        on(btn, 'click', function () {
          if (isMulti) {
            toggleCategoryFilter(cfg[2], cat.id);
          } else {
            state[cfg[2]] = cat.id;
          }
          // 同步地址栏，刷新后仍停留在该分类
          var pageMap = { tool: 'tools', baipiao: 'baipiao', charity: 'charity' };
          if (pageMap[cfg[1]]) {
            var url = cat.id === 'all' ? pageMap[cfg[1]] + '.html' : pageMap[cfg[1]] + '.html?cat=' + cat.id;
            try { history.replaceState(null, '', url); } catch (e) {}
          }
          renderFilters();
          if (cfg[1] === 'resource') renderResources();
          else if (cfg[1] === 'tool') renderTools();
          else if (cfg[1] === 'baipiao') renderBaipiao();
          else if (cfg[1] === 'charity') renderCharity();
          // 收起状态下新选中的标签要立刻可见
          refreshCollapse(cfg[1] + ':cat');
        });

        // 顶级标签进顶级列，其余进二级列
        if (isTop && topBox) topBox.appendChild(btn);
        else box.appendChild(btn);
      });

      // 属性标签：标签数超过一行时，在行末加展开/收起按钮。
      // 注意 count 必须用「分类总数 - 1（去掉全部）」，不能用 box 里现存 chip 数——
      // 收起后隐藏的 chip 会被算漏，导致按钮消失、无法再展开。
      var subCount = cats.filter(function (c) { return c.id !== 'all'; }).length;
      if (isMulti && subCount > CHIPS_PER_ROW) {
        applyCollapse(box, state.expanded[cfg[1] + ':cat'] !== false);
        appendExpandToggle(
          box.closest('.filter-line'),
          box, subCount, cfg[1] + ':cat'
        );
      }

      // 资源/白嫖/公益站还有时间、地区两个维度，各自一行；
      // 工具页只有属性标签一个维度，没有时效和地区概念
      if (isMulti && cfg[1] !== 'tool') {
        renderPeriodChips(cfg[1]);
        renderRegionChips(cfg[1]);
      }
    });

    // 笔记标签筛选（从数据动态生成）
    var noteBox = $('#noteFilters');
    if (noteBox) {
      var tagMap = {};
      (DATA.posts || []).forEach(function (p) {
        (pick(p.tags, 'zh') || []).forEach(function (tg) { tagMap[tg] = (tagMap[tg] || 0) + 1; });
      });
      var tagList = Object.keys(tagMap);

      noteBox.innerHTML = '';
      var allBtn = el('button', 'chip' + (state.noteFilter === 'all' ? ' is-active' : ''));
      allBtn.type = 'button';
      allBtn.setAttribute('aria-pressed', String(state.noteFilter === 'all'));
      allBtn.innerHTML = esc(t('common.all')) + '<span class="chip-count">' + (DATA.posts || []).length + '</span>';
      on(allBtn, 'click', function () {
        state.noteFilter = 'all';
        renderFilters();
        renderPosts();
      });
      noteBox.appendChild(allBtn);

      tagList.forEach(function (tg) {
        var b = el('button', 'chip' + (state.noteFilter === tg ? ' is-active' : ''));
        b.type = 'button';
        b.setAttribute('aria-pressed', String(state.noteFilter === tg));
        b.innerHTML = esc(tg) + '<span class="chip-count">' + tagMap[tg] + '</span>';
        on(b, 'click', function () {
          state.noteFilter = tg;
          renderFilters();
          renderPosts();
        });
        noteBox.appendChild(b);
      });
    }
  }

  /** 重新应用一次折叠状态（用于「选中了隐藏标签后要让它可见」） */
  function refreshCollapse(key) {
    var groupKey = key.split(':')[0];               // resource / tool / baipiao / charity
    var g = LIST_GROUPS[groupKey];
    if (!g) return;
    var box = $(g.filterKey === 'toolFilter' ? '#toolFilters' : '#' + groupKey + 'Filters');
    if (!box) return;
    applyCollapse(box, state.expanded[key] !== false);
  }

  /**
   * 收起时只显示第一行（前 6 个），但已选中的标签必须保持可见，
   * 否则用户选了第 7 个之后收起，会看不到自己选了什么。
   */
  function applyCollapse(box, expanded) {
    if (!box) return;
    box.classList.toggle('is-collapsed', !expanded);
    var chips = [].slice.call(box.querySelectorAll('.chip'));
    chips.forEach(function (c, i) {
      var keep = expanded || i < CHIPS_PER_ROW || c.classList.contains('is-active');
      c.classList.toggle('is-hidden', !keep);
    });
  }

  /**
   * 给一组二级标签追加「展开 / 收起」按钮。
   *
   * 规则：
   *   - 默认展开；只有标签数量超过一行（6 个）时才显示按钮
   *   - 按钮放在每个顶级标签行的最右侧（即二级标签列末尾之后）
   *   - 收起时只显示第一行（6 个），且已选中的标签必须保持可见
   *
   * key 用来在 state.expanded 里记展开状态，各维度互不影响。
   */
  var CHIPS_PER_ROW = 6;

  function appendExpandToggle(lineEl, box, total, key) {
    if (!lineEl || !box) return;
    // 重渲染时先移除上一轮的按钮，避免叠加多个
    [].slice.call(lineEl.querySelectorAll(':scope > .chips-toggle')).forEach(function (old) {
      old.parentNode.removeChild(old);
    });
    // 只有超过一行才需要这个按钮
    if (total <= CHIPS_PER_ROW) return;

    var expanded = state.expanded[key] !== false; // 默认展开
    var btn = el('button', 'chips-toggle');
    btn.type = 'button';
    btn.setAttribute('data-toggle', key);
    btn.setAttribute('aria-expanded', String(expanded));
    btn.innerHTML =
      '<span>' + esc(expanded ? t('filter.collapse') : t('filter.expand')) + '</span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' + (expanded ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6') + '"/></svg>';

    on(btn, 'click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var nowExpanded = !(state.expanded[key] !== false);
      state.expanded[key] = nowExpanded;

      // 就地更新：只 toggle 标签可见性和按钮自身，不整轮重渲染
      applyCollapse(box, nowExpanded);
      btn.setAttribute('aria-expanded', String(nowExpanded));
      btn.innerHTML =
        '<span>' + esc(nowExpanded ? t('filter.collapse') : t('filter.expand')) + '</span>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="' + (nowExpanded ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6') + '"/></svg>';
    });

    lineEl.appendChild(btn);
  }

  /** 多选模式下切换某个属性标签：已选则取消，全空视同「全部」 */
  function toggleCategoryFilter(filterKey, catId) {
    if (catId === 'all') { state[filterKey] = []; return; }
    var list = state[filterKey].slice();
    var i = list.indexOf(catId);
    if (i === -1) list.push(catId); else list.splice(i, 1);
    state[filterKey] = list;
  }

  /** 时间维度筛选：全部时间 / 仅长期有效（未过期）/ 仅已失效，三者互斥 */
  function renderPeriodChips(groupKey) {
    var g = LIST_GROUPS[groupKey];
    if (!g || !g.periodBox) return;
    var box = $(g.periodBox);
    if (!box) return;

    var all = DATA[g.dataKey] || [];
    var current = state[g.periodKey];

    // 计数口径：先应用属性标签、关键词、地区标签，再统计该子集里各种时效的数量
    var scoped = filterList(all, state[g.filterKey], state[g.queryKey], catLabelMap(g.catKey), 'all',
      g.regionKey ? state[g.regionKey] : []);
    var expiredCount = scoped.filter(function (x) { return isExpired(x); }).length;
    var activeCount = scoped.length - expiredCount;

    var labels = {
      all: t('period.filter.all'),
      active: t('period.filter.active'),
      expired: t('period.filter.expired')
    };
    var counts = { all: scoped.length, active: activeCount, expired: expiredCount };

    // 「所有时间」是顶级标签（= 不过滤），单独放一列；其余是二级标签
    var topBox = $(g.periodTopBox);
    if (topBox) topBox.innerHTML = '';
    box.innerHTML = '';

    PERIOD_OPTIONS.forEach(function (key) {
      var isTop = key === 'all';
      var btn = el('button', 'chip chip-period' + (isTop ? ' chip-top' : '') +
        (current === key ? ' is-active' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(current === key));
      btn.setAttribute('data-period', key);
      btn.innerHTML = esc(labels[key]) + '<span class="chip-count">' + counts[key] + '</span>';
      on(btn, 'click', function () {
        state[g.periodKey] = key;
        renderFilters();
        renderEntryGrid(groupKey);
      });

      if (isTop && topBox) topBox.appendChild(btn);
      else box.appendChild(btn);
    });
  }

  /** 分组键：详情页用它找到对应的分类表 */
  function groupKeyOf(item) {
    return item.group === 'baipiao' ? 'baipiao'
      : item.group === 'charity' ? 'charity'
      : item.group === 'resource' ? 'resource' : 'resource';
  }

  /** 把条目的 categories id 数组翻成中文标签名 */
  function categoryLabels(item, catKey) {
    var cats = (DATA.categories && DATA.categories[catKey]) || [];
    var ids = item.categories && item.categories.length ? item.categories : [item.category];
    var out = [];
    ids.forEach(function (id) {
      var hit = cats.filter(function (c) { return c.id === id; })[0];
      if (hit) out.push(pick(hit.label, state.lang));
    });
    return out;
  }

  /* ---------- 复制按钮（邮箱等） ---------- */

  /**
   * 复制文本：优先异步 Clipboard API（https 和 localhost 可用），
   * file:// 或旧浏览器回退到隐藏 textarea + execCommand。
   */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text);
      });
    }
    return legacyCopy(text);
  }

  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  /** 给 [data-copy] 按钮绑定点击复制，并在按钮上给出短暂反馈 */
  function initCopyButtons() {
    $$('[data-copy]').forEach(function (btn) {
      if (btn.dataset.copyBound) return;
      btn.dataset.copyBound = '1';

      var label = btn.querySelector('.copy-btn-text');
      var original = label ? label.textContent : '';
      var timer = null;

      on(btn, 'click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        copyText(btn.getAttribute('data-copy')).then(function () {
          btn.classList.add('is-copied');
          if (label) label.textContent = t('aboutPage.copied');
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.classList.remove('is-copied');
            if (label) label.textContent = t('aboutPage.copy');
          }, 1600);
        }).catch(function (err) {
          if (window.console && console.warn) console.warn('[KMin] 复制失败:', err);
          if (label) {
            label.textContent = '×';
            setTimeout(function () { label.textContent = original; }, 1600);
          }
        });
      });
    });
  }

  /** 地区标签：中国大陆 / 港澳台及国外 / 全球，可多选，与属性、时间三者叠加 */
  function renderRegionChips(groupKey) {
    var g = LIST_GROUPS[groupKey];
    if (!g || !g.regionBox) return;
    var box = $(g.regionBox);
    if (!box) return;

    var all = DATA[g.dataKey] || [];
    var current = state[g.regionKey];
    var regions = (DATA.categories && DATA.categories.regions) || [];

    // 计数口径：在当前属性+时间筛选结果里，各地域有多少条
    var base = filterList(all, state[g.filterKey], state[g.queryKey], catLabelMap(g.catKey),
      g.periodKey ? state[g.periodKey] : 'all', []);

    // 「全球」是顶级标签（= 不过滤），单独放一列；其余是二级标签
    var topBox = $(g.regionTopBox);
    if (topBox) topBox.innerHTML = '';
    box.innerHTML = '';

    regions.forEach(function (reg) {
      var isGlobal = reg.id === 'global';
      var count = isGlobal
        ? base.length
        : base.filter(function (it) { return matchRegion(it, [reg.id]); }).length;

      var active = isGlobal ? current.length === 0 : current.indexOf(reg.id) !== -1;
      var btn = el('button', 'chip chip-region' +
        (isGlobal ? ' chip-region-all chip-top' : '') +
        (active ? ' is-active' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('data-region', reg.id);
      btn.innerHTML = esc(pick(reg.label, state.lang)) + '<span class="chip-count">' + count + '</span>';

      on(btn, 'click', function () {
        toggleRegionFilter(groupKey, reg.id);
        renderFilters();
        renderEntryGrid(groupKey);
      });

      if (isGlobal && topBox) topBox.appendChild(btn);
      else box.appendChild(btn);
    });
  }

  /** 地区标签可多选；勾「全球」等于取消地区限制，其它地区自动清空 */
  function toggleRegionFilter(groupKey, regionId) {
    var g = LIST_GROUPS[groupKey];
    if (!g || !g.regionKey) return;
    var key = g.regionKey;

    if (regionId === 'global') {
      // 全球 = 不过滤，等价于清空所有已选地区
      state[key] = [];
      return;
    }

    var list = state[key].slice();
    var i = list.indexOf(regionId);
    if (i === -1) list.push(regionId); else list.splice(i, 1);
    state[key] = list;
  }

  function renderAbout() {
    var timeline = $('#timeline');
    if (timeline) {
      timeline.innerHTML = '';
      (DATA.timeline || []).forEach(function (row) {
        var li = el('li');
        li.innerHTML = '<time>' + esc(pick(row.time, state.lang)) + '</time>' + esc(pick(row.text, state.lang));
        timeline.appendChild(li);
      });
    }

    var skills = $('#skillTags');
    if (skills) {
      skills.innerHTML = '';
      (DATA.skills || []).forEach(function (name) {
        skills.appendChild(el('span', 'skill-tag', esc(name)));
      });
    }

    $$('[data-updated]').forEach(function (n) {
      n.textContent = (DATA.meta && DATA.meta.updated) || '2025-11';
    });
  }

  /**
   * 统计数字口径：
   *   meta.stats 里给了数字 → 用它（累计展示口径）
   *   给 null / 删掉该键 → 自动按数组真实长度计算
   */
  function computeStats() {
    DATA.meta = DATA.meta || {};
    var base = DATA.meta.stats || {};
    function pick2(key, arr) {
      return base[key] != null ? base[key] : (arr || []).length;
    }
    DATA.meta.stats = {
      resources: pick2('resources', DATA.resources),
      tools: pick2('tools', DATA.tools),
      posts: pick2('posts', DATA.posts),
      projects: base.projects != null ? base.projects : 0,
      sync: base.sync != null ? base.sync : 12
    };
  }

  function renderCounts() {
    var stats = (DATA.meta && DATA.meta.stats) || {};
    $$('[data-count]').forEach(function (node) {
      var key = node.getAttribute('data-count');
      var value = stats[key];
      if (value == null) return;
      node.textContent = String(value);
    });
  }

  function renderAll() {
    renderFilters();
    renderResources();
    renderTools();
    renderBaipiao();
    renderCharity();
    renderPosts();
    renderAbout();
    renderCounts();
    applyStaticText();
  }

  /* ---------- 6. 搜索 ---------- */
  var searchIndex = [];
  var searchResults = [];
  var searchCursor = -1;

  function buildIndex() {
    searchIndex = [];
    (DATA.resources || []).forEach(function (item) {
      searchIndex.push({
        type: 'resource',
        anchor: 'resources.html',
        name: pick(item.name, 'zh'),
        nameEn: pick(item.name, 'en'),
        desc: { zh: pick(item.desc, 'zh'), en: pick(item.desc, 'en') }
      });
    });
    (DATA.tools || []).forEach(function (item) {
      searchIndex.push({
        type: 'tool',
        anchor: 'tools.html',
        name: pick(item.name, 'zh'),
        nameEn: pick(item.name, 'en'),
        desc: { zh: pick(item.desc, 'zh'), en: pick(item.desc, 'en') }
      });
    });
    (DATA.baipiao || []).forEach(function (item) {
      searchIndex.push({
        type: 'baipiao',
        anchor: 'baipiao.html',
        name: pick(item.name, 'zh'),
        nameEn: pick(item.name, 'en'),
        desc: { zh: pick(item.desc, 'zh'), en: pick(item.desc, 'en') }
      });
    });
    (DATA.charity || []).forEach(function (item) {
      searchIndex.push({
        type: 'charity',
        anchor: 'charity.html',
        name: pick(item.name, 'zh'),
        nameEn: pick(item.name, 'en'),
        desc: { zh: pick(item.desc, 'zh'), en: pick(item.desc, 'en') }
      });
    });
    (DATA.posts || []).forEach(function (post) {
      searchIndex.push({
        type: 'post',
        anchor: 'notes.html',
        name: pick(post.title, 'zh'),
        nameEn: pick(post.title, 'en'),
        desc: { zh: pick(post.excerpt, 'zh'), en: pick(post.excerpt, 'en') }
      });
    });
  }

  function renderSearch() {
    var box = $('#searchResults');
    if (!box) return;
    var q = ($('#searchInput') && $('#searchInput').value || '').trim().toLowerCase();

    if (!q) {
      searchResults = [];
      searchCursor = -1;
      box.innerHTML = '<p class="search-empty">' + esc(t('search.hint')) + '</p>';
      return;
    }

    searchResults = searchIndex.filter(function (item) {
      return (item.name + ' ' + item.nameEn + ' ' + item.desc.zh + ' ' + item.desc.en).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 12);

    searchCursor = searchResults.length ? 0 : -1;

    if (!searchResults.length) {
      box.innerHTML = '<p class="search-empty">' + esc(t('search.empty')) + '</p>';
      return;
    }

    box.innerHTML = '';
    searchResults.forEach(function (item, i) {
      var row = el('a', 'search-item' + (i === searchCursor ? ' is-current' : ''));
      row.href = item.anchor;
      row.innerHTML =
        '<span class="si-type">' + esc(t('search.type.' + item.type)) + '</span>' +
        '<span class="si-body">' +
          '<span class="si-name">' + esc(state.lang === 'zh' ? item.name : item.nameEn) + '</span>' +
          '<span class="si-desc">' + esc(item.desc[state.lang] || item.desc.zh) + '</span>' +
        '</span>';
      on(row, 'click', closeSearch);
      box.appendChild(row);
    });
  }

  function moveCursor(delta) {
    if (!searchResults.length) return;
    searchCursor = (searchCursor + delta + searchResults.length) % searchResults.length;
    $$('.search-item').forEach(function (node, i) {
      node.classList.toggle('is-current', i === searchCursor);
    });
    var current = $$('.search-item')[searchCursor];
    if (current) current.scrollIntoView({ block: 'nearest' });
  }

  function openSearch() {
    var modal = $('#searchModal');
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    var input = $('#searchInput');
    if (input) {
      input.value = '';
      renderSearch();
      setTimeout(function () { input.focus(); }, 30);
    }
  }

  function closeSearch() {
    var modal = $('#searchModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  function initSearch() {
    buildIndex();
    on($('#searchBtn'), 'click', openSearch);
    on($('#searchModal'), 'click', function (e) {
      if (e.target.closest('[data-close-search]')) closeSearch();
    });

    var input = $('#searchInput');
    on(input, 'input', renderSearch);
    on(input, 'keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveCursor(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveCursor(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var target = $$('.search-item')[searchCursor] || $$('.search-item')[0];
        if (target) { target.click(); }
      }
    });

    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
    });
  }

  /* ---------- 6.5 页面内筛选输入框 ---------- */
  function initPageFilters() {
    var map = [
      ['#resourceSearch', 'resourceQuery', 'resourceFilter', renderResources],
      ['#toolSearch', 'toolQuery', 'toolFilter', renderTools],
      ['#noteSearch', 'noteQuery', 'noteFilter', renderPosts],
      ['#baipiaoSearch', 'baipiaoQuery', 'baipiaoFilter', renderBaipiao],
      ['#charitySearch', 'charityQuery', 'charityFilter', renderCharity]
    ];
    map.forEach(function (cfg) {
      var input = $(cfg[0]);
      if (!input) return;

      // 关键词与分类是两套筛选维度：一旦开始输入关键词，就把分类重置为「全部」，
      // 否则会出现「在云服务器里搜公益镜像 = 0 条」这种反直觉结果。
      on(input, 'input', function () {
        var q = input.value;
        state[cfg[1]] = q;
        // 关键词与属性标签是两套维度：开始输入时清空属性标签，避免「云服务器里搜公益镜像 = 0 条」
        var isMulti = Array.isArray(state[cfg[2]]);
        var hasCat = isMulti ? state[cfg[2]].length > 0 : state[cfg[2]] !== 'all';
        if (q.trim() && hasCat) {
          state[cfg[2]] = isMulti ? [] : 'all';
        }
        // 关键词变化也要刷新筛选栏，否则时间/地区 chip 上的计数会停留在旧结果
        renderFilters();
        cfg[3]();
      });

      on(input, 'keydown', function (e) {
        if (e.key === 'Escape') {
          input.value = '';
          state[cfg[1]] = '';
          state[cfg[2]] = Array.isArray(state[cfg[2]]) ? [] : 'all';
          renderFilters();
          cfg[3]();
        }
      });
    });
  }

  /* ---------- 7. 滚动与导航高亮 ---------- */
  function initScroll() {
    var header = $('#siteHeader');
    var toTop = $('#toTop');

    var ticking = false;
    function update() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (toTop) toTop.classList.toggle('is-visible', y > 620);
      if (header) header.classList.toggle('is-scrolled', y > 8);
      ticking = false;
    }
    on(window, 'scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();

    on(toTop, 'click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 首页内部区块滚动时高亮对应二级入口（仅首页）
    if (PAGE === 'index') {
      var navLinks = $$('.nav-link');
      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === 'index.html') link.classList.add('is-active');
      });
    }
  }

  /* ---------- 8. 入场动画 ---------- */
  function initReveal() {
    var nodes = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /** 数据未能加载时的提示条 */
  function showDataErrorBanner() {
    if (document.getElementById('kmin-data-error')) return;

    var isFile = location.protocol === 'file:';
    var box = document.createElement('div');
    box.id = 'kmin-data-error';
    box.style.cssText = 'max-width:760px;margin:40px auto;padding:22px 26px;' +
      'border:2px solid #1b1a17;border-radius:18px;background:#fff0c2;color:#1b1a17;' +
      'font:500 14px/1.8 system-ui,sans-serif;box-shadow:6px 6px 0 #1b1a17';

    if (isFile) {
      // 只有真正用 file:// 双击打开时才提示启动本地服务
      box.innerHTML = '<b style="font-size:16px">内容没能加载出来</b><br>' +
        '检测到你正在用 <code>file://</code> 直接打开本地文件，浏览器不允许这样读取 data/*.json。<br><br>' +
        '请在项目目录执行：<br>' +
        '<code style="display:inline-block;margin:6px 0;padding:4px 10px;background:rgba(0,0,0,.1);border-radius:6px">python -m http.server 8000</code><br>' +
        '然后打开 <b>http://localhost:8000/</b>';
    } else {
      // 线上环境数据异常：不误导用户去跑 python
      box.innerHTML = '<b style="font-size:16px">内容没能加载出来</b><br>' +
        '数据文件 <code>data/*.json</code> 请求失败，可能是网络问题、部署尚未生效，或浏览器缓存了旧版本。<br><br>' +
        '请先按 <b>Ctrl + F5</b> 强制刷新重试。<br>' +
        '如果仍然不行，检查浏览器控制台（F12）里 <code>[KMin]</code> 开头的报错信息。';
    }
    var main = document.getElementById('main');
    if (main) main.insertBefore(box, main.firstChild);
    else document.body.appendChild(box);
  }

  /* ---------- 8.5 详情页 ---------- */

  /** 全部条目汇总，供详情页按 id 查找 */
  function allEntries() {
    var out = [];
    (DATA.resources || []).forEach(function (x) { out.push({ data: x, group: 'resource' }); });
    (DATA.baipiao || []).forEach(function (x) { out.push({ data: x, group: 'baipiao' }); });
    (DATA.charity || []).forEach(function (x) { out.push({ data: x, group: 'charity' }); });
    (DATA.tools || []).forEach(function (x) { out.push({ data: x, group: 'tool' }); });
    return out;
  }

  var GROUP_META = {
    resource: { page: 'resources.html', labelKey: 'nav.resources', crumb: '资源' },
    baipiao: { page: 'baipiao.html', labelKey: 'nav.baipiao', crumb: '白嫖' },
    charity: { page: 'charity.html', labelKey: 'nav.charity', crumb: '公益站' },
    tool: { page: 'tools.html', labelKey: 'nav.tools', crumb: '工具' }
  };

  /** 渲染详情页 */
  function renderDetailPage() {
    var root = $('#detailRoot');
    if (!root) return;

    var id = param('id');
    var found = null;

    if (id) {
      allEntries().some(function (entry) {
        if (String(entry.data.id) === String(id)) { found = entry; return true; }
        return false;
      });
    }

    var missing = $('#detailMissing');

    if (!found) {
      // 找不到条目：隐藏正文，显示提示
      $$('#detailRoot > *:not(#detailMissing)').forEach(function (n) { n.hidden = true; });
      if (missing) missing.hidden = false;
      document.title = '未找到 · KMin';
      return;
    }

    var item = found.data;
    var group = GROUP_META[found.group] || GROUP_META.resource;
    var nameText = pick(item.name, state.lang) || item.name || '未命名';

    // 页面标题
    document.title = nameText + ' · KMin';

    // 面包屑
    var crumbSection = $('#crumbSection');
    if (crumbSection) {
      crumbSection.textContent = group.crumb;
      crumbSection.setAttribute('href', group.page);
    }
    var crumbCurrent = $('#crumbCurrent');
    if (crumbCurrent) crumbCurrent.textContent = nameText;

    // 概览区
    var logoEl = $('#detailLogo');
    if (logoEl) logoEl.textContent = item.logo || nameText.slice(0, 2);

    var titleEl = $('#detailTitle');
    if (titleEl) titleEl.textContent = nameText;

    var summaryEl = $('#detailSummary');
    if (summaryEl) summaryEl.textContent = pick(item.desc, state.lang) || '';

    // 分类 / 时效
    var tags = tagArray(item);
    var statusTag = getPeriodLabel(item);
    var contentTags = tags;

    // 分类优先用 categories 的中文名（tags[0] 可能是个自定义标签，如 cloudflare）
    var catEl = $('#detailCategory');
    if (catEl) catEl.textContent = categoryLabels(item, groupKeyOf(item)).join(' · ') || group.crumb;

    var statusEl = $('#detailStatus');
    if (statusEl) {
      statusEl.textContent = statusTag;
      statusEl.className = 'detail-status ' + periodClass(item);
    }
    if (isExpired(item)) {
      var detailMain = document.getElementById('main');
      if (detailMain) detailMain.classList.add('is-expired');
    }

    // 标签
    var tagsBox = $('#detailTags');
    if (tagsBox) {
      tagsBox.innerHTML = contentTags.map(function (tg) {
        return '<span class="detail-tag">' + esc(tg) + '</span>';
      }).join('');
    }

    // 结构化数据（黄框）
    var specList = $('#detailSpecList');
    if (specList) {
      var d = item.detail || {};
      // 镜像源等工具类没有"额度"概念，用"用途"替代
      var rows = [
        d.usage ? ['detail.usage', d.usage] : ['detail.quota', d.quota],
        ['detail.items', d.items],
        ['detail.limit', d.limit],
        ['detail.avoid', d.avoid],
        ['detail.more', d.more],
        ['detail.valid', d.valid],
        ['detail.scope', d.scope]
      ];
      specList.innerHTML = rows.filter(function (r) { return r[1]; }).map(function (r) {
        // 文本里的换行要保留（如软仓的九类软件清单，每类单独一行）
        var body = esc(r[1]).replace(/\r?\n/g, '<br>');
        return '<div class="spec-row"><dt>' + esc(t(r[0])) + '</dt><dd>' + body + '</dd></div>';
      }).join('');
    }

    // 使用说明 / 领取教程（按条目类型自动选择标题）
    var guideList = $('#guideList');
    var guideSection = $('#guideSection');
    var guideTitleEl = $('#guideTitle');
    var guide = item.guide || [];

    // 判断标题措辞：能"领取"的用领取教程，纯工具/下载源用使用方式
    if (guideTitleEl && guide.length) {
      var isMirror = (item.tags || []).indexOf('国内镜像源') !== -1;
      var isDownloadTool = (item.tags || []).some(function (tg) {
        return tg === '国内镜像源' || tg === '公益镜像' || tg === '静态托管';
      });
      if (isMirror || isDownloadTool) {
        guideTitleEl.textContent = t('detail.guideUse');
      } else {
        guideTitleEl.textContent = t('detail.guideClaim');
      }
    }

    if (guideList && guideSection) {
      if (guide.length) {
        guideList.innerHTML = guide.map(function (step, i) {
          var title = typeof step === 'string' ? '' : pick(step.title, state.lang);
          var body = typeof step === 'string' ? step : pick(step.body, state.lang);
          return '<li class="guide-step">' +
            '<span class="guide-num" aria-hidden="true">' + (i + 1) + '</span>' +
            '<div class="guide-body">' +
              (title ? '<h3>' + esc(title) + '</h3>' : '') +
              '<p>' + esc(body) + '</p>' +
            '</div>' +
          '</li>';
        }).join('');
      } else {
        guideSection.hidden = true;
      }
    }

    // 按钮
    var visit = $('#detailVisit');
    if (visit) {
      if (item.url) visit.setAttribute('href', item.url);
      else visit.hidden = true;
    }
    var back = $('#detailBack');
    if (back) back.setAttribute('href', group.page);
  }

  /* ---------- 9. 启动 ---------- */
  function init() {
    var yearNode = $('#year');
    if (yearNode) yearNode.textContent = new Date().getFullYear();

    // 数据为空时（常见于双击打开 HTML），直接给出可操作的提示，而不是留一个空白页
    var hasAnyData = (DATA.resources || []).length || (DATA.tools || []).length ||
                     (DATA.posts || []).length || (DATA.baipiao || []).length;
    if (!hasAnyData) {
      showDataErrorBanner();
      return;
    }

    computeStats();

    // 各页支持 ?cat=xxx 直达分类
    var cat = param('cat');
    if (cat) {
      var catMap = [
        ['tool', 'toolFilter'],
        ['baipiao', 'baipiaoFilter'],
        ['charity', 'charityFilter'],
        ['resource', 'resourceFilter']
      ];
      catMap.forEach(function (pair) {
        var list = (DATA.categories && DATA.categories[pair[0]]) || [];
        if (!list.some(function (c) { return c.id === cat; })) return;
        // 多选的组用数组接收，单选组保持字符串
        state[pair[1]] = Array.isArray(state[pair[1]]) ? [cat] : cat;
      });
    }

    var isDetail = PAGE === 'detail';

    var steps = [
      ['initTheme', initTheme],
      ['initLang', initLang],
      ['initMenu', initMenu],
      ['initSubNav', initSubNav],
      ['initSearch', initSearch],
      ['initPageFilters', initPageFilters],
      ['initScroll', initScroll],
      ['initReveal', initReveal],
      ['initCopyButtons', initCopyButtons],
      ['applyStaticText', applyStaticText],
      // 详情页没有列表容器，跳过列表渲染
      ['renderAll', isDetail ? function () {} : renderAll],
      ['renderSearch', renderSearch],
      // 详情页专属
      ['renderDetailPage', isDetail ? renderDetailPage : function () {}]
    ];
    // 分步执行：任何一步失败都不应该让整页渲染停摆，同时把错误留在 console 便于排查
    steps.forEach(function (s) {
      try {
        s[1]();
      } catch (err) {
        if (window.console && console.error) {
          console.error('[KMin] init step failed:', s[0], err);
        }
        window.__KMIN_INIT_ERRORS = window.__KMIN_INIT_ERRORS || [];
        window.__KMIN_INIT_ERRORS.push({ step: s[0], message: String(err && err.message || err) });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
