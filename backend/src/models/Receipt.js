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
