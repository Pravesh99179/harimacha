import type React from 'react';
/** Checkbox with optional description. */
export interface CheckboxProps { checked?: boolean; indeterminate?: boolean; onChange?: (checked: boolean) => void; label?: React.ReactNode; description?: React.ReactNode; disabled?: boolean; style?: React.CSSProperties; }
export declare function Checkbox(props: CheckboxProps): JSX.Element;
