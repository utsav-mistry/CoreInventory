const mongoose = require('mongoose');
const Product = require('../models/Product');
const Receipt = require('../models/Receipt');
const DeliveryOrder = require('../models/DeliveryOrder');
const InternalTransfer = require('../models/InternalTransfer');
const StockLedger = require('../models/StockLedger');
const { successResponse } = require('../utils/apiResponse');
const { STATUS } = require('../config/constants');

const getDashboardStats = async (req, res, next) => {
  try {
    const { warehouse } = req.query;
    
    // Base filters
    const productFilter = { isActive: true };
    const docFilter = {};
    const ledgerFilter = {};
    const transferFilter = {};

    if (warehouse) {
      const warehouseId = new mongoose.Types.ObjectId(warehouse);
      productFilter['stockByLocation.warehouse'] = warehouseId;
      docFilter.warehouse = warehouseId;
      ledgerFilter.warehouse = warehouseId;
      transferFilter.$or = [{ fromWarehouse: warehouseId }, { toWarehouse: warehouseId }];
    }

    const [
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      pendingReceipts,
      pendingDeliveries,
      scheduledTransfers,
      recentActivity,
      stockByCategory,
    ] = await Promise.all([
      Product.countDocuments(productFilter),
      Product.countDocuments({ 
        ...productFilter, 
        $expr: { $and: [{ $gt: ['$totalStock', 0] }, { $lte: ['$totalStock', '$reorderPoint'] }] } 
      }),
      Product.countDocuments({ ...productFilter, totalStock: 0 }),
      Receipt.countDocuments({ 
        ...docFilter, 
        status: { $in: [STATUS.DRAFT, STATUS.WAITING, STATUS.READY] } 
      }),
      DeliveryOrder.countDocuments({ 
        ...docFilter, 
        status: { $in: [STATUS.DRAFT, STATUS.WAITING, STATUS.READY] } 
      }),
      InternalTransfer.countDocuments({ 
        ...transferFilter, 
        status: { $in: [STATUS.DRAFT, STATUS.WAITING, STATUS.READY] } 
      }),
      StockLedger.find(ledgerFilter).sort({ createdAt: -1 }).limit(10)
        .populate('product', 'name sku')
        .populate('warehouse', 'name')
        .populate('performedBy', 'name'),
      Product.aggregate([
        { $match: productFilter },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            totalStock: { $sum: '$totalStock' }
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'categoryInfo'
          }
        },
        { $unwind: '$categoryInfo' },
        {
          $project: {
            name: '$categoryInfo.name',
            color: '$categoryInfo.color',
            count: 1,
            totalStock: 1
          }
        }
      ])
    ]);

    // Stock movement trend (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const stockTrend = await StockLedger.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo }, ...ledgerFilter } },
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
      stockByCategory,
    });
  } catch (err) { next(err); }
};

module.exports = { getDashboardStats };
