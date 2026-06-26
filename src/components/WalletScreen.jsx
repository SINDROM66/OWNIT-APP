import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const PRESETS = [50000, 100000, 250000, 500000];
const FEE_RATE = { momo: 0.01, airtel: 0.01, bank: 0.005, card: 0.02 };
const FEE_LABEL = { momo: 'MTN MoMo (1%)', airtel: 'Airtel Money (1%)', bank: 'Bank Transfer (0.5%)', card: 'Card (2%)' };

function calcFee(amount, method) {
  return Math.round(amount * (FEE_RATE[method] || 0.01));
}

function fmt(n) { return 'UGX ' + Math.round(n).toLocaleString(); }

function DepositFlow({ onBack, fmtFn }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('momo');

  const amt = +amount;
  const fee = calcFee(amt, method);
  const total = amt + fee;

  if (step === 3) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', height: '560px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '6px' }}>
          Money Added!
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '20px' }}>
          {fmtFn(amt)} has been added to your wallet
        </div>
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '16px 20px', width: '100%', marginBottom: '18px' }}>
          {[['Amount deposited', fmtFn(amt)], ['Fee charged', fmtFn(fee)], ['Total deducted', fmtFn(total)], ['Method', FEE_LABEL[method].split(' (')[0]], ['New balance', fmtFn(348000 + amt)]].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: i === 4 ? 'var(--green)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={onBack} style={styles.bigBtn}>Back to Wallet</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ padding: '46px 18px 14px' }}>
        <button onClick={() => setStep(1)} style={styles.backBtn}><ArrowLeft size={16} /> Back</button>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>Confirm Deposit</div>

        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '14px 16px', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Transaction Summary</div>
          {[['Amount', fmtFn(amt)], ['Fee (' + (FEE_RATE[method] * 100) + '%)', fmtFn(fee)], ['Total to pay', fmtFn(total)], ['Method', FEE_LABEL[method].split(' (')[0]]].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1.5px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: i === 2 ? 'var(--green)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--greenXL)', border: '1.5px solid var(--border2)', borderRadius: '12px', padding: '10px 14px', marginBottom: '16px', fontSize: '11px', color: 'var(--greenD)' }}>
          💡 Funds reflect instantly for MoMo & Airtel. Bank transfers take 1–2 business days.
        </div>

        <button onClick={() => setStep(3)} style={styles.bigBtn}>Confirm — Pay {fmtFn(total)}</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <button onClick={onBack} style={styles.backBtn}><ArrowLeft size={16} /> Back</button>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>Add Money</div>

      <div style={{ marginBottom: '14px' }}>
        <label style={styles.label}>Amount (UGX)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" style={styles.input} />
        <div style={{ display: 'flex', gap: '7px', marginTop: '8px' }}>
          {PRESETS.map(p => (
            <button key={p} onClick={() => setAmount(String(p))} style={{ ...styles.preset, background: +amount === p ? 'var(--greenXL)' : 'var(--surf)', border: +amount === p ? '1.5px solid var(--green)' : '1.5px solid var(--border)', color: +amount === p ? 'var(--green)' : 'var(--text2)' }}>
              {p >= 1000000 ? (p / 1000000) + 'M' : (p / 1000) + 'K'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={styles.label}>Payment Method</div>
        {[{ id: 'momo', icon: '📱', name: 'MTN Mobile Money' }, { id: 'airtel', icon: '📞', name: 'Airtel Money' }, { id: 'bank', icon: '🏦', name: 'Bank Transfer' }, { id: 'card', icon: '💳', name: 'Card' }].map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)} style={{ width: '100%', padding: '12px 14px', background: method === m.id ? 'var(--greenXL)' : 'var(--surf)', border: method === m.id ? '2px solid var(--green)' : '1.5px solid var(--border)', borderRadius: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span style={{ fontSize: '20px' }}>{m.icon}</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: method === m.id ? 'var(--green)' : 'var(--text)' }}>{m.name}</div>
              {method === m.id && amt > 0 && <div style={{ fontSize: '10px', color: 'var(--green)', marginTop: '2px' }}>Fee: {fmtFn(calcFee(amt, m.id))}</div>}
            </div>
            {method === m.id && <CheckCircle size={16} style={{ color: 'var(--green)' }} />}
          </button>
        ))}
      </div>

      {amt > 0 && (
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: 'var(--text3)' }}>Total to pay</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)' }}>{fmtFn(total)}</span>
        </div>
      )}

      <button disabled={amt <= 0} onClick={() => setStep(2)} style={{ ...styles.bigBtn, opacity: amt > 0 ? 1 : 0.5, cursor: amt > 0 ? 'pointer' : 'not-allowed' }}>
        Continue →
      </button>
    </div>
  );
}

