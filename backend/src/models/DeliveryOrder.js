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
