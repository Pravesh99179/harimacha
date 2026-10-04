import React from 'react';

export function Card({ tone = 'default', padding, interactive = false, onClick, children, style }) {
  const [hover, setHover] = React.useState(false);
  const t = {
    default: ['var(--card-bg)', '1px solid var(--card-border)', 'var(--text-primary)'],
    cream: ['var(--surface-cream)', '1px solid transparent', 'var(--matcha-950)'],
    brand: ['var(--surface-brand)', '1px solid transparent', 'var(--text-on-brand)'],
  }[tone];
  return (
    <div
      onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: t[0], border: t[1], color: t[2], borderRadius: 'var(--card-radius)', padding: padding ?? 'var(--card-padding)',
        boxShadow: interactive && hover ? 'var(--card-shadow-hover)' : 'none', transform: interactive && hover ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
        cursor: interactive ? 'pointer' : 'default', ...style,
      }}
    >{children}</div>
  );
}
