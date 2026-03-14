#  CoreInventory — Complete Hackathon Prompt
# MERN Stack | Next.js Frontend | JavaScript Only | Production-Grade

---

> **HOW TO USE THIS PROMPT:**
> Open Windsurf (or Cursor), paste this ENTIRE prompt into the AI chat, press Enter, and let it scaffold the entire project. Do NOT break it into parts — send it all at once.

---

## MASTER PROMPT — PASTE THIS ENTIRE BLOCK INTO WINDSURF

---

You are an elite full-stack engineer. Build **CoreInventory** — a production-grade, hackathon-winning Inventory Management System from scratch. Use the EXACT tech stack and structure below. Write complete, working code for every file. No placeholders, no "TODO" comments, no stubs. Every feature must work end-to-end.

---

## ABSOLUTE RULES (Never Break These)

- **JavaScript ONLY** — zero TypeScript, zero `.ts` or `.tsx` files anywhere
- **Next.js 14 (App Router)** for frontend — use `'use client'` where needed
- **Express.js** for backend API
- **MongoDB + Mongoose** for database
- **JWT** for authentication (access token + refresh token)
- **Tailwind CSS** for styling — custom design system, NOT generic
- No placeholder data in production flow — all data from real API calls
- Every API route must have proper error handling and HTTP status codes
- Every form must have client-side AND server-side validation
- The app must run with `npm run dev` from both `/frontend` and `/backend` folders

---

## PROJECT STRUCTURE — CREATE EXACTLY THIS

```
coreinventory/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── constants.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── Warehouse.js
│   │   │   ├── Receipt.js
│   │   │   ├── DeliveryOrder.js
│   │   │   ├── InternalTransfer.js
│   │   │   ├── StockAdjustment.js
│   │   │   └── StockLedger.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validate.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── warehouse.routes.js
│   │   │   ├── receipt.routes.js
│   │   │   ├── delivery.routes.js
│   │   │   ├── transfer.routes.js
│   │   │   ├── adjustment.routes.js
│   │   │   ├── ledger.routes.js
│   │   │   └── dashboard.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── category.controller.js
│   │   │   ├── warehouse.controller.js
│   │   │   ├── receipt.controller.js
│   │   │   ├── delivery.controller.js
│   │   │   ├── transfer.controller.js
│   │   │   ├── adjustment.controller.js
│   │   │   ├── ledger.controller.js
│   │   │   └── dashboard.controller.js
│   │   ├── services/
│   │   │   ├── stock.service.js
│   │   │   ├── otp.service.js
│   │   │   └── email.service.js
│   │   └── utils/
│   │       ├── generateTokens.js
│   │       ├── generateOTP.js
│   │       └── apiResponse.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   └── page.js
│   │   │   └── forgot-password/
│   │   │       └── page.js
│   │   ├── (dashboard)/
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   ├── products/
│   │   │   │   ├── page.js
│   │   │   │   └── [id]/
│   │   │   │       └── page.js
│   │   │   ├── receipts/
│   │   │   │   ├── page.js
│   │   │   │   └── new/
│   │   │   │       └── page.js
│   │   │   ├── deliveries/
│   │   │   │   ├── page.js
│   │   │   │   └── new/
│   │   │   │       └── page.js
│   │   │   ├── transfers/
│   │   │   │   ├── page.js
│   │   │   │   └── new/
│   │   │   │       └── page.js
│   │   │   ├── adjustments/
│   │   │   │   ├── page.js
│   │   │   │   └── new/
│   │   │   │       └── page.js
│   │   │   ├── ledger/
│   │   │   │   └── page.js
│   │   │   ├── warehouses/
│   │   │   │   └── page.js
│   │   │   └── profile/
│   │   │       └── page.js
│   │   ├── globals.css
│   │   └── layout.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   ├── Table.js
│   │   │   ├── Badge.js
│   │   │   ├── Card.js
│   │   │   ├── Spinner.js
│   │   │   ├── Toast.js
│   │   │   └── Select.js
│   │   ├── layout/
│   │   │   ├── Sidebar.js
│   │   │   ├── Header.js
│   │   │   └── PageWrapper.js
│   │   ├── dashboard/
│   │   │   ├── KPICard.js
│   │   │   ├── StockChart.js
│   │   │   └── RecentActivity.js
│   │   ├── products/
│   │   │   ├── ProductTable.js
│   │   │   ├── ProductForm.js
│   │   │   └── ProductCard.js
│   │   └── operations/
│   │       ├── ReceiptForm.js
│   │       ├── DeliveryForm.js
│   │       ├── TransferForm.js
│   │       └── AdjustmentForm.js
│   ├── lib/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── utils.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useProducts.js
│   │   ├── useDashboard.js
│   │   └── useToast.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── ToastContext.js
│   ├── public/
│   │   └── logo.svg
│   ├── .env.local.example
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## BACKEND — WRITE ALL FILES COMPLETELY

### `backend/package.json`
```json
{
  "name": "coreinventory-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.7",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### `backend/.env.example`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coreinventory
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development
```

### `backend/server.js`
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route imports
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');
const warehouseRoutes = require('./src/routes/warehouse.routes');
const receiptRoutes = require('./src/routes/receipt.routes');
const deliveryRoutes = require('./src/routes/delivery.routes');
const transferRoutes = require('./src/routes/transfer.routes');
const adjustmentRoutes = require('./src/routes/adjustment.routes');
const ledgerRoutes = require('./src/routes/ledger.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');

const app = express();

// Connect Database
connectDB();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Auth rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts.' }
});

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 CoreInventory API running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Health: http://localhost:${PORT}/health\n`);
});

module.exports = app;
```

### `backend/src/config/db.js`
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### `backend/src/config/constants.js`
```javascript
module.exports = {
  OPERATION_TYPES: {
    RECEIPT: 'RECEIPT',
    DELIVERY: 'DELIVERY',
    TRANSFER: 'TRANSFER',
    ADJUSTMENT: 'ADJUSTMENT',
  },
  STATUS: {
    DRAFT: 'draft',
    WAITING: 'waiting',
    READY: 'ready',
    DONE: 'done',
    CANCELED: 'canceled',
  },
  MOVEMENT_TYPES: {
    IN: 'IN',
    OUT: 'OUT',
    TRANSFER_IN: 'TRANSFER_IN',
    TRANSFER_OUT: 'TRANSFER_OUT',
    ADJUSTMENT: 'ADJUSTMENT',
  },
  LOW_STOCK_THRESHOLD_DEFAULT: 10,
};
```

### `backend/src/utils/apiResponse.js`
```javascript
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { successResponse, errorResponse };
```

### `backend/src/utils/generateTokens.js`
```javascript
const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
};

const generateTokenPair = (userId) => ({
  accessToken: generateAccessToken(userId),
  refreshToken: generateRefreshToken(userId),
});

module.exports = { generateAccessToken, generateRefreshToken, generateTokenPair };
```

### `backend/src/utils/generateOTP.js`
```javascript
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const isOTPExpired = (expiresAt) => {
  return new Date() > new Date(expiresAt);
};

module.exports = { generateOTP, isOTPExpired };
```

### `backend/src/middleware/auth.js`
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided. Authorization denied.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password -otp -otpExpires');
    if (!user) {
      return errorResponse(res, 'User not found. Authorization denied.', 401);
    }
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated.', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired. Please refresh.', 401);
    }
    return errorResponse(res, 'Invalid token. Authorization denied.', 401);
  }
};

module.exports = { protect };
```

### `backend/src/middleware/errorHandler.js`
```javascript
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  }

  // Mongoose cast error (bad ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
```

### `backend/src/models/User.js`
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  role: { type: String, enum: ['admin', 'manager', 'staff'], default: 'staff' },
  isActive: { type: Boolean, default: true },
  otp: { type: String, select: false },
  otpExpires: { type: Date, select: false },
  refreshToken: { type: String, select: false },
  lastLogin: { type: Date },
  avatar: { type: String, default: null },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otp;
  delete obj.otpExpires;
  delete obj.refreshToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
```

### `backend/src/models/Category.js`
```javascript
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Category name is required'], unique: true, trim: true },
  description: { type: String, trim: true },
  color: { type: String, default: '#6366f1' },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
```

### `backend/src/models/Warehouse.js`
```javascript
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
}, { _id: true });

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Warehouse name is required'], unique: true, trim: true },
  code: { type: String, required: [true, 'Warehouse code is required'], unique: true, uppercase: true, trim: true },
  address: { type: String, trim: true },
  locations: [locationSchema],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
```

### `backend/src/models/Product.js`
```javascript
const mongoose = require('mongoose');

