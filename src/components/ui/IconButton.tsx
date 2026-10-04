import type { CSSProperties, MouseEventHandler, Ref } from 'react';
import { Icon, type IconName } from './Icon';
import styles from './Button.module.css';

const SIZE = { sm: [styles.iconSm, 16], md: [styles.iconMd, 20], lg: [styles.iconLg, 22] } as const;

export interface IconButtonProps {
  icon: IconName;
  /** Accessible label (required). */
  label: string;
  variant?: 'ghost' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  badge?: number | string | null;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

/** Round icon-only button for toolbars and nav. */
export function IconButton({ icon, label, variant = 'ghost', size = 'md', badge, className, ...rest }: IconButtonProps) {
  const [sizeClass, glyph] = SIZE[size];
  return (
    <button
      type="button"
      aria-label={badge != null ? `${label} (${badge})` : label}
      title={label}
      className={[styles.iconButton, sizeClass, styles[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      <Icon name={icon} size={glyph} />
      {badge != null && <span className={styles.badge} aria-hidden="true">{badge}</span>}
    </button>
  );
}
