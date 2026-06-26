import React from 'react';
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';

export default function PropertyDetails({ property, onBack, onInvest, fmt, pct }) {
  const fp = pct(property.funded, property.totalVal);
  const fc = property.color === 'gold' ? '#C17F00' : property.color === 'blue' ? '#1565C0' : '#1A7A45';
  const ownMin = ((property.minInvest / property.totalVal) * 100).toFixed(4);
  const moMin = Math.round((property.minInvest / property.totalVal) * property.totalVal * property.yield / 100 / 12);

  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <button
        onClick={onBack}
        style={{
          background: 'var(--greenXL)',
          borderRadius: '10px',
          padding: '6px 12px',
          color: 'var(--green)',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontFamily: 'inherit',
          marginBottom: '14px',
          outline: 'none',
          border: 'none'
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {property.type} · {property.location}
      </div>

      <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', lineHeight: '1.25', marginBottom: '14px' }}>
        {property.name}
      </h1>

      <div style={{
        background: property.color === 'green' ? '#E8F7EE' : property.color === 'gold' ? '#FFF8E1' : property.color === 'purple' ? '#F3E8FF' : '#EFF6FF',
        borderRadius: '16px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '56px',
        border: '1.5px solid var(--border)',
        marginBottom: '14px'
      }}>
        {property.emoji}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {[[fmt(property.totalVal), 'Total Value'], ['+' + property.yield + '%', 'Annual Yield'], [property.investors + ' owners', 'Investors']].map(([v, k], idx) => (
          <div key={idx} style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: k === 'Annual Yield' ? 'var(--gold)' : 'var(--green)', marginBottom: '2px' }}>
              {v}
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text3)', fontWeight: 600 }}>{k}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '12px 14px', marginBottom: '12px' }}>
        <div style={{ background: 'var(--surf2)', borderRadius: '8px', height: '7px', overflow: 'hidden', marginBottom: '5px' }}>
          <div style={{ height: '100%', background: fc, borderRadius: '8px', width: `${fp}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text3)' }}>
            {fmt(property.funded)} of {fmt(property.totalVal)}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--green)' }}>{fp}% funded</span>
        </div>
      </div>

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '13px 14px', marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          About
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: '1.75' }}>
          {property.desc}
        </p>
      </div>

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '13px 14px', marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Asset Highlights
        </div>
        {property.perks.map((pk, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: idx === property.perks.length - 1 ? 0 : '7px' }}>
            <CheckCircle size={14} style={{ color: 'var(--green)', marginTop: '1px', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: 'var(--text2)' }}>{pk}</span>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--greenXL)', border: '1.5px solid var(--border2)', borderRadius: '14px', padding: '13px 14px', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--green)', marginBottom: '5px' }}>📐 Minimum co-ownership breakdown</div>
        <div style={{ fontSize: '12px', color: 'var(--text2)' }}>
          Invest <strong style={{ color: 'var(--green)' }}>{fmt(property.minInvest)}</strong> → own <strong style={{ color: 'var(--gold)' }}>{ownMin}%</strong> of this asset
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text2)', marginTop: '3px' }}>
          Monthly returns: <strong style={{ color: 'var(--green)' }}>{fmt(moMin)}</strong> via MTN MoMo
        </div>
      </div>

      <button
        onClick={onInvest}
        style={{
          background: 'var(--green)',
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          padding: '14px',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
          width: '100%',
          fontFamily: 'inherit'
        }}
      >
        Co-own This Asset
      </button>

      <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--muted)', marginTop: '8px' }}>
        Regulated · Ownership certificate in OwnIt escrow · Capital at risk
      </div>
    </div>
  );
}
