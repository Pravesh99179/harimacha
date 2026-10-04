import React from 'react';

export function Radio({ checked = false, onChange, label, description, name, value, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <label
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 'var(--checkbox-label-gap)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}
    >
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={() => onChange && onChange(value)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 'var(--radio-size)', height: 'var(--radio-size)', flex: 'none', marginTop: 1, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: checked ? 'var(--checkbox-bg-checked)' : 'var(--checkbox-bg)',
        border: `var(--checkbox-border-width) solid ${checked ? 'var(--checkbox-bg-checked)' : hover && !disabled ? 'var(--checkbox-border-hover)' : 'var(--checkbox-border)'}`,
      }}>
        {checked && <span style={{ width: 'var(--radio-dot-size)', height: 'var(--radio-dot-size)', borderRadius: '50%', background: 'var(--checkbox-mark)' }} />}
      </span>
      {(label || description) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--text-primary)' }}>{label}</span>}
          {description && <span style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{description}</span>}
        </span>
      )}
    </label>
  );
}
