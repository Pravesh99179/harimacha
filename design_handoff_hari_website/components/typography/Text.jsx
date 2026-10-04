import React from 'react';

export function Text({ variant = 'body-md', as, color, align, children, style, ...rest }) {
  const map = {
    'display-xl': ['h1', 'display'], 'display-lg': ['h1', 'display'], 'display-md': ['h2', 'display'], 'display-sm': ['h2', 'display'],
    'heading-lg': ['h2', 'heading'], 'heading-md': ['h3', 'heading'], 'heading-sm': ['h4', 'heading'],
    'body-lg': ['p', 'body'], 'body-md': ['p', 'body'], 'body-sm': ['p', 'body'],
    caption: ['span', 'caption'], overline: ['span', 'overline'], label: ['span', 'label'],
  };
  const [tag, kind] = map[variant] || map['body-md'];
  const Tag = as || tag;
  const v = `--type-${variant}`;
  const base = { margin: 0, color: color || 'inherit', textAlign: align, textWrap: 'pretty' };
  let s;
  if (kind === 'display') s = { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: `var(${v}-size)`, lineHeight: `var(${v}-line)`, letterSpacing: `var(${v}-track)` };
  else if (kind === 'heading') s = { fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: `var(${v}-size)`, lineHeight: `var(${v}-line)`, letterSpacing: `var(${v}-track)` };
  else if (kind === 'overline') s = { fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--type-overline-size)', lineHeight: 'var(--type-overline-line)', letterSpacing: 'var(--type-overline-track)', textTransform: 'uppercase' };
  else if (kind === 'label') s = { fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--type-label-size)', lineHeight: 'var(--type-label-line)' };
  else if (kind === 'caption') s = { fontFamily: 'var(--font-sans)', fontSize: 'var(--type-caption-size)', lineHeight: 'var(--type-caption-line)' };
  else s = { fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: `var(${v}-size)`, lineHeight: `var(${v}-line)` };
  return <Tag {...rest} style={{ ...base, ...s, ...style }}>{children}</Tag>;
}
