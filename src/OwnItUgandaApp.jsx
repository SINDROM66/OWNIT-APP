import React, { useState } from 'react';
import { Home, ChartLine, Building2, Wallet, MapPin, TrendingUp, ArrowLeft, Check, Upload, Eye, EyeOff, ChevronRight, Clock, Users, Percent, DollarSign, CreditCard, Phone, Calendar, FileText } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Register from './components/Register';
import KYCFlow from './components/KYCFlow';
import HomeScreen from './components/HomeScreen';
import InvestmentFlow from './components/InvestmentFlow';
import PortfolioScreen from './components/PortfolioScreen';
import WalletScreen from './components/WalletScreen';
import PropertyDetails from './components/PropertyDetails';
import PropertyListingForm from './components/PropertyListingForm';
import ProfilePage from './components/ProfilePage';

// Sample data
const PROPERTIES = [
  {
    id: 1,
    name: "Muyenga Luxury Apartments — Block A",
    location: "Muyenga Hill, Kampala",
    type: "Real Estate",
    emoji: "🏢",
    totalVal: 320000000,
    funded: 256000000,
    minInvest: 50000,
    yield: 15.5,
    investors: 412,
    color: "green",
    desc: "Co-own a premium 4-unit apartment block on Muyenga Hill, fully tenanted at UGX 4.8M/month total. Co-owners receive monthly rental profit share proportional to their stake, disbursed via Mobile Money or Bank.",
    perks: ["Fully tenanted — income from Month 1", "KCCA title & ownership certificate verified", "Managed by Muyenga Property Group", "Monthly disbursement via Mobile Money or Bank"],
    monthlyIncome: 4800000
  },
  {
    id: 2,
    name: "30,000L Fuel Tanker — Northern Corridor",
    location: "Kampala → Gulu → Juba",
    type: "Trade",
    emoji: "🚛",
    totalVal: 145000000,
    funded: 58000000,
    minInvest: 50000,
    yield: 26.0,
    investors: 91,
    color: "gold",
    desc: "Co-own a 30,000-litre fuel tanker running the Kampala–Gulu–Juba corridor, supplying fuel to petrol stations and construction sites in Northern Uganda and South Sudan. Monthly fuel sales profit shared among co-owners.",
    perks: ["High-demand Northern Uganda & S. Sudan route", "Operator: Nile Fuel Logistics Ltd (licensed)", "Tanker GPS-tracked & fully insured", "Monthly profit disbursement to co-owners"],
    monthlyIncome: 3145000
  },
  {
    id: 3,
    name: "80 Tonnes Sesame — Lira Export Lot",
    location: "Lira District, Northern Uganda",
    type: "Commodities",
    emoji: "🌿",
    totalVal: 96000000,
    funded: 38400000,
    minInvest: 50000,
    yield: 31.0,
    investors: 77,
    color: "gold",
    desc: "Pool funds to buy 80 tonnes of Grade-1 sesame from Lira farmers at farm-gate price, clean and bag to export standard, then sell to Middle East buyers via Mombasa. Target 90-day turnaround with strong margin.",
    perks: ["Farm-gate purchase — maximum margin", "UEPB-certified export grade", "Confirmed buyer: UAE sesame importer", "Profit disbursed on export clearance"],
    monthlyIncome: 0
  },
  {
    id: 4,
    name: "15 Tonnes Refined Lithium — Busia ICD",
    location: "Busia, Eastern Uganda",
    type: "Minerals",
    emoji: "⚗️",
    totalVal: 580000000,
    funded: 174000000,
    minInvest: 100000,
    yield: 34.0,
    investors: 138,
    color: "purple",
    desc: "Co-own 15 tonnes of battery-grade refined lithium carbonate sourced from Eastern Uganda. Held in a bonded warehouse at Busia ICD and sold to East African EV battery manufacturers. High-yield mineral exit play.",
    perks: ["Battery-grade purity — assay cert included", "Bonded warehouse storage — Busia ICD", "LOI from Nairobi EV battery plant secured", "Profit disbursed on confirmed bulk sale"],
    monthlyIncome: 0
  },
  {
    id: 5,
    name: "Container — Textiles & Garments, Guangzhou",
    location: "Guangzhou → Mombasa → Kampala",
    type: "Trade",
    emoji: "📦",
    totalVal: 88000000,
    funded: 26400000,
    minInvest: 50000,
    yield: 23.0,
    investors: 53,
    color: "blue",
    desc: "Co-finance a 40ft container of textiles and garments sourced from Guangzhou, China. Goods cleared at Mombasa and sold wholesale to Kampala's Owino Market traders within 75 days. Profit shared on clearance.",
    perks: ["75-day trade cycle — fast turnaround", "Goods insured from origin to Kampala", "Established Owino Market wholesale buyers", "Profit disbursed on full stock clearance"],
    monthlyIncome: 0
  },
  {
    id: 6,
    name: "Entebbe Road Warehouse — Cold Storage",
    location: "Naalya, Kampala",
    type: "Real Estate",
    emoji: "🏭",
    totalVal: 380000000,
    funded: 342000000,
    minInvest: 200000,
    yield: 18.5,
    investors: 203,
    color: "green",
    desc: "Co-own a 500sqm cold storage warehouse on Entebbe Road, leased to a Ugandan fresh produce exporter at UGX 5.2M/month on a 3-year lease. Steady commercial income with high occupancy demand.",
    perks: ["3-year lease — locked rental income", "Tenant: Fresh Harvest Uganda Ltd", "Strategic Entebbe Road location", "Quarterly payout option available"],
    monthlyIncome: 5200000
  },
  {
    id: 7,
    name: "50 Certified Gold Bars — Karamoja Vault",
    location: "Moroto, Karamoja",
    type: "Minerals",
    emoji: "🥇",
    totalVal: 875000000,
    funded: 262500000,
    minInvest: 100000,
    yield: 36.0,
    investors: 156,
    color: "purple",
    desc: "Co-own 50 LBMA-certified 1kg gold bars refined at the Karamoja Gold Refinery. Bars are stored in an armed vault and sold to Dubai and Singapore precious metals desks. One of OwnIt's highest-yield mineral assets.",
    perks: ["LBMA assay certificate per bar", "Armed vault storage — Moroto Refinery", "Confirmed buyers: Dubai & Singapore desks", "Profit disbursed on bulk sale completion"],
    monthlyIncome: 0
  },
  {
    id: 8,
    name: "Kampala–Entebbe Expressway Toll Kiosk",
    location: "Entebbe Expressway, Uganda",
    type: "Infrastructure",
    emoji: "🛣️",
    totalVal: 200000000,
    funded: 80000000,
    minInvest: 100000,
    yield: 21.0,
    investors: 74,
    color: "blue",
    desc: "Co-own a revenue share in a licensed toll collection kiosk on the Kampala–Entebbe Expressway. Daily vehicle toll fees are pooled and disbursed monthly to co-owners based on ownership %. Steady infrastructure income.",
    perks: ["Daily toll revenue — consistent income", "UNRA-licensed toll operator", "10,000+ vehicles/day average traffic", "Monthly revenue disbursement"],
    monthlyIncome: 3500000
  },
  {
    id: 9,
    name: "120 Tonnes Arabica Coffee — Bugisu Export",
    location: "Mbale / Mt. Elgon, Uganda",
    type: "Commodities",
    emoji: "☕",
    totalVal: 210000000,
    funded: 63000000,
    minInvest: 50000,
    yield: 32.0,
    investors: 118,
    color: "gold",
    desc: "Pool funds to purchase 120 tonnes of premium Bugisu Arabica coffee at farm-gate from Mt. Elgon cooperatives, wet-process and export to Scandinavian specialty roasters. One of Uganda's most prized export coffees.",
    perks: ["Specialty grade — premium export price", "UCDA-certified & cupped at 84+ SCA score", "Buyer contract: Oslo specialty roaster", "Profit disbursed on export invoice settlement"],
    monthlyIncome: 0
  },
  {
    id: 10,
    name: "50kW Solar Mini-Grid — Gulu Trading Centres",
    location: "Gulu District, Northern Uganda",
    type: "Infrastructure",
    emoji: "☀️",
    totalVal: 280000000,
    funded: 112000000,
    minInvest: 100000,
    yield: 20.5,
    investors: 84,
    color: "gold",
    desc: "Co-own a 50kW solar mini-grid powering 3 rural trading centres in Gulu District. Monthly electricity tariffs from 250+ connected households, shops and health clinics are disbursed to co-owners as profit share.",
    perks: ["250+ paying connections — income from Day 1", "ERA-licensed operator: SunPower Uganda Ltd", "25-year infrastructure lifespan", "Monthly tariff revenue disbursement"],
    monthlyIncome: 4800000
  }
];

