# Design system

A breakdown of the Hari Matcha design system as it's built in this repo: brand, tokens, components and the rules for using them.
**Related:** [PRD.md](PRD.md) · [Architecture.md](Architecture.md)

The handoff in [design/](design/) is the original source of truth. Start with [design/README.md](design/README.md) (screen specs) and [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) (brand and foundations). Specimen cards for every token group are in [design/guidelines/](design/guidelines/), and screenshots are in [design/screenshots/](design/screenshots/). This file summarises them and maps them onto the code.

## 1. Brand in one paragraph

Hari (हरी) means green. The brand is **premium but affordable**. The chunky, friendly display type and the plain language carry the *affordable* signal. Restrained geometric body type, a deep green and cream palette, and craft facts (shade-grown, stone-ground, 80-prong bamboo) carry the *premium* signal. The logo is "HARI" in Bagel Fat One with a matcha whisk standing in for the "I".

### Voice

- A warm, plain-spoken friend who knows tea. Confident, never snobbish. "You" for the reader, "we" for the brand.
- **Say the value out loud:** price per cup, "priced fairly", "a habit, not a treat".
- **Show premium, don't claim it:** craft facts, never "luxurious" or "exquisite".
- Sentence case for headings and buttons. Uppercase only in the letterspaced overline.
- Money: always ₹ with Indian grouping (₹1,299). Use `rupee()` from [src/lib/format.ts](src/lib/format.ts).
- No emoji. हरी appears only as a signature (logo, seals), never in UI copy.

## 2. Token architecture

Tokens are CSS custom properties in [src/styles/tokens/](src/styles/tokens/), in three layers. **Each layer only references the one below it.**

```
Primitives   --matcha-900: #1F3A2B          raw scales, no meaning
    ↓
Semantic     --surface-brand: var(--matcha-900)   intent
    ↓
Component    --button-primary-bg: var(--matcha-900)   what a component reads
```

**Rules:**

- Components read **component tokens**. If none exists, they read **semantic** tokens. They never read primitives.
- Page-level CSS uses semantic tokens.
- Never hardcode a hex value, pixel size, shadow or duration that already has a token. If you need a new value, add a token first.

| File | Contents |
|---|---|
| `primitives.css` | Colour scales: matcha, cream, haldi, mirchi, neel |
| `neutrals.css` | Warm stone neutrals 0–950 |
| `semantic.css` | Text, surface, border, focus ring, status |
| `typography.css` | Font families, weights, type scale |
| `spacing.css` | Space, radius, shadow, motion, container |
| `components.css` | Button, input, checkbox/radio, switch, select, table, badge, card |
| `base.css` | Body defaults |

## 3. Colour

### Palettes

Each palette is named after something Indian, matching the brand.

| Palette | Role | Key stops |
|---|---|---|
| **Matcha** (green) | Brand, primary actions, text | 50 `#F2F5EC` · 300 `#A9C27A` (accent on dark) · 700 `#3A5530` (focus border) · **900 `#1F3A2B` (brand)** · 950 `#13261C` (primary text) |
| **Cream** | Page and soft surfaces | **50 `#FBF7EC` (page)** · 100 `#F6EFDB` · **200 `#F1E7CC` (brand cream)** · 300–500 |
| **Haldi** (turmeric) | **Value moments only** | 100 `#FBEFC9` · **300 `#F2D06E`** · 500 `#E2AE2E` · 900 `#5C430B` |
| **Mirchi** (chilli) | Errors, danger | 100 `#F6DDD5` · 500 `#C4513A` · 700 `#8E2F1F` |
| **Neel** (indigo) | Info | 100 `#DCE5F0` · 500 `#3E6596` · 700 `#2A4670` |
| **Neutral** | Warm stone greys | 0 `#FDFBF6` · 200 `#DFDACD` (subtle border) · 300 `#C7C1B2` · 600 `#5F5B51` (secondary text) · 950 `#11110F` |

### Usage rules

- **Signature pairing:** matcha-900 with cream-200. Use it for the hero, footer, primary buttons and logo.
- **Haldi is scarce on purpose.** Use it only for adding to cart, offers, the announcement bar and "Best value" badges. If everything is yellow, nothing reads as a deal.
- No cool greys, no pure black (`#000`) or white (`#fff`). The lightest surface is `neutral-0` `#FDFBF6`.
- No gradients. Use flat fields that alternate full-bleed green bands with cream.
- Transparency appears only in the drawer overlay (`--surface-overlay`, matcha-950 at 48%).

### Semantic tokens you'll use most

| Token | Value | For |
|---|---|---|
| `--text-primary` | matcha-950 | Body text |
| `--text-secondary` | neutral-600 | Supporting text, meta |
| `--text-brand` | matcha-900 | Display headings on cream |
| `--text-on-brand` | cream-200 | Text on green |
| `--surface-page` | cream-50 | Page background |
| `--surface-raised` | neutral-0 | Cards, inputs, menus |
| `--surface-brand` | matcha-900 | Hero, footer |
| `--surface-accent` | haldi-300 | Announcement bar, value highlights |
| `--surface-hover` / `--surface-selected` | matcha-50 / matcha-100 | Rows, menu items |
| `--border-subtle` / `--border-default` | neutral-200 / neutral-300 | Surfaces / fields |
| `--border-focus` + `--ring-focus` | matcha-700 + 3px matcha-200 | Focus |
| `--status-{success,warning,error,info}-{bg,fg}` | matcha / haldi / mirchi / neel | Messages, meters |

## 4. Typography

| Family | Token | Use |
|---|---|---|
| **Bagel Fat One** 400 | `--font-display` | Short display lines only, **40px and up** on desktop |
| **Jost** 400 / 500 / 600 | `--font-sans` | Everything else |
| **Tiro Devanagari Hindi** | `--font-devanagari` | हरी signature only |

