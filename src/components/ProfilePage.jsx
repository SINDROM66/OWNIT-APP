import React from 'react';
import { ArrowLeft, Users, CheckCircle } from 'lucide-react';

export default function ProfilePage({ profile, userType, portfolio, properties, onLogout, onBack, fmt }) {
  const totalInvested = portfolio.reduce((sum, item) => sum + item.invested, 0);
  const monthlyIncome = portfolio.reduce((sum, item) => sum + item.monthlyReturn, 0);
  const totalHoldings = portfolio.length;
  const availableProperties = properties.length;

  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <button
        onClick={onBack}
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
          marginBottom: '18px'
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '24px', background: 'var(--greenXL)', display: 'grid', placeItems: 'center' }}>
          <Users size={34} style={{ color: 'var(--green)' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>
            {profile?.name || 'OwnIt User'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>
            {profile?.role || (userType === 'investor' ? 'Investor' : 'Asset Lister')} · {profile?.location || 'Kampala, Uganda'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '18px', padding: '14px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 700 }}>
            Total Invested
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--green)' }}>
            {fmt(totalInvested)}
          </div>
        </div>
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '18px', padding: '14px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 700 }}>
            Monthly Returns
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--green)' }}>
            {fmt(monthlyIncome)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '18px', padding: '14px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 700 }}>
            Holdings
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{totalHoldings}</div>
        </div>
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '18px', padding: '14px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 700 }}>
            Available Assets
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{availableProperties}</div>
        </div>
      </div>

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '18px', padding: '16px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <CheckCircle size={16} style={{ color: 'var(--green)' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>Verified account</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text3)', lineHeight: '1.6' }}>
          {profile?.email || 'investor@ownit.ug'} · {profile?.phone || '+256 772 123 456'} · Member since {profile?.memberSince || 'Feb 2025'}
        </div>
      </div>

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '18px', padding: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Account details
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text3)' }}>
            <span>Role</span>
            <span>{profile?.role || 'Investor'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text3)' }}>
            <span>Status</span>
            <span>Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text3)' }}>
            <span>Preferred payout</span>
            <span>MTN Mobile Money</span>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          background: 'var(--red)',
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          padding: '14px',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        Logout
      </button>
    </div>
  );
}