const PORTFOLIO = [
  { id: 1, name: "Ntinda Heights Apt 3B", invested: 250000, totalVal: 180000000, monthlyReturn: 32222, type: "Real Estate", emoji: "🏢" },
  { id: 2, name: "Fuel Tanker — Kampala–Jinja", invested: 800000, totalVal: 120000000, monthlyReturn: 160000, type: "Trade", emoji: "🚛" },
  { id: 3, name: "50 Tonnes Maize — Masaka", invested: 150000, totalVal: 75000000, monthlyReturn: 35000, type: "Commodities", emoji: "🌾" },
];

export default function OwnItUgandaApp() {
  const [authState, setAuthState] = useState('welcome'); // 'welcome', 'login', 'register', 'forgot', 'kyc', 'app'
  const [userType, setUserType] = useState(null); // 'investor', 'lister'
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [investmentFlow, setInvestmentFlow] = useState(null);
  const [listingFlow, setListingFlow] = useState(null);
  const [walletFlow, setWalletFlow] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const createProfile = (type) => ({
    name: type === 'investor' ? 'Amina Nakato' : 'Moses Kato',
    email: type === 'investor' ? 'amina@ownit.ug' : 'moses@ownit.ug',
    phone: type === 'investor' ? '+256 772 123 456' : '+256 701 987 654',
    location: 'Kampala, Uganda',
    memberSince: 'Feb 2025',
    verified: true,
    role: type === 'investor' ? 'Investor' : 'Asset Lister',
  });

  const handleLoginSuccess = (type) => {
    setUserType(type);
    setUserProfile(createProfile(type));
    setAuthState('kyc');
  };

  const handleRegisterSuccess = (type) => {
    setUserType(type);
    setUserProfile(createProfile(type));
    setAuthState('kyc');
  };

  const handleLogout = () => {
    setAuthState('welcome');
    setUserType(null);
    setCurrentTab('home');
    setSelectedProperty(null);
    setInvestmentFlow(null);
    setListingFlow(null);
    setWalletFlow(null);
    setUserProfile(null);
  };

  const handleKYCComplete = () => {
    setAuthState('app');
  };

  const handleSkipKYC = () => {
    setAuthState('app');
  };

  const fmt = (n) => "UGX " + Math.round(n).toLocaleString();
  const pct = (a, b) => Math.round(a / b * 100);

  if (authState === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setAuthState('register')} onLogin={() => setAuthState('login')} />;
  }

  if (authState === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthState('register')} onForgotPassword={() => setAuthState('forgot')} />;
  }

  if (authState === 'forgot') {
    return <ForgotPassword onBack={() => setAuthState('login')} />;
  }

  if (authState === 'register') {
    return <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={() => setAuthState('login')} />;
  }

  if (authState === 'kyc') {
    return <KYCFlow onComplete={handleKYCComplete} onSkip={handleSkipKYC} />;
  }

  // Main App UI
  return (
    <div style={styles.container}>
      <div style={styles.phone}>
        <div style={styles.screen}>
          {/* Handle different flows */}
          {selectedProperty && (
            <PropertyDetails 
              property={selectedProperty} 
              onBack={() => setSelectedProperty(null)}
              onInvest={() => {
                setInvestmentFlow({ step: 1, propertyId: selectedProperty.id });
                setSelectedProperty(null);
              }}
              fmt={fmt}
              pct={pct}
            />
          )}

          {investmentFlow && (
            <InvestmentFlow 
              flow={investmentFlow}
              setFlow={setInvestmentFlow}
              properties={PROPERTIES}
              fmt={fmt}
              pct={pct}
            />
          )}

          {listingFlow && userType === 'lister' && (
            <PropertyListingForm 
              flow={listingFlow}
              setFlow={setListingFlow}
              fmt={fmt}
            />
          )}

          {walletFlow && (
            <WalletScreen 
              flow={walletFlow}
              setFlow={setWalletFlow}
              fmt={fmt}
            />
          )}

          {!selectedProperty && !investmentFlow && !listingFlow && !walletFlow && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 18px 0', gap: '10px' }}>
                <div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>
                    Hello, {userProfile?.name?.split(' ')[0] || 'Investor'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>
                    {userType === 'lister' ? 'Manage your listings and payouts' : 'Browse properties and grow your portfolio'}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('profile')}
                  style={{
                    background: 'var(--surf)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '16px',
                    padding: '10px 14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Profile
                </button>
              </div>

              {currentTab === 'home' && (
                <HomeScreen 
                  properties={PROPERTIES}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  onSelectProperty={setSelectedProperty}
                  onInvest={(propId) => {
                    const prop = PROPERTIES.find(p => p.id === propId);
                    setInvestmentFlow({ step: 1, propertyId: propId, property: prop, amount: prop.minInvest });
                    setCurrentTab('invest');
                  }}
                  fmt={fmt}
                  pct={pct}
                />
              )}

              {currentTab === 'portfolio' && (
                <PortfolioScreen 
                  portfolio={PORTFOLIO}
                  properties={PROPERTIES}
                  fmt={fmt}
                  pct={pct}
                  onInvestMore={() => setCurrentTab('home')}
                />
              )}

              {currentTab === 'wallet' && (
                <WalletScreen 
                  flow={walletFlow}
                  setFlow={setWalletFlow}
                  fmt={fmt}
                  showFullWallet={true}
                />
              )}

              {currentTab === 'profile' && (
                <ProfilePage
                  profile={userProfile}
                  userType={userType}
                  portfolio={PORTFOLIO}
                  properties={PROPERTIES}
                  onLogout={handleLogout}
                  onBack={() => setCurrentTab('home')}
                  fmt={fmt}
                />
              )}

              {currentTab === 'invest' && !investmentFlow && (
                <InvestScreen 
                  properties={PROPERTIES}
                  onSelectProperty={(prop) => {
                    setInvestmentFlow({ step: 1, propertyId: prop.id, property: prop, amount: prop.minInvest });
                  }}
                  fmt={fmt}
                />
              )}

              {userType === 'lister' && currentTab === 'listings' && (
                <div style={{ padding: '46px 18px 14px' }}>
                  <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
                    My Listings
                  </h2>
                  <button 
                    style={styles.bigBtn}
                    onClick={() => setListingFlow({ step: 1 })}
                  >
                    + List a New Asset
                  </button>
                </div>
              )}
              
              <div style={{
                fontSize: '9px',
                color: 'var(--muted)',
                textAlign: 'center',
                padding: '16px 0 24px',
                fontWeight: 500,
                fontFamily: 'inherit'
              }}>
                © 2026 Samuel Lyomoki Junior. All Rights Reserved.
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          {userType === 'investor' ? (
            <>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'home' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('home')}
              >
                <Home size={20} style={{ color: currentTab === 'home' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Discover</span>
              </button>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'invest' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('invest')}
              >
                <TrendingUp size={20} style={{ color: currentTab === 'invest' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Invest</span>
              </button>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'portfolio' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('portfolio')}
              >
                <Building2 size={20} style={{ color: currentTab === 'portfolio' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Portfolio</span>
              </button>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'wallet' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('wallet')}
              >
                <Wallet size={20} style={{ color: currentTab === 'wallet' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Wallet</span>
              </button>
            </>
          ) : (
            <>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'home' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('home')}
              >
                <Home size={20} style={{ color: currentTab === 'home' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Overview</span>
              </button>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'listings' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('listings')}
              >
                <Building2 size={20} style={{ color: currentTab === 'listings' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Assets</span>
              </button>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'portfolio' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('portfolio')}
              >
                <Users size={20} style={{ color: currentTab === 'portfolio' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Investors</span>
              </button>
              <button 
                style={{...styles.navBtn, borderBottomColor: currentTab === 'wallet' ? 'var(--green)' : 'transparent'}}
                onClick={() => setCurrentTab('wallet')}
              >
                <Wallet size={20} style={{ color: currentTab === 'wallet' ? 'var(--green)' : 'var(--muted)' }} />
                <span style={styles.navLabel}>Payouts</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

function InvestScreen({ properties, onSelectProperty, fmt }) {
  return (
    <div style={{ padding: '46px 18px 14px' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '3px' }}>
        Invest
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '16px' }}>
        Choose an asset and set your amount
      </div>
      {properties.map((p) => (
        <div 
          key={p.id}
          style={{
            background: 'var(--surf)',
            border: '1.5px solid var(--border)',
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
          onClick={() => onSelectProperty(p)}
        >
          <div style={{
            fontSize: '30px',
            width: '50px',
            height: '50px',
            background: p.color === 'green' ? '#E8F7EE' : p.color === 'gold' ? '#FFF8E1' : '#EFF6FF',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid var(--border)'
          }}>
            {p.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>
              {p.name}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text3)' }}>
              {p.type} · {p.location}
            </div>
          </div>
          <ChevronRight size={16} style={{ color: 'var(--muted)' }} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--bg)',
    padding: '16px',
    fontFamily: "'DM Sans', sans-serif"
  },
  phone: {
    maxWidth: '420px',
    width: '100%',
    background: 'var(--bg)',
    borderRadius: '40px',
    overflow: 'hidden',
    boxShadow: '0 24px 72px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(26,122,69,0.2)',
    position: 'relative'
  },
  screen: {
    height: '680px',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    paddingBottom: '76px'
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--surf)',
    borderTop: '1.5px solid var(--border)',
    display: 'flex',
    zIndex: 100,
    padding: '8px 0 18px'
  },
  navBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    fontFamily: 'inherit',
    borderBottom: '2.5px solid transparent',
    transition: 'color 0.2s'
  },
  navLabel: {
    fontSize: '9px',
    color: 'var(--muted)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.4px'
  },
  bigBtn: {
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
  }
};
