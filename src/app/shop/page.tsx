import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopView, ShopViewFromUrl } from './ShopView';

export const metadata: Metadata = {
  title: 'Shop all matcha',
  description: 'Everyday, ceremonial and culinary matcha, plus the starter kit and tools. Priced per cup, shipped across India.',
};

export default function ShopPage() {
  // The fallback renders the unfiltered list into the static HTML; the URL's filters apply on the client.
  return (
    <Suspense fallback={<ShopView query="" />}>
      <ShopViewFromUrl />
    </Suspense>
  );
}
