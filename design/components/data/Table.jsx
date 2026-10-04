import React from 'react';

export function Table({ columns = [], rows = [], dense = false, striped = false, onRowClick, rowKey = 'id', style }) {
  return (
    <div style={{ background: 'var(--table-bg)', border: '1px solid var(--table-border)', borderRadius: 'var(--table-radius)', overflow: 'auto', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--table-cell-fg)' }}>
        <thead>
          <tr style={{ background: 'var(--table-header-bg)' }}>
            {columns.map((c) => (
              <th key={c.key} style={{
                height: 44, padding: '0 var(--table-cell-padding-x)', textAlign: c.align || 'left', width: c.width,
                fontSize: 'var(--table-header-size)', fontWeight: 500, letterSpacing: 'var(--table-header-track)', textTransform: 'uppercase',
                color: 'var(--table-header-fg)', borderBottom: '1px solid var(--table-border)', whiteSpace: 'nowrap',
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => <TableRow key={r[rowKey] ?? i} row={r} index={i} columns={columns} dense={dense} striped={striped} last={i === rows.length - 1} onClick={onRowClick} />)}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ row, index, columns, dense, striped, last, onClick }) {
  const [hover, setHover] = React.useState(false);
  const bg = hover && onClick ? 'var(--table-row-bg-hover)' : striped && index % 2 === 1 ? 'var(--table-row-bg-stripe)' : 'transparent';
  return (
    <tr onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick ? () => onClick(row) : undefined} style={{ background: bg, cursor: onClick ? 'pointer' : 'default' }}>
      {columns.map((c) => (
        <td key={c.key} style={{
          height: dense ? 'var(--table-row-height-dense)' : 'var(--table-row-height)', padding: '0 var(--table-cell-padding-x)',
          textAlign: c.align || 'left', borderBottom: last ? 0 : '1px solid var(--table-border)', fontVariantNumeric: 'tabular-nums',
        }}>{c.render ? c.render(row) : row[c.key]}</td>
      ))}
    </tr>
  );
}
