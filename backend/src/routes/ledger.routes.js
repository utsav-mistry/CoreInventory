const express = require('express');
const router = express.Router();
const { getLedger } = require('../controllers/ledger.controller');
const { protect } = require('../middleware/auth');
router.get('/', protect, getLedger);
module.exports = router;
