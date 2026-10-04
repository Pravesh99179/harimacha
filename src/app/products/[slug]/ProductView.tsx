'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { rupee } from '@/lib/format';
import { unitPrice, type Plan } from '@/lib/pricing';
import { useCart } from '@/lib/cart';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/site/Photo';
import styles from './ProductView.module.css';

export function ProductView({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes[0].value);
  const [plan, setPlan] = useState<Plan>('once');
  // TODO: pass gift wrap through to checkout once it exists.
  const [gift, setGift] = useState(false);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');

  const s = p.sizes.find((x) => x.value === size) ?? p.sizes[0];
  const base = s.price;
  const unit = unitPrice(base, plan);
  const pinError = pincode && !/^\d{6}$/.test(pincode) ? 'Pincodes are 6 digits' : null;

  return (
    <main className={`container ${styles.main}`}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li><Link href="/shop">Shop</Link></li>
          <li aria-current="page"><Icon name="chevron-right" size={14} />{p.name}</li>
        </ol>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          {p.images.map((img, i) =>
            i === 0 ? (
              <Photo key={img.src} {...img} height={520} sizes="(max-width: 900px) 100vw, 55vw" priority className={styles.galleryMain} />
            ) : (
              <Photo key={img.src} {...img} height={180} sizes="(max-width: 900px) 33vw, 18vw" className={styles.gallerySub} />
            ),
          )}
        </div>

        <div className={styles.buy}>
          <div className={styles.badges}>
            <Badge tone="matcha" icon="leaf">{p.grade}</Badge>
            {p.tag && <Badge tone="accent">{p.tag}</Badge>}
          </div>
          <Text variant="display-md" as="h1" color="var(--text-brand)">{p.name}</Text>
          <Text variant="body-lg" color="var(--text-secondary)">{p.blurb}</Text>

          <div className={styles.price} aria-live="polite">
            <span className={styles.total}>{rupee(unit * qty)}</span>
            {plan === 'sub' && <span className={styles.was}><span className="visually-hidden">was </span>{rupee(base * qty)}</span>}
            {p.cup && <span className={styles.perCup}>≈ {rupee(p.cup)} a cup</span>}
          </div>

          <div className={styles.options}>
            <Select
              label="Size"
              value={size}
              onChange={setSize}
              options={p.sizes.map((x) => ({ value: x.value, label: x.label, meta: rupee(x.price) }))}
            />
            <div className={styles.qtyField} role="group" aria-labelledby="qty-label">
              <Text variant="label" id="qty-label">Qty</Text>
              <div className={styles.stepper}>
                <IconButton size="sm" icon="minus" label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty(Math.max(1, qty - 1))} />
                <span className={styles.qty} aria-live="polite">{qty}</span>
                <IconButton size="sm" icon="plus" label="Increase quantity" onClick={() => setQty(qty + 1)} />
              </div>
            </div>
          </div>

          <Card as="fieldset" padding={16} className={styles.plans}>
            <legend className="visually-hidden">Purchase plan</legend>
            <Radio<Plan> name="plan" value="once" checked={plan === 'once'} onChange={setPlan} label="One-time purchase" />
            <Radio<Plan>
              name="plan"
              value="sub"
              checked={plan === 'sub'}
              onChange={setPlan}
              label="Subscribe & save 15%"
              description="Delivered every 30 days. Skip or cancel anytime."
            />
          </Card>

          <Switch checked={gift} onChange={setGift} label="Gift wrap with a handwritten note (free)" />

          <Button variant="accent" size="lg" fullWidth iconLeft="shopping-bag" onClick={() => add(p, s, qty, unit)}>
            Add to cart · {rupee(unit * qty)}
          </Button>

          <Input
            label="Check delivery"
            placeholder="6-digit pincode"
            iconLeft="map-pin"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            error={pinError}
            helper={!pinError && pincode ? 'Arrives in 2–4 days' : 'We ship across India'}
          />
        </div>
      </div>
    </main>
  );
}