function WithdrawFlow({ onBack, fmtFn }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('momo');
  const BALANCE = 348000;

  const amt = +amount;
  const fee = calcFee(amt, method);
  const receive = Math.max(0, amt - fee);

  if (step === 3) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', height: '560px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>💸</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '6px' }}>Withdrawal Sent!</div>
        <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '20px' }}>
          {fmtFn(receive)} is on its way to your {method === 'momo' ? 'MTN MoMo' : 'Bank Account'}
        </div>
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '16px 20px', width: '100%', marginBottom: '18px' }}>
          {[['Requested', fmtFn(amt)], ['Fee', fmtFn(fee)], ['You receive', fmtFn(receive)], ['Remaining balance', fmtFn(BALANCE - amt)]].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: i === 2 ? 'var(--green)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={onBack} style={styles.bigBtn}>Back to Wallet</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ padding: '46px 18px 14px' }}>
        <button onClick={() => setStep(1)} style={styles.backBtn}><ArrowLeft size={16} /> Back</button>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>Confirm Withdrawal</div>

        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '14px 16px', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Transaction Summary</div>
          {[['Withdraw amount', fmtFn(amt)], ['Fee (1%)', fmtFn(fee)], ['You receive', fmtFn(receive)], ['Destination', method === 'momo' ? 'MTN MoMo · 0772 *** 841' : 'Bank · ****9843']].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1.5px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: i === 2 ? 'var(--green)' : 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setStep(3)} style={styles.bigBtn}>Confirm Withdrawal</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <button onClick={onBack} style={styles.backBtn}><ArrowLeft size={16} /> Back</button>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>Withdraw Money</div>
      <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '18px' }}>Available: <strong style={{ color: 'var(--green)' }}>{fmtFn(BALANCE)}</strong></div>

      <div style={{ marginBottom: '14px' }}>
        <label style={styles.label}>Amount (UGX)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" style={styles.input} />
        <div style={{ display: 'flex', gap: '7px', marginTop: '8px' }}>
          {PRESETS.filter(p => p <= BALANCE).map(p => (
            <button key={p} onClick={() => setAmount(String(p))} style={{ ...styles.preset, background: +amount === p ? 'var(--greenXL)' : 'var(--surf)', border: +amount === p ? '1.5px solid var(--green)' : '1.5px solid var(--border)', color: +amount === p ? 'var(--green)' : 'var(--text2)' }}>
              {p >= 1000000 ? (p / 1000000) + 'M' : (p / 1000) + 'K'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={styles.label}>Withdraw To</div>
        {[{ id: 'momo', icon: '📱', name: 'MTN Mobile Money', account: '0772 *** 841' }, { id: 'bank', icon: '🏦', name: 'Bank Account', account: 'ACC: ****9843' }].map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)} style={{ width: '100%', padding: '12px 14px', background: method === m.id ? 'var(--greenXL)' : 'var(--surf)', border: method === m.id ? '2px solid var(--green)' : '1.5px solid var(--border)', borderRadius: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span style={{ fontSize: '20px' }}>{m.icon}</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: method === m.id ? 'var(--green)' : 'var(--text)' }}>{m.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{m.account}</div>
            </div>
            {method === m.id && <CheckCircle size={16} style={{ color: 'var(--green)' }} />}
          </button>
        ))}
      </div>

      {amt > 0 && (
        <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: 'var(--text3)' }}>You receive</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)' }}>{fmtFn(receive)}</span>
        </div>
      )}

      <button disabled={amt <= 0 || amt > BALANCE} onClick={() => setStep(2)} style={{ ...styles.bigBtn, opacity: amt > 0 && amt <= BALANCE ? 1 : 0.5, cursor: amt > 0 && amt <= BALANCE ? 'pointer' : 'not-allowed' }}>
        Continue →
      </button>
    </div>
  );
}

