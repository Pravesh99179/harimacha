import React from 'react';

function ProductScreen({ productId, go, onAdd }) {
  const p = PRODUCTS.find((x) => x.id === productId) || PRODUCTS[3];
  const [size, setSize] = React.useState(p.sizes[0].value);
  const [plan, setPlan] = React.useState('once');
  const [gift, setGift] = React.useState(false);
  const [qty, setQty] = React.useState(1);
  const [pin, setPin] = React.useState('');
  React.useEffect(() => { setSize(p.sizes[0].value); setQty(1); }, [p.id]);
  const s = p.sizes.find((x) => x.value === size) || p.sizes[0];
  const base = parseInt(s.meta.replace(/[^\d]/g, ''), 10);
  const unit = plan === 'sub' ? Math.round(base * 0.85) : base;
  const pinErr = pin && !/^\d{6}$/.test(pin) ? 'Pincodes are 6 digits' : null;
  return (
    <main style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '32px var(--gutter) 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
        <a onClick={() => go('shop')} style={{ cursor: 'pointer' }}>Shop</a><Icon name="chevron-right" size={14} /><span>{p.name}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 56, alignItems: 'start' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Placeholder label={`product shot · ${p.id} · front`} height={520} style={{ gridColumn: '1 / -1' }} />
          <Placeholder label="detail · powder texture" height={220} />
          <Placeholder label="in use · latte" height={220} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'sticky', top: 140 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Badge tone="matcha" icon="leaf">{p.grade}</Badge>
            {p.tag && <Badge tone="accent">{p.tag}</Badge>}
          </div>
          <Text variant="display-md" color="var(--text-brand)">{p.name}</Text>
          <Text variant="body-lg" color="var(--text-secondary)">{p.blurb}</Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 500 }}>{rupee(unit * qty)}</span>
            {plan === 'sub' && <span style={{ fontSize: 18, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{rupee(base * qty)}</span>}
            {p.cup && <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>≈ {rupee(p.cup)} a cup</span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 140px', gap: 12 }}>
            <Select label="Size" value={size} onChange={setSize} options={p.sizes} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Text variant="label">Qty</Text>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, border: '1.5px solid var(--input-border)', borderRadius: 'var(--input-radius)', background: 'var(--input-bg)', padding: '0 2px' }}>
                <IconButton size="sm" icon="minus" label="Less" onClick={() => setQty(Math.max(1, qty - 1))} />
                <span style={{ fontWeight: 500 }}>{qty}</span>
                <IconButton size="sm" icon="plus" label="More" onClick={() => setQty(qty + 1)} />
              </div>
            </div>
          </div>
          <Card padding={16} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Radio name="plan" value="once" checked={plan === 'once'} onChange={setPlan} label="One-time purchase" />
            <Radio name="plan" value="sub" checked={plan === 'sub'} onChange={setPlan} label="Subscribe & save 15%" description="Delivered every 30 days. Skip or cancel anytime." />
          </Card>
          <Switch checked={gift} onChange={setGift} label="Gift wrap with a handwritten note (free)" />
          <Button variant="accent" size="lg" fullWidth iconLeft="shopping-bag" onClick={() => onAdd(p, s, qty, unit)}>Add to cart · {rupee(unit * qty)}</Button>
          <Input label="Check delivery" placeholder="6-digit pincode" iconLeft="map-pin" value={pin} onChange={(e) => setPin(e.target.value)} error={pinErr} helper={!pinErr && pin ? 'Arrives in 2–4 days' : 'We ship across India'} />
        </div>
      </div>
    </main>
  );
}
