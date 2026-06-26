# 🚀 OwnIt Uganda App - Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port)

## 🎯 Testing the Application

### Authentication Flow
1. **Login Screen** - Select user type (Investor/Lister) and enter credentials
   - Test with Investor or Property Lister
   - Enter any email and password

2. **Registration** - 3-step process
   - Fill personal details
   - Add password
   - Accept terms

3. **KYC Verification** - Upload documents
   - Personal information
   - ID document
   - Selfie verification
   - Option to skip

### Investor Experience

**Dashboard (Discover Tab)**
- Browse available properties
- Filter by type (All, Apartment, Land, Commercial)
- View portfolio performance
- See monthly income

**Property Details**
- Click any property card to see full details
- View financial breakdown
- See key terms and perks

**Investment Flow**
1. Click "Invest" button
2. Adjust amount with slider (min: property minimum, max: 25% of property value)
3. Review projected returns
4. Select payment method (MoMo, Airtel, Bank, Card)
5. Confirm investment details
6. See success screen with certificate info

**Portfolio Tab**
- View all investments
- Track ownership percentages
- Monitor monthly passive income
- See performance metrics

**Wallet Tab**
- Check available balance
- Add funds (Deposit flow)
- Withdraw funds (to MoMo or Bank)
- View transaction history
- Manage payout settings

### Property Lister Experience

**Properties Tab**
- View all your listings
- Create new property listing

**New Listing Flow**
1. **Step 1**: Enter property details
   - Name, type, location, description
   
2. **Step 2**: Add financial information
   - Total value, funding goal, yield, rental income
   
3. **Step 3**: Upload documents
   - Property photos
   - Title deed
   - Valuation report
   
4. **Step 4**: Review & submit
   - Verify all information
   - Accept terms
   - Submit for approval

**Investors Tab**
- View top investors
- See investment statistics

**Payouts Tab**
- View payout history
- Schedule next payout
- Manage payout settings

## 📊 Sample Data

The app comes pre-loaded with:
- **5 Featured Properties**
- **3 Sample Investments** in your portfolio
- **Transaction History**
- **Investor Details**

All amounts are in UGX (Ugandan Shillings)

## 🎨 Customization

### Update Colors
Edit `src/ownit-uganda-styles.css`:
```css
:root {
  --green: #1A7A45;  /* Primary color */
  --gold: #C17F00;   /* Accent color */
  /* ... other colors */
}
```

### Add Real Properties
Edit `src/OwnItUgandaApp.jsx` `PROPERTIES` array

### Connect to Backend
The app is ready for API integration:
- Replace sample data with API calls
- Update authentication endpoints
- Connect payment processor

## 🔗 Navigation Structure

```
Login/Register/KYC
    ↓
    ├─ Investor Mode
    │  ├─ Discover (Home)
    │  ├─ Invest
    │  ├─ Portfolio
    │  └─ Wallet
    │
    └─ Lister Mode
       ├─ Overview
       ├─ Properties
       ├─ Investors
       └─ Payouts
```

## 💡 User Flows

### Investment Journey (Investor)
```
Browse Properties 
  → Select Property
    → View Details
      → Choose Amount
        → Select Payment
          → Confirm
            → Success!
              → Track in Portfolio
```

### Listing Journey (Lister)
```
Create Listing
  → Enter Details
    → Financial Info
      → Upload Docs
        → Review
          → Submit
            → Pending Approval
              → Go Live
                → Monitor Sales
```

### Wallet Journey
```
View Balance
  → Deposit/Withdraw
    → Select Method
      → Enter Amount
        → Confirm
          → Transaction Complete
            → View History
```

## 🧪 Testing Scenarios

### Scenario 1: New Investor
1. Register as Investor
2. Complete KYC verification (or skip)
3. Browse properties on Discover tab
4. Invest in a property
5. Check portfolio
6. View wallet transactions

### Scenario 2: Property Lister
1. Register as Property Lister
2. Complete KYC verification
3. Create new property listing
4. Monitor investor interest
5. Manage payouts

### Scenario 3: Multi-Investment
1. Invest in multiple properties
2. Track different yields
3. Monitor combined portfolio performance
4. Check total monthly income

## 📱 Responsive Design

The app is optimized for:
- ✅ Mobile phones (tested at 420px)
- ✅ Tablets
- ✅ Desktops (adapts to larger screens)

Navigate using bottom tab bar on mobile for easy thumb access.

## 🔐 Security Notes

Current implementation includes:
- Form validation
- File upload validation
- User type separation
- Terms acceptance tracking

For production, implement:
- Backend authentication
- JWT tokens
- Encrypted file storage
- SSL/TLS certificates
- Regular security audits

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Styles Not Applying
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check `ownit-uganda-styles.css` is imported in `App.jsx`

### Components Not Found
- Verify all files in `src/components/` exist
- Check import paths are correct
- Restart dev server

## 📞 Support

For issues or questions:
1. Check component props
2. Verify state management flow
3. Review error console messages
4. Check file structure matches documentation

## 🎓 Learning Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Lucide Icons**: https://lucide.dev
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

---

**Happy Building! 🎉**

For production deployment, consider:
- Backend API integration
- Real payment gateway
- Database for persistent data
- Authentication service (Firebase, Auth0)
- Analytics tracking
- Error logging
