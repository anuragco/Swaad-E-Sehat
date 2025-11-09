# API Keys Setup Guide

## 🔑 Razorpay API Keys

### Step 1: Create Account

1. Go to https://razorpay.com
2. Sign up with business details
3. Business Name: Swaad-E-Sehat
4. Phone: 8849978818

### Step 2: Get Keys

1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret

### Step 3: Add to .env file

```
REACT_APP_RAZORPAY_KEY_ID=rzp_live_your_key_here
REACT_APP_RAZORPAY_KEY_SECRET=your_secret_here
```

## 💎 Stripe API Keys

### Step 1: Create Account

1. Go to https://stripe.com
2. Sign up for business account
3. Business Name: Swaad-E-Sehat
4. Country: India

### Step 2: Get Keys

1. Login to Stripe Dashboard
2. Go to Developers → API Keys
3. Copy Publishable Key and Secret Key

### Step 3: Add to .env file

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
REACT_APP_STRIPE_SECRET_KEY=sk_live_your_secret_here
```

## 📝 Complete .env File Template

Create a file named `.env` in your project root with:

```
# Razorpay Configuration (Test Mode)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
REACT_APP_RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here

# Stripe Configuration (Test Mode)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
REACT_APP_STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Business Details
REACT_APP_MERCHANT_PHONE=8849978818
REACT_APP_UPI_ID=8849978818@ptyes
REACT_APP_MERCHANT_NAME=Swaad-E-Sehat
```

## ✅ Your Current Test Keys (Already Configured)

Your Stripe test keys should be configured in your .env file:

- **Publishable Key**: pk_test_your_key_here
- **Secret Key**: sk_test_your_secret_here

The application will work immediately with these test keys!

## 🚀 After Getting Keys

1. Replace placeholder values with actual keys
2. Restart the application: `npm start`
3. Test payments on checkout page
4. Verify UPI shows "Swaad-E-Sehat" as merchant name

## ⚠️ Important Notes

- Never share your secret keys
- Use live keys only in production
- Test keys are for development only
- Keep .env file private and don't commit to Git
