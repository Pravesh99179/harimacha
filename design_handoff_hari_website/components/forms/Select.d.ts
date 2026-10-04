import type React from 'react';
/** Custom dropdown select. */
export interface SelectOption { value: string; label: string; meta?: string; }
export interface SelectProps { label?: string; options: SelectOption[]; value?: string; onChange?: (value: string) => void; placeholder?: string; helper?: string; error?: string; disabled?: boolean; size?: 'sm'|'md'|'lg'; style?: React.CSSProperties; }
export declare function Select(props: SelectProps): JSX.Element;
