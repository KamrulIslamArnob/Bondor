# Bondor · বন্দর (Next.js App)

A modern, modular e-commerce & course learning marketplace built with **Next.js (App Router)**, **TypeScript**, **Firebase Auth & Firestore**, and integrated **Stripe Checkout**.

---

## ⚓ Key Features & Modular Architecture

- **Next.js App Router**: Fast, responsive client and server components with zero separate backend requirement.
- **Role-Based Workspaces**:
  - **Builder Workspace**: Explore business docks (T-shirt, Candle, Soap, Sticker & Prints), enroll in video courses, and order raw material starter packs.
  - **Seller Workspace**: Manage inventory, post new material kits, publish video courses with YouTube modules, and monitor live store statistics.
  - **Dual-Role Switcher (`role: "both"`)**: Instant mode toggle in the navbar to switch between Builder and Seller views.
- **Cart & Checkout**:
  - Cart synced to `localStorage` (`bondor_cart`) with quantity modifiers and real-time total computation.
  - Integrated `/api/checkout` Stripe Route Handler with multi-item line support.
  - Auto-enrollment in Firestore upon payment completion.
- **Modular Component Design**:
  - `src/components/ui/`: Reusable `Button`, `Badge`, `Card`, `HeaderCard`, `Modal`, `LoadingSpinner`.
  - `src/components/layout/`: `Navbar`, `Footer`, and `ModeToggle`.
  - `src/components/landing/`: `Hero`, animated `ShipWheel`, and `AuthWidget`.
  - `src/components/courses/`: `CourseCard` and `CoursePreviewModal`.
  - `src/components/products/`: `ProductCard` with thumbnail rendering and stock status.
  - `src/components/seller/`: `ProductsTable`, `CoursesTable`, `SellerStats`, and `TrendingDocks`.
  - `src/context/`: `AuthContext` (Firebase Auth + Roles) and `CartContext` (Cart State & Totals).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The `.env.local` file contains configuration for Firebase and Stripe:
```env
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCAlyMuZiSxFXkWMUVKuAustL7cvp9t_5I
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bizbuilder-825e5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bizbuilder-825e5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bizbuilder-825e5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=122618607984
NEXT_PUBLIC_FIREBASE_APP_ID=1:122618607984:web:ad56c483f9a38a01d937b5
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-9333RWK4BG

# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_CURRENCY=usd
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🧭 Routes & Pages Map

| Route | Purpose |
|---|---|
| `/` | Landing page (Hero, animated ship wheel, tabbed Login / Signup) |
| `/login` | Direct login route |
| `/signup` | Direct signup route with role selection |
| `/builder-dashboard` | Builder dock catalog, metrics & navigation |
| `/seller-dashboard` | Seller dashboard with live products, courses, and stats |
| `/courses` | Courses catalog with business filter tabs (`?business=...`) |
| `/materials` | Material packs catalog with category filter tabs |
| `/products/[id]` | Full product details page with image gallery and buy action |
| `/my-courses` | User enrolled courses with video module access |
| `/cart` | Interactive shopping cart & Stripe checkout trigger |
| `/seller/products/new` | Add new material pack form with live image preview |
| `/seller/products/[id]/edit` | Edit existing product details and pricing |
| `/seller/courses/new` | Add new video course form with YouTube module links |
| `/payment/success` | Payment completed landing & course auto-enrollment |
| `/payment/cancel` | Payment canceled landing |
| `/api/checkout` | Stripe Checkout Session creation route handler |
| `/api/health` | Service health endpoint |
