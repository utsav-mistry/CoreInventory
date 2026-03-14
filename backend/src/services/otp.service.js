const { generateOTP, isOTPExpired } = require('../utils/generateOTP');

const OTP_EXPIRY_MINUTES = 10;

const createOTP = () => {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  return { otp, expiresAt };
};

const verifyOTP = (user, inputOtp) => {
  if (!user.otp || !user.otpExpires) {
    return { valid: false, message: 'No OTP found. Please request a new one.' };
  }
  if (isOTPExpired(user.otpExpires)) {
    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  }
  if (user.otp !== inputOtp) {
    return { valid: false, message: 'Invalid OTP.' };
  }
  return { valid: true };
};

module.exports = { createOTP, verifyOTP };
