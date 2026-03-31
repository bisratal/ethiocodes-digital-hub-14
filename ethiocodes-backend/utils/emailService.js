const nodemailer = require('nodemailer');
const logger = require('./logger');

let transporter = null;

// Initialize transporter if email config exists
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const sendEmail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    logger.warn('Email not configured. Skipping email send.');
    return { messageId: 'email-not-configured' };
  }
  
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SITE_NAME || 'EthioCodes'}" <${process.env.CONTACT_EMAIL || 'noreply@ethiocodes.com'}>`,
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Email sending failed:', error);
    throw error;
  }
};

const sendLeadNotification = async (lead) => {
  const html = `
    <h2>New Lead Received</h2>
    <p><strong>Type:</strong> ${lead.type}</p>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    ${lead.company ? `<p><strong>Company:</strong> ${lead.company}</p>` : ''}
    ${lead.message ? `<p><strong>Message:</strong> ${lead.message}</p>` : ''}
    ${lead.project_description ? `<p><strong>Project Description:</strong> ${lead.project_description}</p>` : ''}
    ${lead.budget ? `<p><strong>Budget:</strong> ${lead.budget}</p>` : ''}
    ${lead.timeline ? `<p><strong>Timeline:</strong> ${lead.timeline}</p>` : ''}
    <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
  `;
  
  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@ethiocodes.com',
    subject: `New ${lead.type} Lead: ${lead.name}`,
    html,
  });
};

const sendWelcomeEmail = async (user, password) => {
  const html = `
    <h2>Welcome to ${process.env.SITE_NAME || 'EthioCodes'}</h2>
    <p>Hello ${user.name},</p>
    <p>Your account has been created. You can log in using the following credentials:</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Temporary Password:</strong> ${password}</p>
    <p>Please change your password after logging in.</p>
    <p><a href="${process.env.SITE_URL || 'http://localhost:3000'}/login">Click here to login</a></p>
  `;
  
  return sendEmail({
    to: user.email,
    subject: `Welcome to ${process.env.SITE_NAME || 'EthioCodes'}`,
    html,
  });
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  const html = `
    <h2>Password Reset Request</h2>
    <p>Hello ${user.name},</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>This link expires in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;
  
  return sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    html,
  });
};

const sendNewsletterConfirmation = async (email) => {
  const html = `
    <h2>Welcome to ${process.env.SITE_NAME || 'EthioCodes'} Newsletter</h2>
    <p>Thank you for subscribing to our newsletter!</p>
    <p>You'll receive updates about our latest blog posts, services, and company news.</p>
    <p><a href="${process.env.SITE_URL || 'http://localhost:3000'}/unsubscribe?email=${email}">Unsubscribe</a> at any time.</p>
  `;
  
  return sendEmail({
    to: email,
    subject: `Welcome to ${process.env.SITE_NAME || 'EthioCodes'} Newsletter`,
    html,
  });
};

module.exports = {
  sendEmail,
  sendLeadNotification,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNewsletterConfirmation,
};