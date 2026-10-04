import React from 'react';
import { Icon } from '../brand/Icon.jsx';

export function Button({ variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth = false, disabled = false, type = 'button', children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const V = {
    primary: ['--button-primary-bg', '--button-primary-bg-hover', '--button-primary-bg-active', '--button-primary-fg', null],
    secondary: ['--button-secondary-bg', '--button-secondary-bg-hover', '--button-secondary-bg-active', '--button-secondary-fg', null],
    accent: ['--button-accent-bg', '--button-accent-bg-hover', '--button-accent-bg-active', '--button-accent-fg', null],
    outline: [null, '--button-outline-bg-hover', '--button-outline-bg-hover', '--button-outline-fg', '--button-outline-border'],
    ghost: [null, '--button-ghost-bg-hover', '--button-ghost-bg-hover', '--button-ghost-fg', null],
    danger: ['--button-danger-bg', '--button-danger-bg-hover', '--button-danger-bg-hover', '--button-danger-fg', null],
  }[variant];
  const c = (t) => (t ? `var(${t})` : 'transparent');
  const bg = disabled ? (variant === 'ghost' || variant === 'outline' ? 'transparent' : 'var(--button-disabled-bg)') : c(press ? V[2] : hover ? V[1] : V[0]);
  const fg = disabled ? 'var(--button-disabled-fg)' : c(V[3]);
  const border = V[4] ? (disabled ? 'var(--button-disabled-bg)' : c(V[4])) : 'transparent';
  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onFocus={(e) => setFocus(e.target.matches(':focus-visible'))}
      onBlur={() => setFocus(false)}
      {...rest}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: 'var(--button-gap)',
        height: `var(--button-height-${size})`, padding: `0 var(--button-padding-x-${size})`,
        fontFamily: 'var(--button-font)', fontWeight: 'var(--button-font-weight)', fontSize: `var(--button-font-size-${size})`,
        letterSpacing: '0.01em', whiteSpace: 'nowrap',
        background: bg, color: fg, border: `1.5px solid ${border}`, borderRadius: 'var(--button-radius)',
        cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none',
        boxShadow: focus ? 'var(--button-focus-ring)' : 'none',
        transform: press && !disabled ? 'scale(0.98)' : 'none',
        transition: 'background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
        ...style,
      }}
    >
      {iconLeft && <Icon name={iconLeft} size={`var(--button-icon-${size})`} />}
      {children}
      {iconRight && <Icon name={iconRight} size={`var(--button-icon-${size})`} />}
    </button>
  );
}
