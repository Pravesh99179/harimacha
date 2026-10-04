'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Icon } from './Icon';
import field from './Field.module.css';
import styles from './Select.module.css';

export interface SelectOption<V extends string = string> {
  value: V;
  label: string;
  /** Right-aligned secondary text (price, count). */
  meta?: string;
}

export interface SelectProps<V extends string = string> {
  label?: string;
  options: SelectOption<V>[];
  value?: V;
  onChange?: (value: V) => void;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Accessible name when there is no visible label. */
  'aria-label'?: string;
  className?: string;
  style?: CSSProperties;
}

/** Custom listbox select with keyboard support (arrows, Home/End, Enter/Space, Esc, Tab). */
export function Select<V extends string = string>({
  label, options, value, onChange, placeholder = 'Select…', helper, error, disabled = false, size = 'md',
  'aria-label': ariaLabel, className, style,
}: SelectProps<V>) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const current = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', off);
    listRef.current?.focus();
    return () => document.removeEventListener('mousedown', off);
  }, [open]);

  const openMenu = () => {
    if (disabled) return;
    setActive(Math.max(0, selectedIndex));
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const pick = (i: number) => {
    const o = options[i];
    if (o) onChange?.(o.value);
    close();
  };

  const onTriggerKey = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openMenu();
    }
  };

  const onListKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive((a) => Math.min(last, a + 1)); break;
      case 'ArrowUp': e.preventDefault(); setActive((a) => Math.max(0, a - 1)); break;
      case 'Home': e.preventDefault(); setActive(0); break;
      case 'End': e.preventDefault(); setActive(last); break;
      case 'Enter':
      case ' ': e.preventDefault(); pick(active); break;
      case 'Escape': e.preventDefault(); close(); break;
      case 'Tab': close(false); break;
    }
  };

  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const message = error || helper;
  const cls = [field.field, field[size], styles.root, open && styles.open, error && field.invalid, disabled && field.disabled, className]
    .filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={cls} style={style}>
      {label && <span id={labelId} className={field.label}>{label}</span>}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={label ? `${labelId} ${id}-value` : undefined}
        aria-label={label ? undefined : ariaLabel}
        className={`${field.control} ${styles.trigger}`}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKey}
      >
        <span id={`${id}-value`} className={[styles.value, !current && styles.placeholder].filter(Boolean).join(' ')}>
          {current ? current.label : placeholder}
        </span>
        <Icon name="chevron-down" size={18} className={styles.chevron} />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : ariaLabel}
          aria-activedescendant={`${id}-opt-${active}`}
          className={styles.menu}
          onKeyDown={onListKey}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              className={[styles.item, i === active && styles.active].filter(Boolean).join(' ')}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(i)}
            >
              <span className={styles.itemLabel}>{o.label}</span>
              {o.meta && <span className={styles.meta}>{o.meta}</span>}
              {o.value === value && <Icon name="check" size={16} />}
            </li>
          ))}
        </ul>
      )}
      {message && <span className={field.helper}>{message}</span>}
    </div>
  );
}
