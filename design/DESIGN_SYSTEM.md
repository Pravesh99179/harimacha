# Hari Matcha — Design System

Hari Matcha is an Indian matcha brand. Its positioning is **premium but affordable**: properly shade-grown, stone-ground matcha, priced so it becomes a daily habit rather than an occasional treat. "Hari" (हरी) means green.

**Sources:** five mood references the user uploaded (`uploads/`): a line-art whisk-and-bowl poster, chunky bubble wordmarks (a ramen brand, a café), and two matcha wordmarks that use a whisk as a letter. The brand was built in this project. The logo is direction **1a — "Whisk as the I"** from `Hari Matcha Logo.dc.html`. There is no codebase or Figma file.

**Surfaces:** one product so far, the e-commerce **website** (`ui_kits/website/`).

## Index
- `styles.css` — the entry point. It only contains `@import` lines.
- `tokens/` — `fonts.css`, `primitives.css` (matcha, cream, haldi, mirchi, neel), `neutrals.css`, `semantic.css` (text/surface/border/status), `typography.css`, `spacing.css` (space, radii, shadow, motion), `components.css` (component-level tokens), `base.css`
- `components/` — `brand/` (Logo, Icon), `typography/` (Text), `actions/` (Button, IconButton), `forms/` (Input, Select, Checkbox, Radio, Switch), `data/` (Table, Badge), `surfaces/` (Card). Each component has a `.jsx` file, a `.d.ts` file and a `.prompt.md` file, plus one `*.card.html` per directory.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand, Component tokens).
- `ui_kits/website/` — the interactive home, shop, product and cart drawer screens.
- `assets/` — `hari-mark-green.svg`, `hari-mark-cream.svg`, `hari-app-icon.svg`
- `lib/load-components.js` — a dev loader that cards and kits use to compile the component sources in the browser.

## Token architecture
Tokens are layered, and each layer only references the one below it:
1. **Primitives** are raw scales: `--matcha-50…950`, `--cream-50…500`, `--haldi-*`, `--mirchi-*`, `--neel-*`, `--neutral-0…950`.
2. **Semantic** tokens describe intent: `--text-primary`, `--surface-brand`, `--border-focus`, `--status-error-bg`, and so on.
3. **Component** tokens are what components read: `--button-primary-bg`, `--input-border-focus`, `--checkbox-bg-checked`, `--select-item-bg-hover`, `--table-header-bg`, and so on.

Components only read component tokens, or semantic tokens where no component token exists. They never read primitives directly.

## Content fundamentals
- **Voice:** a warm, plain-spoken friend who knows tea. Confident, never snobbish. Speak to the reader as "you"; the brand is "we".
- **Casing:** sentence case for headings and buttons ("Shop matcha", "Add to cart"). Uppercase is used only for the letterspaced overline, which echoes the logo's M A T C H A.
- **Value is said out loud:** say price per cup ("₹12 a cup"), "priced fairly", "a habit, not a treat". Prices are always in ₹ with Indian grouping (₹1,299).
- **Premium is shown, not claimed:** use craft facts (shade-grown, first harvest, stone-ground, 80-prong bamboo) instead of adjectives like "luxurious".
- **Short display lines:** "Good matcha, every day." "Premium, priced fairly." "Whisk it."
- **No emoji.** हरी appears as a signature only: next to the logo, on badges and seals. It is never used for UI copy.

## Visual foundations
- **Colour:** deep matcha green `#1F3A2B` with cream `#F1E7CC` is the signature pairing, taken from the logo. Leaf green `matcha-300` is a quiet accent on dark grounds. **Haldi yellow** (`haldi-300`) is reserved for value moments: add to cart, offers, the announcement bar, "Best value" badges. Neutrals are warm stone greys; there are no cool greys and no pure black or white. The page background is `cream-50`.
- **Type:** Bagel Fat One for display. It is chunky and friendly and matches the logo, so it carries the "affordable/approachable" signal. Use it for short lines only, 40px and up. Jost (400/500/600) covers everything else; its geometric restraint carries the "premium" signal. Tiro Devanagari is the accent face for हरी.
- **Backgrounds:** flat colour fields, alternating between full-bleed green bands and cream. No gradients. Product photography should be warm, natural light, slightly matte, with green and cream props. Until real photos exist, the kit uses striped placeholders.
- **Shape:** buttons are pills. Fields use a 10px radius, cards and menus 16px, and the app icon 28px. Borders are 1px `border-subtle` on surfaces and 1.5px on fields and controls.
- **Elevation:** almost flat. Shadows are green-tinted (`rgba(31,58,43,…)`) and only appear on hover lift (cards), on menus, and on the cart drawer.
- **States:** on hover, filled buttons step one shade (primary 900→800); ghost and outline buttons gain a `matcha-50` fill; cards lift 2px and gain `shadow-md`; table rows gain `matcha-50`. On press, buttons scale to 0.98 and step a shade darker. Focus is a 3px `matcha-200` ring with a `matcha-700` border on fields. Disabled elements use `neutral-200` fill with `neutral-400` text.
- **Motion:** quick and calm. Durations are 120, 200 and 320ms with `cubic-bezier(.2,.7,.2,1)`. The drawer slides; nothing bounces.
- **Layout:** 1200px container with a 24px gutter on a 4px spacing scale. The announcement bar and header are sticky.
- **Transparency:** used only for the drawer overlay (`--surface-overlay`).

## Iconography
- **Lucide** (lucide-static@0.460.0 via the unpkg CDN), inlined by `<Icon name="…">` so icons inherit `currentColor`. Default stroke is 1.75 at 20px. The line style matches the fine-line whisk in the references.
- No icon font, no emoji, and no unicode glyphs used as icons. The only exception is the ₹ symbol.
- The whisk mark is the brand's only custom glyph. Use `<Logo variant="mark">` or `assets/hari-mark-*.svg`; never redraw it.

## Intentional additions
- `Icon` — a wrapper around the Lucide CDN set.
- `Text` — maps typography tokens to a single component.
- `Logo` — renders the 1a lockup in its wordmark, compact, mark and app-icon variants.

## Caveats
- Fonts load from Google Fonts. There are no local font binaries.
- Icons are a CDN substitute (Lucide). Swap in a custom set if the brand commissions one.
