const Warehouse = require('../models/Warehouse');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getWarehouses = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find({ isActive: true }).sort({ name: 1 });
    return successResponse(res, { warehouses });
  } catch (err) { next(err); }
};

const getWarehouseById = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return errorResponse(res, 'Warehouse not found', 404);
    return successResponse(res, { warehouse });
  } catch (err) { next(err); }
};

const createWarehouse = async (req, res, next) => {
  try {
    const { name, code, address, locations } = req.body;
    const warehouse = await Warehouse.create({ name, code, address, locations, createdBy: req.user._id });
    return successResponse(res, { warehouse }, 'Warehouse created', 201);
  } catch (err) { next(err); }
};

const updateWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!warehouse) return errorResponse(res, 'Warehouse not found.', 404);
    return successResponse(res, { warehouse }, 'Warehouse updated');
  } catch (err) { next(err); }
};

const addLocation = async (req, res, next) => {
  try {
    const { name, code, description } = req.body;
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, { $push: { locations: { name, code, description } } }, { new: true });
    if (!warehouse) return errorResponse(res, 'Warehouse not found.', 404);
    return successResponse(res, { warehouse }, 'Location added');
  } catch (err) { next(err); }
};

module.exports = { getWarehouses, getWarehouseById, createWarehouse, updateWarehouse, addLocation };
