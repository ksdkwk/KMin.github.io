#!/usr/bin/env node
/**
 * build-content.js · 内容构建器
 *
 * 作用：把 content/ 目录下的 Markdown 编译成 data/*.json。
 * 构建只在本机跑，线上仍是纯静态文件，GitHub Pages 可直接托管。
 *
 * 用法：
 *   node build-content.js           编译全部
 *   node build-content.js --watch   监听变化自动编译
 */

'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = __dirname;
var CONTENT_DIR = path.join(ROOT, 'content');
var DATA_DIR = path.join(ROOT, 'data');

/* ---------- 1. 迷你 YAML 解析 ---------- */

function parseScalar(raw) {
  var s = raw.trim();
  if (s === '') return '';
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null' || s === '~') return null;
  if (/^-?[0-9]+$/.test(s)) return parseInt(s, 10);
  if (/^-?[0-9]+[.][0-9]+$/.test(s)) return parseFloat(s);
  if (s.charAt(0) === '"') {
    try { return JSON.parse(s); } catch (e) {}
  }
  if (s.charAt(0) === "'" && s.charAt(s.length - 1) === "'") {
    return s.slice(1, -1).replace(/''/g, "'");
  }
  if (s.charAt(0) === '[' && s.charAt(s.length - 1) === ']') {
    try { return JSON.parse(s); } catch (e) {}
  }
  return s;
}

function parseFrontMatter(text) {
  var lines = text.split(/\r?\n/);
  var result = {};
  var stack = [{ indent: -1, obj: result }];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line.trim()) continue;
    if (/^\s*#/.test(line)) continue;

    var indent = line.match(/^(\s*)/)[1].length;
    var body = line.trim();

    if (body.indexOf('- ') === 0) {
      var top = stack[stack.length - 1];
      if (Array.isArray(top.obj)) top.obj.push(parseScalar(body.slice(2)));
      continue;
    }

    var m = body.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;

    var key = m[1];
    var valRaw = m[2];

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    var parent = stack[stack.length - 1].obj;

    if (valRaw === '') {
      var next = lines[i + 1] || '';
      var nextIndent = next.match(/^(\s*)/)[1].length;
      var isList = /^\s*-\s+/.test(next) && nextIndent > indent;
      var child = isList ? [] : {};
      parent[key] = child;
      stack.push({ indent: indent, obj: child });
    } else {
      parent[key] = parseScalar(valRaw);
    }
  }
  return result;
}

