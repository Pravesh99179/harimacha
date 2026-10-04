'use client';

import type { CSSProperties, ReactNode } from 'react';
import styles from './Choice.module.css';

export interface RadioProps<V extends string = string> {
  checked?: boolean;
  onChange?: (value: V) => void;
  value: V;
  name?: string;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Single radio option; group several with the same name. */
export function Radio<V extends string = string>({ checked = false, onChange, label, description, name, value, disabled = false, className, style }: RadioProps<V>) {
  return (
    <label className={[styles.choice, disabled && styles.disabled, className].filter(Boolean).join(' ')} style={style}>
      <input
        type="radio"
        className={styles.native}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
      />
      <span className={`${styles.box} ${styles.radio}`} aria-hidden="true">
        <span className={`${styles.mark} ${styles.dot}`} />
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
