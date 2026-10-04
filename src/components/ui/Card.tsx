import type { CSSProperties, ElementType, MouseEventHandler, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  tone?: 'default' | 'cream' | 'brand';
  padding?: number | string;
  /** Lifts 2px with shadow-md on hover. */
  interactive?: boolean;
  as?: ElementType;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Surface container. */
export function Card({ tone = 'default', padding, interactive = false, as: Tag = 'div', className, style, children, ...rest }: CardProps) {
  return (
    <Tag
      className={[styles.card, styles[tone], interactive && styles.interactive, className].filter(Boolean).join(' ')}
      style={{ padding, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
