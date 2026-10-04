'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { GRADES, fromPrice, getProducts, type Grade } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { IconButton } from '@/components/ui/IconButton';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Text } from '@/components/ui/Text';
import { ProductTile } from '@/components/site/ProductTile';
import styles from './ShopView.module.css';

type Sort = 'popular' | 'low' | 'high';

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: 'popular', label: 'Most loved' },
  { value: 'low', label: 'Price: low to high' },
  { value: 'high', label: 'Price: high to low' },
];

interface ShopState {
  grades: Grade[];
  sort: Sort;
  inStock: boolean;
}

/**
 * URL contract: `?grade=Everyday,Ceremonial&sort=low&stock=all`.
 * No `grade` param means every grade; an empty `grade=` means none.
 */
function parse(params: URLSearchParams): ShopState {
  const g = params.get('grade');
  const grades = g === null ? GRADES : GRADES.filter((x) => g.split(',').includes(x));
  const s = params.get('sort');
  const sort: Sort = s === 'low' || s === 'high' ? s : 'popular';
  return { grades, sort, inStock: params.get('stock') !== 'all' };
}

function serialize(state: ShopState): string {
  const p = new URLSearchParams();
  if (state.grades.length !== GRADES.length) p.set('grade', GRADES.filter((g) => state.grades.includes(g)).join(','));
  if (state.sort !== 'popular') p.set('sort', state.sort);
  if (!state.inStock) p.set('stock', 'all');
  const q = p.toString().replace(/%2C/g, ',');
  return q ? `?${q}` : '';
}

export function ShopViewFromUrl() {
  const params = useSearchParams();
  return <ShopView query={params.toString()} />;
}

/** `query` is the search string without the leading `?`. */
export function ShopView({ query }: { query: string }) {
  const state = parse(new URLSearchParams(query));
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  // Next.js keeps useSearchParams in sync with history.replaceState, without a server round trip.
  const update = (patch: Partial<ShopState>) => {
    window.history.replaceState(null, '', `${window.location.pathname}${serialize({ ...state, ...patch })}`);
  };

  const toggleGrade = (g: Grade, on: boolean) =>
    update({ grades: on ? [...state.grades, g] : state.grades.filter((x) => x !== g) });

  let list = getProducts().filter((p) => state.grades.includes(p.grade) && (!state.inStock || p.inStock));
  if (state.sort === 'low') list = [...list].sort((a, b) => fromPrice(a) - fromPrice(b));
  if (state.sort === 'high') list = [...list].sort((a, b) => fromPrice(b) - fromPrice(a));

  const filters = (
    <fieldset className={styles.filters}>
      <legend><Text variant="label">Grade</Text></legend>
      {GRADES.map((g) => (
        <Checkbox key={g} label={g} checked={state.grades.includes(g)} onChange={(on) => toggleGrade(g, on)} />
      ))}
      <div className={styles.divider} />
      <Switch label="In stock only" checked={state.inStock} onChange={(on) => update({ inStock: on })} />
    </fieldset>
  );

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.title}>
        <Text variant="overline" color="var(--text-secondary)">Shop</Text>
        <Text variant="display-md" as="h1" color="var(--text-brand)">All matcha</Text>
      </div>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Filters">{filters}</aside>
        <div>
          <div className={styles.toolbar}>
            <Text variant="body-sm" color="var(--text-secondary)" aria-live="polite">
              {list.length} {list.length === 1 ? 'product' : 'products'}
            </Text>
            <div className={styles.toolbarRight}>
              <Button size="sm" variant="outline" iconLeft="sliders-horizontal" className={styles.filterButton} onClick={() => setSheetOpen(true)}>
                Filters
              </Button>
              <Select<Sort>
                size="sm"
                aria-label="Sort by"
                className={styles.sort}
                value={state.sort}
                onChange={(sort) => update({ sort })}
                options={SORT_OPTIONS}
              />
            </div>
          </div>
          {list.length ? (
            <ul className={styles.grid}>
              {list.map((p) => <li key={p.slug}><ProductTile product={p} /></li>)}
            </ul>
          ) : (
            <div className={styles.empty}>
              <Text variant="body-md">Nothing matches those filters.</Text>
              <Button variant="outline" size="sm" onClick={() => update({ grades: GRADES, inStock: true })}>Clear filters</Button>
            </div>
          )}
        </div>
      </div>
      <FilterSheet open={sheetOpen} onClose={closeSheet} count={list.length}>{filters}</FilterSheet>
    </main>
  );
}

function FilterSheet({ open, onClose, count, children }: { open: boolean; onClose: () => void; count: number; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div className={[styles.sheetRoot, open && styles.open].filter(Boolean).join(' ')} inert={!open}>
      <div className={styles.sheetOverlay} onClick={onClose} aria-hidden="true" />
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="filter-title">
        <div className={styles.sheetHead}>
          <Text variant="heading-sm" as="h2" id="filter-title">Filters</Text>
          <IconButton ref={closeRef} icon="x" label="Close filters" onClick={onClose} />
        </div>
        <div className={styles.sheetBody}>{children}</div>
        <div className={styles.sheetFoot}>
          <Button fullWidth onClick={onClose}>Show {count} {count === 1 ? 'product' : 'products'}</Button>
        </div>
      </div>
    </div>
  );
}
