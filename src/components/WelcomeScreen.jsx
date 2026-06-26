import React, { useState, useEffect } from 'react';

export default function WelcomeScreen({ onGetStarted, onLogin }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    { emoji: '🤝', title: 'Co-own Real Assets', sub: 'Pool funds with others to co-own properties, commodities, minerals & more from as low as UGX 50,000' },
    { emoji: '📱', title: 'Earn Profit Share', sub: 'Receive profit disbursements directly to your Mobile Money or Bank Account' },
    { emoji: '📈', title: 'Grow Your Wealth', sub: 'Diversify across real estate, trade finance, agricultural commodities & minerals' },
  ];

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.phone}>
        <div style={styles.screen}>
          <div style={styles.hero}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '4px' }}>
              OwnIt<span style={{ color: '#A8F0C0' }}>.</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>Uganda's #1 Crowd Funding App</div>

            <div style={styles.slideBox}>
              <div style={{ fontSize: '56px', marginBottom: '14px' }}>{slides[slide].emoji}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>
                {slides[slide].title}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: '260px', margin: '0 auto' }}>
                {slides[slide].sub}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '20px' }}>
              {slides.map((_, i) => (
                <div key={i} onClick={() => setSlide(i)} style={{
                  width: i === slide ? '20px' : '6px', height: '6px',
                  borderRadius: '3px', background: i === slide ? '#A8F0C0' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer', transition: 'all 0.3s'
                }} />
              ))}
            </div>
          </div>

          <div style={{ padding: '28px 20px 24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              {[
                { emoji: '🚛', label: 'Trade' },
                { emoji: '⛏️', label: 'Minerals' },
                { emoji: '🌾', label: 'Commodities' },
                { emoji: '🏗️', label: 'Infrastructure' },
              ].map(({ emoji, label }) => (
                <div key={label} style={styles.chip}>
                  <span>{emoji}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--green)' }}>{label}</span>
                </div>
              ))}
            </div>

            <div style={styles.statRow}>
              {[['500K+', 'Investors'], ['100+', 'Assets'], ['14–32%', 'Avg Yield']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 700, color: 'var(--green)' }}>{v}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>

            <button onClick={onGetStarted} style={styles.bigBtn}>
              Get Started — It's Free
            </button>

            <button onClick={onLogin} style={styles.outlineBtn}>
              I already have an account
            </button>

            <div style={{ fontSize: '10px', color: 'var(--muted)', textAlign: 'center', marginTop: '14px', lineHeight: 1.5 }}>
              Regulated · Secure · Ugandan-owned
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', background: '#D6EBD9', padding: '16px',
    fontFamily: "'DM Sans', sans-serif"
  },
  phone: {
    maxWidth: '420px', width: '100%', background: '#F4F9F5',
    borderRadius: '40px', overflow: 'hidden',
    boxShadow: '0 24px 72px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(26,122,69,0.2)'
  },
  screen: { height: '680px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' },
  hero: {
    background: 'linear-gradient(160deg, #1A7A45 0%, #0f5c33 100%)',
    padding: '52px 24px 28px', textAlign: 'center'
  },
  slideBox: {
    marginTop: '28px', minHeight: '130px', display: 'flex',
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  },
  chip: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '5px', background: 'var(--greenXL)', border: '1.5px solid var(--border2)',
    borderRadius: '10px', padding: '8px 6px'
  },
  statRow: {
    display: 'flex', justifyContent: 'space-around',
    background: 'var(--surf)', border: '1.5px solid var(--border)',
    borderRadius: '14px', padding: '14px', marginBottom: '18px'
  },
  bigBtn: {
    background: '#1A7A45', color: '#fff', border: 'none', borderRadius: '14px',
    padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
    width: '100%', fontFamily: 'inherit', marginBottom: '10px'
  },
  outlineBtn: {
    background: '#fff', color: 'var(--green)', border: '1.5px solid var(--border2)',
    borderRadius: '14px', padding: '12px', fontSize: '13px', fontWeight: 600,
    cursor: 'pointer', width: '100%', fontFamily: 'inherit'
  }
};
