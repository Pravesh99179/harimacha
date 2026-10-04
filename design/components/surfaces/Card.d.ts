import type React from 'react';
/** Surface container. */
export interface CardProps { tone?: 'default'|'cream'|'brand'; padding?: number | string; interactive?: boolean; onClick?: () => void; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Card(props: CardProps): JSX.Element;
