import { getProducts } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/site/Photo';
import { GradeTable } from './GradeTable';
import styles from './page.module.css';

export default function HomePage() {
  const grades = getProducts().filter((p) => p.cup !== null);
  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <Text variant="overline" color="var(--matcha-300)">Stone-ground in Japan · Packed in India</Text>
            <Text variant="display-lg">Good matcha, every day.</Text>
            <Text variant="body-lg" className={styles.heroBody}>
              Proper shade-grown matcha at a price that makes it a habit, not a treat. From ₹12 a cup.
            </Text>
            <div className={styles.heroActions}>
              <Button href="/shop" variant="accent" size="lg" iconRight="arrow-right">Shop matcha</Button>
              <Button href="/products/kit" variant="outline" size="lg" className={styles.onDarkOutline}>Get the starter kit</Button>
            </div>
          </div>
          <Photo
            src="/images/products/everyday-pouch-iced-latte.jpg"
            alt="Hari Everyday matcha pouch beside an iced matcha latte and a bowl of powder"
            height={460}
            radius={24}
            sizes="(max-width: 900px) 100vw, 45vw"
            priority
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="grades-title">
        <div className={styles.sectionHead}>
          <div className={styles.titleStack}>
            <Text variant="overline" color="var(--text-secondary)">Find your grade</Text>
            <Text variant="display-md" color="var(--text-brand)" id="grades-title">Premium, priced fairly.</Text>
          </div>
          <Button href="/shop" variant="ghost" iconRight="arrow-right">Compare all</Button>
        </div>
        <GradeTable products={grades} className={styles.gradeTable} />
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="craft-title">
        <div className={styles.sectionHead}>
          <div className={styles.titleStack}>
            <Text variant="overline" color="var(--text-secondary)">From leaf to latte</Text>
            <Text variant="display-md" color="var(--text-brand)" id="craft-title">Stone-ground. Shade-grown.</Text>
          </div>
          <Button href="/shop" variant="ghost" iconRight="arrow-right">Shop the range</Button>
        </div>
        <div className={styles.mosaic}>
          <figure className={`${styles.tile} ${styles.tileTexture}`}>
            <Photo src="/images/lifestyle/matcha-powder-texture.jpg" alt="Close-up of fine green matcha powder" height="100%" radius={20} sizes="(max-width: 900px) 100vw, 33vw" />
            <figcaption className={styles.caption}>
              <Text variant="heading-sm" as="span">Bright green, never dull.</Text>
              <Text variant="body-sm" as="span" color="var(--text-secondary)">Shaded leaf, ground slow on stone for a smooth, sweet cup.</Text>
            </figcaption>
          </figure>
          <figure className={`${styles.tile} ${styles.tileLineup}`}>
            <Photo src="/images/products/range-lineup.jpg" alt="Ceremonial, Everyday and Culinary pouches with a hot latte, iced matcha and a matcha milk drink" height="100%" radius={20} sizes="(max-width: 900px) 100vw, 33vw" />
          </figure>
          <figure className={`${styles.tile} ${styles.tilePouches}`}>
            <Photo src="/images/products/everyday-ceremonial-pouches.jpg" alt="Everyday and Ceremonial pouches held side by side" height="100%" radius={20} sizes="(max-width: 900px) 50vw, 33vw" />
          </figure>
          <figure className={`${styles.tile} ${styles.tileSachets}`}>
            <Photo src="/images/products/everyday-sachets.jpg" alt="Two Everyday matcha sachets held in sunlight" height="100%" radius={20} sizes="(max-width: 900px) 50vw, 33vw" />
          </figure>
        </div>
      </section>

      <section className={`container ${styles.section} ${styles.promo}`} aria-labelledby="kit-title">
        <Card tone="cream" padding={40} className={styles.promoCard}>
          <Text variant="overline">New to matcha?</Text>
          <Text variant="display-sm" color="var(--text-brand)" id="kit-title">Everything you need, ₹1,299.</Text>
          <Text variant="body-md">Bamboo chasen, scoop, bowl and a tin of Everyday — plus a two-minute brew card.</Text>
          <div><Button href="/products/kit" iconRight="arrow-right">See the kit</Button></div>
        </Card>
        <Photo
          src="/images/lifestyle/chasen-shadow.jpg"
          alt="Shadow of a hand holding a bamboo chasen against a cream wall"
          height={380}
          sizes="(max-width: 900px) 100vw, 50vw"
          position="center 40%"
          className={styles.promoImage}
        />
      </section>
    </main>
  );
}