const stockByLocationSchema = new mongoose.Schema({
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  locationName: { type: String, required: true },
  quantity: { type: Number, default: 0, min: 0 },
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'], trim: true },
  sku: { type: String, required: [true, 'SKU is required'], unique: true, uppercase: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
  unitOfMeasure: { type: String, required: [true, 'Unit of measure is required'], trim: true },
  description: { type: String, trim: true },
  barcode: { type: String, trim: true },
  price: { type: Number, default: 0, min: 0 },
  totalStock: { type: Number, default: 0, min: 0 },
  stockByLocation: [stockByLocationSchema],
  reorderPoint: { type: Number, default: 10, min: 0 },
  reorderQuantity: { type: Number, default: 50, min: 0 },
  isActive: { type: Boolean, default: true },
  image: { type: String, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Virtual for stock status
productSchema.virtual('stockStatus').get(function () {
  if (this.totalStock === 0) return 'out_of_stock';
  if (this.totalStock <= this.reorderPoint) return 'low_stock';
  return 'in_stock';
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Text search index
productSchema.index({ name: 'text', sku: 'text', barcode: 'text' });

module.exports = mongoose.model('Product', productSchema);
```

### `backend/src/models/StockLedger.js`
```javascript
const mongoose = require('mongoose');
const { OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const ledgerEntrySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  locationName: { type: String, required: true },
  operationType: { type: String, enum: Object.values(OPERATION_TYPES), required: true },
  movementType: { type: String, enum: Object.values(MOVEMENT_TYPES), required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  referenceNumber: { type: String, required: true },
  quantityBefore: { type: Number, required: true },
  quantityChanged: { type: Number, required: true },
  quantityAfter: { type: Number, required: true },
  note: { type: String, trim: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

ledgerEntrySchema.index({ product: 1, createdAt: -1 });
ledgerEntrySchema.index({ referenceNumber: 1 });
ledgerEntrySchema.index({ operationType: 1 });

module.exports = mongoose.model('StockLedger', ledgerEntrySchema);
```

### `backend/src/models/Receipt.js`
```javascript
const mongoose = require('mongoose');
const { STATUS } = require('../config/constants');

const lineItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  expectedQuantity: { type: Number, required: true, min: 1 },
  receivedQuantity: { type: Number, default: 0, min: 0 },
  unitOfMeasure: { type: String, required: true },
  note: { type: String },
}, { _id: true });

const receiptSchema = new mongoose.Schema({
  receiptNumber: { type: String, unique: true },
  supplier: { type: String, required: [true, 'Supplier is required'], trim: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: [true, 'Warehouse is required'] },
  locationName: { type: String, required: [true, 'Location is required'] },
  lineItems: { type: [lineItemSchema], required: true, validate: v => v.length > 0 },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.DRAFT },
  scheduledDate: { type: Date },
  validatedAt: { type: Date },
  validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

receiptSchema.pre('save', async function (next) {
  if (!this.receiptNumber) {
    const count = await this.constructor.countDocuments();
    this.receiptNumber = `REC-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Receipt', receiptSchema);
```

### `backend/src/models/DeliveryOrder.js`
```javascript
const mongoose = require('mongoose');
const { STATUS } = require('../config/constants');

const lineItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitOfMeasure: { type: String, required: true },
  note: { type: String },
}, { _id: true });

const deliverySchema = new mongoose.Schema({
  deliveryNumber: { type: String, unique: true },
  customer: { type: String, required: [true, 'Customer is required'], trim: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  locationName: { type: String, required: true },
  lineItems: { type: [lineItemSchema], required: true, validate: v => v.length > 0 },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.DRAFT },
  scheduledDate: { type: Date },
  pickedAt: { type: Date },
  packedAt: { type: Date },
  validatedAt: { type: Date },
  validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shippingAddress: { type: String, trim: true },
  note: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

deliverySchema.pre('save', async function (next) {
  if (!this.deliveryNumber) {
    const count = await this.constructor.countDocuments();
    this.deliveryNumber = `DEL-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('DeliveryOrder', deliverySchema);
```

### `backend/src/models/InternalTransfer.js`
```javascript
const mongoose = require('mongoose');
const { STATUS } = require('../config/constants');

const lineItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitOfMeasure: { type: String, required: true },
}, { _id: true });

const transferSchema = new mongoose.Schema({
  transferNumber: { type: String, unique: true },
  fromWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  fromLocation: { type: String, required: true },
  toWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  toLocation: { type: String, required: true },
  lineItems: { type: [lineItemSchema], required: true, validate: v => v.length > 0 },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.DRAFT },
  scheduledDate: { type: Date },
  validatedAt: { type: Date },
  validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: { type: String, trim: true },
  note: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

transferSchema.pre('save', async function (next) {
  if (!this.transferNumber) {
    const count = await this.constructor.countDocuments();
    this.transferNumber = `TRF-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('InternalTransfer', transferSchema);
```

### `backend/src/models/StockAdjustment.js`
```javascript
const mongoose = require('mongoose');
const { STATUS } = require('../config/constants');

const lineItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  locationName: { type: String, required: true },
  systemQuantity: { type: Number, required: true },
  countedQuantity: { type: Number, required: true, min: 0 },
  difference: { type: Number },
  reason: { type: String, trim: true },
}, { _id: true });

lineItemSchema.pre('save', function (next) {
  this.difference = this.countedQuantity - this.systemQuantity;
  next();
});

const adjustmentSchema = new mongoose.Schema({
  adjustmentNumber: { type: String, unique: true },
  lineItems: { type: [lineItemSchema], required: true, validate: v => v.length > 0 },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.DRAFT },
  validatedAt: { type: Date },
  validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

adjustmentSchema.pre('save', async function (next) {
  if (!this.adjustmentNumber) {
    const count = await this.constructor.countDocuments();
    this.adjustmentNumber = `ADJ-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('StockAdjustment', adjustmentSchema);
```

### `backend/src/services/stock.service.js`
```javascript
const Product = require('../models/Product');
const StockLedger = require('../models/StockLedger');
const { OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');
const mongoose = require('mongoose');

/**
 * Core function: update stock for a product at a specific location
 * Handles IN, OUT, TRANSFER_IN, TRANSFER_OUT, ADJUSTMENT
 */
const updateStock = async (session, {
  productId,
  warehouseId,
  locationName,
  quantity,
  movementType,
  operationType,
  referenceId,
  referenceNumber,
  note,
  userId,
}) => {
  const product = await Product.findById(productId).session(session);
  if (!product) throw new Error(`Product ${productId} not found`);

  // Find or create the stock by location entry
  let locStock = product.stockByLocation.find(
    l => l.warehouse.toString() === warehouseId.toString() && l.locationName === locationName
  );

  const quantityBefore = locStock ? locStock.quantity : 0;
  let quantityAfter;

  if ([MOVEMENT_TYPES.IN, MOVEMENT_TYPES.TRANSFER_IN].includes(movementType)) {
    if (locStock) {
      locStock.quantity += quantity;
    } else {
      product.stockByLocation.push({ warehouse: warehouseId, locationName, quantity });
    }
    product.totalStock += quantity;
    quantityAfter = quantityBefore + quantity;
  } else if ([MOVEMENT_TYPES.OUT, MOVEMENT_TYPES.TRANSFER_OUT].includes(movementType)) {
    if (!locStock || locStock.quantity < quantity) {
      throw new Error(`Insufficient stock for ${product.name}. Available: ${locStock ? locStock.quantity : 0}, Requested: ${quantity}`);
    }
    locStock.quantity -= quantity;
    product.totalStock -= quantity;
    quantityAfter = quantityBefore - quantity;
  } else if (movementType === MOVEMENT_TYPES.ADJUSTMENT) {
    const newQty = quantity; // quantity IS the counted quantity for adjustments
    const diff = newQty - quantityBefore;
    if (locStock) {
      locStock.quantity = newQty;
    } else {
      product.stockByLocation.push({ warehouse: warehouseId, locationName, quantity: newQty });
    }
    product.totalStock += diff;
    quantityAfter = newQty;
  }

  await product.save({ session });

  // Create ledger entry
  await StockLedger.create([{
    product: productId,
    warehouse: warehouseId,
    locationName,
    operationType,
    movementType,
    referenceId,
    referenceNumber,
    quantityBefore,
    quantityChanged: movementType === MOVEMENT_TYPES.ADJUSTMENT ? (quantityAfter - quantityBefore) : (
      [MOVEMENT_TYPES.IN, MOVEMENT_TYPES.TRANSFER_IN].includes(movementType) ? quantity : -quantity
    ),
    quantityAfter,
    note,
    performedBy: userId,
  }], { session });

  return { quantityBefore, quantityAfter, product };
};

module.exports = { updateStock };
```

### `backend/src/services/otp.service.js`
```javascript
const { generateOTP, isOTPExpired } = require('../utils/generateOTP');

const OTP_EXPIRY_MINUTES = 10;

const createOTP = () => {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  return { otp, expiresAt };
};

const verifyOTP = (user, inputOtp) => {
  if (!user.otp || !user.otpExpires) {
    return { valid: false, message: 'No OTP found. Please request a new one.' };
  }
  if (isOTPExpired(user.otpExpires)) {
    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  }
  if (user.otp !== inputOtp) {
    return { valid: false, message: 'Invalid OTP.' };
  }
  return { valid: true };
};

module.exports = { createOTP, verifyOTP };
```

### `backend/src/services/email.service.js`
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: `"CoreInventory" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Password Reset OTP — CoreInventory',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#1e293b;margin-bottom:8px;">Password Reset</h2>
        <p style="color:#475569;">Hi ${name},</p>
        <p style="color:#475569;">Your OTP for password reset is:</p>
        <div style="background:#1e293b;color:#f0fdf4;font-size:32px;font-weight:bold;letter-spacing:10px;padding:20px;border-radius:8px;text-align:center;margin:20px 0;">${otp}</div>
        <p style="color:#94a3b8;font-size:13px;">This OTP expires in 10 minutes. Do not share it with anyone.</p>
        <p style="color:#94a3b8;font-size:12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Email send error:', err.message);
    return false;
  }
};

module.exports = { sendOTPEmail };
```

### `backend/src/controllers/auth.controller.js`
```javascript
const User = require('../models/User');
const { generateTokenPair, generateAccessToken } = require('../utils/generateTokens');
const { createOTP, verifyOTP } = require('../services/otp.service');
const { sendOTPEmail } = require('../services/email.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, 'Email already registered.', 409);

    const user = await User.create({ name, email, password, role: role || 'staff' });
    const { accessToken, refreshToken } = generateTokenPair(user._id);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return successResponse(res, { user, accessToken, refreshToken }, 'Registration successful', 201);
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }
    if (!user.isActive) return errorResponse(res, 'Account is deactivated.', 403);

    const { accessToken, refreshToken } = generateTokenPair(user._id);
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const userData = user.toJSON();
    return successResponse(res, { user: userData, accessToken, refreshToken }, 'Login successful');
  } catch (err) { next(err); }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return errorResponse(res, 'Refresh token required.', 401);

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId).select('+refreshToken');
    if (!user || user.refreshToken !== token) return errorResponse(res, 'Invalid refresh token.', 401);

    const accessToken = generateAccessToken(user._id);
    return successResponse(res, { accessToken }, 'Token refreshed');
  } catch (err) {
    if (err.name === 'TokenExpiredError') return errorResponse(res, 'Refresh token expired. Please login again.', 401);
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('+otp +otpExpires');
    if (!user) return successResponse(res, null, 'If this email exists, an OTP was sent.'); // Security: don't reveal

    const { otp, expiresAt } = createOTP();
    user.otp = otp;
    user.otpExpires = expiresAt;
    await user.save({ validateBeforeSave: false });

    await sendOTPEmail(user.email, user.name, otp);
    return successResponse(res, null, 'OTP sent to your email.');
  } catch (err) { next(err); }
};

const verifyOTPAndReset = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email }).select('+otp +otpExpires +password');
    if (!user) return errorResponse(res, 'User not found.', 404);

    const result = verifyOTP(user, otp);
    if (!result.valid) return errorResponse(res, result.message, 400);

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return successResponse(res, null, 'Password reset successful. Please login.');
  } catch (err) { next(err); }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
    return successResponse(res, null, 'Logged out successfully.');
  } catch (err) { next(err); }
};

const getMe = async (req, res) => {
  return successResponse(res, { user: req.user }, 'User retrieved');
};

module.exports = { register, login, refreshToken, forgotPassword, verifyOTPAndReset, logout, getMe };
```

### `backend/src/controllers/dashboard.controller.js`
```javascript
const Product = require('../models/Product');
const Receipt = require('../models/Receipt');
const DeliveryOrder = require('../models/DeliveryOrder');
const InternalTransfer = require('../models/InternalTransfer');
const StockLedger = require('../models/StockLedger');
const { successResponse } = require('../utils/apiResponse');
const { STATUS } = require('../config/constants');

const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      pendingReceipts,
      pendingDeliveries,
      scheduledTransfers,
      recentActivity,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true, $expr: { $and: [{ $gt: ['$totalStock', 0] }, { $lte: ['$totalStock', '$reorderPoint'] }] } }),
      Product.countDocuments({ isActive: true, totalStock: 0 }),
      Receipt.countDocuments({ status: { $in: [STATUS.DRAFT, STATUS.WAITING, STATUS.READY] } }),
      DeliveryOrder.countDocuments({ status: { $in: [STATUS.DRAFT, STATUS.WAITING, STATUS.READY] } }),
      InternalTransfer.countDocuments({ status: { $in: [STATUS.DRAFT, STATUS.WAITING, STATUS.READY] } }),
      StockLedger.find().sort({ createdAt: -1 }).limit(10)
        .populate('product', 'name sku')
        .populate('warehouse', 'name')
        .populate('performedBy', 'name'),
    ]);

    // Stock movement trend (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const stockTrend = await StockLedger.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            movementType: '$movementType',
          },
          totalQuantity: { $sum: { $abs: '$quantityChanged' } },
        },
      },
      { $sort: { '_id.date': 1 } },
    ]);

    return successResponse(res, {
      kpis: {
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        pendingReceipts,
        pendingDeliveries,
        scheduledTransfers,
      },
      recentActivity,
      stockTrend,
    });
  } catch (err) { next(err); }
};

