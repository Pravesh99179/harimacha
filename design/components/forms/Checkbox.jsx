import React from 'react';
import { Icon } from '../brand/Icon.jsx';

export function Checkbox({ checked = false, indeterminate = false, onChange, label, description, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  const on = checked || indeterminate;
  return (
    <label
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 'var(--checkbox-label-gap)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}
    >
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 'var(--checkbox-size)', height: 'var(--checkbox-size)', flex: 'none', marginTop: 1,
        borderRadius: 'var(--checkbox-radius)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: on ? 'var(--checkbox-bg-checked)' : 'var(--checkbox-bg)',
        border: `var(--checkbox-border-width) solid ${on ? 'var(--checkbox-bg-checked)' : hover && !disabled ? 'var(--checkbox-border-hover)' : 'var(--checkbox-border)'}`,
        color: 'var(--checkbox-mark)', transition: 'background var(--duration-fast) var(--ease-out)',
      }}>
        {on && <Icon name={indeterminate ? 'minus' : 'check'} size={14} />}
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
