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

export interface ProductImage {
  src: string;
  alt: string;
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
  /** First image is the hero. PLACEHOLDER: shared shots until per-SKU photography arrives. */
  images: ProductImage[];
}

const SHOTS = {
  lineup: { src: '/images/products/range-lineup.jpg', alt: 'Ceremonial, Everyday and Culinary pouches held with a hot latte, iced matcha and a matcha milk drink' },
  pouches: { src: '/images/products/everyday-ceremonial-pouches.jpg', alt: 'Everyday and Ceremonial matcha pouches held side by side' },
  sachets: { src: '/images/products/everyday-sachets.jpg', alt: 'Two Everyday matcha sachets held in sunlight' },
  everyday: { src: '/images/products/everyday-pouch-iced-latte.jpg', alt: 'Everyday matcha 100 g pouch beside an iced matcha latte and a bowl of powder' },
} satisfies Record<string, ProductImage>;

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
    images: [SHOTS.everyday, SHOTS.pouches, SHOTS.sachets, SHOTS.lineup],
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
    images: [SHOTS.pouches, SHOTS.lineup, SHOTS.everyday, SHOTS.sachets],
  },
  {
    slug: 'culinary',
    name: 'Culinary Matcha',
    grade: 'Culinary',
    blurb: 'Bold and robust for baking, smoothies and kulfi.',
    sizes: [{ value: '100', label: '100 g pouch', price: 549 }],
    cup: 6,
    inStock: true,
    images: [SHOTS.lineup, SHOTS.everyday, SHOTS.pouches, SHOTS.sachets],
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
    images: [SHOTS.lineup, SHOTS.pouches, SHOTS.sachets, SHOTS.everyday],
  },
  {
    slug: 'chasen',
    name: 'Bamboo Chasen',
    grade: 'Tools',
    blurb: '80-prong whisk, hand-cut from a single piece of bamboo.',
    sizes: [{ value: '80', label: '80 prong', price: 699 }],
    cup: null,
    inStock: true,
    images: [SHOTS.sachets, SHOTS.everyday, SHOTS.lineup, SHOTS.pouches],
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
