import type { CSSProperties } from 'react';

const FLARE = 'M-6.5 51 C-9.5 57.6 -12.6 65.2 -14.8 73 L14.8 73 C12.6 65.2 9.5 57.6 6.5 51 Z';

const HA =
  'M13.8-0.3L13.8-0.3Q9.2-0.3 6.2-3.1Q3.2-5.9 3.2-10.2L3.2-10.2L3.2-63.1Q3.2-67.5 6.1-70.5Q9-73.4 13.7-73.4L13.7-73.4Q18.7-73.4 21.5-70.5Q24.3-67.5 24.3-63.3L24.3-63.3L24.3-44.8L42.9-44.8L42.9-63.1Q42.9-67.5 45.8-70.5Q48.7-73.4 53.6-73.4L53.6-73.4Q58.5-73.4 61.3-70.5Q64.1-67.5 64.1-63.3L64.1-63.3L64.1-10.2Q64.1-5.9 61.2-3.1Q58.2-0.3 53.8-0.3L53.8-0.3Q49-0.3 46.0-3.1Q42.9-5.9 42.9-10.2L42.9-10.2L42.9-30.1L24.3-30.1L24.3-10.2Q24.3-5.9 21.4-3.1Q18.4-0.3 13.8-0.3ZM78.5 0L78.5 0Q71.8-1 69.8-6.2Q67.8-11.3 70.6-19.2L70.6-19.2L83.8-56.7Q85.6-61.9 88.0-65.6Q90.3-69.3 93.9-71.3Q97.4-73.3 102.7-73.3L102.7-73.3Q110.7-73.3 114.8-68.9Q118.8-64.5 121.5-56.7L121.5-56.7L134.6-19.2Q137.4-11.3 135.7-6.2Q133.9-1 127.1 0L127.1 0Q121.6 0.7 117.6-1.3Q113.5-3.3 112.7-7.8L112.7-7.8Q112.1-10.8 112.6-12.8Q113-14.8 113.4-16L113.4-16Q113.7-17 113.5-17.9Q113.2-18.9 111.9-18.9L111.9-18.9L93.3-18.9Q92-18.9 91.8-17.9Q91.5-17 91.9-16L91.9-16Q92.3-14.8 92.7-12.8Q93.1-10.8 92.6-7.8L92.6-7.8Q91.8-3.3 87.9-1.3Q84 0.7 78.5 0ZM95.4-32.9L110-32.9L104.8-49.2Q104.6-50.2 104.2-50.8Q103.7-51.3 102.7-51.3L102.7-51.3Q101.7-51.3 101.3-50.8Q100.8-50.2 100.5-49.2L100.5-49.2L95.4-32.9Z';

const R =
  'M187.5-53.0Q187.5-41.4 182.5-34.7Q177.4-27.9 165.0-27.6L165.0-27.6L165.0-19.2Q165.0-16.8 166.1-15.3Q167.2-13.8 169.3-13.8L169.3-13.8Q171.2-13.8 172.3-15.3Q173.4-16.7 173.4-19.0L173.4-19.0L173.4-21.9L190.0-21.9Q190.1-20.9 190.1-19.6L190.1-19.6Q190.1-10.2 184.7-4.7Q179.3 0.9 169.7 0.9L169.7 0.9Q162.7 0.9 157.8-1.9Q152.8-4.6 150.3-9.4Q147.8-14.1 147.8-20.1L147.8-41.5L157.4-41.5Q164.6-41.5 167.4-44.5Q170.2-47.4 170.2-53.0L170.2-56.7L141.1-56.7L141.1-71.1L194.7-71.1L194.7-56.7L187.5-56.7L187.5-53.0Z';

const MATCHA =
  'M69.8 14.4L71.7 14.4L71.7 24.8L70.0 24.8L70.0 17.7L66.8 24.8L65.6 24.8L62.4 17.7L62.4 24.8L60.7 24.8L60.7 14.4L62.5 14.4L66.2 22.5L69.8 14.4ZM89.2 24.8L88.5 22.7L84.1 22.7L83.3 24.8L81.6 24.8L85.3 14.4L87.3 14.4L91.0 24.8L89.2 24.8ZM84.6 21.3L88.0 21.3L86.3 16.4L84.6 21.3ZM100.3 19.6Q100.3 18.0 101.0 16.8Q101.7 15.6 103.0 14.9Q104.2 14.2 105.6 14.2L105.6 14.2Q107.3 14.2 108.6 15.1Q109.9 15.9 110.5 17.4L110.5 17.4L108.4 17.4Q108.0 16.5 107.3 16.1Q106.6 15.7 105.6 15.7L105.6 15.7Q104.6 15.7 103.8 16.2Q103.0 16.7 102.5 17.5Q102.1 18.4 102.1 19.6L102.1 19.6Q102.1 20.7 102.5 21.6Q103.0 22.5 103.8 22.9Q104.6 23.4 105.6 23.4L105.6 23.4Q106.6 23.4 107.3 23.0Q108.0 22.6 108.4 21.8L108.4 21.8L110.5 21.8Q109.9 23.3 108.6 24.1Q107.3 24.9 105.6 24.9L105.6 24.9Q104.2 24.9 103.0 24.2Q101.7 23.5 101.0 22.3Q100.3 21.1 100.3 19.6L100.3 19.6ZM127.3 14.4L129.1 14.4L129.1 24.8L127.3 24.8L127.3 20.2L122.4 20.2L122.4 24.8L120.7 24.8L120.7 14.4L122.4 14.4L122.4 18.8L127.3 18.8L127.3 14.4ZM146.6 24.8L145.8 22.7L141.5 22.7L140.7 24.8L138.9 24.8L142.7 14.4L144.7 14.4L148.4 24.8L146.6 24.8ZM142.0 21.3L145.4 21.3L143.7 16.4L142.0 21.3Z';

