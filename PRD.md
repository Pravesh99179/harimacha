# Hari Matcha website: product requirements

**Status:** v1 storefront built (browse, product detail, cart). Checkout, real catalogue and imagery are still open.
**Related:** [Architecture.md](Architecture.md) · [Design.md](Design.md) · [design handoff](design/README.md)

## 1. Problem

Good matcha is hard to buy in India. What's on offer usually falls into one of two groups:

- **Cheap, low-grade powder.** It tastes bitter and dull, so people try it once and stop.
- **Imported ceremonial tins.** The tea is good, but the price makes it a treat rather than something you drink every day.

Shoppers also have no easy way to compare grades. "Ceremonial" and "culinary" mean little to someone new to matcha, and price per gram doesn't tell them what a cup costs.

Hari Matcha sells proper shade-grown, stone-ground matcha, packed in India, **priced so it can be a daily habit**. The brand is **premium but affordable**. The website has to sell that idea and make buying the right grade easy.

## 2. What the site has to do

1. **Make the value obvious.** Show price per cup ("from ₹12 a cup") next to the pack price everywhere a grade appears.
2. **Help people pick a grade.** Compare Everyday, Ceremonial and Culinary side by side by taste, use and cost per cup.
3. **Get beginners started.** The Starter Kit (₹1,299) bundles the tools with a tin and gets its own promo slot.
4. **Turn first orders into repeat orders.** A subscribe-and-save option (15% off, every 30 days) on the product page.
5. **Feel like a real brand.** The visual identity (matcha green, cream, the whisk logo) should signal craft without feeling expensive.

## 3. Who it's for

| Audience | What they need |
|---|---|
| **Curious beginner.** Has had matcha lattes at cafés and wants to make them at home. | To know which grade to buy and what tools they need. Starter Kit, Everyday grade. |
| **Daily drinker.** Already drinks matcha and is unhappy with price or quality. | Better value per cup and an easy way to reorder. Everyday or Ceremonial, subscription. |
| **Home baker or cook.** | A cheaper grade suited to cooking. Culinary. |
| **Gift buyer.** | Something that looks good and arrives ready to give. Kit, gift wrap. |

All prices are in ₹ and delivery is India-only. Most visitors are likely to be on phones.

## 4. Scope

### In scope for v1

| Area | Requirement | Status |
|---|---|---|
| Home `/` | Hero with value line and two calls to action (shop, starter kit). | Done |
| | Grade comparison table: taste, price per cup, "from" price, add to cart. | Done |
| | Starter kit promo. | Done |
| Shop `/shop` | Product grid with grade filters, an in-stock toggle and price sorting. | Done |
| | Filters are kept in the URL so a filtered view can be shared or bookmarked. | Done |
| | On mobile, filters open in a bottom sheet. | Done |
| Product `/products/[slug]` | Size, quantity, one-time or subscribe (15% off), gift wrap toggle. | Done (gift wrap isn't sent anywhere yet) |
| | Live total and price per cup. | Done |
| | Pincode check (format only, 6 digits). | Done (no real serviceability lookup) |
| Cart drawer | Opens on every add. Merges identical lines. Quantity stepper, remove, subtotal. | Done |
| | Free-shipping meter (threshold ₹799). | Done |
| | Cart survives a page reload. | Done (`localStorage`) |
| Global | Sticky announcement bar and header, footer, newsletter field, 404 page. | Done (newsletter not wired) |
| Quality | Keyboard support, focus states, reduced motion, works from 320px up. | Done |

### Not in v1

- **Checkout and payments.** Razorpay or Shopify checkout with UPI, cards and COD. The button is a stub. This is the **biggest gap before launch**.
- Customer accounts, order history, managing a subscription.
- Search.
- Real delivery estimates by pincode.
- Content pages (brew guide, shipping, returns, contact, our story).
- A CMS or commerce backend. The catalogue is a placeholder file.
- Reviews, ratings, loyalty.

## 5. Key rules

| Rule | Value | Where in code |
|---|---|---|
| Subscription price | `round(base × 0.85)` | [src/lib/pricing.ts](src/lib/pricing.ts) |
| Free-shipping threshold | ₹799 subtotal | [src/lib/pricing.ts](src/lib/pricing.ts) |
| Line total | unit price × quantity | [src/app/products/[slug]/ProductView.tsx](src/app/products/[slug]/ProductView.tsx) |
| Cart line identity | product + size + unit price (so a subscribed and a one-time line stay separate) | [src/lib/cart.tsx](src/lib/cart.tsx) |
| Pincode | `/^\d{6}$/` | [src/app/products/[slug]/ProductView.tsx](src/app/products/[slug]/ProductView.tsx) |
| Money format | ₹ with Indian grouping, e.g. ₹1,299 | [src/lib/format.ts](src/lib/format.ts) |

## 6. Success measures (proposed)

There is no analytics yet, so there are no baselines. These are suggested starting points and should be agreed with the client:

- Visit → add-to-cart rate.
- Add-to-cart → checkout start (once checkout exists).
- Share of orders that choose **subscribe**.
- Share of first orders that include the **Starter Kit**.
- Average order value compared with the ₹799 free-shipping threshold.

Adding analytics is a prerequisite for any of these.

## 7. Open questions

1. **Catalogue and prices.** Every product, size and price is a placeholder from the design prototype. The client needs to confirm them.
2. **Checkout provider.** Razorpay (custom flow) or Shopify (hosted checkout plus Storefront API)? This choice also settles where product data lives.
3. **Subscriptions.** Who bills the recurring order, and can customers skip or cancel themselves, as the copy promises?
4. **Delivery promise.** "Arrives in 2–4 days" is shown for any valid pincode. Is that true everywhere, or do we need a lookup?
5. **Photography.** All images are placeholders. When will product and lifestyle shots be ready?
6. **Offers.** "A free chasen with your first tin" is in the announcement bar, but nothing applies it. How will it be fulfilled?
