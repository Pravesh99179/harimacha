import React from 'react';
import { Icon } from '../brand/Icon.jsx';

export function Badge({ tone = 'matcha', size = 'md', icon, children, style }) {
  const t = {
    matcha: ['var(--status-success-bg)', 'var(--status-success-fg)'],
    haldi: ['var(--status-warning-bg)', 'var(--status-warning-fg)'],
    mirchi: ['var(--status-error-bg)', 'var(--status-error-fg)'],
    neel: ['var(--status-info-bg)', 'var(--status-info-fg)'],
    neutral: ['var(--neutral-100)', 'var(--neutral-700)'],
    brand: ['var(--matcha-900)', 'var(--cream-200)'],
    accent: ['var(--haldi-300)', 'var(--matcha-950)'],
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, height: `var(--badge-height-${size})`, padding: `0 ${size === 'sm' ? 8 : 10}px`,
      borderRadius: 'var(--badge-radius)', background: t[0], color: t[1], fontFamily: 'var(--font-sans)',
      fontSize: size === 'sm' ? 11 : 'var(--badge-font-size)', fontWeight: 'var(--badge-font-weight)', letterSpacing: '0.02em', whiteSpace: 'nowrap', ...style,
    }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 12 : 14} />}{children}
    </span>
  );
}
