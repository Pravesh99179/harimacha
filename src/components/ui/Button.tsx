import Link from 'next/link';
import type { ButtonHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const ICON_SIZE: Record<ButtonSize, string> = {
  sm: 'var(--button-icon-sm)',
  md: 'var(--button-icon-md)',
  lg: 'var(--button-icon-lg)',
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  /** Renders a Next.js link styled as a button. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  'aria-label'?: string;
  'aria-current'?: ButtonHTMLAttributes<HTMLButtonElement>['aria-current'];
}

/** Pill button. Keep to one `primary` per view; `accent` is for value moments. */
export function Button({
  variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth = false, disabled = false,
  type = 'button', href, className, children, ...rest
}: ButtonProps) {
  const cls = [styles.button, styles[size], styles[variant], fullWidth && styles.fullWidth, className].filter(Boolean).join(' ');
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </>
  );
  if (href && !disabled) {
    return <Link href={href} className={cls} {...rest}>{content}</Link>;
  }
  return <button type={type} disabled={disabled} className={cls} {...rest}>{content}</button>;
}
