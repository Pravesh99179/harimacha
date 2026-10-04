import type { CSSProperties } from 'react';
import styles from './Placeholder.module.css';

export interface PlaceholderProps {
  /** Describes the intended shot, e.g. "hero · whisking matcha in a bowl". */
  label: string;
  height?: number | string;
  tone?: 'cream' | 'dark';
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Striped stand-in for photography that hasn't been shot yet.
 * Replace with next/image once real assets exist.
 */
export function Placeholder({ label, height = 280, tone = 'cream', radius = 16, className, style }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={[styles.placeholder, styles[tone], className].filter(Boolean).join(' ')}
      style={{ height, borderRadius: radius, ...style }}
    >
      <span className={styles.tag} aria-hidden="true">{label}</span>
    </div>
  );
}
