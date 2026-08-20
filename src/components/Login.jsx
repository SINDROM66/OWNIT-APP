import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login({ onLoginSuccess, onSwitchToRegister, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(null);

  const handleLogin = () => {
    if (email && password && userType) {
      onLoginSuccess(userType);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.phone}>
        <div style={styles.screen}>
          <div style={styles.hero}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: '1px' }}>
              OwnIt<span style={{ color: '#A8F0C0' }}>.</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '18px' }}>
              Co-own assets from UGX 50,000
            </div>
          </div>

          <div style={{ padding: '44px 18px 14px' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
              Welcome Back
            </div>

            {/* User Type Selection */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                I am a
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setUserType('investor')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: userType === 'investor' ? '2px solid var(--green)' : '1.5px solid var(--border)',
                    background: userType === 'investor' ? 'var(--greenXL)' : 'var(--surf)',
                    color: userType === 'investor' ? 'var(--green)' : 'var(--text)',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  👤 Investor
                </button>
                <button
                  onClick={() => setUserType('lister')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: userType === 'lister' ? '2px solid var(--green)' : '1.5px solid var(--border)',
                    background: userType === 'lister' ? 'var(--greenXL)' : 'var(--surf)',
                    color: userType === 'lister' ? 'var(--green)' : 'var(--text)',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  🏗️ Asset Lister
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '12px' }}>
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

            {/* Password Input */}
            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.input}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={16} style={{ color: 'var(--muted)' }} />
                  ) : (
                    <Eye size={16} style={{ color: 'var(--muted)' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
              <button onClick={onForgotPassword} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={!email || !password || !userType}
              style={{
                ...styles.bigBtn,
                opacity: (!email || !password || !userType) ? 0.5 : 1,
                cursor: (!email || !password || !userType) ? 'not-allowed' : 'pointer'
              }}
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text3)' }}>
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--green)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '12px'
                }}
              >
                Sign up
              </button>
            </div>

            {/* Terms & Privacy */}
            <div style={{ fontSize: '9px', color: 'var(--muted)', marginTop: '16px', textAlign: 'center', lineHeight: '1.5' }}>
              By signing in, you agree to our{' '}
              <button style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                Terms
              </button>
              {' '}and{' '}
              <button style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                Privacy Policy
              </button>
              <div style={{ fontSize: '8.5px', marginTop: '10px', color: 'var(--muted)', fontWeight: 500 }}>
                © 2026 Samuel Lyomoki Junior. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#D6EBD9',
    padding: '16px',
    fontFamily: "'DM Sans', sans-serif"
  },
  phone: {
    maxWidth: '420px',
    width: '100%',
    background: '#F4F9F5',
    borderRadius: '40px',
    overflow: 'hidden',
    boxShadow: '0 24px 72px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(26,122,69,0.2)',
    position: 'relative'
  },
  screen: {
    height: '680px',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none'
  },
  hero: {
    background: '#1A7A45',
    padding: '48px 20px 26px',
    position: 'relative',
    overflow: 'hidden'
  },
  input: {
    background: '#EEF7F1',
    border: '1.5px solid #C8E3D0',
    borderRadius: '12px',
    padding: '10px 14px',
    color: '#0D1F15',
    fontFamily: 'inherit',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box'
  },
  bigBtn: {
    background: '#1A7A45',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    width: '100%',
    fontFamily: 'inherit'
  }
};
