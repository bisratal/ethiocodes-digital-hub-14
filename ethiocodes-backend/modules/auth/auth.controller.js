const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../../utils/emailService');
const logger = require('../../utils/logger');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      logger.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (!user.status) {
      logger.warn(`Login failed: Account disabled - ${email}`);
      return res.status(401).json({ error: 'Account is disabled' });
    }
    
    const isValid = await user.validatePassword(password);
    
    if (!isValid) {
      logger.warn(`Login failed: Invalid password - ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    
    logger.info(`User logged in: ${user.email}`);
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const user = await User.create({
      name,
      email,
      password_hash: password,
      role: role || 'Editor',
    });
    
    await sendWelcomeEmail(user, password);
    
    const token = generateToken(user);
    
    logger.info(`New user registered: ${user.email}`);
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    
    const isValid = await user.validatePassword(currentPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    user.password_hash = newPassword;
    await user.save();
    
    logger.info(`Password changed for user: ${user.email}`);
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      // Don't reveal that user doesn't exist for security
      return res.json({ message: 'If your email is registered, you will receive a reset link' });
    }
    
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    await sendPasswordResetEmail(user, resetToken);
    
    logger.info(`Password reset requested for: ${email}`);
    
    res.json({ message: 'If your email is registered, you will receive a reset link' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    user.password_hash = newPassword;
    await user.save();
    
    logger.info(`Password reset completed for: ${user.email}`);
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
};