const express = require('express');
const { body } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  login,
  register,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('./auth.controller');

const router = express.Router();

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validateRequest,
], login);

router.post('/register', [
  body('name').notEmpty().trim().isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  validateRequest,
], isAdmin, register);

router.get('/me', authenticate, getMe);

router.post('/change-password', [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
  validateRequest,
], authenticate, changePassword);

router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail(),
  validateRequest,
], forgotPassword);

router.post('/reset-password', [
  body('token').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
  validateRequest,
], resetPassword);

module.exports = router;