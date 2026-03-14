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
