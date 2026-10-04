import type { CSSProperties, ElementType, ReactNode } from 'react';
import styles from './Text.module.css';

export type TextVariant =
  | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm'
  | 'heading-lg' | 'heading-md' | 'heading-sm'
  | 'body-lg' | 'body-md' | 'body-sm'
  | 'caption' | 'overline' | 'label';

const MAP: Record<TextVariant, [ElementType, 'display' | 'heading' | 'body' | null]> = {
  'display-xl': ['h1', 'display'], 'display-lg': ['h1', 'display'], 'display-md': ['h2', 'display'], 'display-sm': ['h2', 'display'],
  'heading-lg': ['h2', 'heading'], 'heading-md': ['h3', 'heading'], 'heading-sm': ['h4', 'heading'],
  'body-lg': ['p', 'body'], 'body-md': ['p', 'body'], 'body-sm': ['p', 'body'],
  caption: ['span', null], overline: ['span', null], label: ['span', null],
};

export interface TextProps {
  variant?: TextVariant;
  as?: ElementType;
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
}

/** Typography primitive mapped to the type tokens. */
export function Text({ variant = 'body-md', as, color, align, className, style, children, ...rest }: TextProps) {
  const [tag, kind] = MAP[variant];
  const Tag = as ?? tag;
  const cls = [styles.text, kind && styles[kind], styles[variant], className].filter(Boolean).join(' ');
  return (
    <Tag {...rest} className={cls} style={{ color, textAlign: align, ...style }}>
      {children}
    </Tag>
  );
}
