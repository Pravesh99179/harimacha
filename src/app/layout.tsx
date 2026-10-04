import type { Metadata, Viewport } from 'next';
import { Bagel_Fat_One, Jost, Tiro_Devanagari_Hindi } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CartDrawer } from '@/components/site/CartDrawer';
import './globals.css';

const display = Bagel_Fat_One({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-bagel-fat-one' });
const sans = Jost({ weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--font-jost' });
const devanagari = Tiro_Devanagari_Hindi({ weight: '400', subsets: ['devanagari'], display: 'swap', variable: '--font-tiro-devanagari' });

export const metadata: Metadata = {
  title: { default: 'Hari Matcha · Good matcha, every day', template: '%s · Hari Matcha' },
  description: 'Proper shade-grown, stone-ground matcha at a price that makes it a habit, not a treat. From ₹12 a cup. Packed in India.',
};

export const viewport: Viewport = {
  themeColor: '#1F3A2B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${devanagari.variable}`}>
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
