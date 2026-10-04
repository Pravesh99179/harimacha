import type React from 'react';
/**
 * Text field with label, helper and error.
 * @startingPoint section="Forms" subtitle="Text input, icon, suffix, error, textarea" viewport="700x380"
 */
export interface InputProps { label?: string; helper?: string; error?: string; iconLeft?: string; suffix?: React.ReactNode; size?: 'sm'|'md'|'lg'; multiline?: boolean; rows?: number; placeholder?: string; value?: string; defaultValue?: string; type?: string; disabled?: boolean; onChange?: (e: any) => void; id?: string; style?: React.CSSProperties; }
export declare function Input(props: InputProps): JSX.Element;
