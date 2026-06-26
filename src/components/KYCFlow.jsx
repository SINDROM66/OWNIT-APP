import React, { useState } from 'react';
import { Upload, Check, Clock } from 'lucide-react';

export default function KYCFlow({ onComplete, onSkip }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    nationality: '',
    address: '',
    occupation: '',
    idType: '',
    idNumber: '',
    idFile: null,
    selfieFile: null,
    consentAccepted: false
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    idFile: null,
    selfieFile: null
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      setFormData({ ...formData, [field]: file });
      setUploadedFiles({ ...uploadedFiles, [field]: file.name });
    }
  };

  const handleNext = () => {
    if (step === 1 && formData.dateOfBirth && formData.nationality && formData.address && formData.occupation) {
      setStep(2);
    } else if (step === 2 && formData.idType && formData.idNumber && uploadedFiles.idFile) {
      setStep(3);
    } else if (step === 3 && uploadedFiles.selfieFile && formData.consentAccepted) {
      setStep(4);
    }
  };

  if (step === 4) {
    return (
      <div style={styles.container}>
        <div style={styles.phone}>
          <div style={styles.screen}>
            <div style={styles.hero} />
            <div style={{ padding: '46px 18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '560px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>⏳</div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '6px', textAlign: 'center' }}>
                Verification In Progress
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '20px', textAlign: 'center' }}>
                Your documents are being reviewed. We'll notify you within 24 hours.
              </p>
              <div style={{
                background: 'var(--surf)',
                border: '1.5px solid var(--border)',
                borderRadius: '16px',
                padding: '16px 20px',
                width: '100%',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Check size={20} style={{ color: 'var(--green)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text)' }}>Personal Info Verified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Check size={20} style={{ color: 'var(--green)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text)' }}>ID Document Uploaded</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={20} style={{ color: 'var(--gold)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text)' }}>Selfie Verification Pending</span>
                </div>
              </div>
              <button
                onClick={onComplete}
                style={{
                  ...styles.bigBtn,
                  marginBottom: '10px'
                }}
              >
                Continue to App
              </button>
              <button
                onClick={onSkip}
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
                Skip & Explore
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
          <div style={styles.hero} />
          <div style={{ padding: '44px 18px 14px' }}>
            {/* Step Indicator */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
                Step {step} of 3 - Verification
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

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
                  Personal Information
                </h2>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Nationality
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select nationality</option>
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Nigerian">Nigerian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="E.g., Plot 123, Kampala"
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    placeholder="E.g., Teacher, Engineer"
                    style={styles.input}
                  />
                </div>
              </div>
            )}

            {/* Step 2: ID Upload */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
                  ID Verification
                </h2>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Document Type
                  </label>
                  <select
                    value={formData.idType}
                    onChange={(e) => handleInputChange('idType', e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select document type</option>
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                  </select>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    placeholder="E.g., CM123456789"
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
                    Upload Clear Copy
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'var(--surf)',
                    border: '2px dashed var(--border)',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('idFile', e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                    <Upload size={20} style={{ color: 'var(--green)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '12px' }}>
                        {uploadedFiles.idFile || 'Click to upload'}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                        JPG, PNG (Max 5MB)
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Selfie Upload */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
                  Selfie Verification
                </h2>

                <div style={{
                  background: 'var(--greenXL)',
                  border: '1.5px solid var(--border2)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  fontSize: '11px',
                  color: 'var(--greenD)',
                  lineHeight: '1.5'
                }}>
                  📸 Please take a clear selfie with your face visible and centered
                </div>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--surf)',
                  border: '2px dashed var(--border)',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginBottom: '14px'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('selfieFile', e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                  <Upload size={20} style={{ color: 'var(--green)' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '12px' }}>
                      {uploadedFiles.selfieFile || 'Click to upload'}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                      JPG, PNG (Max 5MB)
                    </div>
                  </div>
                </label>

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
                onClick={() => handleInputChange('consentAccepted', !formData.consentAccepted)}>
                  <input
                    type="checkbox"
                    checked={formData.consentAccepted}
                    onChange={() => {}}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label style={{ fontSize: '11px', color: 'var(--text2)', cursor: 'pointer', flex: 1 }}>
                    I consent to use of this image for identity verification
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
                disabled={
                  (step === 1 && (!formData.dateOfBirth || !formData.nationality || !formData.address || !formData.occupation)) ||
                  (step === 2 && (!formData.idType || !formData.idNumber || !uploadedFiles.idFile)) ||
                  (step === 3 && (!uploadedFiles.selfieFile || !formData.consentAccepted))
                }
                style={{
                  ...styles.bigBtn,
                  flex: 1,
                  opacity: ((step === 1 && (!formData.dateOfBirth || !formData.nationality || !formData.address || !formData.occupation)) ||
                    (step === 2 && (!formData.idType || !formData.idNumber || !uploadedFiles.idFile)) ||
                    (step === 3 && (!uploadedFiles.selfieFile || !formData.consentAccepted))) ? 0.5 : 1
                }}
              >
                {step === 3 ? 'Submit Verification' : 'Next'}
              </button>
            </div>

            <button
              onClick={onSkip}
              style={{
                width: '100%',
                marginTop: '12px',
                background: 'transparent',
                color: 'var(--green)',
                border: '1.5px solid var(--border)',
                borderRadius: '14px',
                padding: '12px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Skip for Now
            </button>
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