module.exports = { getDashboardStats };
```

### `backend/src/controllers/product.controller.js`
```javascript
const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, category, status, warehouse, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (status === 'low_stock') query.$expr = { $and: [{ $gt: ['$totalStock', 0] }, { $lte: ['$totalStock', '$reorderPoint'] }] };
    if (status === 'out_of_stock') query.totalStock = 0;
    if (status === 'in_stock') query.$expr = { $gt: ['$totalStock', '$reorderPoint'] };

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(query).populate('category', 'name color').sort(sort).skip(skip).limit(parseInt(limit)),
      Product.countDocuments(query),
    ]);

    return successResponse(res, {
      products,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) { next(err); }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name color')
      .populate('stockByLocation.warehouse', 'name code');
    if (!product) return errorResponse(res, 'Product not found.', 404);
    return successResponse(res, { product });
  } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, sku, category, unitOfMeasure, description, barcode, price, reorderPoint, reorderQuantity, initialStock, warehouseId, locationName } = req.body;
    
    const product = new Product({ name, sku, category, unitOfMeasure, description, barcode, price, reorderPoint, reorderQuantity, createdBy: req.user._id });
    
    if (initialStock > 0 && warehouseId && locationName) {
      product.stockByLocation.push({ warehouse: warehouseId, locationName, quantity: initialStock });
      product.totalStock = initialStock;
    }
    
    await product.save();
    await product.populate('category', 'name color');
    return successResponse(res, { product }, 'Product created', 201);
  } catch (err) { next(err); }
};

const updateProduct = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'category', 'unitOfMeasure', 'description', 'barcode', 'price', 'reorderPoint', 'reorderQuantity', 'isActive'];
    const updates = {};
    allowedFields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
    
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).populate('category', 'name color');
    if (!product) return errorResponse(res, 'Product not found.', 404);
    return successResponse(res, { product }, 'Product updated');
  } catch (err) { next(err); }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return errorResponse(res, 'Product not found.', 404);
    return successResponse(res, null, 'Product deactivated');
  } catch (err) { next(err); }
};

const getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      isActive: true,
      $expr: { $lte: ['$totalStock', '$reorderPoint'] },
    }).populate('category', 'name color').sort({ totalStock: 1 }).limit(50);
    return successResponse(res, { products });
  } catch (err) { next(err); }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockProducts };
```

### `backend/src/controllers/receipt.controller.js`
```javascript
const mongoose = require('mongoose');
const Receipt = require('../models/Receipt');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS } = require('../config/constants');
const { OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getReceipts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) query.$or = [
      { receiptNumber: { $regex: search, $options: 'i' } },
      { supplier: { $regex: search, $options: 'i' } },
    ];
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [receipts, total] = await Promise.all([
      Receipt.find(query).populate('warehouse', 'name code').populate('lineItems.product', 'name sku').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Receipt.countDocuments(query),
    ]);
    return successResponse(res, { receipts, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const getReceiptById = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate('warehouse', 'name code locations')
      .populate('lineItems.product', 'name sku unitOfMeasure totalStock')
      .populate('createdBy', 'name email')
      .populate('validatedBy', 'name email');
    if (!receipt) return errorResponse(res, 'Receipt not found.', 404);
    return successResponse(res, { receipt });
  } catch (err) { next(err); }
};

const createReceipt = async (req, res, next) => {
  try {
    const { supplier, warehouse, locationName, lineItems, scheduledDate, note } = req.body;
    const receipt = await Receipt.create({
      supplier, warehouse, locationName, lineItems, scheduledDate, note,
      status: STATUS.DRAFT,
      createdBy: req.user._id,
    });
    return successResponse(res, { receipt }, 'Receipt created', 201);
  } catch (err) { next(err); }
};

const updateReceiptStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return errorResponse(res, 'Receipt not found.', 404);
    if (receipt.status === STATUS.DONE) return errorResponse(res, 'Validated receipts cannot be modified.', 400);
    if (receipt.status === STATUS.CANCELED) return errorResponse(res, 'Canceled receipts cannot be modified.', 400);
    receipt.status = status;
    await receipt.save();
    return successResponse(res, { receipt }, 'Status updated');
  } catch (err) { next(err); }
};

const validateReceipt = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const receipt = await Receipt.findById(req.params.id).session(session).populate('lineItems.product');
    if (!receipt) { await session.abortTransaction(); return errorResponse(res, 'Receipt not found.', 404); }
    if (receipt.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }
    if (receipt.status === STATUS.CANCELED) { await session.abortTransaction(); return errorResponse(res, 'Cannot validate a canceled receipt.', 400); }

    for (const item of receipt.lineItems) {
      const receivedQty = req.body.lineItems?.find(l => l._id === item._id.toString())?.receivedQuantity ?? item.expectedQuantity;
      item.receivedQuantity = receivedQty;
      if (receivedQty > 0) {
        await updateStock(session, {
          productId: item.product._id,
          warehouseId: receipt.warehouse,
          locationName: receipt.locationName,
          quantity: receivedQty,
          movementType: MOVEMENT_TYPES.IN,
          operationType: OPERATION_TYPES.RECEIPT,
          referenceId: receipt._id,
          referenceNumber: receipt.receiptNumber,
          note: receipt.note,
          userId: req.user._id,
        });
      }
    }

    receipt.status = STATUS.DONE;
    receipt.validatedAt = new Date();
    receipt.validatedBy = req.user._id;
    await receipt.save({ session });
    await session.commitTransaction();

    return successResponse(res, { receipt }, 'Receipt validated. Stock updated.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

const cancelReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return errorResponse(res, 'Receipt not found.', 404);
    if (receipt.status === STATUS.DONE) return errorResponse(res, 'Validated receipts cannot be canceled.', 400);
    receipt.status = STATUS.CANCELED;
    await receipt.save();
    return successResponse(res, { receipt }, 'Receipt canceled');
  } catch (err) { next(err); }
};

module.exports = { getReceipts, getReceiptById, createReceipt, updateReceiptStatus, validateReceipt, cancelReceipt };
```

### `backend/src/controllers/delivery.controller.js`
```javascript
const mongoose = require('mongoose');
const DeliveryOrder = require('../models/DeliveryOrder');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS, OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getDeliveries = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) query.$or = [{ deliveryNumber: { $regex: search, $options: 'i' } }, { customer: { $regex: search, $options: 'i' } }];
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [deliveries, total] = await Promise.all([
      DeliveryOrder.find(query).populate('warehouse', 'name code').populate('lineItems.product', 'name sku').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      DeliveryOrder.countDocuments(query),
    ]);
    return successResponse(res, { deliveries, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const createDelivery = async (req, res, next) => {
  try {
    const { customer, warehouse, locationName, lineItems, scheduledDate, shippingAddress, note } = req.body;
    const delivery = await DeliveryOrder.create({ customer, warehouse, locationName, lineItems, scheduledDate, shippingAddress, note, status: STATUS.DRAFT, createdBy: req.user._id });
    return successResponse(res, { delivery }, 'Delivery order created', 201);
  } catch (err) { next(err); }
};

const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await DeliveryOrder.findById(req.params.id).populate('warehouse', 'name code locations').populate('lineItems.product', 'name sku unitOfMeasure totalStock').populate('createdBy', 'name email').populate('validatedBy', 'name email');
    if (!delivery) return errorResponse(res, 'Delivery order not found.', 404);
    return successResponse(res, { delivery });
  } catch (err) { next(err); }
};

const validateDelivery = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const delivery = await DeliveryOrder.findById(req.params.id).session(session).populate('lineItems.product');
    if (!delivery) { await session.abortTransaction(); return errorResponse(res, 'Delivery not found.', 404); }
    if (delivery.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }

    for (const item of delivery.lineItems) {
      await updateStock(session, {
        productId: item.product._id,
        warehouseId: delivery.warehouse,
        locationName: delivery.locationName,
        quantity: item.quantity,
        movementType: MOVEMENT_TYPES.OUT,
        operationType: OPERATION_TYPES.DELIVERY,
        referenceId: delivery._id,
        referenceNumber: delivery.deliveryNumber,
        note: delivery.note,
        userId: req.user._id,
      });
    }

    delivery.status = STATUS.DONE;
    delivery.validatedAt = new Date();
    delivery.validatedBy = req.user._id;
    await delivery.save({ session });
    await session.commitTransaction();
    return successResponse(res, { delivery }, 'Delivery validated. Stock decreased.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const delivery = await DeliveryOrder.findById(req.params.id);
    if (!delivery) return errorResponse(res, 'Delivery not found.', 404);
    if ([STATUS.DONE, STATUS.CANCELED].includes(delivery.status)) return errorResponse(res, 'Cannot modify completed/canceled delivery.', 400);
    delivery.status = status;
    if (status === STATUS.READY) delivery.pickedAt = new Date();
    await delivery.save();
    return successResponse(res, { delivery }, 'Status updated');
  } catch (err) { next(err); }
};

