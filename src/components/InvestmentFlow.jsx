import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function InvestmentFlow({ flow, setFlow, properties, fmt, pct }) {
  const property = properties.find(p => p.id === flow.propertyId);
  if (!property) return null;

  const [amount, setAmount] = useState(flow.amount || property.minInvest);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const own = ((amount / property.totalVal) * 100).toFixed(4);
  const mo = Math.round((amount / property.totalVal) * property.totalVal * property.yield / 100 / 12);
  const yr = Math.round(amount * property.yield / 100);

  const handleNext = () => {
    if (flow.step < 4) {
      setFlow({ ...flow, step: flow.step + 1, amount });
    }
  };

  const handleComplete = () => {
    setFlow(null);
  };

  // Step 3: Confirm & Pay
  if (flow.step === 4) {
    return (
      <div style={{ padding: '46px 18px 14px' }}>
        <button
          onClick={() => setFlow({ ...flow, step: 3 })}
          style={{
            background: 'var(--greenXL)',
            border: 'none',
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
            marginBottom: '14px'
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Confirm Investment
        </div>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          {property.name}
        </h2>

        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '14px 16px', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Investment Summary
          </div>
          {[['Amount', fmt(amount), 'text'], ['Ownership', own + '%', 'gold'], ['Property value', fmt(property.totalVal), 'text'], ['Monthly income', fmt(mo), 'green'], ['Annual return (' + property.yield + '%)', fmt(yr), 'green'], ['5-yr projected', fmt(Math.round(amount + yr * 5)), 'gold']].map(([k, v, c], idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx < 5 ? '1.5px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: c === 'green' ? 'var(--green)' : c === 'gold' ? 'var(--gold)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '13px 14px', marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginBottom: '9px' }}>Pay via</div>
          <div style={{ background: 'var(--greenXL)', border: '1.5px solid var(--border2)', borderRadius: '11px', padding: '11px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📱</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>MTN Mobile Money</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>0772 *** 841</div>
            </div>
            <CheckCircle size={17} style={{ color: 'var(--green)', marginLeft: 'auto' }} />
          </div>
        </div>

        <div style={{ background: '#FFF3CD', border: '1.5px solid #F5C842', borderRadius: '12px', padding: '10px 13px', marginBottom: '16px', fontSize: '11px', color: 'var(--gold)', fontWeight: 500 }}>
          ⚖️ By investing you agree to OwnIt's co-ownership terms. All assets verified by licensed valuers. Capital at risk.
        </div>

        <button
          onClick={handleNext}
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
          Confirm & Pay {fmt(amount)} via MoMo
        </button>
      </div>
    );
  }

  // Step 5: Success
  if (flow.step === 5) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', height: '560px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '6px' }}>
          You're an asset co-owner!
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '20px' }}>
          You now own <strong style={{ color: 'var(--gold)' }}>{own}%</strong> of<br />
          <strong style={{ color: 'var(--text)' }}>{property.name}</strong>
        </div>

        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '16px 20px', width: '100%', marginBottom: '16px' }}>
          {[['Your investment', fmt(amount), 'text'], ['Ownership %', own + '%', 'gold'], ['Monthly income', fmt(mo), 'green']].map(([k, v, c], idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: idx < 2 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: c === 'green' ? 'var(--green)' : c === 'gold' ? 'var(--gold)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--greenXL)', border: '1.5px solid var(--border2)', borderRadius: '12px', padding: '10px 14px', width: '100%', marginBottom: '18px', fontSize: '11px', color: 'var(--greenD)', textAlign: 'left' }}>
          💰 First profit disbursement in 30 days · Ownership certificate issued within 48hrs
        </div>

        <button
          onClick={handleComplete}
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
            fontFamily: 'inherit',
            marginBottom: '10px'
          }}
        >
          View My Portfolio
        </button>

        <button
          onClick={handleComplete}
          style={{
            background: '#fff',
            color: 'var(--green)',
            border: '1.5px solid var(--border2)',
            borderRadius: '14px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
            fontFamily: 'inherit'
          }}
        >
          Invest in Another Property
        </button>
      </div>
    );
  }

  // Step 3: Payment Method
  if (flow.step === 3) {
    return (
      <div style={{ padding: '46px 18px 14px' }}>
        <button
          onClick={() => setFlow({ ...flow, step: 2 })}
          style={{
            background: 'var(--greenXL)',
            border: 'none',
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
            marginBottom: '14px'
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Select Payment Method
        </div>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          How to Pay?
        </h2>

        {[
          { id: 'momo', icon: '📱', name: 'MTN Mobile Money', desc: 'Direct from your phone', hint: '0772 *** 841' },
          { id: 'airtel', icon: '📞', name: 'Airtel Money', desc: 'Via Airtel Money app', hint: '*155#' },
          { id: 'bank', icon: '🏦', name: 'Bank Transfer', desc: 'Direct to OwnIt account', hint: 'ACC: 123456789' },
          { id: 'card', icon: '💳', name: 'Card', desc: 'Visa/Mastercard', hint: 'Secure payment' }
        ].map((method) => (
          <div
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            style={{
              background: paymentMethod === method.id ? 'var(--greenXL)' : 'var(--surf)',
              border: paymentMethod === method.id ? '2px solid var(--green)' : '1.5px solid var(--border)',
              borderRadius: '12px',
              padding: '13px 14px',
              marginBottom: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '24px' }}>{method.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: paymentMethod === method.id ? 'var(--green)' : 'var(--text)' }}>
                {method.name}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{method.desc}</div>
              {paymentMethod === method.id && (
                <div style={{ fontSize: '9px', color: 'var(--green)', fontWeight: 700, marginTop: '3px' }}>
                  {method.hint}
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={handleNext}
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
            fontFamily: 'inherit',
            marginTop: '16px'
          }}
        >
          Continue →
        </button>
      </div>
    );
  }

  // Step 2: Review
  if (flow.step === 2) {
    return (
      <div style={{ padding: '46px 18px 14px' }}>
        <button
          onClick={() => setFlow({ ...flow, step: 1 })}
          style={{
            background: 'var(--greenXL)',
            border: 'none',
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
            marginBottom: '14px'
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Review Investment
        </div>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          {property.name}
        </h2>

        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '14px 16px', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Investment Breakdown
          </div>
          {[['Amount', fmt(amount), 'text'], ['Ownership', own + '%', 'gold'], ['Monthly income', fmt(mo), 'green'], ['Annual return', fmt(yr), 'green']].map(([k, v, c], idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx < 3 ? '1.5px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: c === 'green' ? 'var(--green)' : c === 'gold' ? 'var(--gold)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setFlow({ ...flow, step: 3 })}
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
          Continue — Select Payment Method →
        </button>
      </div>
    );
  }

  // Step 1: Amount Selection (default)
  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <button
        onClick={() => setFlow(null)}
        style={{
          background: 'var(--greenXL)',
          border: 'none',
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
          marginBottom: '14px'
        }}
      >
        <ArrowLeft size={16} /> All assets
      </button>

      <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {property.type} · {property.location}
      </div>
      <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', lineHeight: '1.3', marginBottom: '14px' }}>
        {property.name}
      </h2>

      <div style={{ background: 'var(--surf2)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '14px 16px', margin: '10px 0' }}>
        <div style={{ fontSize: '9px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px', fontWeight: 700 }}>
          I want to invest
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '28px', fontWeight: 700, color: 'var(--green)', marginBottom: '2px' }}>
          {fmt(amount)}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '10px' }}>
          = <strong>{own}%</strong> ownership · <strong>{fmt(mo)}</strong>/month
        </div>
        <input
          type="range"
          min={property.minInvest}
          max={Math.min(property.totalVal * 0.25, 10000000)}
          step={50000}
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--green)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
          <span style={{ fontSize: '9px', color: 'var(--muted)' }}>Min: {fmt(property.minInvest)}</span>
          <span style={{ fontSize: '9px', color: 'var(--muted)' }}>Max: {fmt(Math.min(property.totalVal * 0.25, 10000000))}</span>
        </div>
      </div>

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '13px 14px', marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Returns Projection
        </div>
        {[['Monthly income', fmt(mo), 'green'], ['Annual return', fmt(yr), 'green'], ['Ownership %', own + '%', 'gold'], ['5yr projected', fmt(Math.round(amount + yr * 5)), 'gold']].map(([k, v, c], idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx < 3 ? '1.5px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: c === 'green' ? 'var(--green)' : 'var(--gold)' }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '7px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {[property.minInvest, 500000, 1000000, 2000000].map((v) => (
          <button
            key={v}
            onClick={() => setAmount(v)}
            style={{
              flex: 1,
              minWidth: 0,
              background: 'var(--surf2)',
              border: '1.5px solid var(--border)',
              borderRadius: '9px',
              padding: '7px 4px',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--text2)',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {fmt(v)}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--greenXL)', border: '1.5px solid var(--border2)', borderRadius: '12px', padding: '10px 13px', marginBottom: '14px', fontSize: '11px', color: 'var(--greenD)' }}>
        🔐 Ownership certificate in OwnIt escrow · Issued within 48hrs · MTN MoMo payouts
      </div>

      <button
        onClick={handleNext}
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
        Continue — Review Investment →
      </button>
    </div>
  );
}