const TINE_OFFSETS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

function WhiskMark({ height, color }: { height: number; color: string }) {
  return (
    <svg viewBox="-30 0 60 136" style={{ height, width: 'auto', display: 'block', flex: 'none' }} aria-hidden="true">
      <g fill={color} stroke={color}>
        <g stroke="none">
          <rect x="-7" y="2" width="14" height="44" rx="5" />
          <rect x="-10.5" y="44" width="21" height="7" rx="3.5" />
          <path d={FLARE} />
        </g>
        <g fill="none" strokeWidth="2.8" strokeLinecap="round">
          {TINE_OFFSETS.map((i) => {
            const f = (v: number) => (i * v).toFixed(2);
            return <path key={i} d={`M${f(1.3)} 51 C${f(3.3)} 73 ${f(4.9)} 106 ${f(3.7)} 130`} />;
          })}
        </g>
      </g>
    </svg>
  );
}

/** HAR + whisk as the "I", with the hanging loop. Outlined paths, so no font dependency. */
function Wordmark({ height, color, tagline }: { height: number; color: string; tagline: boolean }) {
  const h = tagline ? 115 : 90;
  return (
    <svg viewBox={`3 -89 214 ${h}`} style={{ height, width: 'auto', display: 'block', flex: 'none' }} aria-hidden="true">
      <g fill={color}>
        <path d={HA} />
        <path d={R} />
        {tagline && <path d={MATCHA} />}
      </g>
      <g transform="translate(202.6 -73.7) scale(0.5619)" fill={color} stroke={color}>
        <g stroke="none">
          <rect x="-7" y="2" width="14" height="44" rx="5" />
          <rect x="-10.5" y="44" width="21" height="7" rx="3.5" />
          <path d={FLARE} />
        </g>
        <g fill="none" strokeWidth="2.8" strokeLinecap="round">
          {TINE_OFFSETS.map((i) => {
            const f = (v: number) => (i * v).toFixed(2);
            return <path key={i} d={`M${f(1.3)} 51 C${f(3.3)} 73 ${f(4.9)} 106 ${f(3.7)} 130`} />;
          })}
        </g>
        <path d="M0 6 C0 -12 -4 -22 -14 -22 C-20 -22 -24 -17 -25 -10" fill="none" strokeWidth="10" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export interface LogoProps {
  variant?: 'wordmark' | 'compact' | 'mark' | 'appIcon';
  tone?: 'onLight' | 'onDark';
  /** Cap-height-ish size in px. */
  size?: number;
  showTagline?: boolean;
  showHindi?: boolean;
  style?: CSSProperties;
}

/** Hari Matcha logo, direction 1a: the whisk is the "I". Never redraw it. */
export function Logo({ variant = 'wordmark', tone = 'onLight', size = 64, showTagline = true, showHindi = false, style }: LogoProps) {
  const ink = tone === 'onDark' ? 'var(--cream-200)' : 'var(--matcha-900)';
  const groundInk = tone === 'onDark' ? 'var(--matcha-900)' : 'var(--cream-200)';

  if (variant === 'mark') {
    return <span style={{ display: 'inline-flex', ...style }}><WhiskMark height={size} color={ink} /></span>;
  }
  if (variant === 'appIcon') {
    return (
      <span style={{ width: size, height: size, borderRadius: size * 0.233, background: ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', ...style }}>
        <WhiskMark height={size * 0.7} color={groundInk} />
      </span>
    );
  }

  // size is the cap height (73.4 units tall in the artwork) scaled to match the old text wordmark.
  const unit = (size * 0.78) / 73.4;
  const tagline = variant === 'wordmark' && showTagline;
  const height = unit * (tagline ? 115 : 90);

  return (
    <span role="img" aria-label="Hari Matcha" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.1, color: ink, ...style }}>
      <Wordmark height={height} color={ink} tagline={tagline} />
      {variant === 'wordmark' && showHindi && (
        <span lang="hi" style={{ fontFamily: 'var(--font-devanagari)', fontSize: Math.max(11, size * 0.17), color: tone === 'onDark' ? 'var(--matcha-300)' : 'var(--matcha-600)' }}>हरी</span>
      )}
    </span>
  );
}
