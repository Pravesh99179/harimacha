'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product, ProductSize } from '@/data/products';

export interface CartItem {
  key: string;
  id: string;
  name: string;
  size: string;
  unit: number;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Adds (merging identical product + size + unit price) and opens the drawer. */
  add: (product: Product, size: ProductSize, qty?: number, unit?: number) => void;
  /** Qty below 1 removes the line. */
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
}

const STORAGE_KEY = 'hari-cart';
const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  // Read after mount so server and first client render agree.
  useEffect(() => {
    setItems(readStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode); cart still works in memory */
    }
  }, [items, hydrated]);

  const add = useCallback<CartContextValue['add']>((product, size, qty = 1, unit = size.price) => {
    const key = `${product.slug}:${size.value}:${unit}`;
    setItems((cur) =>
      cur.some((i) => i.key === key)
        ? cur.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [...cur, { key, id: product.slug, name: product.name, size: size.label, unit, qty }],
    );
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((cur) => (qty < 1 ? cur.filter((i) => i.key !== key) : cur.map((i) => (i.key === key ? { ...i, qty } : i))));
  }, []);

  const remove = useCallback((key: string) => setQty(key, 0), [setQty]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.unit * i.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
    }),
    [items, open, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
