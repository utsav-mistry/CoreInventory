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