export default function WalletScreen({ flow, setFlow, fmt: fmtProp, showFullWallet }) {
  const fmtFn = fmtProp || fmt;

  if (!flow) {
    if (showFullWallet) return <WalletContent fmtFn={fmtFn} setFlow={setFlow} />;
    return null;
  }

  if (flow.type === 'deposit') return <DepositFlow onBack={() => setFlow(null)} fmtFn={fmtFn} />;
  if (flow.type === 'withdraw') return <WithdrawFlow onBack={() => setFlow(null)} fmtFn={fmtFn} />;
  return null;
}

function WalletContent({ fmtFn, setFlow }) {
  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Wallet</div>

      <div style={{ background: 'var(--green)', borderRadius: '20px', padding: '18px 20px', marginBottom: '14px' }}>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '3px', fontWeight: 700 }}>Available Balance</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '34px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{fmtFn(348000)}</div>
        <div style={{ fontSize: '11px', color: '#A8F0C0', fontWeight: 600, marginBottom: '14px' }}>+{fmtFn(174000)} income this month</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setFlow({ type: 'withdraw' })} style={{ flex: 1, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '11px', padding: '10px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
            ⬇️ Withdraw
          </button>
          <button onClick={() => setFlow({ type: 'deposit' })} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '11px', padding: '10px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
            ⬆️ Top Up
          </button>
        </div>
      </div>

      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Recent Transactions</div>

      {[
        { icon: '🏢', desc: 'Rental income — Ntinda Heights', date: 'Today', amt: '+' + fmtFn(32222), pos: true },
        { icon: '🏪', desc: 'Rental income — Entebbe Road', date: 'Today', amt: '+' + fmtFn(118667), pos: true },
        { icon: '⬆️', desc: 'Investment — Wakiso Farmland', date: '3 days ago', amt: '−' + fmtFn(150000), pos: false },
        { icon: '🏢', desc: 'Rental income — Wakiso Farm', date: 'Last week', amt: '+' + fmtFn(23083), pos: true },
        { icon: '⬆️', desc: 'Investment — Ntinda Heights', date: '2 weeks ago', amt: '−' + fmtFn(250000), pos: false }
      ].map((t, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 13px', background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '12px', marginBottom: '7px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: t.pos ? 'var(--greenXL)' : '#FFF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>{t.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginBottom: '1px' }}>{t.desc}</div>
            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{t.date}</div>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: t.pos ? 'var(--green)' : '#C0392B' }}>{t.amt}</div>
        </div>
      ))}

      <div style={{ background: 'var(--surf)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '13px 14px', marginTop: '6px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '9px' }}>Payout Settings</div>
        {[['Payout schedule', 'Monthly (1st)'], ['Method', 'MTN Mobile Money'], ['Minimum', 'UGX 10,000'], ['Account', '0772 *** 841']].map(([k, v], idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: idx < 3 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{k}</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  backBtn: {
    background: 'var(--greenXL)', border: 'none', borderRadius: '10px',
    padding: '6px 12px', color: 'var(--green)', cursor: 'pointer',
    fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center',
    gap: '5px', fontFamily: 'inherit', marginBottom: '14px'
  },
  label: { fontSize: '11px', fontWeight: 700, color: 'var(--text3)', display: 'block', marginBottom: '5px' },
  input: {
    background: '#EEF7F1', border: '1.5px solid #C8E3D0', borderRadius: '12px',
    padding: '10px 14px', color: '#0D1F15', fontFamily: 'inherit',
    fontSize: '13px', width: '100%', outline: 'none', boxSizing: 'border-box'
  },
  preset: {
    flex: 1, padding: '7px 4px', borderRadius: '9px', fontSize: '11px',
    fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
  },
  bigBtn: {
    background: '#1A7A45', color: '#fff', border: 'none', borderRadius: '14px',
    padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
    width: '100%', fontFamily: 'inherit'
  }
};