/* ---------- 2. Markdown 渲染 ---------- */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInline(s) {
  var out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/[*][*]([^*]+)[*][*]/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

function renderMarkdown(md) {
  if (!md) return '';
  var lines = md.split(/\r?\n/);
  var html = [];
  var listMode = null;
  var inCode = false;
  var codeBuf = [];

  function closeList() {
    if (listMode) { html.push('</' + listMode + '>'); listMode = null; }
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (/^```/.test(line.trim())) {
      if (inCode) {
        html.push('<pre><code>' + escapeHtml(codeBuf.join('\n')) + '</code></pre>');
        codeBuf = [];
        inCode = false;
      } else { closeList(); inCode = true; }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    if (!line.trim()) { closeList(); continue; }

    var h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeList();
      var lvl = h[1].length;
      html.push('<h' + lvl + '>' + renderInline(h[2]) + '</h' + lvl + '>');
      continue;
    }

    var ul = line.match(/^\s*[-*]\s+(.*)$/);
    if (ul) {
      if (listMode !== 'ul') { closeList(); html.push('<ul>'); listMode = 'ul'; }
      html.push('<li>' + renderInline(ul[1]) + '</li>');
      continue;
    }

    var ol = line.match(/^\s*[0-9]+[.]\s+(.*)$/);
    if (ol) {
      if (listMode !== 'ol') { closeList(); html.push('<ol>'); listMode = 'ol'; }
      html.push('<li>' + renderInline(ol[1]) + '</li>');
      continue;
    }

    closeList();
    html.push('<p>' + renderInline(line) + '</p>');
  }
  closeList();
  if (inCode && codeBuf.length) html.push('<pre><code>' + escapeHtml(codeBuf.join('\n')) + '</code></pre>');
  return html.join('\n');
}

/* ---------- 3. 解析文件 ---------- */

function parseFile(filePath) {
  var raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  var fm = {};
  var body = raw;
  var match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (match) {
    fm = parseFrontMatter(match[1]);
    body = match[2];
  }
  return { fm: fm, body: body.trim(), file: path.basename(filePath) };
}

/* ---------- 4. 转换规则 ---------- */

function bilingual(fm, key) {
  var v = fm[key];
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    return { zh: v.zh || '', en: v.en || v.zh || '' };
  }
  if (typeof v === 'string') return { zh: v, en: v };
  return null;
}

function splitBilingualBody(body) {
  var zhParts = [];
  var enParts = [];
  var cur = null;
  body.split(/\r?\n/).forEach(function (line) {
    var m = line.match(/^##\s*(zh|en)\s*$/i);
    if (m) { cur = m[1].toLowerCase(); return; }
    if (cur === 'zh') zhParts.push(line);
    else if (cur === 'en') enParts.push(line);
    else if (cur === null) zhParts.push(line);
  });
  var zh = zhParts.join('\n').trim();
  var en = enParts.join('\n').trim();
  return { zh: zh, en: en || zh };
}

function parseGuideSteps(text) {
  var steps = [];
  var blocks = String(text).split(/^###\s+/m).filter(Boolean);
  blocks.forEach(function (block) {
    var lines = block.split(/\r?\n/);
    var title = (lines[0] || '').trim();
    var body = lines.slice(1).join('\n').trim();
    if (title) steps.push({ title: title, body: body });
  });
  return steps;
}

function detailFromFm(fm) {
  if (!fm.detail) return undefined;
  var out = {};
  ['quota', 'usage', 'items', 'limit', 'avoid', 'more', 'valid', 'scope'].forEach(function (k) {
    if (fm.detail[k] != null) out[k] = fm.detail[k];
  });
  return out;
}

/* ---------- 4.0 时效区间（有效期）解析 ---------- */

/**
 * 时效区间的四段式模型：
 *   from 有值 + to 无值 → 长期有效
 *                       → 卡片显示「<from 格式化日期> -- ∞」
 *   from 无值 + to 有值 → 卡片显示「<to 格式化日期>结束」
 *   from 有值 + to 有值 → 卡片显示「<from> -- <to>」
 *   from 无值 + to 无值 → 长期有效
 *
 * 日期一律规范成 YYYY.M.D（不补零），与需求示例「2026.11.8」一致。
 */
var STATUS_TAGS = ['长期有效', '现在可薅', '失效'];

/** 把 2026-11-08 / 2026/11/8 / 2026.11.8 / 20261108 统一成 2026.11.8 */
function normalizeDate(raw) {
  if (raw == null || raw === '') return '';
  if (raw instanceof Date) return formatDate(raw);
  var s = String(raw).trim();
  var m = s.match(/^(\d{4})[-./年]?(\d{1,2})[-./月]?(\d{1,2})日?$/);
  if (!m) return '';
  var y = parseInt(m[1], 10);
  var mo = parseInt(m[2], 10);
  var d = parseInt(m[3], 10);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return '';
  return y + '.' + mo + '.' + d;
}

function formatDate(dt) {
  return dt.getFullYear() + '.' + (dt.getMonth() + 1) + '.' + dt.getDate();
}

/** 解析 front-matter 里的 validFrom / validTo；兼容旧字段 expireDate / startDate / endDate */
function parsePeriod(fm) {
  var from = normalizeDate(fm.validFrom != null ? fm.validFrom : (fm.startDate != null ? fm.startDate : fm.start));
  var to = normalizeDate(fm.validTo != null ? fm.validTo : (fm.endDate != null ? fm.endDate : fm.end));
  return { from: from, to: to };
}

/** 布局文案：'long' | 'fromOnly' | 'toOnly' | 'range' */
function periodShape(period) {
  if (period.from && period.to) return 'range';
  if (period.from) return 'fromOnly';
  if (period.to) return 'toOnly';
  return 'long';
}

/** 卡片上展示的时效文字（构建期算好，前端不再重复推导） */
function periodLabel(period, lang) {
  var shape = periodShape(period);
  if (shape === 'range') return period.from + ' -- ' + period.to;
  if (shape === 'fromOnly') return period.from + ' -- ∞';
  if (shape === 'toOnly') return period.to + (lang === 'en' ? ' ended' : '结束');
  return lang === 'en' ? 'Long-term' : '长期有效';
}

/** 结束时间是否已过（只比到日期，当天算未结束） */
function isExpired(period) {
  if (!period.to) return false;
  var parts = period.to.split('.');
  var end = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 23, 59, 59, 999);
  return Date.now() > end.getTime();
}

/* ---------- 4.0.5 地区归属 ---------- */

/**
 * 地区是条目的固有属性，只参与筛选，不影响时效。
 *
 * 卡片只有两种归属：
 *   cn       中国大陆（运营商 / 高校 / 国内公司提供的服务）
 *   overseas 港澳台及国外
 *
 * 筛选栏的第三个「全球」不是一个归属值，而是「不做地区过滤」的意思——
 * 因为任何一张卡片都必然属于 cn 或 overseas 其中之一，没有第三种。
 *
 * 一个条目可以同时归属两边（例如公共 DNS 既有 114 也有 1.1.1.1），
 * 所以内部统一存成数组，筛选时取交集非空即命中。
 */
var REGION_IDS = ['cn', 'overseas'];

/**
 * region 字段可以写单个值，也可以写列表：
 *   region: cn           → ['cn']        只属于中国大陆
 *   region: overseas     → ['overseas']  只属于港澳台及国外
 *   region: [cn, overseas] 或 region: global → 两边都算（不限地区的基础设施）
 * 不写时按「两边都算」兜底：宁可多显示，也不要凭空把一个条目藏起来。
 */
function normalizeRegion(raw) {
  var list = toArray(raw);
  var out = [];
  list.forEach(function (v) {
    var s = String(v).trim().toLowerCase();
    if (s === 'cn' || s === 'china' || s === 'mainland' || s === '中国大陆') s = 'cn';
    else if (s === 'overseas' || s === 'global-outside' || s === '港澳台及国外' || s === '国际') s = 'overseas';
    else if (s === 'global' || s === '全球') { s = ''; if (out.indexOf('cn') === -1) out.push('cn'); if (out.indexOf('overseas') === -1) out.push('overseas'); return; }
    else return;
    if (s && out.indexOf(s) === -1) out.push(s);
  });
  if (!out.length) out = ['cn', 'overseas'];
  return out;
}

/* ---------- 4.1 统一卡片数据接口（资源 / 白嫖 / 公益站共用） ---------- */

/**
 * 三类条目在 Markdown 里高度重合，统一产出同一套结构，
 * 前端因此可以用同一个卡片组件渲染；差异字段放在可选槽位里：
 *   资源   → provider / requirements
 *   白嫖   → expire
 *   公益站 → org
 * 公共字段（三类都一定有）：id / order / group / name / tag / desc /
 *   logo / url / badge / tags / category / detail / guide
 */
var ENTRY_SCHEMA = {
  resources: { group: 'resource', catKey: 'resource', defaultCategory: '' },
  baipiao:   { group: 'baipiao', catKey: 'baipiao', defaultCategory: 'api' },
  charity:   { group: 'charity', catKey: 'charity', defaultCategory: 'mirror' }
};

/** 分类中文名 → 分类 id 的索引，按功能区分组，避免 api 之类的重名冲突 */
var CATEGORY_INDEX = null;

function categoryLabelIndex() {
  if (CATEGORY_INDEX) return CATEGORY_INDEX;
  CATEGORY_INDEX = {};
  try {
    var cats = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'categories.json'), 'utf8'));
    Object.keys(cats).forEach(function (key) {
      var map = {};
      (cats[key] || []).forEach(function (c) {
        if (c && c.id && c.id !== 'all' && c.label && c.label.zh) map[c.label.zh] = c.id;
      });
      CATEGORY_INDEX[key] = map;
    });
  } catch (e) {
    // categories.json 缺失时退化为「无分类」，不影响构建
  }
  return CATEGORY_INDEX;
}

/**
 * 从 tags 里反推分类 id。
 * 资源页的历史数据没有 category 字段，分类是靠 tags 里的中文分类标签表达的，
 * 统一数据接口时在构建期折算成 category，前端就不用再区分两套规则。
 */
function deriveCategory(tags, catKey) {
  var map = categoryLabelIndex()[catKey] || {};
  var out = [];
  for (var i = 0; i < tags.length; i++) {
    if (map[tags[i]] && out.indexOf(map[tags[i]]) === -1) out.push(map[tags[i]]);
  }
  return out;
}

/**
 * 把 Markdown 里的分类写法统一成 id 数组。
 * 支持三种写法，一篇可以同时属于多个分类：
 *   category: server                      → ['server']
 *   category: [server, api]               → ['server', 'api']
 *   categories:                           → 同 category（新写法，语义更清楚）
 *     - server
 *     - api
 * 也接受中文分类名，会按 categories.json 折算成 id。
 */
function normalizeCategories(fm, tags, catKey, fallback) {
  var raw = fm.categories != null ? fm.categories : fm.category;
  var list = toArray(raw);
  var index = categoryLabelIndex()[catKey] || {};
  var out = [];

  list.forEach(function (v) {
    var id = String(v).trim();
    if (!id) return;
    if (index[id]) id = index[id];           // 中文名 → id
    if (out.indexOf(id) === -1) out.push(id);
  });

  if (!out.length) {
    // 没有显式分类时，从 tags 里的分类标签反推（资源页一直是这么写的）
    out = deriveCategory(tags, catKey);
  }
  if (!out.length && fallback) out.push(fallback);
  return out;
}

/** 统一构建一个条目；groupKey 取 resources / baipiao / charity */
function buildEntry(parsed, groupKey) {
  var fm = parsed.fm;
  var conf = ENTRY_SCHEMA[groupKey] || {};
  var tags = toArray(fm.tags);
  var categories = normalizeCategories(fm, tags, conf.catKey, conf.defaultCategory);

  // 时效区间：front-matter 的 validFrom / validTo 优先；
  // 老数据只有 tags 里的状态标签，做一次迁移映射，避免升级后全部变成「长期有效」
  var period = parsePeriod(fm);
  if (!period.from && !period.to) {
    var legacy = tags.filter(function (t) { return STATUS_TAGS.indexOf(t) !== -1; });
    if (legacy.indexOf('失效') !== -1) {
      // 旧数据只写了「失效」没写日期：视为「到某个未记录的时间点结束」，
      // 用一个明确的过期日期表达，保证样式和统计仍然正确
      period.to = '2026.1.1';
    }
  }
  var expired = isExpired(period);
  // 状态标签从此由日期推导，不再手写在 tags 里
  tags = tags.filter(function (t) { return STATUS_TAGS.indexOf(t) === -1; });

  var out = {
    id: fm.id,
    order: fm.order != null ? Number(fm.order) : null,
    group: conf.group || groupKey,
    name: bilingual(fm, 'name'),
    tag: bilingual(fm, 'tag'),
    desc: bilingual(fm, 'desc'),
    logo: fm.logo || '',
    url: fm.url || '',
    badge: bilingual(fm, 'badge'),
    tags: tags,
    // ---- 地区归属（三类列表共用）----
    region: normalizeRegion(fm.region),
    // ---- 时效区间（三类列表共用同一套规则） ----
    period: { from: period.from, to: period.to, shape: periodShape(period) },
    periodLabel: { zh: periodLabel(period, 'zh'), en: periodLabel(period, 'en') },
    expired: expired,
    // categories 是权威字段（数组，支持一文多分类）；
    // category / pageCat 保留首项，兼容旧代码与旧缓存
    categories: categories,
    category: categories[0] || '',
    pageCat: categories[0] || '',
    // ---- 可选扩展槽位：没有的组就留空，前端按 group 决定是否渲染 ----
    provider: fm.provider || '',
    requirements: fm.requirements || '',
    expire: bilingual(fm, 'expire'),
    org: bilingual(fm, 'org')
  };

  var d = detailFromFm(fm);
  if (d) out.detail = d;
  out.guide = extractGuide(parsed);
  return out;
}

/** 从正文的 "## 教程" 段落解析步骤 */
function extractGuide(parsed) {
  if (fm_flag(parsed) === 'none') return [];
  if (!/^##\s*教程/m.test(parsed.body)) return [];
  var section = parsed.body.split(/^##\s*教程.*$/m)[1] || '';
  return parseGuideSteps(section);
}

function fm_flag(parsed) {
  var g = parsed.fm && parsed.fm.guide;
  if (g === false || g === 'none') return 'none';
  return 'auto';
}

/** 三类列表卡片走同一套构建逻辑，只按 groupKey 决定分类口径 */
function buildResource(parsed) { return buildEntry(parsed, 'resources'); }
function buildBaipiao(parsed) { return buildEntry(parsed, 'baipiao'); }
function buildCharity(parsed) { return buildEntry(parsed, 'charity'); }

function buildTool(parsed) {
  var fm = parsed.fm;
  var out = {
    // 工具也需要 id 才能打开详情页；没写就用文件名（去掉序号前缀）
    id: fm.id || parsed.file.replace(/.md$/i, '').replace(/^[0-9]+-/, 't-'),
    name: fm.name,
    icon: fm.icon || '',
    category: fm.category || 'dev',
    desc: bilingual(fm, 'desc'),
    tags: normalizeTags(fm.tags),
    free: fm.free !== false,
    url: fm.url || ''
  };
  // ---- 详情页字段（与资源/白嫖/公益站共用同一套 detail 结构）----
  var d = detailFromFm(fm);
  if (d) out.detail = d;
  if (fm.usage) out.usage = fm.usage;
  if (fm.provider) out.provider = fm.provider;
  var period = parsePeriod(fm);
  out.period = { from: period.from, to: period.to, shape: periodShape(period) };
  out.periodLabel = { zh: periodLabel(period, 'zh'), en: periodLabel(period, 'en') };
  out.expired = isExpired(period);
  out.guide = extractGuide(parsed);
  return out;
}

/** 把 tags 统一成 { zh: [...], en: [...] } 结构 */
function normalizeTags(raw) {
  if (!raw) return { zh: [], en: [] };
  // 已经是 {zh:[], en:[]} 且元素是数组 → 直接用
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    var zh = toArray(raw.zh);
    var en = toArray(raw.en);
    return { zh: zh, en: en.length ? en : zh };
  }
  // 退化成纯数组时当作中文
  var arr = toArray(raw);
  return { zh: arr, en: arr };
}

/** 把可能是 "[a, b]" 字符串、或数组、或单值 统一成数组 */
function toArray(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v.map(String);
  var s = String(v).trim();
  if (s.charAt(0) === '[' && s.charAt(s.length - 1) === ']') {
    return s.slice(1, -1).split(',').map(function (x) {
      return x.trim().replace(/^["']|["']$/g, '');
    }).filter(Boolean);
  }
  if (s === '') return [];
  return [s];
}

function buildPost(parsed) {
  var fm = parsed.fm;
  return {
    date: fm.date || '',
    title: bilingual(fm, 'title'),
    excerpt: bilingual(fm, 'excerpt'),
    tags: normalizeTags(fm.tags),
    url: fm.url || '#notes'
  };
}

/* ---------- 5. 编译 ---------- */

var BUILDERS = {
  resources: { fn: buildResource, out: 'resources.json' },
  baipiao:   { fn: buildBaipiao,  out: 'baipiao.json' },
  charity:   { fn: buildCharity,  out: 'charity.json' },
  tools:     { fn: buildTool,     out: 'tools.json' },
  posts:     { fn: buildPost,     out: 'posts.json' }
};

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(function (f) { return /\.md$/i.test(f); })
    .sort()
    .map(function (f) { return path.join(dir, f); });
}

function buildAll() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  var report = [];
  Object.keys(BUILDERS).forEach(function (type) {
    var conf = BUILDERS[type];
    var dir = path.join(CONTENT_DIR, type);
    var files = listMarkdown(dir);
    if (!files.length) {
      report.push({ type: type, skipped: true, reason: 'content/' + type + ' 为空' });
      return;
    }
    var items = [];
    var errors = [];
    files.forEach(function (file) {
      try {
        var item = conf.fn(parseFile(file));
        item.__file = path.basename(file);
        items.push(item);
      } catch (err) {
        errors.push(path.basename(file) + ': ' + err.message);
      }
    });

    // 排序：有 order 字段按 order，没有则按文件名
    items.sort(function (a, b) {
      var ao = a.order, bo = b.order;
      if (ao != null && bo != null) return ao - bo;
      if (ao != null) return -1;
      if (bo != null) return 1;
      return a.__file < b.__file ? -1 : (a.__file > b.__file ? 1 : 0);
    });
    items.forEach(function (item) { delete item.__file; });

    fs.writeFileSync(path.join(DATA_DIR, conf.out), JSON.stringify(items, null, 2) + '\n', 'utf8');
    report.push({ type: type, count: items.length, file: conf.out, errors: errors });
  });
  return report;
}

function printReport(report) {
  console.log('');
  console.log('内容编译完成');
  console.log('');
  report.forEach(function (r) {
    if (r.skipped) {
      console.log('  - ' + r.type + ' 跳过 (' + r.reason + ')');
    } else {
      console.log('  ✓ ' + r.type + '  ' + r.count + ' 条 → data/' + r.file);
      r.errors.forEach(function (e) { console.log('      ✗ ' + e); });
    }
  });
  console.log('');
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('找不到 content/ 目录');
    process.exit(1);
  }

  // --check：只校验 Markdown 能否正确解析，不写文件
  if (process.argv.indexOf('--check') !== -1) {
    var problems = 0;
    Object.keys(BUILDERS).forEach(function (type) {
      var dir = path.join(CONTENT_DIR, type);
      var files = listMarkdown(dir);
      if (!files.length) return;
      console.log('');
      console.log(type + ':');
      files.forEach(function (file) {
        try {
          var parsed = parseFile(file);
          var item = BUILDERS[type].fn(parsed);
          var label = (item.name && (item.name.zh || item.name)) || item.name || path.basename(file);
          console.log('  ✓ ' + path.basename(file) + '  →  ' + label);
        } catch (err) {
          problems++;
          console.log('  ✗ ' + path.basename(file) + '  ' + err.message);
        }
      });
    });
    console.log('');
    console.log(problems === 0 ? '全部通过' : (problems + ' 个文件有问题'));
    process.exit(problems === 0 ? 0 : 1);
  }

  printReport(buildAll());
  if (process.argv.indexOf('--watch') !== -1 || process.argv.indexOf('-w') !== -1) {
    console.log('监听 content/ 变化中… (Ctrl+C 退出)');
    var timer = null;
    fs.watch(CONTENT_DIR, { recursive: true }, function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        console.log('检测到改动，重新编译…');
        printReport(buildAll());
      }, 200);
    });
  }
}

main();
