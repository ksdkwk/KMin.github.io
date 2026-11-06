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
  ['quota', 'usage', 'limit', 'avoid', 'valid', 'scope'].forEach(function (k) {
    if (fm.detail[k] != null) out[k] = fm.detail[k];
  });
  return out;
}

function buildResource(parsed) {
  var fm = parsed.fm;
  var out = {
    id: fm.id,
    order: fm.order != null ? Number(fm.order) : null,
    name: bilingual(fm, 'name'),
    tag: bilingual(fm, 'tag'),
    desc: bilingual(fm, 'desc'),
    logo: fm.logo || '',
    url: fm.url || '',
    badge: bilingual(fm, 'badge'),
    tags: fm.tags || [],
    provider: fm.provider || '',
    requirements: fm.requirements || ''
  };
  var d = detailFromFm(fm);
  if (d) out.detail = d;
  out.guide = extractGuide(parsed);
  return out;
}

function buildBaipiao(parsed) {
  var fm = parsed.fm;
  var out = {
    id: fm.id,
    order: fm.order != null ? Number(fm.order) : null,
    name: bilingual(fm, 'name'),
    tag: bilingual(fm, 'tag'),
    desc: bilingual(fm, 'desc'),
    logo: fm.logo || '',
    url: fm.url || '',
    badge: bilingual(fm, 'badge'),
    expire: bilingual(fm, 'expire'),
    tags: fm.tags || [],
    pageCat: fm.category || 'quota'
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

function buildCharity(parsed) {
  var fm = parsed.fm;
  var out = {
    id: fm.id,
    order: fm.order != null ? Number(fm.order) : null,
    name: bilingual(fm, 'name'),
    tag: bilingual(fm, 'tag'),
    desc: bilingual(fm, 'desc'),
    logo: fm.logo || '',
    url: fm.url || '',
    badge: bilingual(fm, 'badge'),
    org: bilingual(fm, 'org'),
    tags: fm.tags || [],
    pageCat: fm.category || 'mirror'
  };
  var d = detailFromFm(fm);
  if (d) out.detail = d;
  out.guide = extractGuide(parsed);
  return out;
}

function buildTool(parsed) {
  var fm = parsed.fm;
  return {
    name: fm.name,
    icon: fm.icon || '',
    category: fm.category || 'dev',
    desc: bilingual(fm, 'desc'),
    tags: normalizeTags(fm.tags),
    free: fm.free !== false,
    url: fm.url || ''
  };
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
