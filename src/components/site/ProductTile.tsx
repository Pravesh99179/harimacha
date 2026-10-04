'use client';

import Link from 'next/link';
import { fromPrice, type Product } from '@/data/products';
import { rupee } from '@/lib/format';
import { useCart } from '@/lib/cart';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from './Photo';
import styles from './ProductTile.module.css';

export function ProductTile({ product: p }: { product: Product }) {
  const { add } = useCart();
  return (
    <Card as="article" padding={0} interactive className={styles.tile}>
      <div className={styles.media}>
        <Photo src={p.images[0].src} alt={p.images[0].alt} height={240} radius={0} sizes="(max-width: 600px) 100vw, 33vw" />
        {p.tag && <Badge tone="accent" className={styles.tag}>{p.tag}</Badge>}
      </div>
      <div className={styles.body}>
        <Text variant="overline" color="var(--text-secondary)">{p.grade}</Text>
        <Text variant="heading-sm" as="h3">
          <Link href={`/products/${p.slug}`} className={styles.link}>{p.name}</Link>
        </Text>
        <Text variant="body-sm" color="var(--text-secondary)" className={styles.blurb}>{p.blurb}</Text>
        <div className={styles.footer}>
          <span className={styles.price}>
            <span className={styles.amount}>{rupee(fromPrice(p))}</span>
            {p.cup && <span className={styles.perCup}>{rupee(p.cup)} a cup</span>}
          </span>
          <Button
            size="sm"
            variant="secondary"
            iconLeft="plus"
            className={styles.add}
            aria-label={`Add ${p.name} to cart`}
            onClick={() => add(p, p.sizes[0])}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
