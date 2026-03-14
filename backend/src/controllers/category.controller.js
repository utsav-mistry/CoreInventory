const Category = require('../models/Category');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    return successResponse(res, { categories });
  } catch (err) { next(err); }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;
    const category = await Category.create({ name, description, color, createdBy: req.user._id });
    return successResponse(res, { category }, 'Category created', 201);
  } catch (err) { next(err); }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return errorResponse(res, 'Category not found.', 404);
    return successResponse(res, { category }, 'Category updated');
  } catch (err) { next(err); }
};

module.exports = { getCategories, createCategory, updateCategory };
