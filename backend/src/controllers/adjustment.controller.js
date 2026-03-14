const mongoose = require('mongoose');
const StockAdjustment = require('../models/StockAdjustment');
const Product = require('../models/Product');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS, OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getAdjustments = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [adjustments, total] = await Promise.all([
      StockAdjustment.find(query).populate('lineItems.product', 'name sku').populate('lineItems.warehouse', 'name').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      StockAdjustment.countDocuments(query),
    ]);
    return successResponse(res, { adjustments, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const createAdjustment = async (req, res, next) => {
  try {
    const { lineItems, note } = req.body;
    // Auto-fill systemQuantity from current product stock
    const enrichedItems = await Promise.all(lineItems.map(async (item) => {
      const product = await Product.findById(item.product);
      const locStock = product?.stockByLocation?.find(
        l => l.warehouse.toString() === item.warehouse && l.locationName === item.locationName
      );
      return { ...item, systemQuantity: locStock?.quantity ?? 0, difference: item.countedQuantity - (locStock?.quantity ?? 0) };
    }));
    const adjustment = await StockAdjustment.create({ lineItems: enrichedItems, note, status: STATUS.DRAFT, createdBy: req.user._id });
    return successResponse(res, { adjustment }, 'Adjustment created', 201);
  } catch (err) { next(err); }
};

const validateAdjustment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const adjustment = await StockAdjustment.findById(req.params.id).session(session);
    if (!adjustment) { await session.abortTransaction(); return errorResponse(res, 'Adjustment not found.', 404); }
    if (adjustment.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }

    for (const item of adjustment.lineItems) {
      await updateStock(session, {
        productId: item.product,
        warehouseId: item.warehouse,
        locationName: item.locationName,
        quantity: item.countedQuantity,
        movementType: MOVEMENT_TYPES.ADJUSTMENT,
        operationType: OPERATION_TYPES.ADJUSTMENT,
        referenceId: adjustment._id,
        referenceNumber: adjustment.adjustmentNumber,
        note: item.reason || adjustment.note,
        userId: req.user._id,
      });
    }

    adjustment.status = STATUS.DONE;
    adjustment.validatedAt = new Date();
    adjustment.validatedBy = req.user._id;
    await adjustment.save({ session });
    await session.commitTransaction();
    return successResponse(res, { adjustment }, 'Adjustment validated. Stock synchronized.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

module.exports = { getAdjustments, createAdjustment, validateAdjustment };
