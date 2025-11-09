# Razorpay Setup Instructions

## 🔑 To Fix UPI "Invalid UPI ID" Error:

### Step 1: Create Your Razorpay Account

1. Go to https://razorpay.com
2. Sign up with your business details
3. Complete business verification
4. Add your UPI ID: 8849978818@ptyes

### Step 2: Get Your API Keys

1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Copy your Key ID and Key Secret

### Step 3: Create .env File

Create a file named `.env` in your project root with:

```
REACT_APP_RAZORPAY_KEY_ID=rzp_live_your_key_id_here
REACT_APP_RAZORPAY_KEY_SECRET=your_secret_key_here
REACT_APP_MERCHANT_PHONE=8849978818
REACT_APP_UPI_ID=8849978818@ptyes
REACT_APP_MERCHANT_NAME=Swaad-E-Sehat
```

### Step 4: Replace Test Key

In src/pages/CheckoutPage.jsx, line 107:
Replace: `rzp_test_1DP5mmOlF5G5ag`
With: Your actual live key ID

### Step 5: Restart Application

```bash
npm start
```

## ✅ What Will Work After Setup:

- ✅ UPI payments with your UPI ID
- ✅ "Swaad-E-Sehat" merchant name
- ✅ All payment methods
- ✅ No more "invalid UPI ID" errors

## ⚠️ Important Notes:

- Never share your secret key
- Use live keys only in production
- Test keys are for development only
- UPI requires verified business account

## 💎 Stripe Payment Gateway Setup:

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Sign up for a free account
3. Complete business verification
4. Enable Indian payments

### Step 2: Get Stripe Keys

1. Login to Stripe Dashboard
2. Go to Developers → API Keys
3. Copy your Publishable Key and Secret Key

### Step 3: Update .env File

Add Stripe keys to your `.env` file:

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
REACT_APP_STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
```

### Step 4: Stripe Features

- ✅ International card payments
- ✅ Secure payment processing
- ✅ Global payment methods
- ✅ Real-time payment confirmation

## 🎯 Available Payment Methods:

### 1. Razorpay (Indian Focus)

- ✅ UPI (PhonePe, Paytm, GPay)
- ✅ Indian Cards (Visa, Mastercard, RuPay)
- ✅ Wallets (Paytm, PhonePe, Freecharge)
- ✅ Net Banking
- ✅ EMI options

### 2. Stripe (International Focus)

- ✅ International Cards (Visa, Mastercard, Amex)
- ✅ Apple Pay, Google Pay
- ✅ Bank transfers
- ✅ Buy now, pay later

### 3. Cash on Delivery

- ✅ Always available
- ✅ No online payment required
- ✅ Pay with cash or card on delivery
