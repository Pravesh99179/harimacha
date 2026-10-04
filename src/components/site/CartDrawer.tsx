'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart';
import { rupee } from '@/lib/format';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Logo } from '@/components/ui/Logo';
import { Text } from '@/components/ui/Text';
import { Placeholder } from './Placeholder';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { items, subtotal, open, setOpen, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus();
    };
  }, [open, setOpen]);

  return (
    <div className={[styles.root, open && styles.open].filter(Boolean).join(' ')} inert={!open}>
      <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className={styles.head}>
          <Text variant="heading-md" as="h2" id="cart-title">Your cart</Text>
          <IconButton ref={closeRef} icon="x" label="Close cart" onClick={() => setOpen(false)} />
        </div>

        <div className={[styles.meter, !left && styles.unlocked].filter(Boolean).join(' ')} aria-live="polite">
          {left ? `You're ${rupee(left)} away from free shipping` : 'Free shipping unlocked'}
          <div className={styles.track} role="progressbar" aria-label="Progress to free shipping" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {items.length === 0 ? (
          <div className={styles.items}>
            <div className={styles.empty}>
              <Logo variant="mark" size={64} />
              <Text variant="body-md">Your cart is empty.</Text>
            </div>
          </div>
        ) : (
          <ul className={styles.items}>
            {items.map((i) => (
              <li key={i.key} className={styles.line}>
                <Placeholder label={i.id} height={84} radius={10} className={styles.thumb} />
                <div className={styles.info}>
                  <div className={styles.row}>
                    <Link href={`/products/${i.id}`} className={styles.name} onClick={() => setOpen(false)}>{i.name}</Link>
                    <span className={styles.total}>{rupee(i.unit * i.qty)}</span>
                  </div>
                  <span className={styles.size}>{i.size}</span>
                  <div className={styles.controls}>
                    <IconButton size="sm" variant="outline" icon="minus" label={`One less ${i.name}`} onClick={() => setQty(i.key, i.qty - 1)} />
                    <span className={styles.qty} aria-label={`Quantity ${i.qty}`}>{i.qty}</span>
                    <IconButton size="sm" variant="outline" icon="plus" label={`One more ${i.name}`} onClick={() => setQty(i.key, i.qty + 1)} />
                    <Button size="sm" variant="ghost" className={styles.remove} onClick={() => remove(i.key)}>Remove</Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.foot}>
          <div className={styles.subtotal}><span>Subtotal</span><span>{rupee(subtotal)}</span></div>
          {/* TODO: integrate Razorpay or Shopify checkout. */}
          <Button size="lg" fullWidth disabled={!items.length} iconRight="arrow-right">Checkout</Button>
          <Text variant="caption" color="var(--text-secondary)" align="center">UPI, cards and COD accepted</Text>
        </div>
      </aside>
    </div>
  );
}
