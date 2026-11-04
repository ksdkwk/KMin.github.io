/* ==========================================================================
   main.js · 站点交互与渲染
   模块：0.工具函数 1.国际化 2.主题 3.语言下拉 4.移动菜单
        5.内容渲染 6.筛选 7.搜索 8.滚动相关 9.数字动画 10.启动
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var DATA = window.KMIN_DATA || {};

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

  /** 极简 HTML 转义，数据里出现尖括号也不会破坏结构 */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function on(target, type, handler, opts) {
    if (target) target.addEventListener(type, handler, opts);
  }

  /* ---------- 1. 国际化 ---------- */
  var I18N = {
    zh: {
      'a11y.skip': '跳到主要内容',
      'nav.home': '首页', 'nav.resources': '资源', 'nav.tools': '工具', 'nav.notes': '笔记', 'nav.about': '关于',
      'ui.search': '搜索', 'ui.theme': '切换主题', 'ui.lang': '切换语言', 'ui.menu': '菜单', 'ui.top': '回到顶部',
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
      'status.ok': '现在可薅', 'status.warn': '有限制', 'status.off': '已失效',
      'unit.entry': '条', 'unit.tool': '个'
    },
    en: {
      'a11y.skip': 'Skip to main content',
      'nav.home': 'Home', 'nav.resources': 'Resources', 'nav.tools': 'Tools', 'nav.notes': 'Notes', 'nav.about': 'About',
      'ui.search': 'Search', 'ui.theme': 'Toggle theme', 'ui.lang': 'Switch language', 'ui.menu': 'Menu', 'ui.top': 'Back to top',
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
      'status.ok': 'Available', 'status.warn': 'Limited', 'status.off': 'Expired',
      'unit.entry': 'entries', 'unit.tool': 'tools'
    }
  };

  var state = {
    lang: 'zh',
    theme: 'light',
    resourceFilter: 'all',
    toolFilter: 'all'
  };

  function t(key) {
    var dict = I18N[state.lang] || I18N.zh;
    return dict[key] != null ? dict[key] : (I18N.zh[key] || key);
  }

  /** 应用静态节点上的所有 data-i18n* 属性 */
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
    $('#langBtn').setAttribute('aria-label', t('ui.lang'));
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
      if (e.target.closest('a')) close();
    });

    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) close();
    });
  }

  /* ---------- 5. 内容渲染 ---------- */
  var STATUS_CLASS = { ok: 'is-ok', warn: 'is-warn', off: 'is-off' };
  var STATUS_KEY = { ok: 'status.ok', warn: 'status.warn', off: 'status.off' };

  function renderResources() {
    var grid = $('#resourceGrid');
    if (!grid) return;
    var list = (DATA.resources || []).filter(function (item) {
      return state.resourceFilter === 'all' || item.category === state.resourceFilter;
    });

    grid.innerHTML = '';
    if (!list.length) {
      grid.appendChild(el('p', 'search-empty', esc(t('search.empty'))));
      return;
    }

    list.forEach(function (item, i) {
      var card = el('article', 'res-card');
      card.style.animationDelay = Math.min(i * 30, 240) + 'ms';

      var statusCls = STATUS_CLASS[item.status] || 'is-off';
      var statusTxt = t(STATUS_KEY[item.status] || 'status.off');

      card.innerHTML =
        '<div class="res-head">' +
          '<span class="res-logo">' + esc(item.logo || pick(item.name, state.lang).slice(0, 2)) + '</span>' +
          '<div class="res-titles">' +
            '<h3 class="res-name">' + esc(pick(item.name, state.lang)) + '</h3>' +
            '<p class="res-tag">' + esc(pick(item.tag, state.lang)) + '</p>' +
          '</div>' +
        '</div>' +
        '<p class="res-desc">' + esc(pick(item.desc, state.lang)) + '</p>' +
        '<div class="res-foot">' +
          '<span class="status ' + statusCls + '"><i aria-hidden="true"></i>' + esc(statusTxt) + '</span>' +
          '<a class="res-go" href="' + esc(item.url || '#resources') + '" target="_blank" rel="noopener noreferrer">' +
            esc(pick(item.badge, state.lang) || 'Open') +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
          '</a>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function renderTools() {
    var grid = $('#toolGrid');
    if (!grid) return;
    var list = (DATA.tools || []).filter(function (item) {
      return state.toolFilter === 'all' || item.category === state.toolFilter;
    });

    grid.innerHTML = '';
    if (!list.length) {
      grid.appendChild(el('p', 'search-empty', esc(t('search.empty'))));
      return;
    }

    list.forEach(function (item, i) {
      var node = el('article', 'tool-item');
      node.style.animationDelay = Math.min(i * 30, 240) + 'ms';

      var tags = (pick(item.tags, state.lang) || []).map(function (tag) {
        return '<span class="tag">' + esc(tag) + '</span>';
      }).join('');

      node.innerHTML =
        '<span class="tool-icon" aria-hidden="true">' + esc(item.icon || '') + '</span>' +
        '<div class="tool-body">' +
          '<h3 class="tool-name">' + esc(item.name) +
            (item.free ? '<span class="tag">' + (state.lang === 'zh' ? '免费 / 开源' : 'Free / OSS') + '</span>' : '') +
          '</h3>' +
          '<p class="tool-desc">' + esc(pick(item.desc, state.lang)) + '</p>' +
          '<div class="tool-tags">' + tags + '</div>' +
        '</div>' +
        '<a class="res-go" href="' + esc(item.url || '#tools') + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(item.name) + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
        '</a>';
      grid.appendChild(node);
    });
  }

  function renderFilters() {
    [['#resourceFilters', 'resource', 'resourceFilter'], ['#toolFilters', 'tool', 'toolFilter']].forEach(function (cfg) {
      var box = $(cfg[0]);
      if (!box) return;
      var cats = (DATA.categories && DATA.categories[cfg[1]]) || [];
      var source = cfg[1] === 'resource' ? (DATA.resources || []) : (DATA.tools || []);

      box.innerHTML = '';
      cats.forEach(function (cat) {
        var count = cat.id === 'all'
          ? source.length
          : source.filter(function (it) { return it.category === cat.id; }).length;

        var btn = el('button', 'chip' + (state[cfg[2]] === cat.id ? ' is-active' : ''));
        btn.type = 'button';
        btn.setAttribute('aria-pressed', String(state[cfg[2]] === cat.id));
        btn.setAttribute('data-cat', cat.id);
        btn.innerHTML = esc(pick(cat.label, state.lang)) + '<span class="chip-count">' + count + '</span>';

        on(btn, 'click', function () {
          state[cfg[2]] = cat.id;
          renderFilters();
          if (cfg[1] === 'resource') renderResources(); else renderTools();
        });
        box.appendChild(btn);
      });
    });
  }

  function renderPosts() {
    var list = $('#postList');
    if (!list) return;
    list.innerHTML = '';
    (DATA.posts || []).forEach(function (post) {
      var tags = (pick(post.tags, state.lang) || []).map(function (tag) {
        return '<span class="tag">' + esc(tag) + '</span>';
      }).join('');

      var item = el('a', 'post-item');
      item.href = post.url || '#notes';
      item.innerHTML =
        '<time class="post-date" datetime="' + esc(post.date) + '">' + esc(post.date) + '</time>' +
        '<div class="post-main">' +
          '<h3 class="post-title">' + esc(pick(post.title, state.lang)) + '</h3>' +
          '<p class="post-excerpt">' + esc(pick(post.excerpt, state.lang)) + '</p>' +
        '</div>' +
        '<div class="post-tags">' + tags + '</div>';
      list.appendChild(item);
    });
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
  }

  /**
   * 统计数字口径：
   *   data.js 的 meta.stats 里写了值 → 用写死的展示数字（适合"总收录"这类人工口径）
   *   meta.stats 里给了数字 → 用它（累计展示口径，如"累计收录 128 条"）
   *   给 null / 删掉该键 → 自动按数组真实长度计算，增删条目后数字自动同步
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

  /** 更新所有 data-count 数字 */
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
    renderPosts();
    renderAbout();
    renderCounts();
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
        anchor: '#resources',
        name: pick(item.name, 'zh'),
        nameEn: pick(item.name, 'en'),
        desc: { zh: pick(item.desc, 'zh'), en: pick(item.desc, 'en') }
      });
    });
    (DATA.tools || []).forEach(function (item) {
      searchIndex.push({
        type: 'tool',
        anchor: '#tools',
        name: pick(item.name, 'zh'),
        nameEn: pick(item.name, 'en'),
        desc: { zh: pick(item.desc, 'zh'), en: pick(item.desc, 'en') }
      });
    });
    (DATA.posts || []).forEach(function (post) {
      searchIndex.push({
        type: 'post',
        anchor: '#notes',
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
      row.setAttribute('data-close-search', '');
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
    renderSearch();
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

  /* ---------- 7. 滚动相关 ---------- */
  function initScroll() {
    var header = $('#siteHeader');
    var toTop = $('#toTop');
    var navLinks = $$('.nav-link');
    var sections = navLinks.map(function (link) {
      return $(link.getAttribute('href'));
    }).filter(Boolean);

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

    // 导航高亮跟随滚动
    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(function (sec) { spy.observe(sec); });
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

  /* ---------- 9. 启动 ---------- */
  function init() {
    var yearNode = $('#year');
    if (yearNode) yearNode.textContent = new Date().getFullYear();

    computeStats();

    initTheme();
    initLang();
    initMenu();
    initSearch();
    initScroll();
    initReveal();

    applyStaticText();
    renderAll();
    renderSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
