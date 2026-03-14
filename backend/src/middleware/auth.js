const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided. Authorization denied.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password -otp -otpExpires');
    if (!user) {
      return errorResponse(res, 'User not found. Authorization denied.', 401);
    }
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated.', 403);
    }
    if (!user.isVerified) {
      return errorResponse(res, 'Email not verified.', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired. Please refresh.', 401);
    }
    return errorResponse(res, 'Invalid token. Authorization denied.', 401);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, `User role ${req.user.role} is not authorized to access this route`, 403);
    }
    next();
  };
};

module.exports = { protect, authorize };
