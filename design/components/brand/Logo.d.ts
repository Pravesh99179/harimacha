import type React from 'react';
/**
 * Hari Matcha logo (direction 1a — whisk as the "I").
 * @startingPoint section="Brand" subtitle="Primary lockup, compact, mark, app icon" viewport="700x320"
 */
export interface LogoProps { variant?: 'wordmark' | 'compact' | 'mark' | 'appIcon'; tone?: 'onLight' | 'onDark'; /** cap-height-ish size in px */ size?: number; showTagline?: boolean; showHindi?: boolean; style?: React.CSSProperties; }
export declare function Logo(props: LogoProps): JSX.Element;
