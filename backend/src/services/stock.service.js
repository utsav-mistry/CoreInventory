const Product = require('../models/Product');
const StockLedger = require('../models/StockLedger');
const { OPERATION_TYPES, MOVEMENT_TYPES } = require('../config/constants');
const mongoose = require('mongoose');

/**
 * Core function: update stock for a product at a specific location
 * Handles IN, OUT, TRANSFER_IN, TRANSFER_OUT, ADJUSTMENT
 */
const updateStock = async (session, {
  productId,
  warehouseId,
  locationName,
  quantity,
  movementType,
  operationType,
  referenceId,
  referenceNumber,
  note,
  userId,
}) => {
  const product = await Product.findById(productId).session(session);
  if (!product) throw new Error(`Product ${productId} not found`);

  // Find or create the stock by location entry
  let locStock = product.stockByLocation.find(
    l => l.warehouse.toString() === warehouseId.toString() && l.locationName === locationName
  );

  const quantityBefore = locStock ? locStock.quantity : 0;
  let quantityAfter;

  if ([MOVEMENT_TYPES.IN, MOVEMENT_TYPES.TRANSFER_IN].includes(movementType)) {
    if (locStock) {
      locStock.quantity += quantity;
    } else {
      product.stockByLocation.push({ warehouse: warehouseId, locationName, quantity });
    }
    product.totalStock += quantity;
    quantityAfter = quantityBefore + quantity;
  } else if ([MOVEMENT_TYPES.OUT, MOVEMENT_TYPES.TRANSFER_OUT].includes(movementType)) {
    if (!locStock || locStock.quantity < quantity) {
      throw new Error(`Insufficient stock for ${product.name}. Available: ${locStock ? locStock.quantity : 0}, Requested: ${quantity}`);
    }
    locStock.quantity -= quantity;
    product.totalStock -= quantity;
    quantityAfter = quantityBefore - quantity;
  } else if (movementType === MOVEMENT_TYPES.ADJUSTMENT) {
    const newQty = quantity; // quantity IS the counted quantity for adjustments
    const diff = newQty - quantityBefore;
    if (locStock) {
      locStock.quantity = newQty;
    } else {
      product.stockByLocation.push({ warehouse: warehouseId, locationName, quantity: newQty });
    }
    product.totalStock += diff;
    quantityAfter = newQty;
  }

  await product.save({ session });

  // Create ledger entry
  await StockLedger.create([{
    product: productId,
    warehouse: warehouseId,
    locationName,
    operationType,
    movementType,
    referenceId,
    referenceNumber,
    quantityBefore,
    quantityChanged: movementType === MOVEMENT_TYPES.ADJUSTMENT ? (quantityAfter - quantityBefore) : (
      [MOVEMENT_TYPES.IN, MOVEMENT_TYPES.TRANSFER_IN].includes(movementType) ? quantity : -quantity
    ),
    quantityAfter,
    note,
    performedBy: userId,
  }], { session });

  return { quantityBefore, quantityAfter, product };
};

module.exports = { updateStock };
