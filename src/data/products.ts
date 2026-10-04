/**
 * PLACEHOLDER catalogue — pricing and range are from the design prototype and
 * must be confirmed with the client. Keep consumers on the helpers below so the
 * source can later be swapped for a CMS / Shopify Storefront / Medusa fetch.
 */

export type Grade = 'Everyday' | 'Ceremonial' | 'Culinary' | 'Kit' | 'Tools';

export const GRADES: Grade[] = ['Everyday', 'Ceremonial', 'Culinary', 'Kit', 'Tools'];

export interface ProductSize {
  value: string;
  label: string;
  /** Price in whole rupees. */
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  grade: Grade;
  blurb: string;
  sizes: ProductSize[];
  /** Approximate cost per cup in rupees; null for non-tea products. */
  cup: number | null;
  tag?: string;
  inStock: boolean;
  /** Placeholder image labels until real photography arrives. */
  images: { hero: string; detail: string; inUse: string };
}

export const PRODUCTS: Product[] = [
  {
    slug: 'everyday',
    name: 'Everyday Matcha',
    grade: 'Everyday',
    blurb: 'Bright, smooth, made for lattes and iced matcha.',
    sizes: [
      { value: '50', label: '50 g tin', price: 599 },
      { value: '100', label: '100 g pouch', price: 999 },
    ],
    cup: 12,
    tag: 'Best value',
    inStock: true,
    images: { hero: 'product shot · everyday · front', detail: 'detail · powder texture', inUse: 'in use · latte' },
  },
  {
    slug: 'ceremonial',
    name: 'Ceremonial Matcha',
    grade: 'Ceremonial',
    blurb: 'First-harvest leaf. Sweet, grassy, drink it straight.',
    sizes: [
      { value: '30', label: '30 g tin', price: 899 },
      { value: '60', label: '60 g tin', price: 1649 },
    ],
    cup: 30,
    inStock: true,
    images: { hero: 'product shot · ceremonial · front', detail: 'detail · powder texture', inUse: 'in use · usucha in a bowl' },
  },
  {
    slug: 'culinary',
    name: 'Culinary Matcha',
    grade: 'Culinary',
    blurb: 'Bold and robust for baking, smoothies and kulfi.',
    sizes: [{ value: '100', label: '100 g pouch', price: 549 }],
    cup: 6,
    inStock: true,
    images: { hero: 'product shot · culinary · front', detail: 'detail · powder texture', inUse: 'in use · matcha kulfi' },
  },
  {
    slug: 'kit',
    name: 'Starter Kit',
    grade: 'Kit',
    blurb: 'Chasen, chashaku, bowl and a 30 g tin of Everyday.',
    sizes: [{ value: 'kit', label: 'Full kit', price: 1299 }],
    cup: null,
    tag: 'Gift-ready',
    inStock: true,
    images: { hero: 'product shot · kit · front', detail: 'detail · bamboo chasen', inUse: 'in use · first whisk' },
  },
  {
    slug: 'chasen',
    name: 'Bamboo Chasen',
    grade: 'Tools',
    blurb: '80-prong whisk, hand-cut from a single piece of bamboo.',
    sizes: [{ value: '80', label: '80 prong', price: 699 }],
    cup: null,
    inStock: true,
    images: { hero: 'product shot · chasen · front', detail: 'detail · 80 prongs', inUse: 'in use · whisking' },
  },
];

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Lowest price across sizes — the "From" price. */
export function fromPrice(p: Product): number {
  return Math.min(...p.sizes.map((s) => s.price));
}