const cancelDelivery = async (req, res, next) => {
  try {
    const delivery = await DeliveryOrder.findById(req.params.id);
    if (!delivery) return errorResponse(res, 'Delivery not found.', 404);
    if (delivery.status === STATUS.DONE) return errorResponse(res, 'Validated deliveries cannot be canceled.', 400);
    delivery.status = STATUS.CANCELED;
    await delivery.save();
    return successResponse(res, { delivery }, 'Delivery canceled');
  } catch (err) { next(err); }
};

module.exports = { getDeliveries, createDelivery, getDeliveryById, validateDelivery, updateDeliveryStatus, cancelDelivery };
```

### `backend/src/controllers/transfer.controller.js`
```javascript
const mongoose = require('mongoose');
const InternalTransfer = require('../models/InternalTransfer');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS, OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getTransfers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [transfers, total] = await Promise.all([
      InternalTransfer.find(query).populate('fromWarehouse', 'name code').populate('toWarehouse', 'name code').populate('lineItems.product', 'name sku').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      InternalTransfer.countDocuments(query),
    ]);
    return successResponse(res, { transfers, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const createTransfer = async (req, res, next) => {
  try {
    const { fromWarehouse, fromLocation, toWarehouse, toLocation, lineItems, scheduledDate, reason, note } = req.body;
    if (fromWarehouse === toWarehouse && fromLocation === toLocation) {
      return errorResponse(res, 'Source and destination cannot be the same.', 400);
    }
    const transfer = await InternalTransfer.create({ fromWarehouse, fromLocation, toWarehouse, toLocation, lineItems, scheduledDate, reason, note, status: STATUS.DRAFT, createdBy: req.user._id });
    return successResponse(res, { transfer }, 'Transfer created', 201);
  } catch (err) { next(err); }
};

const getTransferById = async (req, res, next) => {
  try {
    const transfer = await InternalTransfer.findById(req.params.id).populate('fromWarehouse', 'name code').populate('toWarehouse', 'name code').populate('lineItems.product', 'name sku unitOfMeasure totalStock').populate('createdBy', 'name email').populate('validatedBy', 'name email');
    if (!transfer) return errorResponse(res, 'Transfer not found.', 404);
    return successResponse(res, { transfer });
  } catch (err) { next(err); }
};

const validateTransfer = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const transfer = await InternalTransfer.findById(req.params.id).session(session).populate('lineItems.product');
    if (!transfer) { await session.abortTransaction(); return errorResponse(res, 'Transfer not found.', 404); }
    if (transfer.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }

    for (const item of transfer.lineItems) {
      // Move OUT from source
      await updateStock(session, {
        productId: item.product._id,
        warehouseId: transfer.fromWarehouse,
        locationName: transfer.fromLocation,
        quantity: item.quantity,
        movementType: MOVEMENT_TYPES.TRANSFER_OUT,
        operationType: OPERATION_TYPES.TRANSFER,
        referenceId: transfer._id,
        referenceNumber: transfer.transferNumber,
        note: `Transfer to ${transfer.toLocation}`,
        userId: req.user._id,
      });
      // Move IN to destination
      await updateStock(session, {
        productId: item.product._id,
        warehouseId: transfer.toWarehouse,
        locationName: transfer.toLocation,
        quantity: item.quantity,
        movementType: MOVEMENT_TYPES.TRANSFER_IN,
        operationType: OPERATION_TYPES.TRANSFER,
        referenceId: transfer._id,
        referenceNumber: transfer.transferNumber,
        note: `Transfer from ${transfer.fromLocation}`,
        userId: req.user._id,
      });
    }

    transfer.status = STATUS.DONE;
    transfer.validatedAt = new Date();
    transfer.validatedBy = req.user._id;
    await transfer.save({ session });
    await session.commitTransaction();
    return successResponse(res, { transfer }, 'Transfer validated. Locations updated.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

module.exports = { getTransfers, createTransfer, getTransferById, validateTransfer };
```

### `backend/src/controllers/adjustment.controller.js`
```javascript
const mongoose = require('mongoose');
const StockAdjustment = require('../models/StockAdjustment');
const Product = require('../models/Product');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS, OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getAdjustments = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [adjustments, total] = await Promise.all([
      StockAdjustment.find(query).populate('lineItems.product', 'name sku').populate('lineItems.warehouse', 'name').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      StockAdjustment.countDocuments(query),
    ]);
    return successResponse(res, { adjustments, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const createAdjustment = async (req, res, next) => {
  try {
    const { lineItems, note } = req.body;
    // Auto-fill systemQuantity from current product stock
    const enrichedItems = await Promise.all(lineItems.map(async (item) => {
      const product = await Product.findById(item.product);
      const locStock = product?.stockByLocation?.find(
        l => l.warehouse.toString() === item.warehouse && l.locationName === item.locationName
      );
      return { ...item, systemQuantity: locStock?.quantity ?? 0, difference: item.countedQuantity - (locStock?.quantity ?? 0) };
    }));
    const adjustment = await StockAdjustment.create({ lineItems: enrichedItems, note, status: STATUS.DRAFT, createdBy: req.user._id });
    return successResponse(res, { adjustment }, 'Adjustment created', 201);
  } catch (err) { next(err); }
};

const validateAdjustment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const adjustment = await StockAdjustment.findById(req.params.id).session(session);
    if (!adjustment) { await session.abortTransaction(); return errorResponse(res, 'Adjustment not found.', 404); }
    if (adjustment.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }

    for (const item of adjustment.lineItems) {
      await updateStock(session, {
        productId: item.product,
        warehouseId: item.warehouse,
        locationName: item.locationName,
        quantity: item.countedQuantity,
        movementType: MOVEMENT_TYPES.ADJUSTMENT,
        operationType: OPERATION_TYPES.ADJUSTMENT,
        referenceId: adjustment._id,
        referenceNumber: adjustment.adjustmentNumber,
        note: item.reason || adjustment.note,
        userId: req.user._id,
      });
    }

    adjustment.status = STATUS.DONE;
    adjustment.validatedAt = new Date();
    adjustment.validatedBy = req.user._id;
    await adjustment.save({ session });
    await session.commitTransaction();
    return successResponse(res, { adjustment }, 'Adjustment validated. Stock synchronized.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

module.exports = { getAdjustments, createAdjustment, validateAdjustment };
```

### `backend/src/controllers/ledger.controller.js`
```javascript
const StockLedger = require('../models/StockLedger');
const { successResponse } = require('../utils/apiResponse');

const getLedger = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, product, warehouse, operationType, startDate, endDate, search } = req.query;
    const query = {};
    if (product) query.product = product;
    if (warehouse) query.warehouse = warehouse;
    if (operationType) query.operationType = operationType;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    if (search) query.referenceNumber = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [entries, total] = await Promise.all([
      StockLedger.find(query).populate('product', 'name sku').populate('warehouse', 'name code').populate('performedBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      StockLedger.countDocuments(query),
    ]);
    return successResponse(res, { entries, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

module.exports = { getLedger };
```

### `backend/src/controllers/warehouse.controller.js`
```javascript
const Warehouse = require('../models/Warehouse');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getWarehouses = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find({ isActive: true }).sort({ name: 1 });
    return successResponse(res, { warehouses });
  } catch (err) { next(err); }
};

const createWarehouse = async (req, res, next) => {
  try {
    const { name, code, address, locations } = req.body;
    const warehouse = await Warehouse.create({ name, code, address, locations, createdBy: req.user._id });
    return successResponse(res, { warehouse }, 'Warehouse created', 201);
  } catch (err) { next(err); }
};

const updateWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!warehouse) return errorResponse(res, 'Warehouse not found.', 404);
    return successResponse(res, { warehouse }, 'Warehouse updated');
  } catch (err) { next(err); }
};

const addLocation = async (req, res, next) => {
  try {
    const { name, code, description } = req.body;
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, { $push: { locations: { name, code, description } } }, { new: true });
    if (!warehouse) return errorResponse(res, 'Warehouse not found.', 404);
    return successResponse(res, { warehouse }, 'Location added');
  } catch (err) { next(err); }
};

module.exports = { getWarehouses, createWarehouse, updateWarehouse, addLocation };
```

### `backend/src/controllers/category.controller.js`
```javascript
const Category = require('../models/Category');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    return successResponse(res, { categories });
  } catch (err) { next(err); }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;
    const category = await Category.create({ name, description, color, createdBy: req.user._id });
    return successResponse(res, { category }, 'Category created', 201);
  } catch (err) { next(err); }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return errorResponse(res, 'Category not found.', 404);
    return successResponse(res, { category }, 'Category updated');
  } catch (err) { next(err); }
};

