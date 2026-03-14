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