| Style | Size / line-height | Notes |
|---|---|---|
| display-xl | 96 / 0.9 | Bagel, −0.01em |
| display-lg | 72 / 0.92 | Home hero |
| display-md | 56 / 0.95 | Section and page titles |
| display-sm | 40 / 1 | Promo cards, 404 |
| heading-lg / md / sm | 32 / 1.15 · 24 / 1.2 · 20 / 1.3 | Jost 500 |
| body-lg / md / sm | 18 / 1.55 · 16 / 1.55 · 14 / 1.5 | Jost 400 |
| caption | 12 / 1.4 | |
| overline | 12, 500, **0.32em tracking**, uppercase | Echoes the logo's "M A T C H A" |
| label | 14 / 1.3, 500 | Form labels |

Display sizes step down below 600px (see [src/components/ui/Text.module.css](src/components/ui/Text.module.css)). Always set type through `<Text variant="…">`, not by hand.

## 5. Space, shape, elevation, motion

| Group | Values |
|---|---|
| **Space** (`--space-*`) | 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 px, on a 4px base |
| **Layout** | Container `--container-max` 1200px; gutter `--gutter` 24px (16px below 600px) |
| **Radius** | xs 4 · sm 6 (checkbox, menu items) · **md 10 (fields)** · **lg 16 (cards, menus, tables)** · xl 28 (app icon) · **pill 999 (buttons, badges)** |
| **Border** | 1px `border-subtle` on surfaces; 1.5px on fields and controls |
| **Shadow** (green-tinted) | sm `0 1px 2px` · md `0 4px 14px -4px` (card hover) · lg `0 18px 40px -12px` (menus, drawer) |
| **Motion** | 120ms (fast: buttons, controls) · 200ms (base: card lift) · 320ms (slow: drawer, sheet); `--ease-out` `cubic-bezier(.2,.7,.2,1)` |

The interface is almost flat. Shadows appear only on card hover, menus and the drawer. Motion is quick and calm: things slide or fade, nothing bounces. `prefers-reduced-motion` removes it.

## 6. Interaction states

| State | Treatment |
|---|---|
| Hover, filled button | Background steps one shade (primary 900 → 800) |
| Hover, ghost or outline | Gains a `matcha-50` fill |
| Hover, card | Lifts 2px and gains `shadow-md` |
| Hover, table row or menu item | `matcha-50` |
| Press | Scale 0.98 and one shade darker |
| Focus-visible | 3px `matcha-200` ring; fields also get a `matcha-700` border |
| Error | `mirchi-500` border, `mirchi-100` ring, helper text in `mirchi-700` with an alert icon |
| Selected | `matcha-100` with a check (select items) |
| Disabled | `neutral-200` fill, `neutral-400` text |

## 7. Components

All components are in [src/components/ui/](src/components/ui/). Prop contracts and usage notes from the handoff are in `design/components/**/*.d.ts` and `*.prompt.md`.

| Group | Component | Variants and notes |
|---|---|---|
| Brand | `Logo` | `wordmark`, `compact`, `mark`, `appIcon`; `tone` `onLight` / `onDark`; `showHindi` adds हरी. Never redraw the whisk. |
| | `Icon` | Lucide, stroke 1.75, default 20px, `currentColor`. Add new icons to the `ICONS` map. |
| Typography | `Text` | One `variant` per style in §4, plus `as` and `color` |
| Actions | `Button` | `primary` · `secondary` (cream) · `accent` (haldi) · `outline` · `ghost` · `danger`; sizes sm 36 / md 44 / lg 54; `iconLeft`/`iconRight`; `href` renders a Next link |
| | `IconButton` | Square icon-only; `label` is required (accessible name) |
| Forms | `Input` | Label, helper, error, left icon; 44px |
| | `Select` | Custom listbox with full keyboard support; options can carry `meta` (e.g. price) |
| | `Checkbox`, `Radio`, `Switch` | 20px controls; radio supports a `description` |
| Data | `Table` | Typed `columns` with `render`, `align`, `width`; clickable rows via `onRowClick` |
| | `Badge` | Tones `matcha` (default), `haldi`, `mirchi`, `neel`, `neutral`, `brand`, `accent`; sm 20 / md 26; optional icon |
| Surfaces | `Card` | `tone` `default` / `cream` / `brand`; `padding`; `interactive` (hover lift); `as` (e.g. `fieldset`) |

Site-specific pieces built on these live in [src/components/site/](src/components/site/): `SiteHeader`, `SiteFooter`, `CartDrawer`, `ProductTile`, `Placeholder`.

### Usage rules

- **One `primary` button per view.** `accent` is for value moments (add to cart, shop, join), which is why it's haldi.
- Buttons are always pills. Fields are never pills.
- Icons are Lucide only. No icon fonts, emoji or unicode glyphs as icons (₹ is the exception).
- Every icon-only control has an accessible label.

## 8. Imagery

All photos are currently striped `Placeholder` boxes labelled with the shot they stand for. Real photography should be warm natural light, slightly matte, with green and cream props. Radii are 24px for the hero image and 16px elsewhere.

## 9. Changing the system

1. **New colour or size?** Add a primitive if needed, then a semantic or component token that points to it. Use the token, not the value.
2. **New component?** Put it in `components/ui/` only if it's generic (no product or cart knowledge). Give it its own token block in `components.css` and a co-located CSS Module, and use real `:hover` / `:focus-visible` / `:active` selectors.
3. **Keep `design/` and `src/styles/tokens/` in sync.** They're identical except for how fonts are loaded in `typography.css`. If you change a token value, change both, or decide that `src/` is now the source of truth and say so in [design/README.md](design/README.md).
