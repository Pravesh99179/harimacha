import type React from 'react';
/** Round icon-only button. */
export interface IconButtonProps { icon: string; /** accessible label, required */ label: string; variant?: 'ghost'|'primary'|'secondary'|'outline'; size?: 'sm'|'md'|'lg'; badge?: number | string; disabled?: boolean; onClick?: (e: any) => void; style?: React.CSSProperties; }
export declare function IconButton(props: IconButtonProps): JSX.Element;
