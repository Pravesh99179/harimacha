import type { CSSProperties } from 'react';
import {
  ArrowRight, Check, ChevronDown, ChevronRight, CircleAlert, Leaf, Mail, MapPin, Menu,
  Minus, Plus, Search, ShoppingBag, SlidersHorizontal, User, X, type LucideIcon,
} from 'lucide-react';

const ICONS = {
  'arrow-right': ArrowRight,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'circle-alert': CircleAlert,
  leaf: Leaf,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  minus: Minus,
  plus: Plus,
  search: Search,
  'shopping-bag': ShoppingBag,
  'sliders-horizontal': SlidersHorizontal,
  user: User,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "shopping-bag"). */
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Lucide line icon tinted with currentColor. */
export function Icon({ name, size = 20, strokeWidth = 1.75, color = 'currentColor', className, style }: IconProps) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ flex: 'none', ...style }}
    />
  );
}
