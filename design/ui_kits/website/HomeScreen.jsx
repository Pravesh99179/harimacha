import React from 'react';

function HomeScreen({ go, onAdd }) {
  const grades = PRODUCTS.filter((p) => p.cup);
  return (
    <main>
      <section style={{ background: 'var(--surface-brand)', color: 'var(--text-on-brand)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px var(--gutter)', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' }}>
            <Text variant="overline" color="var(--matcha-300)">Stone-ground in Japan · Packed in India</Text>
            <Text variant="display-lg">Good matcha, every day.</Text>
            <Text variant="body-lg" style={{ maxWidth: 460, color: 'var(--cream-100)' }}>Proper shade-grown matcha at a price that makes it a habit, not a treat. From ₹12 a cup.</Text>
            <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
              <Button variant="accent" size="lg" iconRight="arrow-right" onClick={() => go('shop')}>Shop matcha</Button>
              <Button variant="outline" size="lg" style={{ borderColor: 'var(--cream-200)', color: 'var(--cream-200)', background: 'transparent' }} onClick={() => go('product')}>Get the starter kit</Button>
            </div>
          </div>
          <Placeholder label="hero · whisking matcha in a bowl" height={460} tone="dark" radius={24} />
        </div>
      </section>

      <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px var(--gutter) 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Text variant="overline" color="var(--text-secondary)">Find your grade</Text>
            <Text variant="display-md" color="var(--text-brand)">Premium, priced fairly.</Text>
          </div>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => go('shop')}>Compare all</Button>
        </div>
        <Table
          onRowClick={() => go('product')}
          columns={[
            { key: 'name', header: 'Grade', render: (r) => <span style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 500 }}>{r.name}{r.tag && <Badge tone="accent" size="sm">{r.tag}</Badge>}</span> },
            { key: 'blurb', header: 'Tastes like', render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.blurb}</span> },
            { key: 'cup', header: 'Per cup', align: 'right', render: (r) => rupee(r.cup) },
            { key: 'price', header: 'From', align: 'right', render: (r) => <span style={{ fontWeight: 500 }}>{rupee(r.price)}</span> },
            { key: 'add', header: '', align: 'right', width: 110, render: (r) => <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onAdd(r, r.sizes[0]); }}>Add</Button> },
          ]}
          rows={grades}
        />
      </section>

      <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px var(--gutter) 0', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 24 }}>
        <Card tone="cream" padding={40} style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <Text variant="overline">New to matcha?</Text>
          <Text variant="display-sm" color="var(--text-brand)">Everything you need, ₹1,299.</Text>
          <Text variant="body-md">Bamboo chasen, scoop, bowl and a tin of Everyday — plus a two-minute brew card.</Text>
          <div><Button iconRight="arrow-right" onClick={() => go('product')}>See the kit</Button></div>
        </Card>
        <Placeholder label="lifestyle · starter kit flat lay" height={380} />
      </section>
    </main>
  );
}
