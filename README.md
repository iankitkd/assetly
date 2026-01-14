# Assetly

A modern digital asset marketplace built with **Next.js**, enabling creators to sell and users to purchase digital assets securely.  
Built with a scalable, production-ready architecture supporting secure authentication, seamless payments, order management, and seller monetization.  

🌐 **Live Demo:** https://assetlyapp.vercel.app

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Secure login with **NextAuth (Auth.js v5)**
  - Prisma adapter for database-backed sessions
  - Role-based access (Buyer / Seller)

- 🛒 **Asset Marketplace**
  - Browse, purchase, and download digital assets
  - Free and paid asset support
  - Cart and Buy Now flows

- 💳 **Payments**
  - Stripe integration for secure checkout
  - Order lifecycle: `PENDING -> PAID`
  <!-- - Purchase history and receipts -->

- 📊 **Seller Dashboard**
  - Earnings overview
  - Sales count tracking
  <!-- - Asset performance insights -->

- 🎨 **Modern UI**
  - Material UI (MUI v7)
  - Fully responsive design
  - Optimized for desktop & mobile

<!-- - ⚡ **State & Validation**
  - Zustand for global state management
  - Zod for schema validation
  - React Hook Form for forms -->

---

## 🧱 Tech Stack

### Frontend
- **Next.js 16**
- **React 19**
- **Material UI**
- **Zustand**
- **React Hook Form + Zod**

### Backend
- **Next.js Server Actions**
- **Prisma ORM**
- **PostgreSQL**
- **Supabase (storage / infra)**

### Auth & Payments
- **NextAuth (Auth.js v5)**
- **Stripe**

---

## 🚀 Getting Started

### 1️. Clone the Repository
```
git clone https://github.com/iankitkd/assetly.git  
cd assetly
```


### 2. Install Dependencies
```
npm install
```

### 3. Environment Variables

Create a .env file in the root directory:

```
AUTH_SECRET=your_auth_secret

DATABASE_URL=your_database_url

AUTH_GOOGLE_ID={CLIENT_ID}
AUTH_GOOGLE_SECRET={CLIENT_SECRET}

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup
```
npx prisma generate  
npx prisma migrate dev
```

### 5. Running the App
```
npm run dev
```

Visit: http://localhost:3000

---

## 📄 License
This project is licensed under the MIT License.