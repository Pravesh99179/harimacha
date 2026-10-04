'use client';

import { useRouter } from 'next/navigation';
import { fromPrice, type Product } from '@/data/products';
import { rupee } from '@/lib/format';
import { useCart } from '@/lib/cart';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';

export function GradeTable({ products, className }: { products: Product[]; className?: string }) {
  const router = useRouter();
  const { add } = useCart();
  return (
    <Table<Product>
      className={className}
      rows={products}
      rowKey={(r) => r.slug}
      onRowClick={(r) => router.push(`/products/${r.slug}`)}
      columns={[
        {
          key: 'name',
          header: 'Grade',
          render: (r) => (
            <span style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 500, whiteSpace: 'nowrap' }}>
              {r.name}
              {r.tag && <Badge tone="accent" size="sm">{r.tag}</Badge>}
            </span>
          ),
        },
        { key: 'blurb', header: 'Tastes like', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.blurb}</span> },
        { key: 'cup', header: 'Per cup', align: 'right', render: (r) => (r.cup ? rupee(r.cup) : '—') },
        { key: 'price', header: 'From', align: 'right', render: (r) => <span style={{ fontWeight: 500 }}>{rupee(fromPrice(r))}</span> },
        {
          key: 'add',
          header: <span className="visually-hidden">Add to cart</span>,
          align: 'right',
          width: 110,
          render: (r) => (
            <Button
              size="sm"
              variant="secondary"
              aria-label={`Add ${r.name} to cart`}
              onClick={(e) => {
                e.stopPropagation();
                add(r, r.sizes[0]);
              }}
            >
              Add
            </Button>
          ),
        },
      ]}
    />
  );
}
