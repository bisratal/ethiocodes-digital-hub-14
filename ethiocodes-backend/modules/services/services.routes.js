const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('./services.controller');

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:id', [
  param('id').isInt(),
  validateRequest,
], getServiceById);

// Admin only routes
router.post('/', [
  body('title').notEmpty().trim().isLength({ min: 3, max: 255 }),
  body('description').notEmpty(),
  body('technologies').optional(),
  validateRequest,
], authenticate, isAdmin, createService);

router.put('/:id', [
  param('id').isInt(),
  body('title').optional().trim().isLength({ min: 3, max: 255 }),
  body('status').optional().isBoolean(),
  validateRequest,
], authenticate, isAdmin, updateService);

router.delete('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdmin, deleteService);

module.exports = router;