const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} = require('./portfolio.controller');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', [
  param('id').isInt(),
  validateRequest,
], getProjectById);

// Admin only routes
router.post('/', [
  body('title').notEmpty().trim().isLength({ min: 3, max: 255 }),
  body('description').notEmpty(),
  body('technologies').optional(),
  body('client_industry').optional(),
  body('image_ids').optional().isArray(),
  validateRequest,
], authenticate, isAdmin, createProject);

router.put('/:id', [
  param('id').isInt(),
  body('title').optional().trim().isLength({ min: 3, max: 255 }),
  body('status').optional().isBoolean(),
  validateRequest,
], authenticate, isAdmin, updateProject);

router.delete('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdmin, deleteProject);

router.post('/reorder', [
  body('orders').isArray(),
  validateRequest,
], authenticate, isAdmin, reorderProjects);

module.exports = router;