import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: null,
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step === 1 && formData.userType) {
      setStep(2);
    } else if (step === 2 && formData.fullName && formData.email && formData.phone) {
      setStep(3);
    } else if (step === 3 && formData.password && formData.confirmPassword && formData.termsAccepted) {
      onRegisterSuccess(formData.userType);
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
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              Co-own assets from UGX 50,000
            </div>
          </div>

          <div style={{ padding: '44px 18px 14px' }}>
            {/* Step Indicator */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
                Step {step} of 3
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: '4px',
                      background: s <= step ? 'var(--green)' : 'var(--border)',
                      borderRadius: '2px'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: User Type */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
                  Who are you?
                </h2>
                <div style={{ marginBottom: '16px' }}>
                  <button
                    onClick={() => handleInputChange('userType', 'investor')}
                    style={{
                      width: '100%',
                      padding: '16px 14px',
                      border: formData.userType === 'investor' ? '2px solid var(--green)' : '1.5px solid var(--border)',
                      background: formData.userType === 'investor' ? 'var(--greenXL)' : 'var(--surf)',
                      borderRadius: '14px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>👤</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, color: formData.userType === 'investor' ? 'var(--green)' : 'var(--text)', fontSize: '14px' }}>
                        Investor
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>
                        Co-fund assets & earn profit share
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleInputChange('userType', 'lister')}
                    style={{
                      width: '100%',
                      padding: '16px 14px',
                      border: formData.userType === 'lister' ? '2px solid var(--green)' : '1.5px solid var(--border)',
                      background: formData.userType === 'lister' ? 'var(--greenXL)' : 'var(--surf)',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>🏗️</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, color: formData.userType === 'lister' ? 'var(--green)' : 'var(--text)', fontSize: '14px' }}>
                        Asset Lister
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>
                        List assets & crowdfund ownership
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
                  Your Details
                </h2>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Doe"
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+256772123456"
                    style={styles.input}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Password */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
                  Set Your Password
                </h2>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                        <Eye size={16} style={{ color: 'var(--muted)' }} />
                      ) : (
                        <EyeOff size={16} style={{ color: 'var(--muted)' }} />
                      )}
                    </button>
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--muted)', marginTop: '4px' }}>
                    Min 8 characters, mix of letters & numbers
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      style={styles.input}
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                      {showConfirmPassword ? (
                        <Eye size={16} style={{ color: 'var(--muted)' }} />
                      ) : (
                        <EyeOff size={16} style={{ color: 'var(--muted)' }} />
                      )}
                    </button>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--greenXL)',
                  border: '1.5px solid var(--border2)',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  marginBottom: '14px',
                  cursor: 'pointer'
                }}
                onClick={() => handleInputChange('termsAccepted', !formData.termsAccepted)}>
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={() => {}}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label style={{ fontSize: '11px', color: 'var(--text2)', cursor: 'pointer', flex: 1 }}>
                    I agree to the Terms & Conditions and Privacy Policy
                  </label>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  style={{
                    flex: 1,
                    background: '#fff',
                    color: 'var(--green)',
                    border: '1.5px solid var(--border2)',
                    borderRadius: '14px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                style={{
                  ...styles.bigBtn,
                  flex: 1
                }}
              >
                {step === 3 ? 'Create Account' : 'Next'}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text3)' }}>
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
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
                Sign in
              </button>
              <div style={{ fontSize: '8.5px', marginTop: '14px', color: 'var(--muted)', fontWeight: 500 }}>
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
