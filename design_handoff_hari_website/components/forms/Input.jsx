import React from 'react';
import { Icon } from '../brand/Icon.jsx';

export function Input({ label, helper, error, iconLeft, suffix, size = 'md', multiline = false, rows = 4, disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const fid = id || React.useId();
  const border = error ? 'var(--input-border-error)' : focus ? 'var(--input-border-focus)' : hover && !disabled ? 'var(--input-border-hover)' : 'var(--input-border)';
  const ring = focus ? (error ? 'var(--input-ring-error)' : 'var(--input-ring-focus)') : 'none';
  const field = {
    flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent', color: 'var(--input-fg)',
    fontFamily: 'var(--font-sans)', fontSize: 'var(--input-font-size)', resize: 'vertical',
    padding: multiline ? '12px 0' : 0, height: multiline ? undefined : '100%', lineHeight: 1.5,
  };
  const Field = multiline ? 'textarea' : 'input';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label htmlFor={fid} style={{ fontSize: 'var(--input-label-size)', fontWeight: 'var(--input-label-weight)', color: disabled ? 'var(--text-disabled)' : 'var(--input-label-fg)' }}>{label}</label>}
      <div
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: multiline ? 'flex-start' : 'center', gap: 10,
          height: multiline ? undefined : `var(--input-height-${size})`, padding: '0 var(--input-padding-x)',
          background: disabled ? 'var(--input-bg-disabled)' : 'var(--input-bg)',
          border: `1.5px solid ${border}`, borderRadius: 'var(--input-radius)', boxShadow: ring,
          transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
        }}
      >
        {iconLeft && <Icon name={iconLeft} size={18} color="var(--input-icon-fg)" style={multiline ? { marginTop: 13 } : undefined} />}
        <Field id={fid} rows={multiline ? rows : undefined} disabled={disabled} aria-invalid={!!error} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest} style={field} />
        {suffix && <span style={{ color: 'var(--text-secondary)', fontSize: 14, flex: 'none' }}>{suffix}</span>}
      </div>
      {(error || helper) && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--input-helper-size)', color: error ? 'var(--text-error)' : 'var(--input-helper-fg)' }}>
          {error && <Icon name="circle-alert" size={14} />}{error || helper}
        </span>
      )}
    </div>
  );
}
