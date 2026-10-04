import type React from 'react';
/**
 * Data table with cream header.
 * @startingPoint section="Data" subtitle="Comparison / order table" viewport="700x340"
 */
export interface TableColumn { key: string; header: React.ReactNode; align?: 'left'|'center'|'right'; width?: number | string; render?: (row: any) => React.ReactNode; }
export interface TableProps { columns: TableColumn[]; rows: any[]; dense?: boolean; striped?: boolean; onRowClick?: (row: any) => void; rowKey?: string; style?: React.CSSProperties; }
export declare function Table(props: TableProps): JSX.Element;
