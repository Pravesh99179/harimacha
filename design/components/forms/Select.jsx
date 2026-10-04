import React from 'react';
import { Icon } from '../brand/Icon.jsx';

export function Select({ label, options = [], value, onChange, placeholder = 'Select…', helper, error, disabled = false, size = 'md', style }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const off = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);
  const current = options.find((o) => o.value === value);
  const border = error ? 'var(--input-border-error)' : open ? 'var(--input-border-focus)' : hover ? 'var(--input-border-hover)' : 'var(--input-border)';
  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ fontSize: 'var(--input-label-size)', fontWeight: 'var(--input-label-weight)', color: 'var(--input-label-fg)' }}>{label}</span>}
      <button
        type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen(!open)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, height: `var(--input-height-${size})`, padding: '0 12px 0 var(--input-padding-x)',
          background: disabled ? 'var(--input-bg-disabled)' : 'var(--input-bg)', border: `1.5px solid ${border}`, borderRadius: 'var(--input-radius)',
          boxShadow: open ? 'var(--input-ring-focus)' : 'none', fontFamily: 'var(--font-sans)', fontSize: 'var(--input-font-size)',
          color: current ? 'var(--input-fg)' : 'var(--input-placeholder)', cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current ? current.label : placeholder}</span>
        <Icon name="chevron-down" size={18} color="var(--input-icon-fg)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-base) var(--ease-out)' }} />
      </button>
      {open && (
        <div role="listbox" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 20,
          background: 'var(--select-menu-bg)', border: '1px solid var(--select-menu-border)', borderRadius: 'var(--select-menu-radius)',
          boxShadow: 'var(--select-menu-shadow)', padding: 'var(--select-menu-padding)', display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {options.map((o) => <SelectItem key={o.value} option={o} selected={o.value === value} onPick={() => { onChange && onChange(o.value); setOpen(false); }} />)}
        </div>
      )}
      {(error || helper) && <span style={{ fontSize: 'var(--input-helper-size)', color: error ? 'var(--text-error)' : 'var(--input-helper-fg)' }}>{error || helper}</span>}
    </div>
  );
}

function SelectItem({ option, selected, onPick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role="option" aria-selected={selected} onClick={onPick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, minHeight: 'var(--select-item-height)', padding: '0 var(--select-item-padding-x)',
        borderRadius: 'var(--select-item-radius)', cursor: 'pointer', fontSize: 15,
        background: selected ? 'var(--select-item-bg-selected)' : hover ? 'var(--select-item-bg-hover)' : 'transparent',
        color: selected ? 'var(--select-item-fg-selected)' : 'var(--text-primary)', fontWeight: selected ? 500 : 400,
      }}
    >
      <span style={{ flex: 1 }}>{option.label}</span>
      {option.meta && <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{option.meta}</span>}
      {selected && <Icon name="check" size={16} />}
    </div>
  );
}
