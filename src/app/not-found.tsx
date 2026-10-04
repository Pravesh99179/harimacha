import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Text } from '@/components/ui/Text';

export default function NotFound() {
  return (
    <main className="container" style={{ paddingTop: 96, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
      <Logo variant="mark" size={72} />
      <Text variant="display-sm" as="h1" color="var(--text-brand)">Nothing brewing here.</Text>
      <Text variant="body-lg" color="var(--text-secondary)">That page doesn&rsquo;t exist. The matcha does, though.</Text>
      <Button href="/shop" iconRight="arrow-right">Shop matcha</Button>
    </main>
  );
}
