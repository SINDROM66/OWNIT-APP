import React, { useState } from 'react';
import { MapPin, TrendingUp, ChevronRight } from 'lucide-react';

export default function HomeScreen({ properties, filterType, setFilterType, onSelectProperty, onInvest, fmt, pct }) {
  const types = ['All', 'Real Estate', 'Commodities', 'Trade', 'Minerals', 'Infrastructure'];
  const filtered = filterType === 'All' ? properties : properties.filter(p => p.type === filterType);

  return (
    <div style={{ paddingBottom: '14px' }}>
      <div style={styles.hero}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: '9px', padding: '3px 10px', fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} /> Kampala, Uganda
          </div>
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: '1px' }}>
          OwnIt<span style={{ color: '#A8F0C0' }}>.</span>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '18px' }}>
          Co-own assets from UGX 50,000
        </div>

        <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '18px', padding: '16px 18px' }}>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '3px' }}>
            Your Portfolio Value
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '30px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
            {fmt(1200000)}
          </div>
          <div style={{ fontSize: '11px', color: '#A8F0C0', fontWeight: 600 }}>
            ↑ +12.4% this year · 3 assets
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 12px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>
                Monthly Income
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#A8F0C0' }}>
                {fmt(174000)}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 12px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>
                Total Invested
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                {fmt(1200000)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '44px 18px 14px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '7px', overflowX: 'auto', paddingBottom: '2px', marginBottom: '16px', scrollbarWidth: 'none' }}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: '5px 12px',
                background: filterType === t ? 'var(--green)' : 'var(--surf2)',
                color: filterType === t ? '#fff' : 'var(--text3)',
                border: filterType === t ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Properties */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
            Available Assets
          </span>
          <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 600 }}>
            {filtered.length} listed
          </span>
        </div>

        {filtered.map((p) => (
          <PropertyCard 
            key={p.id} 
            property={p} 
            onSelect={() => onSelectProperty(p)}
            onInvest={() => onInvest(p.id)}
            pct={pct}
            fmt={fmt}
          />
        ))}

        {/* How It Works */}
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '14px 16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>
            How OwnIt Works
          </div>
          {[
            ['💰', 'Pool funds from as low as UGX 50,000 to co-own any asset'],
            ['%', 'Your share % = your amount ÷ total asset value'],
            ['📅', 'Earn profit share monthly via MTN MoMo'],
            ['📈', 'Sell your share or exit when the asset is sold']
          ].map(([emoji, text], idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: idx === 3 ? 0 : '8px' }}>
              <span style={{ fontSize: '16px' }}>{emoji}</span>
              <span style={{ fontSize: '12px', color: 'var(--text2)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property, onSelect, onInvest, pct, fmt }) {
  const fp = pct(property.funded, property.totalVal);
  const fc = property.color === 'gold' ? '#C17F00' : property.color === 'blue' ? '#1565C0' : '#1A7A45';
  const tc = property.type === 'Real Estate' ? 'var(--greenD)' : property.type === 'Commodities' ? '#7D5A00' : property.type === 'Minerals' ? '#6B21A8' : property.type === 'Trade' ? '#1E40AF' : '#1A7A45';
  const bgColor = property.color === 'green' ? '#E8F7EE' : property.color === 'gold' ? '#FFF8E1' : property.color === 'purple' ? '#F3E8FF' : '#EFF6FF';

  return (
    <div
      onClick={onSelect}
      style={{
        background: 'var(--surf)',
        border: '1.5px solid var(--border)',
        borderRadius: '18px',
        overflow: 'hidden',
        marginBottom: '12px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(26,122,69,0.06)',
        transition: 'transform 0.15s'
      }}
    >
      <div style={{ height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', position: 'relative', background: bgColor }}>
        {property.emoji}
        <div style={{ position: 'absolute', top: '10px', left: '10px', borderRadius: '8px', padding: '3px 8px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', background: property.type === 'Apartment' ? '#D4EFE0' : property.type === 'Land' ? '#FFF3CD' : '#DBEAFE', color: tc }}>
          {property.type}
        </div>
        {fp > 85 && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '8px', padding: '3px 8px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', background: '#C0392B', color: '#fff' }}>
            Hot 🔥
          </div>
        )}
      </div>

      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '1px' }}>
          {property.name}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={10} /> {property.location} · {property.investors} investors
        </div>

        <div style={{ background: 'var(--surf2)', borderRadius: '8px', height: '7px', overflow: 'hidden', marginBottom: '5px' }}>
          <div style={{ height: '100%', background: fc, borderRadius: '8px', width: `${fp}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '9px', color: 'var(--muted)' }}>
            {fmt(property.funded)} raised
          </span>
          <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--green)' }}>
            {fp}% funded
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '9px', paddingTop: '9px', borderTop: '1.5px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text3)' }}>
              From <strong style={{ color: 'var(--green)' }}>{fmt(property.minInvest)}</strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', background: '#FFF8E1', padding: '3px 8px', borderRadius: '8px', display: 'inline-block' }}>
              +{property.yield}% yield
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onInvest(); }}
            style={{
              background: 'var(--green)',
              color: '#fff',
              border: 'none',
              borderRadius: '11px',
              padding: '7px 14px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    background: 'var(--green)',
    padding: '48px 20px 26px',
    position: 'relative',
    overflow: 'hidden'
  }
};
