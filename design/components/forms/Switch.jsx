import React from 'react';

export function Switch({ checked = false, onChange, label, disabled = false, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <button
        type="button" role="switch" aria-checked={checked} disabled={disabled}
        onClick={() => onChange && onChange(!checked)}
        style={{
          position: 'relative', width: 'var(--switch-track-w)', height: 'var(--switch-track-h)', flex: 'none', padding: 0, border: 0,
          borderRadius: 99, background: checked ? 'var(--switch-track-on)' : 'var(--switch-track-off)', cursor: 'inherit',
          transition: 'background var(--duration-base) var(--ease-out)',
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: checked ? 19 : 3, width: 'var(--switch-thumb)', height: 'var(--switch-thumb)', borderRadius: '50%',
          background: checked ? 'var(--switch-thumb-on)' : 'var(--switch-thumb-bg)', boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--duration-base) var(--ease-out)',
        }} />
      </button>
      {label && <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
