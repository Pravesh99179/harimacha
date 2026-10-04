import type React from 'react';
/** Small status / label pill. */
export interface BadgeProps { tone?: 'matcha'|'haldi'|'mirchi'|'neel'|'neutral'|'brand'|'accent'; size?: 'sm'|'md'; icon?: string; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Badge(props: BadgeProps): JSX.Element;
