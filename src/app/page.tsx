import { getProducts } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Placeholder } from '@/components/site/Placeholder';
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
          <Placeholder label="hero · whisking matcha in a bowl" height={460} tone="dark" radius={24} className={styles.heroImage} />
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

      <section className={`container ${styles.section} ${styles.promo}`} aria-labelledby="kit-title">
        <Card tone="cream" padding={40} className={styles.promoCard}>
          <Text variant="overline">New to matcha?</Text>
          <Text variant="display-sm" color="var(--text-brand)" id="kit-title">Everything you need, ₹1,299.</Text>
          <Text variant="body-md">Bamboo chasen, scoop, bowl and a tin of Everyday — plus a two-minute brew card.</Text>
          <div><Button href="/products/kit" iconRight="arrow-right">See the kit</Button></div>
        </Card>
        <Placeholder label="lifestyle · starter kit flat lay" height={380} className={styles.promoImage} />
      </section>
    </main>
  );
}
