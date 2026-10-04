'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Choice.module.css';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Checkbox for independent toggles and filters. */
export function Checkbox({ checked = false, indeterminate = false, onChange, label, description, disabled = false, className, style }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className={[styles.choice, disabled && styles.disabled, className].filter(Boolean).join(' ')} style={style}>
      <input
        ref={ref}
        type="checkbox"
        className={styles.native}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={`${styles.box} ${styles.checkbox}`} aria-hidden="true">
        <Icon name={indeterminate ? 'minus' : 'check'} size={14} strokeWidth={2.25} className={styles.mark} />
      </span>
      {(label || description) && (
        <span className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
}
