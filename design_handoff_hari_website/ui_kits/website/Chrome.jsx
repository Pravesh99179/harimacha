import React from 'react';

function SiteHeader({ page, go, cartCount, openCart }) {
  const links = [['shop', 'Shop'], ['product', 'Starter kit'], ['home', 'Our story']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{ background: 'var(--haldi-300)', color: 'var(--matcha-950)', fontSize: 13, fontWeight: 500, textAlign: 'center', padding: '8px 16px' }}>
        Free shipping over ₹799 · A free chasen with your first tin
      </div>
      <div style={{ background: 'var(--surface-page)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)', height: 72, display: 'flex', alignItems: 'center', gap: 32 }}>
          <a onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex' }}><Logo variant="compact" size={30} /></a>
          <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
            {links.map(([k, l]) => (
              <Button key={l} size="sm" variant="ghost" onClick={() => go(k)} style={{ fontWeight: page === k && k !== 'home' ? 600 : 500 }}>{l}</Button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 4 }}>
            <IconButton icon="search" label="Search" />
            <IconButton icon="user" label="Account" />
            <IconButton icon="shopping-bag" label="Cart" badge={cartCount || null} onClick={openCart} />
          </div>
        </div>
      </div>
    </header>
  );
}

function SiteFooter({ go }) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  return (
    <footer style={{ background: 'var(--surface-brand)', color: 'var(--text-on-brand)', marginTop: 96 }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px var(--gutter) 40px', display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) repeat(2, minmax(0,1fr)) minmax(0,1.4fr)', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <Logo tone="onDark" size={56} showHindi />
        </div>
        {[['Shop', ['Everyday', 'Ceremonial', 'Culinary', 'Tools']], ['Help', ['Brew guide', 'Shipping', 'Returns', 'Contact']]].map(([h, items]) => (
          <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Text variant="overline" color="var(--matcha-300)">{h}</Text>
            {items.map((i) => <a key={i} onClick={() => go('shop')} style={{ color: 'var(--cream-200)', textDecoration: 'none', cursor: 'pointer', fontSize: 15 }}>{i}</a>)}
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Text variant="overline" color="var(--matcha-300)">Brew notes</Text>
          <Text variant="body-sm">One recipe a month. No spam.</Text>
          {done ? <Badge tone="accent" icon="check">You're on the list</Badge> : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
              <Button variant="accent" onClick={() => email && setDone(true)}>Join</Button>
            </div>
          )}
        </div>
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '20px var(--gutter)', borderTop: '1px solid rgba(241,231,204,.15)', fontSize: 13, color: 'var(--matcha-200)' }}>
        © 2026 Hari Matcha · Packed in India
      </div>
    </footer>
  );
}
