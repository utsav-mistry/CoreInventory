const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory } = require('../controllers/category.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
module.exports = router;
