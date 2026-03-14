const mongoose = require('mongoose');
const DeliveryOrder = require('../models/DeliveryOrder');
const { updateStock } = require('../services/stock.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS, OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');

const getDeliveries = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) query.$or = [{ deliveryNumber: { $regex: search, $options: 'i' } }, { customer: { $regex: search, $options: 'i' } }];
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [deliveries, total] = await Promise.all([
      DeliveryOrder.find(query).populate('warehouse', 'name code').populate('lineItems.product', 'name sku').populate('createdBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      DeliveryOrder.countDocuments(query),
    ]);
    return successResponse(res, { deliveries, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
};

const createDelivery = async (req, res, next) => {
  try {
    const { customer, warehouse, locationName, lineItems, scheduledDate, shippingAddress, note } = req.body;
    const delivery = await DeliveryOrder.create({ customer, warehouse, locationName, lineItems, scheduledDate, shippingAddress, note, status: STATUS.DRAFT, createdBy: req.user._id });
    return successResponse(res, { delivery }, 'Delivery order created', 201);
  } catch (err) { next(err); }
};

const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await DeliveryOrder.findById(req.params.id).populate('warehouse', 'name code locations').populate('lineItems.product', 'name sku unitOfMeasure totalStock').populate('createdBy', 'name email').populate('validatedBy', 'name email');
    if (!delivery) return errorResponse(res, 'Delivery order not found.', 404);
    return successResponse(res, { delivery });
  } catch (err) { next(err); }
};

const validateDelivery = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const delivery = await DeliveryOrder.findById(req.params.id).session(session).populate('lineItems.product');
    if (!delivery) { await session.abortTransaction(); return errorResponse(res, 'Delivery not found.', 404); }
    if (delivery.status === STATUS.DONE) { await session.abortTransaction(); return errorResponse(res, 'Already validated.', 400); }

    for (const item of delivery.lineItems) {
      await updateStock(session, {
        productId: item.product._id,
        warehouseId: delivery.warehouse,
        locationName: delivery.locationName,
        quantity: item.quantity,
        movementType: MOVEMENT_TYPES.OUT,
        operationType: OPERATION_TYPES.DELIVERY,
        referenceId: delivery._id,
        referenceNumber: delivery.deliveryNumber,
        note: delivery.note,
        userId: req.user._id,
      });
    }

    delivery.status = STATUS.DONE;
    delivery.validatedAt = new Date();
    delivery.validatedBy = req.user._id;
    await delivery.save({ session });
    await session.commitTransaction();
    return successResponse(res, { delivery }, 'Delivery validated. Stock decreased.');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const delivery = await DeliveryOrder.findById(req.params.id);
    if (!delivery) return errorResponse(res, 'Delivery not found.', 404);
    if ([STATUS.DONE, STATUS.CANCELED].includes(delivery.status)) return errorResponse(res, 'Cannot modify completed/canceled delivery.', 400);
    delivery.status = status;
    if (status === STATUS.READY) delivery.pickedAt = new Date();
    await delivery.save();
    return successResponse(res, { delivery }, 'Status updated');
  } catch (err) { next(err); }
};

const cancelDelivery = async (req, res, next) => {
  try {
    const delivery = await DeliveryOrder.findById(req.params.id);
    if (!delivery) return errorResponse(res, 'Delivery not found.', 404);
    if (delivery.status === STATUS.DONE) return errorResponse(res, 'Validated deliveries cannot be canceled.', 400);
    delivery.status = STATUS.CANCELED;
    await delivery.save();
    return successResponse(res, { delivery }, 'Delivery canceled');
  } catch (err) { next(err); }
};

module.exports = { getDeliveries, createDelivery, getDeliveryById, validateDelivery, updateDeliveryStatus, cancelDelivery };
