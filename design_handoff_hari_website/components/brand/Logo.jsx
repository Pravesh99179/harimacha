import React from 'react';

function WhiskMark({ height, color }) {
  const tines = [];
  for (let i = -5; i <= 5; i++) {
    const f = (v) => (i * v).toFixed(2);
    tines.push(<path key={i} d={`M${f(1.3)} 51 C${f(3.3)} 73 ${f(4.9)} 106 ${f(3.7)} 130`} />);
  }
  return (
    <svg viewBox="-30 0 60 136" style={{ height, width: 'auto', display: 'block', flex: 'none' }} aria-hidden="true">
      <rect x="-7" y="2" width="14" height="44" rx="5" fill={color} />
      <rect x="-10.5" y="44" width="21" height="7" rx="3.5" fill={color} />
      <g fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round">{tines}</g>
    </svg>
  );
}

export function Logo({ variant = 'wordmark', tone = 'onLight', size = 64, showTagline = true, showHindi = false, style }) {
  const ink = tone === 'onDark' ? 'var(--cream-200)' : 'var(--matcha-900)';
  const ground = tone === 'onDark' ? 'var(--cream-200)' : 'var(--matcha-900)';
  const groundInk = tone === 'onDark' ? 'var(--matcha-900)' : 'var(--cream-200)';

  if (variant === 'mark') return <span style={{ display: 'inline-flex', ...style }}><WhiskMark height={size} color={ink} /></span>;
  if (variant === 'appIcon') {
    return (
      <span style={{ width: size, height: size, borderRadius: size * 0.233, background: ground, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', ...style }}>
        <WhiskMark height={size * 0.7} color={groundInk} />
      </span>
    );
  }
  const wordmark = (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: size * 0.04, fontFamily: 'var(--font-display)', fontSize: size, lineHeight: 0.78, color: ink }}>
      <span>HAR</span>
      <span style={{ marginBottom: -size * 0.027 }}><WhiskMark height={size * 0.853} color={ink} /></span>
    </span>
  );
  if (variant === 'compact') return <span style={{ display: 'inline-flex', ...style }}>{wordmark}</span>;
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.12, color: ink, ...style }}>
      {wordmark}
      {showTagline && (
        <span style={{ display: 'flex', alignItems: 'center', gap: size * 0.1 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: Math.max(10, size * 0.16), letterSpacing: '0.5em', marginRight: '-0.5em' }}>MATCHA</span>
          {showHindi && <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: Math.max(11, size * 0.17), color: tone === 'onDark' ? 'var(--matcha-300)' : 'var(--matcha-600)' }}>हरी</span>}
        </span>
      )}
    </span>
  );
}
