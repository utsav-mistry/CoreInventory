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
    
    const product = new Product({ name, sku, barcode, category, unitOfMeasure, description, price, reorderPoint, reorderQuantity, createdBy: req.user._id });
    
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
    const { warehouse, category } = req.query;
    const query = {
      isActive: true,
      $expr: { $lte: ['$totalStock', '$reorderPoint'] },
    };
    
    if (warehouse) query['stockByLocation.warehouse'] = warehouse;
    if (category) query.category = category;

    const products = await Product.find(query)
      .populate('category', 'name color')
      .populate('stockByLocation.warehouse', 'name code')
      .sort({ totalStock: 1 });
      
    // Calculate replenishment suggestions
    const suggestions = products.map(p => ({
      _id: p._id,
      name: p.name,
      sku: p.sku,
      currentStock: p.totalStock,
      reorderPoint: p.reorderPoint,
      suggestedOrder: Math.max(p.reorderQuantity, (p.reorderPoint * 2) - p.totalStock),
      unitOfMeasure: p.unitOfMeasure,
      category: p.category
    }));

    return successResponse(res, { products: suggestions });
  } catch (err) { next(err); }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockProducts };
