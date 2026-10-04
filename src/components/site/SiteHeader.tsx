'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Logo } from '@/components/ui/Logo';
import styles from './SiteHeader.module.css';

const LINKS = [
  { href: '/shop', label: 'Shop', isActive: (p: string) => p.startsWith('/shop') },
  { href: '/products/kit', label: 'Starter kit', isActive: (p: string) => p === '/products/kit' },
  // "Our story" points home until an about page exists, so it never shows as active.
  { href: '/', label: 'Our story', isActive: () => false },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.announcement}>Free shipping over ₹799 · A free chasen with your first tin</div>
      <div className={styles.bar}>
        <div className={`container ${styles.inner}`}>
          <IconButton
            icon={menuOpen ? 'x' : 'menu'}
            label={menuOpen ? 'Close menu' : 'Menu'}
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          />
          <Link href="/" className={styles.logo} aria-label="Hari Matcha home">
            <Logo variant="compact" size={30} />
          </Link>
          <nav className={styles.nav} aria-label="Main">
            {LINKS.map((l) => {
              const active = l.isActive(pathname);
              return (
                <Button key={l.label} href={l.href} size="sm" variant="ghost" className={active ? styles.active : undefined} aria-current={active ? 'page' : undefined}>
                  {l.label}
                </Button>
              );
            })}
          </nav>
          <div className={styles.actions}>
            <IconButton icon="search" label="Search" className={styles.hideOnPhone} />
            <IconButton icon="user" label="Account" className={styles.hideOnPhone} />
            <IconButton icon="shopping-bag" label="Cart" badge={count || null} onClick={() => setOpen(true)} />
          </div>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Main" className={[styles.mobileNav, menuOpen && styles.open].filter(Boolean).join(' ')}>
        <ul>
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} aria-current={l.isActive(pathname) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
