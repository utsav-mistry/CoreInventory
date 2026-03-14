const express = require('express');
const router = express.Router();
const { 
  register, 
  verifyEmail, 
  login, 
  checkFreshSystem,
  getUsers,
  updateUserStatus,
  refreshToken, 
  forgotPassword, 
  verifyOTPAndReset, 
  logout, 
  getMe 
} = require('../controllers/auth.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/status', checkFreshSystem);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyOTPAndReset);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

// Admin RBAC Routes
router.get('/users', protect, authorize('admin'), getUsers);
router.patch('/users/:userId/status', protect, authorize('admin'), updateUserStatus);

module.exports = router;
