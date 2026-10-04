import type React from 'react';
/**
 * Pill button.
 * @startingPoint section="Actions" subtitle="Primary, secondary, accent, outline, ghost, danger" viewport="700x300"
 */
export interface ButtonProps { variant?: 'primary'|'secondary'|'accent'|'outline'|'ghost'|'danger'; size?: 'sm'|'md'|'lg'; iconLeft?: string; iconRight?: string; fullWidth?: boolean; disabled?: boolean; type?: 'button'|'submit'; onClick?: (e: any) => void; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Button(props: ButtonProps): JSX.Element;
