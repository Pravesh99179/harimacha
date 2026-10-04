import React from 'react';
import { Icon } from '../brand/Icon.jsx';

export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, badge, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const dim = { sm: 36, md: 44, lg: 54 }[size];
  const glyph = { sm: 16, md: 20, lg: 22 }[size];
  const bgs = {
    primary: ['var(--button-primary-bg)', 'var(--button-primary-bg-hover)', 'var(--button-primary-fg)'],
    secondary: ['var(--button-secondary-bg)', 'var(--button-secondary-bg-hover)', 'var(--button-secondary-fg)'],
    ghost: ['transparent', 'var(--button-ghost-bg-hover)', 'var(--button-ghost-fg)'],
    outline: ['transparent', 'var(--button-outline-bg-hover)', 'var(--button-outline-fg)'],
  }[variant];
  return (
    <button
      type="button" aria-label={label} title={label} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      {...rest}
      style={{
        position: 'relative', width: dim, height: dim, borderRadius: 'var(--radius-pill)', flex: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: disabled ? 'transparent' : hover ? bgs[1] : bgs[0],
        color: disabled ? 'var(--button-disabled-fg)' : bgs[2],
        border: variant === 'outline' ? '1.5px solid var(--button-outline-border)' : '1.5px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'background var(--duration-fast) var(--ease-out)',
        ...style,
      }}
    >
      <Icon name={icon} size={glyph} />
      {badge != null && (
        <span style={{ position: 'absolute', top: 2, right: 2, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 99, background: 'var(--haldi-300)', color: 'var(--matcha-950)', fontSize: 11, fontWeight: 600, lineHeight: '18px', fontFamily: 'var(--font-sans)' }}>{badge}</span>
      )}
    </button>
  );
}
