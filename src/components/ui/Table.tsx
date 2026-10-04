'use client';

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import styles from './Table.module.css';

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  render?: (row: Row) => ReactNode;
}

export interface TableProps<Row> {
  columns: TableColumn<Row>[];
  rows: Row[];
  dense?: boolean;
  striped?: boolean;
  onRowClick?: (row: Row) => void;
  rowKey: (row: Row) => string;
  className?: string;
  style?: CSSProperties;
}

/** Data table with cream header. */
export function Table<Row>({ columns, rows, dense, striped, onRowClick, rowKey, className, style }: TableProps<Row>) {
  const onKey = (e: KeyboardEvent, row: Row) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick?.(row);
    }
  };
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')} style={style}>
      <table className={[styles.table, dense && styles.dense, striped && styles.striped].filter(Boolean).join(' ')}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={styles.th} style={{ textAlign: c.align ?? 'left', width: c.width }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={rowKey(r)}
              className={[styles.row, onRowClick && styles.clickable].filter(Boolean).join(' ')}
              onClick={onRowClick ? () => onRowClick(r) : undefined}
              onKeyDown={onRowClick ? (e) => onKey(e, r) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
            >
              {columns.map((c) => (
                <td key={c.key} className={styles.td} style={{ textAlign: c.align ?? 'left' }}>
                  {c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
