import React from 'react';

const ICON_CACHE = {};
const ICON_BASE = 'https://unpkg.com/lucide-static@0.460.0/icons/';

// Lucide line icons (CDN), inlined as SVG so they inherit currentColor.
export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.75, style, ...rest }) {
  const [svg, setSvg] = React.useState(ICON_CACHE[name] && typeof ICON_CACHE[name] === 'string' ? ICON_CACHE[name] : '');
  React.useEffect(() => {
    let alive = true;
    if (typeof ICON_CACHE[name] === 'string') { setSvg(ICON_CACHE[name]); return; }
    if (!ICON_CACHE[name]) {
      ICON_CACHE[name] = fetch(ICON_BASE + name + '.svg').then((r) => r.text()).then((t) => {
        const clean = t.replace(/<!--[\s\S]*?-->/g, '').replace(/width="24"/, 'width="100%"').replace(/height="24"/, 'height="100%"');
        ICON_CACHE[name] = clean; return clean;
      });
    }
    Promise.resolve(ICON_CACHE[name]).then((t) => alive && setSvg(t));
    return () => { alive = false; };
  }, [name]);
  const html = svg.replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);
  return (
    <span
      aria-hidden="true"
      {...rest}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ display: 'inline-flex', flex: 'none', width: size, height: size, color, lineHeight: 0, ...style }}
    />
  );
}
