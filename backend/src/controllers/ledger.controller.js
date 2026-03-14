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
