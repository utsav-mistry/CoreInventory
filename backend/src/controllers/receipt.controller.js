const mongoose = require('mongoose');
const Receipt = require('../models/Receipt');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS } = require('../config/constants');
const { OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getReceipts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) query.$or = [
      { receiptNumber: { $regex: search, $options: 'i' } },
      { supplier: { $regex: search, $options: 'i' } },
    ];
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [receipts, total] = await Promise.all([
      Receipt.find(query).populate('warehouse', 'name code').populate('lineItems.product', 'name sku').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Receipt.countDocuments(query),
    ]);
    return successResponse(res, { receipts, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const getReceiptById = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate('warehouse', 'name code locations')
      .populate('lineItems.product', 'name sku unitOfMeasure totalStock')
      .populate('createdBy', 'name email')
      .populate('validatedBy', 'name email');
    if (!receipt) return errorResponse(res, 'Receipt not found.', 404);
    return successResponse(res, { receipt });
  } catch (err) { next(err); }
};

const createReceipt = async (req, res, next) => {
  try {
    const { supplier, warehouse, locationName, lineItems, scheduledDate, note } = req.body;
    const receipt = await Receipt.create({
      supplier, warehouse, locationName, lineItems, scheduledDate, note,
      status: STATUS.DRAFT,
      createdBy: req.user._id,
    });
    return successResponse(res, { receipt }, 'Receipt created', 201);
  } catch (err) { next(err); }
};

const updateReceiptStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return errorResponse(res, 'Receipt not found.', 404);
    if (receipt.status === STATUS.DONE) return errorResponse(res, 'Validated receipts cannot be modified.', 400);
    if (receipt.status === STATUS.CANCELED) return errorResponse(res, 'Canceled receipts cannot be modified.', 400);
    receipt.status = status;
    await receipt.save();
    return successResponse(res, { receipt }, 'Status updated');
  } catch (err) { next(err); }
};

const validateReceipt = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const receipt = await Receipt.findById(req.params.id).session(session).populate('lineItems.product');
    if (!receipt) { await session.abortTransaction(); return errorResponse(res, 'Receipt not found.', 404); }
    if (receipt.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }
    if (receipt.status === STATUS.CANCELED) { await session.abortTransaction(); return errorResponse(res, 'Cannot validate a canceled receipt.', 400); }

    for (const item of receipt.lineItems) {
      const receivedQty = req.body.lineItems?.find(l => l._id === item._id.toString())?.receivedQuantity ?? item.expectedQuantity;
      item.receivedQuantity = receivedQty;
      if (receivedQty > 0) {
        await updateStock(session, {
          productId: item.product._id,
          warehouseId: receipt.warehouse,
          locationName: receipt.locationName,
          quantity: receivedQty,
          movementType: MOVEMENT_TYPES.IN,
          operationType: OPERATION_TYPES.RECEIPT,
          referenceId: receipt._id,
          referenceNumber: receipt.receiptNumber,
          note: receipt.note,
          userId: req.user._id,
        });
      }
    }

    receipt.status = STATUS.DONE;
    receipt.validatedAt = new Date();
    receipt.validatedBy = req.user._id;
    await receipt.save({ session });
    await session.commitTransaction();

    return successResponse(res, { receipt }, 'Receipt validated. Stock updated.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

const cancelReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return errorResponse(res, 'Receipt not found.', 404);
    if (receipt.status === STATUS.DONE) return errorResponse(res, 'Validated receipts cannot be canceled.', 400);
    receipt.status = STATUS.CANCELED;
    await receipt.save();
    return successResponse(res, { receipt }, 'Receipt canceled');
  } catch (err) { next(err); }
};

module.exports = { getReceipts, getReceiptById, createReceipt, updateReceiptStatus, validateReceipt, cancelReceipt };
