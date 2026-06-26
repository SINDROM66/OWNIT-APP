import React, { useState } from 'react';
import { ArrowLeft, Upload, Check } from 'lucide-react';

export default function PropertyListingForm({ flow, setFlow, fmt }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    type: '',
    location: '',
    description: '',
    // Step 2
    totalValue: '',
    fundingGoal: '',
    yield: '',
    rentalIncome: '',
    // Step 3
    images: [],
    titleDeed: null,
    valuationReport: null,
    // Step 4
    termsAccepted: false
  });
  const [uploadedFiles, setUploadedFiles] = useState({});

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
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      alert('Property listing submitted for review!');
      setFlow(null);
    }
  };

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
        <ArrowLeft size={16} /> Back
      </button>

      {/* Step Indicator */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
          Step {step} of 4 - List Asset
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3, 4].map((s) => (
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

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
            Asset Details
          </h2>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Asset Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="E.g., 10 Tonnes Refined Lithium"
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Asset Category
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              style={styles.input}
            >
              <option value="">Select category</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Commodities">Agricultural Commodity</option>
              <option value="Minerals">Minerals</option>
              <option value="Trade">Trade Finance</option>
              <option value="Transport">Transport / Fleet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Location / Origin
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="E.g., Busia, Eastern Uganda"
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the asset, how profit is made, and the exit plan..."
              style={{
                ...styles.input,
                minHeight: '80px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      )}

      {/* Step 2: Financial Details */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
            Financial Details
          </h2>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Total Asset Value (UGX)
            </label>
            <input
              type="number"
              value={formData.totalValue}
              onChange={(e) => handleInputChange('totalValue', e.target.value)}
              placeholder="E.g., 180000000"
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Funding Goal (UGX)
            </label>
            <input
              type="number"
              value={formData.fundingGoal}
              onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
              placeholder="E.g., 142000000"
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Expected Annual Yield (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.yield}
              onChange={(e) => handleInputChange('yield', e.target.value)}
              placeholder="E.g., 14.2"
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' }}>
              Monthly Rental Income (UGX)
            </label>
            <input
              type="number"
              value={formData.rentalIncome}
              onChange={(e) => handleInputChange('rentalIncome', e.target.value)}
              placeholder="E.g., 2100000 (0 if capital gain only)"
              style={styles.input}
            />
          </div>
        </div>
      )}

      {/* Step 3: Documents & Media */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
            Documents & Photos
          </h2>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '8px' }}>
              Property Photos
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--surf)',
              border: '2px dashed var(--border)',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload('images', e.target.files[0])}
                style={{ display: 'none' }}
              />
              <Upload size={20} style={{ color: 'var(--green)' }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '12px' }}>
                  {uploadedFiles.images || 'Click to upload'}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                  JPG, PNG (Max 10MB)
                </div>
              </div>
            </label>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '8px' }}>
              Ownership Document (Title Deed / Certificate)
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--surf)',
              border: '2px dashed var(--border)',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileUpload('titleDeed', e.target.files[0])}
                style={{ display: 'none' }}
              />
              <Upload size={20} style={{ color: 'var(--green)' }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '12px' }}>
                  {uploadedFiles.titleDeed || 'Click to upload'}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                  PDF, JPG, PNG (Max 5MB)
                </div>
              </div>
            </label>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '8px' }}>
              Asset Valuation / Inspection Report
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--surf)',
              border: '2px dashed var(--border)',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload('valuationReport', e.target.files[0])}
                style={{ display: 'none' }}
              />
              <Upload size={20} style={{ color: 'var(--green)' }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '12px' }}>
                  {uploadedFiles.valuationReport || 'Click to upload'}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                  PDF only (Max 5MB)
                </div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
            Review Your Listing
          </h2>

          <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '14px 16px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Property Summary
            </div>
            {[
              ['Asset', formData.name],
              ['Category', formData.type],
              ['Location', formData.location],
              ['Total Value', fmt(formData.totalValue)],
              ['Funding Goal', fmt(formData.fundingGoal)],
              ['Expected Yield', formData.yield + '%'],
              ['Monthly Returns', fmt(formData.rentalIncome)]
            ].map(([k, v], idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx < 6 ? '1.5px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>{v}</span>
              </div>
            ))}
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
              I agree that all information provided is accurate, documents are authentic, and this asset is legally available for co-ownership
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
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
            (step === 4 && !formData.termsAccepted) ||
            (step === 1 && (!formData.name || !formData.type || !formData.location)) ||
            (step === 2 && (!formData.totalValue || !formData.fundingGoal || !formData.yield)) ||
            (step === 3 && (!uploadedFiles.titleDeed || !uploadedFiles.valuationReport))
          }
          style={{
            ...styles.bigBtn,
            flex: 1,
            opacity: ((step === 4 && !formData.termsAccepted) || 
              (step === 1 && (!formData.name || !formData.type || !formData.location)) ||
              (step === 2 && (!formData.totalValue || !formData.fundingGoal || !formData.yield)) ||
              (step === 3 && (!uploadedFiles.titleDeed || !uploadedFiles.valuationReport))) ? 0.5 : 1
          }}
        >
          {step === 4 ? 'Submit Asset Listing' : 'Next'}
        </button>
      </div>
    </div>
  );
}

const styles = {
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
