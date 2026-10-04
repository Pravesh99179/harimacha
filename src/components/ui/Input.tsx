'use client';

import { useId, type CSSProperties, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import styles from './Field.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'size' | 'style' | 'className'> {
  label?: string;
  helper?: string;
  error?: string | null;
  iconLeft?: IconName;
  suffix?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  multiline?: boolean;
  rows?: number;
  className?: string;
  style?: CSSProperties;
}

/** Text field with label, helper and error. */
export function Input({
  label, helper, error, iconLeft, suffix, size = 'md', multiline = false, rows = 4,
  disabled = false, id, className, style, ...rest
}: InputProps) {
  const autoId = useId();
  const fid = id ?? autoId;
  const helpId = `${fid}-help`;
  const message = error || helper;
  const cls = [styles.field, styles[size], multiline && styles.multiline, error && styles.invalid, disabled && styles.disabled, className]
    .filter(Boolean).join(' ');
  const fieldProps = {
    id: fid,
    disabled,
    className: styles.input,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': message ? helpId : undefined,
    ...rest,
  };
  return (
    <div className={cls} style={style}>
      {label && <label htmlFor={fid} className={styles.label}>{label}</label>}
      <div className={styles.control}>
        {iconLeft && <Icon name={iconLeft} size={18} className={styles.icon} />}
        {multiline ? <textarea rows={rows} {...fieldProps} /> : <input {...fieldProps} />}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {message && (
        <span id={helpId} className={styles.helper} role={error ? 'alert' : undefined}>
          {error && <Icon name="circle-alert" size={14} />}
          {message}
        </span>
      )}
    </div>
  );
}
