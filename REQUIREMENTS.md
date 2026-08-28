# Requirements (new device)

## Required software
- **Node.js** 18+ (includes npm)
- **Git** (optional, if cloning)
- **Modern browser** (Chrome/Edge/Firefox)

## Accounts / keys
- **Firebase project** (Auth + Firestore enabled)
- **Stripe account**
  - Publishable key for frontend
  - Secret key for server

## Files to configure
1. `js/stripe-config.js`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_CHECKOUT_ENDPOINT`
2. `server/.env`
   - `STRIPE_SECRET_KEY`
   - `PORT` (default 4242)
   - `STRIPE_CURRENCY` (default `usd`)

## Install and run
```powershell
cd "c:\Users\Lenovo\Desktop\SE Pproject v4.5\SE Pproject v4.5\server"
npm install
copy .env.example .env
npm start
```

Then open:
- `http://localhost:4242/`

## Network access
- Required for Firebase and Stripe CDN assets.
