import type React from 'react';
/** Typography primitive mapped to the type tokens. */
export interface TextProps { variant?: 'display-xl'|'display-lg'|'display-md'|'display-sm'|'heading-lg'|'heading-md'|'heading-sm'|'body-lg'|'body-md'|'body-sm'|'caption'|'overline'|'label'; as?: string; color?: string; align?: 'left'|'center'|'right'; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Text(props: TextProps): JSX.Element;
