const User = require('../models/User');
const { generateTokenPair, generateAccessToken } = require('../utils/generateTokens');
const { createOTP, verifyOTP } = require('../services/otp.service');
const { sendOTPEmail, sendAdminNotification, sendStatusUpdateNotification } = require('../services/email.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

/**
 * Check if the system is fresh (no users yet)
 */
const checkFreshSystem = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    return successResponse(res, { isFresh: userCount === 0 }, 'System status retrieved');
  } catch (err) { next(err); }
};

/**
 * Register a new user
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return errorResponse(res, 'Please provide name, email and password.', 400);
    }

    const existingUser = await User.findOne({ email }).select('+password');
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    if (existingUser) {
      if (existingUser.isVerified) {
        return errorResponse(res, 'This email is already registered. Please login.', 409);
      }
      
      existingUser.name = name;
      existingUser.password = password; 
      const { otp, expiresAt } = createOTP();
      existingUser.otp = otp;
      existingUser.otpExpires = expiresAt;
      await existingUser.save();
      
      await sendOTPEmail(existingUser.email, existingUser.name, otp);
      return successResponse(res, null, 'Account exists but was not verified. A new verification code has been sent.', 200);
    }

    const { otp, expiresAt } = createOTP();
    // First user is automatically approved as an admin
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: isFirstUser ? 'admin' : (role || 'staff'), 
      otp, 
      otpExpires: expiresAt,
      isVerified: false,
      status: isFirstUser ? 'approved' : 'pending'
    });
    
    await sendOTPEmail(user.email, user.name, otp);
    return successResponse(res, { isFirstUser }, 'Registration initiated. Please check your email for the verification code.', 201);
  } catch (err) { next(err); }
};

/**
 * Verify email and notify admins
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email }).select('+otp +otpExpires +password');
    if (!user) return errorResponse(res, 'Account not found.', 404);
    if (user.isVerified) return errorResponse(res, 'Account already verified.', 400);

    const result = verifyOTP(user, otp);
    if (!result.valid) return errorResponse(res, result.message, 400);

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // If it's a regular user (not the first admin), notify existing admins
    if (user.status === 'pending') {
      const admins = await User.find({ role: 'admin', isVerified: true, status: 'approved' }).select('email');
      if (admins.length > 0) {
        await sendAdminNotification(admins.map(a => a.email), user);
      }
    }

    // Only generate tokens if already approved (e.g., the first admin)
    if (user.status === 'approved') {
      const { accessToken, refreshToken } = generateTokenPair(user._id);
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return successResponse(res, { user: user.toJSON(), accessToken, refreshToken }, 'Account verified and active.');
    }

    return successResponse(res, null, 'Email verified! Your account is now pending administrator approval.');
  } catch (err) { next(err); }
};

/**
 * Login logic with status checks
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid credentials.', 401);
    }
    
    if (!user.isVerified) return errorResponse(res, 'Please verify your email first.', 403);
    
    if (user.status === 'pending') {
      return errorResponse(res, 'Account is pending administrator approval.', 403);
    }
    
    if (user.status === 'rejected') {
      return errorResponse(res, 'Your registration request was declined.', 403);
    }
    
    if (!user.isActive) return errorResponse(res, 'Account is deactivated.', 403);

    const { accessToken, refreshToken } = generateTokenPair(user._id);
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    return successResponse(res, { user: user.toJSON(), accessToken, refreshToken }, 'Login successful.');
  } catch (err) { next(err); }
};

/**
 * Admin: Get all users with status
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return successResponse(res, { users }, 'Users retrieved');
  } catch (err) { next(err); }
};

/**
 * Admin: Update user status and role
 */
const updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { status, role } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) return errorResponse(res, 'Invalid status', 400);

    const user = await User.findById(userId);
    if (!user) return errorResponse(res, 'User not found', 404);

    user.status = status;
    if (role) user.role = role;
    await user.save({ validateBeforeSave: false });

    await sendStatusUpdateNotification(user.email, user.name, status);
    return successResponse(res, null, `User registration ${status}.`);
  } catch (err) { next(err); }
};

const getMe = async (req, res) => successResponse(res, { user: req.user }, 'Profile retrieved');
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return errorResponse(res, 'Session expired. Please login again.', 401);
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId).select('+refreshToken');
    if (!user || user.refreshToken !== token) return errorResponse(res, 'Invalid session.', 401);
    const accessToken = generateAccessToken(user._id);
    return successResponse(res, { accessToken }, 'Session extended.');
  } catch (err) {
    if (err.name === 'TokenExpiredError') return errorResponse(res, 'Session expired.', 401);
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.user) await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
    return successResponse(res, null, 'Logged out.');
  } catch (err) { next(err); }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return successResponse(res, null, 'Verification code sent if account exists.');
    const { otp, expiresAt } = createOTP();
    user.otp = otp;
    user.otpExpires = expiresAt;
    await user.save({ validateBeforeSave: false });
    await sendOTPEmail(user.email, user.name, otp);
    return successResponse(res, null, 'Verification code sent.');
  } catch (err) { next(err); }
};

const verifyOTPAndReset = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email }).select('+otp +otpExpires +password');
    if (!user) return errorResponse(res, 'User not found.', 404);
    const result = verifyOTP(user, otp);
    if (!result.valid) return errorResponse(res, result.message, 400);
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return successResponse(res, null, 'Password reset successful.');
  } catch (err) { next(err); }
};

module.exports = { 
  register, verifyEmail, login, checkFreshSystem, 
  getUsers, updateUserStatus, getMe, refreshToken, 
  logout, forgotPassword, verifyOTPAndReset 
};
