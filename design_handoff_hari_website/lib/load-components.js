// Dev loader for cards + UI kits: fetches component .jsx sources, strips ESM syntax,
// transpiles with Babel standalone and exposes them on window.HariDS.
(function () {
  var FILES = [
    'components/brand/Icon.jsx', 'components/brand/Logo.jsx',
    'components/typography/Text.jsx',
    'components/actions/Button.jsx', 'components/actions/IconButton.jsx',
    'components/forms/Input.jsx', 'components/forms/Select.jsx', 'components/forms/Checkbox.jsx',
    'components/forms/Radio.jsx', 'components/forms/Switch.jsx',
    'components/data/Badge.jsx', 'components/data/Table.jsx',
    'components/surfaces/Card.jsx'
  ];
  async function compile(urls) {
    var srcs = await Promise.all(urls.map(function (u) { return fetch(u).then(function (r) { return r.text(); }); }));
    var code = srcs.map(function (s) {
      return s.replace(/^import .*$/gm, '').replace(/^export (default )?/gm, '');
    }).join('\n');
    var names = Array.from(code.matchAll(/^function ([A-Z]\w*)/gm)).map(function (m) { return m[1]; });
    var wrapped = 'window.__hariOut = (function(){\n' + code + '\nreturn {' + names.join(',') + '};\n})()';
    new Function('React', Babel.transform(wrapped, { presets: ['react'] }).code)(window.React);
    return window.__hariOut;
  }
  window.loadHari = async function (root, extra) {
    root = root || './';
    var ds = await compile(FILES.map(function (f) { return root + f; }));
    window.HariDS = ds;
    if (extra && extra.length) {
      window.__HariScope = ds;
      var more = await (async function () {
        var srcs = await Promise.all(extra.map(function (u) { return fetch(u).then(function (r) { return r.text(); }); }));
        var code = srcs.map(function (s) { return s.replace(/^import .*$/gm, '').replace(/^export (default )?/gm, ''); }).join('\n');
        var names = Array.from(code.matchAll(/^function ([A-Z]\w*)/gm)).map(function (m) { return m[1]; });
        var keys = Object.keys(ds);
        var wrapped = 'window.__hariFn = (function(' + keys.join(',') + '){\n' + code + '\nreturn {' + names.join(',') + '};\n})';
        new Function('React', Babel.transform(wrapped, { presets: ['react'] }).code)(window.React);
        var fn = window.__hariFn;
        return fn.apply(null, keys.map(function (k) { return ds[k]; }));
      })();
      return Object.assign({}, ds, more);
    }
    return ds;
  };
})();
