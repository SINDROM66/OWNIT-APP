import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ onBack }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  if (step === 2) {
    return (
      <div style={styles.container}>
        <div style={styles.phone}>
          <div style={styles.screen}>
            <div style={styles.hero} />
            <div style={{ padding: '46px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📧</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '8px' }}>
                Check Your Email
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '8px' }}>
                We sent a password reset link to
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '24px' }}>
                {email}
              </div>
              <div style={{ background: 'var(--greenXL)', border: '1.5px solid var(--border2)', borderRadius: '12px', padding: '12px 16px', width: '100%', marginBottom: '20px', fontSize: '12px', color: 'var(--greenD)', lineHeight: 1.6, textAlign: 'left' }}>
                💡 Check your spam folder if you don't see it within 2 minutes
              </div>
              <button onClick={onBack} style={styles.bigBtn}>Back to Login</button>
              <button
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginTop: '12px', fontFamily: 'inherit' }}
              >
                Try a different email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.phone}>
        <div style={styles.screen}>
          <div style={styles.hero}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: '1px' }}>
              OwnIt<span style={{ color: '#A8F0C0' }}>.</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Reset your password</div>
          </div>

          <div style={{ padding: '44px 18px 14px' }}>
            <button onClick={onBack} style={styles.backBtn}>
              <ArrowLeft size={16} /> Back to Login
            </button>

            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
              Forgot Password?
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '24px', lineHeight: 1.6 }}>
              Enter your email or phone and we'll send you a reset link.
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                Email or Phone
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email or +256772..."
                style={styles.input}
              />
            </div>

            <button
              onClick={() => email && setStep(2)}
              disabled={!email}
              style={{ ...styles.bigBtn, opacity: email ? 1 : 0.5, cursor: email ? 'pointer' : 'not-allowed' }}
            >
              Send Reset Link
            </button>
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
  hero: { background: '#1A7A45', padding: '48px 20px 26px' },
  backBtn: {
    background: 'var(--greenXL)', border: 'none', borderRadius: '10px',
    padding: '6px 12px', color: 'var(--green)', cursor: 'pointer',
    fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center',
    gap: '5px', fontFamily: 'inherit', marginBottom: '20px'
  },
  input: {
    background: '#EEF7F1', border: '1.5px solid #C8E3D0', borderRadius: '12px',
    padding: '10px 14px', color: '#0D1F15', fontFamily: 'inherit',
    fontSize: '13px', width: '100%', outline: 'none', boxSizing: 'border-box'
  },
  bigBtn: {
    background: '#1A7A45', color: '#fff', border: 'none', borderRadius: '14px',
    padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
    width: '100%', fontFamily: 'inherit'
  }
};
