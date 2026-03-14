const express = require('express');
const router = express.Router();
const { getAdjustments, createAdjustment, validateAdjustment } = require('../controllers/adjustment.controller');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', getAdjustments);
router.post('/', createAdjustment);
router.post('/:id/validate', validateAdjustment);
module.exports = router;
