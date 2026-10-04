# Hari Matcha — website

Marketing and e-commerce site for Hari Matcha, built with Next.js (App Router), React 19 and TypeScript, deployed on Vercel.

Project docs: [PRD.md](PRD.md) (what we're solving and v1 scope), [Architecture.md](Architecture.md) (how the code fits together) and [Design.md](Design.md) (the design system breakdown).

The original design handoff (spec, tokens, prototype components, screenshots) is kept in [`design/`](design/README.md). Treat it as the source of truth for visuals and copy.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
npm run lint       # type-check
```

## Structure

| Path | What |
|---|---|
| `src/app/` | Routes: `/`, `/shop` (filters in `?grade=&sort=&stock=`), `/products/[slug]`, plus the root layout |
| `src/styles/tokens/` | Design tokens, ported as-is from `design/tokens` (fonts come from `next/font` in `layout.tsx`) |
| `src/components/ui/` | Design-system components (Button, IconButton, Input, Select, Checkbox, Radio, Switch, Table, Badge, Card, Text, Logo, Icon), using CSS Modules and only token variables |
| `src/components/site/` | Site chrome: header, footer, cart drawer, product tile, image placeholder |
| `src/data/products.ts` | **Placeholder** catalogue. Swap `getProducts`/`getProduct` for a CMS or commerce backend later |
| `src/lib/cart.tsx` | Cart context, persisted to `localStorage` (`hari-cart`) |

## Not done yet

- **Checkout**: the button is a stub. Integrate Razorpay or Shopify checkout (UPI, cards, COD).
- **Imagery**: every photo is a striped `Placeholder`. Replace it with `next/image` and add `images.remotePatterns` in `next.config.ts`.
- **Product data and prices**: these are placeholders and need confirming with the client.
- **Search, account, newsletter, help pages**: the UI is present, but nothing is wired up behind it (see the `TODO`s).

## Deploy

Import the repo in Vercel and use the "Next.js" framework preset. No environment variables are needed.
