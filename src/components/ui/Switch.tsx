'use client';

import { useId, type CSSProperties, type ReactNode } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Immediate on/off setting. */
export function Switch({ checked = false, onChange, label, disabled = false, className, style }: SwitchProps) {
  const labelId = useId();
  return (
    <span
      className={[styles.switch, disabled && styles.disabled, className].filter(Boolean).join(' ')}
      style={style}
      onClick={(e) => {
        // Let clicks on the label text toggle too; the button handles its own clicks.
        if (!disabled && e.target === e.currentTarget.lastElementChild) onChange?.(!checked);
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? labelId : undefined}
        disabled={disabled}
        className={styles.track}
        onClick={() => onChange?.(!checked)}
      >
        <span className={styles.thumb} />
      </button>
      {label && <span id={labelId} className={styles.label}>{label}</span>}
    </span>
  );
}
