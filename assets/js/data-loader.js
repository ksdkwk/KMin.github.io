/* ==========================================================================
   data-loader.js · 数据加载器
   
   作用：把 data/*.json 读进来，合并成 window.KMIN_DATA，供 main.js 使用。
   
   为什么要有这个文件：
   - 浏览器出于安全限制，不能直接在 file:// 下 fetch 本地 JSON
   - 这里用同步 XHR 读取，保证 main.js 执行前数据已就绪
   - 同时兼容 file:// 直接双击打开与 http 服务器两种场景
   
   ★ 日常维护只需要改 data/ 目录下的 JSON 文件，不用动这个文件。
   ========================================================================== */
(function () {
  'use strict';

  // 解析自身 <script src=".../data-loader.js?v=xxx"> 里的版本号
  (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var s = scripts[i];
      if (s.src && s.src.indexOf('data-loader.js') !== -1) {
        var m = s.src.match(/[?&]v=([^&]+)/);
        if (m) window.KMIN_DATA_VERSION = m[1];
        break;
      }
    }
  })();

  var FILES = {
    site: 'data/site.json',
    categories: 'data/categories.json',
    resources: 'data/resources.json',
    tools: 'data/tools.json',
    baipiao: 'data/baipiao.json',
    charity: 'data/charity.json',
    posts: 'data/posts.json',
    about: 'data/about.json'
  };

  /**
   * 给请求地址加上防缓存参数。
   * 浏览器会缓存 data/*.json，内容更新后用户可能还看到旧数据；
   * 这里用「部署时间戳」做参数，同一次部署内复用，部署后自动失效。
   */
  function cacheBust(url) {
    // 版本号由 HTML 里的 <script>data-loader.js?v=xxx</script> 注入，
    // 见文件末尾对自身 src 的解析（document.currentScript 在异步场景不可靠）
    var tag = window.KMIN_DATA_VERSION || '';
    if (!tag) {
      var d = new Date();
      tag = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    }
    return url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + encodeURIComponent(tag);
  }

  /** 同步读取一个 JSON 文件；失败时返回 null 而不是抛错 */
  function readJSON(url) {
    try {
      var xhr = new XMLHttpRequest();
      // 加 no-store 让浏览器每次都向服务器确认，配合 cacheBust 彻底避免陈旧数据
      xhr.open('GET', cacheBust(url), false);
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.send(null);

      // 本地 file:// 下 status 可能是 0，也要接受
      if (xhr.status !== 200 && xhr.status !== 0) {
        console.warn('[KMin] 数据文件读取失败:', url, 'status=', xhr.status);
        return null;
      }
      if (!xhr.responseText) {
        console.warn('[KMin] 数据文件为空:', url);
        return null;
      }
      return JSON.parse(xhr.responseText);
    } catch (err) {
      console.error('[KMin] 数据文件解析失败:', url, err);
      return null;
    }
  }

  // file:// 协议下，多数浏览器会拦截对本地文件的 XHR 请求。
  // 这里提前判断并给出明确提示，避免用户看到空白页面却不知道原因。
  if (location.protocol === 'file:') {
    window.__KMIN_FILE_PROTOCOL = true;
  }

  var data = {};

  var site = readJSON(FILES.site) || {};
  data.meta = site.meta || site;
  data.categories = readJSON(FILES.categories) || {};
  data.resources = readJSON(FILES.resources) || [];
  data.tools = readJSON(FILES.tools) || [];
  data.baipiao = readJSON(FILES.baipiao) || [];
  data.charity = readJSON(FILES.charity) || [];
  data.posts = readJSON(FILES.posts) || [];

  var about = readJSON(FILES.about) || {};
  data.timeline = about.timeline || [];
  data.skills = about.skills || [];

  // 兜底：确保关键结构存在，避免 main.js 报错
  data.meta = data.meta || {};
  data.meta.stats = data.meta.stats || {};
  data.categories = data.categories || {};

  window.KMIN_DATA = data;

  // file:// 下数据为空时，直接在页面上给出一句人话提示
  if (location.protocol === 'file:' && !data.resources.length) {
    document.addEventListener('DOMContentLoaded', function () {
      var banner = document.createElement('div');
      banner.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;padding:14px 20px;' +
        'background:#ffc93c;color:#1b1a17;font:600 14px/1.6 system-ui,sans-serif;text-align:center;' +
        'border-top:2px solid #1b1a17';
      banner.innerHTML = '当前是直接双击打开的本地文件，浏览器不允许读取 data/*.json。<br>' +
        '请在项目目录执行 <code style="background:rgba(0,0,0,.12);padding:1px 6px;border-radius:4px">python -m http.server 8000</code>，' +
        '然后访问 <b>http://localhost:8000/</b>';
      document.body.appendChild(banner);
    });
  }

  // 便于排查：控制台可输入 KMIN_DATA 直接看数据
  if (window.console && console.info) {
    console.info('[KMin] 数据已加载:', {
      resources: data.resources.length,
      tools: data.tools.length,
      baipiao: data.baipiao.length,
      charity: data.charity.length,
      posts: data.posts.length
    });
  }
})();
