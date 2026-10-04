import Image from 'next/image';
import type { CSSProperties } from 'react';
import styles from './Photo.module.css';

export interface PhotoProps {
  src: string;
  alt: string;
  height?: number | string;
  radius?: number;
  /** Rendered width hint for next/image, e.g. "(max-width: 900px) 100vw, 50vw". */
  sizes?: string;
  priority?: boolean;
  /** CSS object-position for the crop, e.g. "center 35%". */
  position?: string;
  className?: string;
  style?: CSSProperties;
}

/** Cover-cropped photo in a fixed-height frame; same sizing API as Placeholder. */
export function Photo({ src, alt, height = 280, radius = 16, sizes = '100vw', priority, position, className, style }: PhotoProps) {
  return (
    <div className={[styles.photo, className].filter(Boolean).join(' ')} style={{ height, borderRadius: radius, ...style }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}
