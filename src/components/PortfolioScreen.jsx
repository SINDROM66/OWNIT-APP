import React from 'react';

export default function PortfolioScreen({ portfolio, properties, fmt, pct, onInvestMore }) {
  const tot = portfolio.reduce((s, p) => s + p.invested, 0);
  const mo = portfolio.reduce((s, p) => s + p.monthlyReturn, 0);

  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>
        My Portfolio
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {[[fmt(tot), 'Total Invested', 'text'], [fmt(mo) + '/mo', 'Monthly Returns', 'green'], ['3', 'Assets', 'text'], ['12.4%', 'Avg Return', 'gold']].map(([v, k, c], idx) => (
          <div key={idx} style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '13px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 700 }}>
              {k}
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 700, color: c === 'green' ? 'var(--green)' : c === 'gold' ? 'var(--gold)' : 'var(--text)' }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      {portfolio.map((p) => {
        const op = ((p.invested / p.totalVal) * 100).toFixed(4);
        return (
          <div key={p.id} style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '14px 16px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(26,122,69,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '11px', marginBottom: '10px' }}>
              <div style={{ fontSize: '28px', width: '46px', height: '46px', background: 'var(--surf2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                {p.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '1px' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{p.type}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '26px', fontWeight: 700, color: 'var(--green)' }}>
                  {op}%
                </div>
                <div style={{ fontSize: '9px', color: 'var(--muted)' }}>ownership</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[[fmt(p.invested), 'Invested', 'text'], [fmt(p.monthlyReturn) + '/mo', 'Returns', 'green'], [op + '%', 'Your share', 'gold']].map(([v, k, c], idx) => (
                <div key={idx} style={{ background: 'var(--surf2)', borderRadius: '9px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: c === 'green' ? 'var(--green)' : c === 'gold' ? 'var(--gold)' : 'var(--text)' }}>
                    {v}
                  </div>
                  <div style={{ fontSize: '8px', color: 'var(--muted)', marginTop: '1px' }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <button
        onClick={onInvestMore}
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
          marginTop: '4px'
        }}
      >
        Invest in More Assets
      </button>
    </div>
  );
}
