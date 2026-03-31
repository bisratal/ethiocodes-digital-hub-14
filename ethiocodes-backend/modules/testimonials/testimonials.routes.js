const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('./testimonials.controller');

const router = express.Router();

// Public routes
router.get('/', getTestimonials);
router.get('/:id', [
  param('id').isInt(),
  validateRequest,
], getTestimonialById);

// Admin only routes
router.post('/', [
  body('client_name').notEmpty().trim().isLength({ min: 2, max: 150 }),
  body('quote').notEmpty().isLength({ max: 500 }),
  body('company').optional().trim(),
  validateRequest,
], authenticate, isAdmin, createTestimonial);

router.put('/:id', [
  param('id').isInt(),
  body('client_name').optional().trim().isLength({ min: 2, max: 150 }),
  body('quote').optional().isLength({ max: 500 }),
  body('status').optional().isBoolean(),
  validateRequest,
], authenticate, isAdmin, updateTestimonial);

router.delete('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdmin, deleteTestimonial);

module.exports = router;