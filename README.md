# CoreInventory

> Production-grade Inventory Management System built with MERN stack + Next.js 14

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access + Refresh tokens) + OTP email reset |
| Charts | Recharts |
| Icons | Lucide React |

---

## Prerequisites

- Node.js ≥ 18.0.0
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

## Quick Start

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd coreinventory
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coreinventory
JWT_SECRET=change-this-to-a-strong-secret-key-min-32-chars
JWT_REFRESH_SECRET=change-this-to-another-strong-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
NODE_ENV=development
```

```bash
npm run dev
# API running on http://localhost:5000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
# App running on http://localhost:3000
```

### 4. Open App

Navigate to `http://localhost:3000` → Register → Start using!

---

## Inventory Flow

```
Vendor → Receipt (validate) → Stock ↑
Stock → Delivery (validate) → Stock ↓  
Stock → Internal Transfer → Location changes, total unchanged
Physical Count → Adjustment (validate) → Stock corrected
All operations → Stock Ledger (immutable audit log)
```

---

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| POST | /api/auth/refresh | Refresh token |
| POST | /api/auth/forgot-password | Request OTP |
| POST | /api/auth/reset-password | Reset with OTP |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List (paginated, filterable) |
| GET | /api/products/low-stock | Low stock products |
| GET | /api/products/:id | Single product |
| POST | /api/products | Create |
| PUT | /api/products/:id | Update |
| DELETE | /api/products/:id | Soft delete |

### Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | /api/receipts | List / Create |
| POST | /api/receipts/:id/validate | Validate (stock ↑) |
| POST | /api/receipts/:id/cancel | Cancel |
| GET/POST | /api/deliveries | List / Create |
| POST | /api/deliveries/:id/validate | Validate (stock ↓) |
| GET/POST | /api/transfers | List / Create |
| POST | /api/transfers/:id/validate | Validate (location change) |
| GET/POST | /api/adjustments | List / Create |
| POST | /api/adjustments/:id/validate | Validate (reconcile) |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dashboard/stats | Dashboard KPIs + activity |
| GET | /api/ledger | Stock ledger (filterable) |
| GET/POST | /api/warehouses | List / Create |
| GET/POST | /api/categories | List / Create |

---

## Features

-  JWT Auth with refresh tokens + OTP password reset
-  Dashboard with live KPIs and stock movement charts
-  Product management with SKU, categories, reorder rules
-  Receipts — incoming goods, validate to increase stock
-  Delivery Orders — outgoing goods, validate to decrease stock
-  Internal Transfers — move between warehouses/locations
-  Stock Adjustments — physical count reconciliation
-  Immutable Stock Ledger — every movement logged
-  Multi-warehouse & multi-location support
-  Low stock alerts on dashboard
-  MongoDB transactions for atomic stock operations
-  Rate limiting, CORS, Helmet security
-  Responsive dark UI

---

## Production Deployment

### Backend (Render / Railway / Fly.io)
```bash
cd backend
npm start
```

Set environment variables on your hosting platform.

### Frontend (Vercel)
```bash
cd frontend
npm run build
```

Set `NEXT_PUBLIC_API_URL` to your backend URL on Vercel.

### MongoDB Atlas
Update `MONGODB_URI` to your Atlas connection string.

---

## License
MIT