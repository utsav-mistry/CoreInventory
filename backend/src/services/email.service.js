const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || `"CoreInventory" <${process.env.SMTP_USER}>`,
      ...options
    };
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Email service failure:', err.message);
    return false;
  }
};

const sendOTPEmail = async (email, name, otp) => {
  return sendEmail({
    to: email,
    subject: 'Verification Code - CoreInventory',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; padding: 40px; border: 1px solid #e1e4e8; border-radius: 8px; }
          .header { font-size: 24px; font-weight: bold; color: #1a1d21; margin-bottom: 24px; border-bottom: 2px solid #22c55e; padding-bottom: 12px; }
          .content { font-size: 16px; margin-bottom: 24px; }
          .otp-box { background-color: #f4f7f9; border-radius: 6px; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1a1d21; border: 1px solid #cfd9e0; margin: 24px 0; }
          .footer { font-size: 12px; color: #6a737d; border-top: 1px solid #e1e4e8; padding-top: 16px; margin-top: 32px; }
          .highlight { color: #22c55e; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">CoreInventory</div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>A request was made to verify your account or reset your password on the CoreInventory platform.</p>
            <p>Your security verification code is:</p>
            <div class="otp-box">${otp}</div>
            <p>This code will expire in <span class="highlight">10 minutes</span>. For security reasons, please do not share this code with anyone.</p>
            <p>If you did not initiate this request, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            Best regards,<br>
            The CoreInventory Team<br><br>
            This is an automated message. Please do not reply directly to this email.
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

const sendAdminNotification = async (adminEmails, newUser) => {
  return sendEmail({
    to: adminEmails,
    subject: 'New User Registration - Action Required',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #1a1d21;">New User Onboarding</h2>
        <p>A new user has registered and verified their email. Review is required for account activation.</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${newUser.name}</p>
          <p><strong>Email:</strong> ${newUser.email}</p>
          <p><strong>Requested Role:</strong> ${newUser.role}</p>
          <p><strong>Joined:</strong> ${new Date(newUser.createdAt).toLocaleString()}</p>
        </div>
        <p>Please login to the Admin Dashboard to approve or decline this request.</p>
      </div>
    `
  });
};

const sendStatusUpdateNotification = async (userEmail, name, status) => {
  const isApproved = status === 'approved';
  return sendEmail({
    to: userEmail,
    subject: `Account Registration ${isApproved ? 'Approved' : 'Declined'} - CoreInventory`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: ${isApproved ? '#22c55e' : '#ef4444'};">Registration ${status.charAt(0).toUpperCase() + status.slice(1)}</h2>
        <p>Hello ${name},</p>
        <p>Your account registration request has been <strong>${status}</strong> by the system administrator.</p>
        ${isApproved 
          ? '<p>You can now log in using your credentials at our platform.</p>' 
          : '<p>Unfortunately, your request to join the platform has been declined at this time.</p>'}
        <div style="margin-top: 30px; font-size: 12px; color: #666;">
          CoreInventory Team
        </div>
      </div>
    `
  });
};

module.exports = { sendOTPEmail, sendAdminNotification, sendStatusUpdateNotification };
