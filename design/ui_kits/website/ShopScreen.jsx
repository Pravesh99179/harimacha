import React from 'react';

function ShopScreen({ go, onAdd }) {
  const all = ['Everyday', 'Ceremonial', 'Culinary', 'Kit', 'Tools'];
  const [grades, setGrades] = React.useState(all);
  const [sort, setSort] = React.useState('popular');
  const [inStock, setInStock] = React.useState(true);
  const toggle = (g, on) => setGrades(on ? [...grades, g] : grades.filter((x) => x !== g));
  let list = PRODUCTS.filter((p) => grades.includes(p.grade));
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  return (
    <main style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px var(--gutter) 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
        <Text variant="overline" color="var(--text-secondary)">Shop</Text>
        <Text variant="display-md" color="var(--text-brand)">All matcha</Text>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0,1fr)', gap: 40, alignItems: 'start' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 140 }}>
          <Text variant="label">Grade</Text>
          {all.map((g) => <Checkbox key={g} label={g} checked={grades.includes(g)} onChange={(on) => toggle(g, on)} />)}
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '6px 0' }} />
          <Switch label="In stock only" checked={inStock} onChange={setInStock} />
        </aside>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
            <Text variant="body-sm" color="var(--text-secondary)">{list.length} products</Text>
            <Select size="sm" value={sort} onChange={setSort} style={{ width: 200 }} options={[{ value: 'popular', label: 'Most loved' }, { value: 'low', label: 'Price: low to high' }, { value: 'high', label: 'Price: high to low' }]} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {list.map((p) => <ProductTile key={p.id} p={p} onOpen={() => go('product', p.id)} onAdd={onAdd} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
