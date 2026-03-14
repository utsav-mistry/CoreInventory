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
