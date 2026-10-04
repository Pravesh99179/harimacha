import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import styles from './Badge.module.css';

export interface BadgeProps {
  tone?: 'matcha' | 'haldi' | 'mirchi' | 'neel' | 'neutral' | 'brand' | 'accent';
  size?: 'sm' | 'md';
  icon?: IconName;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Small status / label pill. */
export function Badge({ tone = 'matcha', size = 'md', icon, className, style, children }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[size], styles[tone], className].filter(Boolean).join(' ')} style={style}>
      {icon && <Icon name={icon} size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
}
