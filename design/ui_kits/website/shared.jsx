import React from 'react';

const PRODUCTS = [
  { id: 'everyday', name: 'Everyday Matcha', grade: 'Everyday', blurb: 'Bright, smooth, made for lattes and iced matcha.', sizes: [{ value: '50', label: '50 g tin', meta: '₹599' }, { value: '100', label: '100 g pouch', meta: '₹999' }], price: 599, cup: 12, tag: 'Best value' },
  { id: 'ceremonial', name: 'Ceremonial Matcha', grade: 'Ceremonial', blurb: 'First-harvest leaf. Sweet, grassy, drink it straight.', sizes: [{ value: '30', label: '30 g tin', meta: '₹899' }, { value: '60', label: '60 g tin', meta: '₹1,649' }], price: 899, cup: 30 },
  { id: 'culinary', name: 'Culinary Matcha', grade: 'Culinary', blurb: 'Bold and robust for baking, smoothies and kulfi.', sizes: [{ value: '100', label: '100 g pouch', meta: '₹549' }], price: 549, cup: 6 },
  { id: 'kit', name: 'Starter Kit', grade: 'Kit', blurb: 'Chasen, chashaku, bowl and a 30 g tin of Everyday.', sizes: [{ value: 'kit', label: 'Full kit', meta: '₹1,299' }], price: 1299, cup: null, tag: 'Gift-ready' },
  { id: 'chasen', name: 'Bamboo Chasen', grade: 'Tools', blurb: '80-prong whisk, hand-cut from a single piece of bamboo.', sizes: [{ value: '80', label: '80 prong', meta: '₹699' }], price: 699, cup: null },
];

const rupee = (n) => '₹' + n.toLocaleString('en-IN');

function Placeholder({ label, height = 280, tone = 'cream', radius = 16, style }) {
  const bg = tone === 'dark' ? ['#2A452F', '#25402B', 'var(--cream-300)'] : ['var(--cream-200)', 'var(--cream-100)', 'var(--matcha-700)'];
  return (
    <div style={{
      height, borderRadius: radius, display: 'flex', alignItems: 'flex-end', padding: 14,
      background: `repeating-linear-gradient(135deg, ${bg[0]} 0 12px, ${bg[1]} 12px 24px)`, ...style,
    }}>
      <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11, color: bg[2], background: tone === 'dark' ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.6)', padding: '3px 7px', borderRadius: 4 }}>{label}</span>
    </div>
  );
}

function ProductTile({ p, onOpen, onAdd }) {
  return (
    <Card padding={0} interactive onClick={() => onOpen(p.id)} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <Placeholder label={`product shot · ${p.id}`} height={240} radius={0} />
        {p.tag && <Badge tone="accent" style={{ position: 'absolute', top: 14, left: 14 }}>{p.tag}</Badge>}
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <Text variant="overline" color="var(--text-secondary)">{p.grade}</Text>
        <Text variant="heading-sm">{p.name}</Text>
        <Text variant="body-sm" color="var(--text-secondary)" style={{ flex: 1 }}>{p.blurb}</Text>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 500 }}>{rupee(p.price)}</span>
            {p.cup && <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{rupee(p.cup)} a cup</span>}
          </span>
          <Button size="sm" variant="secondary" iconLeft="plus" onClick={(e) => { e.stopPropagation(); onAdd(p, p.sizes[0]); }}>Add</Button>
        </div>
      </div>
    </Card>
  );
}
