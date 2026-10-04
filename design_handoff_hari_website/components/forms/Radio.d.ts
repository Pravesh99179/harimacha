import type React from 'react';
/** Single radio option; group several with the same name. */
export interface RadioProps { checked?: boolean; onChange?: (value: string) => void; value?: string; name?: string; label?: React.ReactNode; description?: React.ReactNode; disabled?: boolean; style?: React.CSSProperties; }
export declare function Radio(props: RadioProps): JSX.Element;
