import React from 'react';

function CartDrawer({ open, items, onClose, setQty, remove }) {
  const subtotal = items.reduce((s, i) => s + i.unit * i.qty, 0);
  const freeShip = 799;
  const left = Math.max(0, freeShip - subtotal);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: open ? 'auto' : 'none' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'var(--surface-overlay)', opacity: open ? 1 : 0, transition: 'opacity var(--duration-slow) var(--ease-out)' }} />
      <aside style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '100%', background: 'var(--surface-page)',
        transform: open ? 'none' : 'translateX(100%)', transition: 'transform var(--duration-slow) var(--ease-out)',
        display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
          <Text variant="heading-md">Your cart</Text>
          <IconButton icon="x" label="Close" onClick={onClose} />
        </div>
        <div style={{ padding: '14px 24px', background: left ? 'var(--haldi-100)' : 'var(--matcha-100)', fontSize: 14, color: left ? 'var(--haldi-900)' : 'var(--matcha-800)' }}>
          {left ? `You're ${rupee(left)} away from free shipping` : 'Free shipping unlocked'}
          <div style={{ height: 4, borderRadius: 4, background: 'rgba(0,0,0,.08)', marginTop: 8 }}>
            <div style={{ height: 4, borderRadius: 4, width: `${Math.min(100, (subtotal / freeShip) * 100)}%`, background: 'var(--matcha-900)', transition: 'width var(--duration-slow) var(--ease-out)' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px' }}>
          {items.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '64px 0', color: 'var(--text-secondary)' }}>
              <Logo variant="mark" size={64} />
              <Text variant="body-md">Your cart is empty.</Text>
            </div>
          )}
          {items.map((i) => (
            <div key={i.key} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <Placeholder label={i.id} height={84} radius={10} style={{ width: 72, flex: 'none', padding: 6 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 500 }}>{i.name}</span>
                  <span style={{ fontWeight: 500 }}>{rupee(i.unit * i.qty)}</span>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{i.size}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <IconButton size="sm" variant="outline" icon="minus" label="Less" onClick={() => setQty(i.key, i.qty - 1)} />
                  <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 500 }}>{i.qty}</span>
                  <IconButton size="sm" variant="outline" icon="plus" label="More" onClick={() => setQty(i.key, i.qty + 1)} />
                  <Button size="sm" variant="ghost" onClick={() => remove(i.key)} style={{ marginLeft: 'auto' }}>Remove</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 24, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 500 }}><span>Subtotal</span><span>{rupee(subtotal)}</span></div>
          <Button size="lg" fullWidth disabled={!items.length} iconRight="arrow-right">Checkout</Button>
          <Text variant="caption" color="var(--text-secondary)" align="center">UPI, cards and COD accepted</Text>
        </div>
      </aside>
    </div>
  );
}
