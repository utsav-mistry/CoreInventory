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
