import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Hari Matcha · Good matcha, every day';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const dataUri = (buf: Buffer, mime: string) => `data:${mime};base64,${buf.toString('base64')}`;

export default async function OpengraphImage() {
  const photo = dataUri(await readFile(join(process.cwd(), 'public/images/products/everyday-pouch-iced-latte.jpg')), 'image/jpeg');
  const mark = dataUri(await readFile(join(process.cwd(), 'design/assets/hari-mark-cream.svg')), 'image/svg+xml');
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#1F3A2B', color: '#F1E7CC' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: 64 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={32} height={72} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: '#B9D4A8' }}>Hari Matcha</div>
            <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>Good matcha, every day.</div>
            <div style={{ fontSize: 30, color: '#E4D9B8' }}>Shade-grown · Stone-ground · From ₹12 a cup</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={630} height={630} alt="" style={{ objectFit: 'cover' }} />
      </div>
    ),
    size,
  );
}
