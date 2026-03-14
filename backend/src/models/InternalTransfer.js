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
