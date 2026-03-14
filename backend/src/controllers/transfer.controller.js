const mongoose = require('mongoose');
const InternalTransfer = require('../models/InternalTransfer');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS, OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getTransfers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [transfers, total] = await Promise.all([
      InternalTransfer.find(query).populate('fromWarehouse', 'name code').populate('toWarehouse', 'name code').populate('lineItems.product', 'name sku').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      InternalTransfer.countDocuments(query),
    ]);
    return successResponse(res, { transfers, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const createTransfer = async (req, res, next) => {
  try {
    const { fromWarehouse, fromLocation, toWarehouse, toLocation, lineItems, scheduledDate, reason, note } = req.body;
    if (fromWarehouse === toWarehouse && fromLocation === toLocation) {
      return errorResponse(res, 'Source and destination cannot be the same.', 400);
    }
    const transfer = await InternalTransfer.create({ fromWarehouse, fromLocation, toWarehouse, toLocation, lineItems, scheduledDate, reason, note, status: STATUS.DRAFT, createdBy: req.user._id });
    return successResponse(res, { transfer }, 'Transfer created', 201);
  } catch (err) { next(err); }
};

const getTransferById = async (req, res, next) => {
  try {
    const transfer = await InternalTransfer.findById(req.params.id).populate('fromWarehouse', 'name code').populate('toWarehouse', 'name code').populate('lineItems.product', 'name sku unitOfMeasure totalStock').populate('createdBy', 'name email').populate('validatedBy', 'name email');
    if (!transfer) return errorResponse(res, 'Transfer not found.', 404);
    return successResponse(res, { transfer });
  } catch (err) { next(err); }
};

const validateTransfer = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const transfer = await InternalTransfer.findById(req.params.id).session(session).populate('lineItems.product');
    if (!transfer) { await session.abortTransaction(); return errorResponse(res, 'Transfer not found.', 404); }
    if (transfer.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }

    for (const item of transfer.lineItems) {
      // Move OUT from source
      await updateStock(session, {
        productId: item.product._id,
        warehouseId: transfer.fromWarehouse,
        locationName: transfer.fromLocation,
        quantity: item.quantity,
        movementType: MOVEMENT_TYPES.TRANSFER_OUT,
        operationType: OPERATION_TYPES.TRANSFER,
        referenceId: transfer._id,
        referenceNumber: transfer.transferNumber,
        note: `Transfer to ${transfer.toLocation}`,
        userId: req.user._id,
      });
      // Move IN to destination
      await updateStock(session, {
        productId: item.product._id,
        warehouseId: transfer.toWarehouse,
        locationName: transfer.toLocation,
        quantity: item.quantity,
        movementType: MOVEMENT_TYPES.TRANSFER_IN,
        operationType: OPERATION_TYPES.TRANSFER,
        referenceId: transfer._id,
        referenceNumber: transfer.transferNumber,
        note: `Transfer from ${transfer.fromLocation}`,
        userId: req.user._id,
      });
    }

    transfer.status = STATUS.DONE;
    transfer.validatedAt = new Date();
    transfer.validatedBy = req.user._id;
    await transfer.save({ session });
    await session.commitTransaction();
    return successResponse(res, { transfer }, 'Transfer validated. Locations updated.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

module.exports = { getTransfers, createTransfer, getTransferById, validateTransfer };