module.exports = { getCategories, createCategory, updateCategory };
```

### All Routes Files

**`backend/src/routes/auth.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { register, login, refreshToken, forgotPassword, verifyOTPAndReset, logout, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyOTPAndReset);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
```

**`backend/src/routes/product.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockProducts } = require('../controllers/product.controller');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/low-stock', getLowStockProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
```

**`backend/src/routes/dashboard.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth');
router.get('/stats', protect, getDashboardStats);
module.exports = router;
```

**`backend/src/routes/receipt.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getReceipts, getReceiptById, createReceipt, updateReceiptStatus, validateReceipt, cancelReceipt } = require('../controllers/receipt.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getReceipts);
router.get('/:id', getReceiptById);
router.post('/', createReceipt);
router.patch('/:id/status', updateReceiptStatus);
router.post('/:id/validate', validateReceipt);
router.post('/:id/cancel', cancelReceipt);
module.exports = router;
```

**`backend/src/routes/delivery.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getDeliveries, createDelivery, getDeliveryById, validateDelivery, updateDeliveryStatus, cancelDelivery } = require('../controllers/delivery.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getDeliveries);
router.get('/:id', getDeliveryById);
router.post('/', createDelivery);
router.patch('/:id/status', updateDeliveryStatus);
router.post('/:id/validate', validateDelivery);
router.post('/:id/cancel', cancelDelivery);
module.exports = router;
```

**`backend/src/routes/transfer.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getTransfers, createTransfer, getTransferById, validateTransfer } = require('../controllers/transfer.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getTransfers);
router.get('/:id', getTransferById);
router.post('/', createTransfer);
router.post('/:id/validate', validateTransfer);
module.exports = router;
```

**`backend/src/routes/adjustment.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getAdjustments, createAdjustment, validateAdjustment } = require('../controllers/adjustment.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getAdjustments);
router.post('/', createAdjustment);
router.post('/:id/validate', validateAdjustment);
module.exports = router;
```

**`backend/src/routes/ledger.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getLedger } = require('../controllers/ledger.controller');
const { protect } = require('../middleware/auth');
router.get('/', protect, getLedger);
module.exports = router;
```

**`backend/src/routes/warehouse.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getWarehouses, createWarehouse, updateWarehouse, addLocation } = require('../controllers/warehouse.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getWarehouses);
router.post('/', createWarehouse);
router.put('/:id', updateWarehouse);
router.post('/:id/locations', addLocation);
module.exports = router;
```

**`backend/src/routes/category.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory } = require('../controllers/category.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
module.exports = router;
```

---

## FRONTEND — WRITE ALL FILES COMPLETELY

### `frontend/package.json`
```json
{
  "name": "coreinventory-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.2",
    "recharts": "^2.10.1",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "date-fns": "^3.0.6"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "eslint": "^8.55.0",
    "eslint-config-next": "14.0.4"
  }
}
```

### `frontend/.env.local.example`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### `frontend/next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: { domains: ['localhost'] },
};
module.exports = nextConfig;
```

### `frontend/tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        surface: {
          DEFAULT: '#0f1117',
          50: '#1a1d27',
          100: '#1e2130',
          200: '#252839',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(16px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
```

### `frontend/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --sidebar-width: 260px;
}

* { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0f1117;
  color: #e2e8f0;
  font-family: var(--font-geist-sans, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #4a5568; }

/* Custom focus ring */
.focus-ring:focus-visible {
  outline: 2px solid #22c55e;
  outline-offset: 2px;
}

@layer components {
  .glass-card {
    @apply bg-surface-50/80 backdrop-blur-sm border border-white/5 rounded-xl;
  }
  .btn-primary {
    @apply bg-brand-500 hover:bg-brand-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  .btn-secondary {
    @apply bg-surface-100 hover:bg-surface-200 text-gray-300 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95;
  }
  .btn-danger {
    @apply bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-red-500/20;
  }
  .input-field {
    @apply w-full bg-surface-100 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all duration-200;
  }
  .table-row {
    @apply border-b border-white/5 hover:bg-white/2 transition-colors duration-150;
  }
  .status-badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  .nav-link {
    @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer;
  }
  .nav-link.active {
    @apply text-brand-400 bg-brand-500/10 hover:bg-brand-500/15;
  }
  .page-title {
    @apply text-2xl font-semibold text-white tracking-tight;
  }
  .section-header {
    @apply text-sm font-medium text-gray-400 uppercase tracking-wider;
  }
}
```

### `frontend/app/layout.js`
```javascript
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata = {
  title: 'CoreInventory — Inventory Management System',
  description: 'Production-grade inventory management for modern warehouses',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ToastProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#1e2130', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '14px' },
                success: { iconTheme: { primary: '#22c55e', secondary: '#1e2130' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#1e2130' } },
              }}
            />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### `frontend/lib/api.js`
```javascript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor — attach access token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  refreshToken: (token) => api.post('/auth/refresh', { refreshToken: token }),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getLowStock: () => api.get('/products/low-stock'),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
};

export const warehouseAPI = {
  getAll: () => api.get('/warehouses'),
  create: (data) => api.post('/warehouses', data),
  update: (id, data) => api.put(`/warehouses/${id}`, data),
  addLocation: (id, data) => api.post(`/warehouses/${id}/locations`, data),
};

export const receiptAPI = {
  getAll: (params) => api.get('/receipts', { params }),
  getById: (id) => api.get(`/receipts/${id}`),
  create: (data) => api.post('/receipts', data),
  updateStatus: (id, status) => api.patch(`/receipts/${id}/status`, { status }),
  validate: (id, data) => api.post(`/receipts/${id}/validate`, data),
  cancel: (id) => api.post(`/receipts/${id}/cancel`),
};

export const deliveryAPI = {
  getAll: (params) => api.get('/deliveries', { params }),
  getById: (id) => api.get(`/deliveries/${id}`),
  create: (data) => api.post('/deliveries', data),
  updateStatus: (id, status) => api.patch(`/deliveries/${id}/status`, { status }),
  validate: (id) => api.post(`/deliveries/${id}/validate`),
  cancel: (id) => api.post(`/deliveries/${id}/cancel`),
};

export const transferAPI = {
  getAll: (params) => api.get('/transfers', { params }),
  getById: (id) => api.get(`/transfers/${id}`),
  create: (data) => api.post('/transfers', data),
  validate: (id) => api.post(`/transfers/${id}/validate`),
};

export const adjustmentAPI = {
  getAll: (params) => api.get('/adjustments', { params }),
  create: (data) => api.post('/adjustments', data),
  validate: (id) => api.post(`/adjustments/${id}/validate`),
};

export const ledgerAPI = {
  getAll: (params) => api.get('/ledger', { params }),
};

export default api;
```

### `frontend/context/AuthContext.js`
```javascript
'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const { data } = await authAPI.getMe();
          setUser(data.data.user);
        }
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    const { user, accessToken, refreshToken } = data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    router.push('/');
    return user;
  }, [router]);

  const register = useCallback(async (formData) => {
    const { data } = await authAPI.register(formData);
    const { user, accessToken, refreshToken } = data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    router.push('/');
    return user;
  }, [router]);

  const logout = useCallback(async () => {
    try { await authAPI.logout(); } catch {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
```

### `frontend/context/ToastContext.js`
```javascript
'use client';
import { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const showSuccess = (msg) => toast.success(msg);
  const showError = (msg) => toast.error(msg);
  const showLoading = (msg) => toast.loading(msg);
  const dismiss = (id) => toast.dismiss(id);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showLoading, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
```

### `frontend/lib/utils.js`
```javascript
import { clsx } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs) { return clsx(inputs); }

export const formatDate = (date) => {
  if (!date) return '—';
  return format(new Date(date), 'dd MMM yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  return format(new Date(date), 'dd MMM yyyy, HH:mm');
};

export const timeAgo = (date) => {
  if (!date) return '—';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const getStatusColor = (status) => {
  const map = {
    draft: 'bg-gray-500/15 text-gray-400 border-gray-500/20',
    waiting: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    ready: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    done: 'bg-green-500/15 text-green-400 border-green-500/20',
    canceled: 'bg-red-500/15 text-red-400 border-red-500/20',
  };
  return map[status] || map.draft;
};

export const getMovementColor = (type) => {
  const map = {
    IN: 'text-green-400',
    OUT: 'text-red-400',
    TRANSFER_IN: 'text-blue-400',
    TRANSFER_OUT: 'text-orange-400',
    ADJUSTMENT: 'text-purple-400',
  };
  return map[type] || 'text-gray-400';
};

export const formatQuantity = (qty, uom = '') => {
  return `${Number(qty).toLocaleString()} ${uom}`.trim();
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

### `frontend/components/layout/Sidebar.js`
```javascript
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Package, ArrowDownToLine, ArrowUpFromLine,
  ArrowLeftRight, ClipboardEdit, BookOpen, Warehouse, Settings,
  LogOut, User, Bell, ChevronDown, Boxes
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Products', href: '/products', icon: Package },
  {
    label: 'Operations', icon: Boxes, children: [
      { label: 'Receipts', href: '/receipts', icon: ArrowDownToLine },
      { label: 'Deliveries', href: '/deliveries', icon: ArrowUpFromLine },
      { label: 'Transfers', href: '/transfers', icon: ArrowLeftRight },
      { label: 'Adjustments', href: '/adjustments', icon: ClipboardEdit },
    ]
  },
  { label: 'Stock Ledger', href: '/ledger', icon: BookOpen },
  { label: 'Warehouses', href: '/warehouses', icon: Warehouse },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [operationsOpen, setOperationsOpen] = useState(true);

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-50 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Boxes className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">CoreInventory</span>
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOperationsOpen(!operationsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', operationsOpen && 'rotate-180')} />
                </button>
                {operationsOpen && (
                  <div className="ml-4 pl-3 border-l border-white/5 mt-0.5 space-y-0.5">
                    {item.children.map((child) => {
                      const isActive = pathname === child.href || pathname.startsWith(child.href + '/');
                      return (
                        <Link key={child.href} href={child.href} className={cn('nav-link', isActive && 'active')}>
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          const isActive = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} className={cn('nav-link', isActive && 'active')}>
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <Link href="/profile" className="nav-link">
          <User className="w-4 h-4" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </Link>
        <button onClick={logout} className="nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/5">
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
```

### `frontend/components/layout/Header.js`
```javascript
'use client';
import { Bell, Search, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';

export default function Header({ title, action }) {
  const { user } = useAuth();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    productAPI.getLowStock().then(({ data }) => {
      setAlertCount(data.data.products.length);
    }).catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">{title}</h1>
        <div className="flex items-center gap-3">
          {alertCount > 0 && (
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5">
              <Bell className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">{alertCount} low stock</span>
            </div>
          )}
          {action && (
            <button onClick={action.onClick} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {action.label}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
```

### `frontend/components/layout/PageWrapper.js`
```javascript
'use client';
import Sidebar from './Sidebar';
import Header from './Header';

export default function PageWrapper({ title, action, children }) {
  return (
    <div className="flex h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[260px] overflow-hidden">
        <Header title={title} action={action} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
```

### `frontend/components/ui/Badge.js`
```javascript
import { cn, getStatusColor } from '@/lib/utils';

export function StatusBadge({ status }) {
  return (
    <span className={cn('status-badge border', getStatusColor(status))}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

export function StockBadge({ status, quantity, reorderPoint }) {
  const map = {
    out_of_stock: 'bg-red-500/15 text-red-400 border-red-500/20',
    low_stock: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    in_stock: 'bg-green-500/15 text-green-400 border-green-500/20',
  };
  const labels = { out_of_stock: 'Out of Stock', low_stock: 'Low Stock', in_stock: 'In Stock' };
  return (
    <span className={cn('status-badge border', map[status] || map.in_stock)}>
      {labels[status] || 'In Stock'}
    </span>
  );
}
```

### `frontend/components/ui/Spinner.js`
```javascript
import { cn } from '@/lib/utils';

export default function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <div className={cn('animate-spin rounded-full border-2 border-brand-500/20 border-t-brand-500', sizes[size], className)} />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-3" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
```

### `frontend/components/ui/Modal.js`
```javascript
'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full bg-surface-50 border border-white/10 rounded-2xl shadow-2xl animate-slide-up', sizes[size])}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
```

### `frontend/components/ui/Table.js`
```javascript
import { cn } from '@/lib/utils';

export function Table({ headers, children, className }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }) {
  return <td className={cn('px-4 py-3 text-sm text-gray-300 whitespace-nowrap', className)}>{children}</td>;
}
```

### `frontend/components/ui/Select.js`
```javascript
import { cn } from '@/lib/utils';

export default function Select({ label, options, error, className, ...props }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-gray-400">{label}</label>}
      <select
        {...props}
        className={cn('input-field appearance-none cursor-pointer', error && 'border-red-500/50 focus:border-red-500/50')}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
```

### `frontend/components/ui/Input.js`
```javascript
import { cn } from '@/lib/utils';

export default function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-gray-400">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <input
          {...props}
          className={cn('input-field', Icon && 'pl-9', error && 'border-red-500/50 focus:border-red-500/50')}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
```

### `frontend/components/dashboard/KPICard.js`
```javascript
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ title, value, icon: Icon, color, subtitle, trend }) {
  const colorMap = {
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  return (
    <div className="glass-card p-5 hover:border-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2.5 rounded-lg border', colorMap[color] || colorMap.blue)}>
          <Icon className="w-4 h-4" />
        </div>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 text-xs', trend >= 0 ? 'text-green-400' : 'text-red-400')}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-white tabular-nums">{value?.toLocaleString() ?? '—'}</p>
        <p className="text-sm font-medium text-gray-400 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
```

### `frontend/components/dashboard/RecentActivity.js`
```javascript
import { timeAgo, getMovementColor } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowLeftRight, Edit } from 'lucide-react';

const iconMap = {
  IN: { icon: ArrowDown, color: 'text-green-400 bg-green-500/10' },
  OUT: { icon: ArrowUp, color: 'text-red-400 bg-red-500/10' },
  TRANSFER_IN: { icon: ArrowLeftRight, color: 'text-blue-400 bg-blue-500/10' },
  TRANSFER_OUT: { icon: ArrowLeftRight, color: 'text-orange-400 bg-orange-500/10' },
  ADJUSTMENT: { icon: Edit, color: 'text-purple-400 bg-purple-500/10' },
};

export default function RecentActivity({ activities = [] }) {
  return (
    <div className="glass-card">
      <div className="px-5 py-4 border-b border-white/5">
        <h3 className="font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="divide-y divide-white/5">
        {activities.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-gray-500">No recent activity</div>
        )}
        {activities.map((entry) => {
          const mt = iconMap[entry.movementType] || iconMap.ADJUSTMENT;
          const Icon = mt.icon;
          const sign = ['IN', 'TRANSFER_IN'].includes(entry.movementType) ? '+' : entry.movementType === 'ADJUSTMENT' ? '±' : '-';
          const qtyColor = getMovementColor(entry.movementType);
          return (
            <div key={entry._id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-white/2 transition-colors">
              <div className={`p-1.5 rounded-lg ${mt.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{entry.product?.name}</p>
                <p className="text-xs text-gray-500">{entry.referenceNumber} · {entry.warehouse?.name} · {entry.performedBy?.name}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold tabular-nums ${qtyColor}`}>{sign}{Math.abs(entry.quantityChanged)}</p>
                <p className="text-xs text-gray-600">{timeAgo(entry.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### `frontend/app/(dashboard)/layout.js`
```javascript
'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '@/components/ui/Spinner';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Spinner className="border-white/20 border-t-white" />
          </div>
          <p className="text-sm text-gray-500">Loading CoreInventory...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  return children;
}
```

### `frontend/app/(dashboard)/page.js`
```javascript
'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import KPICard from '@/components/dashboard/KPICard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { dashboardAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { Package, TrendingDown, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getStats()
      .then(({ data }) => setStats(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Process chart data
  const chartData = (() => {
    if (!stats?.stockTrend) return [];
    const map = {};
    stats.stockTrend.forEach(({ _id, totalQuantity }) => {
      if (!map[_id.date]) map[_id.date] = { date: _id.date, IN: 0, OUT: 0, ADJUSTMENT: 0 };
      if (_id.movementType === 'IN') map[_id.date].IN = totalQuantity;
      else if (_id.movementType === 'OUT') map[_id.date].OUT = totalQuantity;
      else if (_id.movementType === 'ADJUSTMENT') map[_id.date].ADJUSTMENT = totalQuantity;
    });
    return Object.values(map).map(d => ({ ...d, date: format(new Date(d.date), 'MMM dd') }));
  })();

  if (loading) return <PageWrapper title="Dashboard"><PageLoader /></PageWrapper>;

  const kpis = stats?.kpis;

  return (
    <PageWrapper title="Dashboard">
      <div className="space-y-6">
        {/* Alert Banner */}
        {(kpis?.lowStockProducts > 0 || kpis?.outOfStockProducts > 0) && (
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">
                <strong>{kpis.outOfStockProducts}</strong> products out of stock &amp;{' '}
                <strong>{kpis.lowStockProducts}</strong> running low
              </span>
            </div>
            <Link href="/products?status=low_stock" className="text-xs text-yellow-400 hover:text-yellow-300 underline underline-offset-2">
              View all →
            </Link>
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard title="Total Products" value={kpis?.totalProducts} icon={Package} color="blue" />
          <KPICard title="Low Stock" value={kpis?.lowStockProducts} icon={AlertTriangle} color="yellow" />
          <KPICard title="Out of Stock" value={kpis?.outOfStockProducts} icon={TrendingDown} color="red" />
          <KPICard title="Pending Receipts" value={kpis?.pendingReceipts} icon={ArrowDownToLine} color="green" />
          <KPICard title="Pending Deliveries" value={kpis?.pendingDeliveries} icon={ArrowUpFromLine} color="orange" />
          <KPICard title="Transfers" value={kpis?.scheduledTransfers} icon={ArrowLeftRight} color="purple" />
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white">Stock Movement — Last 7 Days</h3>
              <BarChart3 className="w-4 h-4 text-gray-500" />
            </div>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#e2e8f0' }} />
                  <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="IN" stroke="#22c55e" fill="url(#gIn)" strokeWidth={2} name="Received" />
                  <Area type="monotone" dataKey="OUT" stroke="#ef4444" fill="url(#gOut)" strokeWidth={2} name="Dispatched" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-gray-600 text-sm">No movement data yet</div>
            )}
          </div>
          <RecentActivity activities={stats?.recentActivity || []} />
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/receipts/new', label: 'New Receipt', icon: ArrowDownToLine, color: 'brand' },
              { href: '/deliveries/new', label: 'New Delivery', icon: ArrowUpFromLine, color: 'orange' },
              { href: '/transfers/new', label: 'New Transfer', icon: ArrowLeftRight, color: 'blue' },
              { href: '/adjustments/new', label: 'Adjustment', icon: Package, color: 'purple' },
            ].map(({ href, label, icon: Icon, color }) => (
              <Link key={href} href={href} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/5 hover:border-white/10 transition-all duration-200 group">
                <Icon className={`w-5 h-5 text-${color === 'brand' ? 'brand-400' : color + '-400'} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
```

### `frontend/app/(dashboard)/products/page.js`
```javascript
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StatusBadge, StockBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { productAPI, categoryAPI, warehouseAPI } from '@/lib/api';
import { formatDate, getErrorMessage, debounce } from '@/lib/utils';
import { Search, Filter, Edit, Eye, Package, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  const [form, setForm] = useState({ name: '', sku: '', category: '', unitOfMeasure: '', description: '', price: '', reorderPoint: '10', reorderQuantity: '50', initialStock: '0', warehouseId: '', locationName: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll({ page: 1, limit: 20, search, status: statusFilter, category: categoryFilter, ...params });
      setProducts(data.data.products);
      setPagination(data.data.pagination);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, [search, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchProducts();
    categoryAPI.getAll().then(({ data }) => setCategories(data.data.categories));
    warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses));
  }, [fetchProducts]);

  const debouncedSearch = useCallback(debounce((val) => {
    setSearch(val);
    fetchProducts({ search: val });
  }, 400), [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await productAPI.create({ ...form, price: Number(form.price), reorderPoint: Number(form.reorderPoint), reorderQuantity: Number(form.reorderQuantity), initialStock: Number(form.initialStock) });
      toast.success('Product created successfully!');
      setShowModal(false);
      setForm({ name: '', sku: '', category: '', unitOfMeasure: '', description: '', price: '', reorderPoint: '10', reorderQuantity: '50', initialStock: '0', warehouseId: '', locationName: '' });
      fetchProducts();
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  const selectedWarehouse = warehouses.find(w => w._id === form.warehouseId);

  return (
    <PageWrapper title="Products" action={{ label: 'Add Product', onClick: () => setShowModal(true) }}>
      <div className="space-y-5">
        {/* Filters */}
        <div className="glass-card p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input className="input-field pl-9" placeholder="Search by name, SKU, barcode..." onChange={e => debouncedSearch(e.target.value)} />
            </div>
            <select className="input-field w-40" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); fetchProducts({ status: e.target.value }); }}>
              <option value="">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <select className="input-field w-44" value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); fetchProducts({ category: e.target.value }); }}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <>
              <Table headers={['Product', 'SKU', 'Category', 'Stock', 'Reorder Point', 'Status', 'Actions']}>
                {products.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-500 text-sm">No products found</td></tr>
                )}
                {products.map(p => (
                  <tr key={p._id} className="table-row">
                    <Td>
                      <div>
                        <p className="font-medium text-white">{p.name}</p>
                        {p.description && <p className="text-xs text-gray-500 truncate max-w-[200px]">{p.description}</p>}
                      </div>
                    </Td>
                    <Td><code className="text-xs bg-surface-100 px-2 py-0.5 rounded text-gray-300">{p.sku}</code></Td>
                    <Td>
                      {p.category && (
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span className="w-2 h-2 rounded-full" style={{ background: p.category.color }} />
                          {p.category.name}
                        </span>
                      )}
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1.5">
                        {p.totalStock <= p.reorderPoint && p.totalStock > 0 && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
                        <span className={p.totalStock === 0 ? 'text-red-400 font-medium' : p.totalStock <= p.reorderPoint ? 'text-yellow-400 font-medium' : 'text-white'}>
                          {p.totalStock.toLocaleString()} {p.unitOfMeasure}
                        </span>
                      </div>
                    </Td>
                    <Td className="text-gray-500">{p.reorderPoint} {p.unitOfMeasure}</Td>
                    <Td><StockBadge status={p.stockStatus} /></Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${p._id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
                  <p className="text-xs text-gray-500">Total: {pagination.total} products</p>
                  <div className="flex gap-2">
                    <button disabled={pagination.page === 1} onClick={() => fetchProducts({ page: pagination.page - 1 })} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Prev</button>
                    <span className="text-xs text-gray-500 flex items-center">{pagination.page} / {pagination.totalPages}</span>
                    <button disabled={pagination.page === pagination.totalPages} onClick={() => fetchProducts({ page: pagination.page + 1 })} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Next</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Product Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product" size="lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Product Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Steel Rod 10mm" required />
            <Input label="SKU / Code *" value={form.sku} onChange={e => setForm(p => ({ ...p, sku: e.target.value.toUpperCase() }))} placeholder="STL-ROD-10MM" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Category *</label>
              <select className="input-field" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} required>
                <option value="">Select category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <Input label="Unit of Measure *" value={form.unitOfMeasure} onChange={e => setForm(p => ({ ...p, unitOfMeasure: e.target.value }))} placeholder="kg, pcs, liters" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Price" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="0.00" min="0" />
            <Input label="Reorder Point" type="number" value={form.reorderPoint} onChange={e => setForm(p => ({ ...p, reorderPoint: e.target.value }))} min="0" />
            <Input label="Reorder Qty" type="number" value={form.reorderQuantity} onChange={e => setForm(p => ({ ...p, reorderQuantity: e.target.value }))} min="0" />
          </div>
          <Input label="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional description..." />
          
          <div className="border-t border-white/5 pt-4">
            <p className="text-sm font-medium text-gray-400 mb-3">Initial Stock (Optional)</p>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Initial Quantity" type="number" value={form.initialStock} onChange={e => setForm(p => ({ ...p, initialStock: e.target.value }))} min="0" />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">Warehouse</label>
                <select className="input-field" value={form.warehouseId} onChange={e => setForm(p => ({ ...p, warehouseId: e.target.value, locationName: '' }))}>
                  <option value="">Select warehouse</option>
                  {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">Location</label>
                <select className="input-field" value={form.locationName} onChange={e => setForm(p => ({ ...p, locationName: e.target.value }))}>
                  <option value="">Select location</option>
                  {selectedWarehouse?.locations?.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
```

### `frontend/app/(dashboard)/receipts/page.js`
```javascript
'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import { receiptAPI } from '@/lib/api';
import { formatDate, getErrorMessage } from '@/lib/utils';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReceiptsPage() {
  const router = useRouter();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchReceipts = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await receiptAPI.getAll({ limit: 50, status: statusFilter, ...params });
      setReceipts(data.data.receipts);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReceipts(); }, [statusFilter]);

  const handleValidate = async (id, e) => {
    e.stopPropagation();
    const loadingToast = toast.loading('Validating receipt...');
    try {
      await receiptAPI.validate(id, {});
      toast.dismiss(loadingToast);
      toast.success('Receipt validated! Stock updated.');
      fetchReceipts();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(getErrorMessage(err));
    }
  };

  const handleCancel = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Cancel this receipt?')) return;
    try {
      await receiptAPI.cancel(id);
      toast.success('Receipt canceled');
      fetchReceipts();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  return (
    <PageWrapper title="Receipts" action={{ label: 'New Receipt', onClick: () => router.push('/receipts/new') }}>
      <div className="space-y-5">
        <div className="glass-card p-4 flex gap-3">
          {['', 'draft', 'waiting', 'ready', 'done', 'canceled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-gray-500 hover:text-white'}`}>
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>

        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <Table headers={['Receipt #', 'Supplier', 'Warehouse', 'Items', 'Status', 'Date', 'Actions']}>
              {receipts.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-gray-500 text-sm">No receipts found</td></tr>}
              {receipts.map(r => (
                <tr key={r._id} className="table-row cursor-pointer" onClick={() => router.push(`/receipts/${r._id}`)}>
                  <Td><code className="text-brand-400 text-xs font-mono">{r.receiptNumber}</code></Td>
                  <Td className="font-medium text-white">{r.supplier}</Td>
                  <Td>{r.warehouse?.name}</Td>
                  <Td>{r.lineItems?.length} product(s)</Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td>{formatDate(r.createdAt)}</Td>
                  <Td>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <Link href={`/receipts/${r._id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      {['draft', 'waiting', 'ready'].includes(r.status) && (
                        <>
                          <button onClick={e => handleValidate(r._id, e)} className="p-1.5 rounded-lg hover:bg-green-500/10 text-gray-500 hover:text-green-400 transition-colors" title="Validate">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={e => handleCancel(r._id, e)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors" title="Cancel">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
```

### `frontend/app/(dashboard)/receipts/new/page.js`
```javascript
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import Input from '@/components/ui/Input';
import { receiptAPI, productAPI, warehouseAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Plus, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewReceiptPage() {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ supplier: '', warehouseId: '', locationName: '', scheduledDate: '', note: '' });
  const [lineItems, setLineItems] = useState([{ product: '', expectedQuantity: 1, unitOfMeasure: '' }]);

  useEffect(() => {
    warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses));
  }, []);

  useEffect(() => {
    if (productSearch.length >= 1) {
      productAPI.getAll({ search: productSearch, limit: 10 }).then(({ data }) => setProducts(data.data.products));
    }
  }, [productSearch]);

  const selectedWarehouse = warehouses.find(w => w._id === form.warehouseId);

  const addLineItem = () => setLineItems(p => [...p, { product: '', expectedQuantity: 1, unitOfMeasure: '' }]);
  const removeLineItem = (i) => setLineItems(p => p.filter((_, idx) => idx !== i));
  const updateLineItem = (i, field, value) => setLineItems(p => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const selectProduct = (i, product) => {
    updateLineItem(i, 'product', product._id);
    updateLineItem(i, 'unitOfMeasure', product.unitOfMeasure);
    setLineItems(p => p.map((item, idx) => idx === i ? { ...item, product: product._id, unitOfMeasure: product.unitOfMeasure, _productName: product.name, _productSku: product.sku } : item));
    setProductSearch('');
    setProducts([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.supplier || !form.warehouseId || !form.locationName) return toast.error('Please fill all required fields');
    if (lineItems.some(l => !l.product || l.expectedQuantity < 1)) return toast.error('All line items must have a product and quantity');
    setSubmitting(true);
    try {
      await receiptAPI.create({ supplier: form.supplier, warehouse: form.warehouseId, locationName: form.locationName, scheduledDate: form.scheduledDate || undefined, note: form.note, lineItems: lineItems.map(l => ({ product: l.product, expectedQuantity: Number(l.expectedQuantity), unitOfMeasure: l.unitOfMeasure })) });
      toast.success('Receipt created!');
      router.push('/receipts');
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  return (
    <PageWrapper title="New Receipt">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-white">Receipt Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Supplier *" value={form.supplier} onChange={e => setForm(p => ({ ...p, supplier: e.target.value }))} placeholder="Vendor / Supplier name" required />
            <Input label="Scheduled Date" type="date" value={form.scheduledDate} onChange={e => setForm(p => ({ ...p, scheduledDate: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Destination Warehouse *</label>
              <select className="input-field" value={form.warehouseId} onChange={e => setForm(p => ({ ...p, warehouseId: e.target.value, locationName: '' }))} required>
                <option value="">Select warehouse</option>
                {warehouses.map(w => <option key={w._id} value={w._id}>{w.name} ({w.code})</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Location *</label>
              <select className="input-field" value={form.locationName} onChange={e => setForm(p => ({ ...p, locationName: e.target.value }))} required disabled={!form.warehouseId}>
                <option value="">Select location</option>
                {selectedWarehouse?.locations?.map(l => <option key={l._id} value={l.name}>{l.name} ({l.code})</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">Note</label>
            <textarea className="input-field resize-none" rows={2} value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Optional note..." />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Products to Receive</h2>
            <button type="button" onClick={addLineItem} className="btn-secondary flex items-center gap-1.5 text-sm py-1.5">
              <Plus className="w-3.5 h-3.5" /> Add Product
            </button>
          </div>

          <div className="space-y-3">
            {lineItems.map((item, i) => (
              <div key={i} className="bg-surface-100 rounded-xl p-4 space-y-3 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Item #{i + 1}</span>
                  {lineItems.length > 1 && (
                    <button type="button" onClick={() => removeLineItem(i)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {item._productName ? (
                  <div className="flex items-center justify-between bg-surface-200 rounded-lg px-3 py-2">
                    <div>
                      <p className="text-sm text-white font-medium">{item._productName}</p>
                      <p className="text-xs text-gray-500">{item._productSku}</p>
                    </div>
                    <button type="button" onClick={() => setLineItems(p => p.map((l, idx) => idx === i ? { product: '', expectedQuantity: l.expectedQuantity, unitOfMeasure: '' } : l))} className="text-xs text-gray-500 hover:text-white">Change</button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-9" placeholder="Search product by name or SKU..." value={i === lineItems.length - 1 ? productSearch : ''} onChange={e => { setProductSearch(e.target.value); }} onFocus={() => setProductSearch('')} />
                    {products.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-surface-50 border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        {products.map(p => (
                          <button key={p._id} type="button" onClick={() => selectProduct(i, p)} className="w-full text-left px-4 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                            <p className="text-sm text-white">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.sku} · Stock: {p.totalStock} {p.unitOfMeasure}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Expected Quantity *" type="number" value={item.expectedQuantity} onChange={e => updateLineItem(i, 'expectedQuantity', e.target.value)} min={1} required />
                  <Input label="Unit of Measure" value={item.unitOfMeasure} onChange={e => updateLineItem(i, 'unitOfMeasure', e.target.value)} placeholder="kg, pcs..." />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">Cancel</button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {submitting ? 'Creating...' : 'Create Receipt'}
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}
```

### `frontend/app/(dashboard)/ledger/page.js`
```javascript
'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { PageLoader } from '@/components/ui/Spinner';
import { ledgerAPI, productAPI, warehouseAPI } from '@/lib/api';
import { formatDateTime, getMovementColor, getErrorMessage } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowLeftRight, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const movementIcons = { IN: ArrowDown, OUT: ArrowUp, TRANSFER_IN: ArrowLeftRight, TRANSFER_OUT: ArrowLeftRight, ADJUSTMENT: Edit };

export default function LedgerPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [filters, setFilters] = useState({ operationType: '', startDate: '', endDate: '', search: '' });

  const fetchLedger = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await ledgerAPI.getAll({ page: 1, limit: 50, ...filters, ...params });
      setEntries(data.data.entries);
      setPagination(data.data.pagination);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLedger(); }, []);

  return (
    <PageWrapper title="Stock Ledger">
      <div className="space-y-5">
        {/* Filters */}
        <div className="glass-card p-4">
          <div className="flex flex-wrap gap-3">
            <input className="input-field w-48" placeholder="Reference number..." value={filters.search} onChange={e => setFilters(p => ({ ...p, search: e.target.value }))} />
            <select className="input-field w-40" value={filters.operationType} onChange={e => setFilters(p => ({ ...p, operationType: e.target.value }))}>
              <option value="">All Types</option>
              <option value="RECEIPT">Receipt</option>
              <option value="DELIVERY">Delivery</option>
              <option value="TRANSFER">Transfer</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
            <input className="input-field w-40" type="date" value={filters.startDate} onChange={e => setFilters(p => ({ ...p, startDate: e.target.value }))} placeholder="From date" />
            <input className="input-field w-40" type="date" value={filters.endDate} onChange={e => setFilters(p => ({ ...p, endDate: e.target.value }))} />
            <button onClick={() => fetchLedger({ ...filters })} className="btn-primary text-sm py-2 px-4">Apply Filters</button>
            <button onClick={() => { setFilters({ operationType: '', startDate: '', endDate: '', search: '' }); fetchLedger({}); }} className="btn-secondary text-sm py-2 px-4">Reset</button>
          </div>
        </div>

        <div className="glass-card">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white">Movement Log</h3>
            <span className="text-xs text-gray-500">{pagination.total} total entries</span>
          </div>
          {loading ? <PageLoader /> : (
            <Table headers={['Reference', 'Product', 'Type', 'Movement', 'Before', 'Change', 'After', 'Warehouse', 'Performed By', 'Date']}>
              {entries.length === 0 && <tr><td colSpan={10} className="text-center py-12 text-gray-500 text-sm">No ledger entries yet</td></tr>}
              {entries.map(e => {
                const Icon = movementIcons[e.movementType] || Edit;
                const color = getMovementColor(e.movementType);
                const sign = e.quantityChanged >= 0 ? '+' : '';
                return (
                  <tr key={e._id} className="table-row">
                    <Td><code className="text-xs text-brand-400 font-mono">{e.referenceNumber}</code></Td>
                    <Td>
                      <div>
                        <p className="text-white font-medium text-sm">{e.product?.name}</p>
                        <p className="text-xs text-gray-500">{e.product?.sku}</p>
                      </div>
                    </Td>
                    <Td>
                      <span className="text-xs bg-surface-100 px-2 py-0.5 rounded text-gray-400">{e.operationType}</span>
                    </Td>
                    <Td>
                      <div className={`flex items-center gap-1.5 ${color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-xs">{e.movementType.replace('_', ' ')}</span>
                      </div>
                    </Td>
                    <Td className="text-gray-500 tabular-nums">{e.quantityBefore.toLocaleString()}</Td>
                    <Td className={`font-bold tabular-nums ${color}`}>{sign}{e.quantityChanged.toLocaleString()}</Td>
                    <Td className="text-white tabular-nums font-medium">{e.quantityAfter.toLocaleString()}</Td>
                    <Td>
                      <div>
                        <p className="text-white text-sm">{e.warehouse?.name}</p>
                        <p className="text-xs text-gray-500">{e.locationName}</p>
                      </div>
                    </Td>
                    <Td>{e.performedBy?.name}</Td>
                    <Td className="text-gray-500 text-xs">{formatDateTime(e.createdAt)}</Td>
                  </tr>
                );
              })}
            </Table>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
```

### `frontend/app/(auth)/login/page.js`
```javascript
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/utils';
import { Eye, EyeOff, Boxes, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Boxes className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CoreInventory</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field pl-9" placeholder="you@company.com" required autoComplete="email" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand-400 hover:text-brand-300">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="input-field pl-9 pr-10" placeholder="••••••••" required autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 text-base">
              {loading ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full" /> Signing in...</> : 'Sign in'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-brand-400 hover:text-brand-300">Create one</Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-gray-600">CoreInventory © 2025 · All rights reserved</p>
      </div>
    </div>
  );
}
```

### `frontend/app/(auth)/register/page.js`
```javascript
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/utils';
import { Eye, EyeOff, Boxes } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created!');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4"><Boxes className="w-6 h-6 text-white" /></div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-500 mt-1 text-sm">Join CoreInventory</p>
        </div>
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Full Name</label>
              <input className="input-field" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" required />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input type="email" className="input-field" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" required />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="input-field pr-10" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min. 6 characters" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Role</label>
              <select className="input-field" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                <option value="staff">Warehouse Staff</option>
                <option value="manager">Inventory Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-2">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center mt-5 text-sm text-gray-500">Already have an account? <Link href="/login" className="text-brand-400 hover:text-brand-300">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
```

### `frontend/app/(auth)/forgot-password/page.js`
```javascript
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Boxes, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: email, 2: otp + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await authAPI.resetPassword({ email, otp, newPassword });
      toast.success('Password reset! Please login.');
      router.push('/login');
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4"><Boxes className="w-6 h-6 text-white" /></div>
          <h1 className="text-2xl font-bold text-white">{step === 1 ? 'Forgot Password' : 'Enter OTP'}</h1>
          <p className="text-gray-500 mt-1 text-sm">{step === 1 ? 'Enter your email to receive an OTP' : `Check your email for the OTP`}</p>
        </div>
        <div className="glass-card p-8">
          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" className="input-field pl-9" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? 'Sending...' : 'Send OTP'}</button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">OTP Code</label>
                <input className="input-field text-center text-xl tracking-[0.5em] font-mono" value={otp} onChange={e => setOtp(e.target.value)} placeholder="000000" maxLength={6} required />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">New Password</label>
                <input type="password" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 6 characters" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? 'Resetting...' : 'Reset Password'}</button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 hover:text-white flex items-center justify-center gap-1 mt-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </form>
          )}
          <p className="text-center mt-5 text-sm text-gray-500"><Link href="/login" className="text-brand-400 hover:text-brand-300">Back to login</Link></p>
        </div>
      </div>
    </div>
  );
}
```

### `frontend/app/(dashboard)/warehouses/page.js`
```javascript
'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { warehouseAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { Warehouse, MapPin, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', address: '', locations: [{ name: '', code: '', description: '' }] });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses)).catch(e => toast.error(getErrorMessage(e))).finally(() => setLoading(false));
  }, []);

  const addLocation = () => setForm(p => ({ ...p, locations: [...p.locations, { name: '', code: '', description: '' }] }));
  const updateLocation = (i, field, val) => setForm(p => ({ ...p, locations: p.locations.map((l, idx) => idx === i ? { ...l, [field]: val } : l) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await warehouseAPI.create(form);
      setWarehouses(prev => [...prev, data.data.warehouse]);
      toast.success('Warehouse created!');
      setShowModal(false);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  return (
    <PageWrapper title="Warehouses" action={{ label: 'Add Warehouse', onClick: () => setShowModal(true) }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {warehouses.map(w => (
          <div key={w._id} className="glass-card p-5 hover:border-white/10 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                <Warehouse className="w-5 h-5 text-brand-400" />
              </div>
              <code className="text-xs bg-surface-100 px-2 py-1 rounded text-gray-400">{w.code}</code>
            </div>
            <h3 className="font-semibold text-white mb-1">{w.name}</h3>
            {w.address && <p className="text-xs text-gray-500 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{w.address}</p>}
            <div className="border-t border-white/5 pt-3 mt-3">
              <p className="text-xs text-gray-500 mb-2">Locations ({w.locations?.length || 0})</p>
              <div className="flex flex-wrap gap-1.5">
                {w.locations?.map(l => (
                  <span key={l._id} className="text-xs bg-surface-100 border border-white/5 px-2 py-0.5 rounded text-gray-400">{l.name}</span>
                ))}
                {(!w.locations || w.locations.length === 0) && <span className="text-xs text-gray-600">No locations configured</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Warehouse" size="md">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Warehouse Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Main Warehouse" required />
            <Input label="Code *" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="WH-MAIN" required />
          </div>
          <Input label="Address" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Street, City, State" />
          
          <div className="border-t border-white/5 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-400">Locations</label>
              <button type="button" onClick={addLocation} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"><Plus className="w-3 h-3" />Add</button>
            </div>
            <div className="space-y-2">
              {form.locations.map((l, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-surface-100 rounded-lg">
                  <Input label="Name" value={l.name} onChange={e => updateLocation(i, 'name', e.target.value)} placeholder="Rack A" />
                  <Input label="Code" value={l.code} onChange={e => updateLocation(i, 'code', e.target.value.toUpperCase())} placeholder="RACK-A" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">{submitting ? 'Creating...' : 'Create Warehouse'}</button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
```

Now create the remaining pages — Deliveries, Transfers, and Adjustments — following the exact same patterns as Receipts.

For `frontend/app/(dashboard)/deliveries/page.js` — mirror receipts page but use `deliveryAPI`, show customer instead of supplier, and use `deliveryNumber`.

For `frontend/app/(dashboard)/deliveries/new/page.js` — mirror receipt new page but for deliveries (customer field instead of supplier).

For `frontend/app/(dashboard)/transfers/page.js` — show `fromWarehouse → toWarehouse`, `transferNumber`, validate button.

For `frontend/app/(dashboard)/transfers/new/page.js` — two warehouse+location selectors (from/to), line items.

For `frontend/app/(dashboard)/adjustments/page.js` — show adjustment list, validate button.

For `frontend/app/(dashboard)/adjustments/new/page.js` — product selector, warehouse, location, counted quantity fields.

For `frontend/app/(dashboard)/profile/page.js` — show user info, change password form.

---

## README.md — WRITE THIS COMPLETELY

```markdown
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
```

---

## FINAL INSTRUCTION TO WINDSURF

After generating all the above files:

1. Run `cd backend && npm install && npm run dev` in one terminal
2. Run `cd frontend && npm install && npm run dev` in another terminal
3. Open `http://localhost:3000`
4. Register a new user, create a warehouse with locations, create categories, then create products
5. Test the full flow: Receipt → Transfer → Delivery → Adjustment → check Ledger

Make sure every file is created exactly as specified. Do not skip any file. If any import is missing, add it. All code must run without errors on first boot.
```

---

> **END OF PROMPT — PASTE EVERYTHING ABOVE INTO WINDSURF**
