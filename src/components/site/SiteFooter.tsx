'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { Text } from '@/components/ui/Text';
import styles from './SiteFooter.module.css';

const COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Everyday', href: '/shop?grade=Everyday' },
      { label: 'Ceremonial', href: '/shop?grade=Ceremonial' },
      { label: 'Culinary', href: '/shop?grade=Culinary' },
      { label: 'Tools', href: '/shop?grade=Tools' },
    ],
  },
  {
    // TODO: point these at real pages once the content exists.
    heading: 'Help',
    links: [
      { label: 'Brew guide', href: '/shop' },
      { label: 'Shipping', href: '/shop' },
      { label: 'Returns', href: '/shop' },
      { label: 'Contact', href: '/shop' },
    ],
  },
];

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: send to the newsletter provider.
    if (email.trim()) setDone(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo tone="onDark" size={56} showHindi />
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.heading} className={styles.column} aria-label={col.heading}>
            <Text variant="overline" color="var(--matcha-300)">{col.heading}</Text>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
        <div className={styles.newsletter}>
          <Text variant="overline" color="var(--matcha-300)">Brew notes</Text>
          <Text variant="body-sm">One recipe a month. No spam.</Text>
          {done ? (
            <Badge tone="accent" icon="check" className={styles.done}>You&rsquo;re on the list</Badge>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <Input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.email}
              />
              <Button type="submit" variant="accent">Join</Button>
            </form>
          )}
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>© 2026 Hari Matcha · Packed in India</div>
    </footer>
  );
}
