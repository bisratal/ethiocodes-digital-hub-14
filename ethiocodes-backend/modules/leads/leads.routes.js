const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  submitContact,
  submitProject,
  subscribeNewsletter,
  getLeads,
  getLeadById,
  updateLead,
  exportLeads,
} = require('./leads.controller');

const router = express.Router();

// Public routes
router.post('/contact', [
  body('name').notEmpty().trim().isLength({ min: 2, max: 150 }),
  body('email').isEmail().normalizeEmail(),
  body('company').optional().trim(),
  body('message').notEmpty().isLength({ max: 2000 }),
  validateRequest,
], submitContact);

router.post('/project', [
  body('name').notEmpty().trim().isLength({ min: 2, max: 150 }),
  body('email').isEmail().normalizeEmail(),
  body('company').optional().trim(),
  body('project_description').notEmpty().isLength({ max: 2000 }),
  body('budget').optional(),
  body('timeline').optional(),
  validateRequest,
], submitProject);

router.post('/newsletter', [
  body('email').isEmail().normalizeEmail(),
  validateRequest,
], subscribeNewsletter);

// Admin only routes
router.get('/', authenticate, isAdmin, getLeads);
router.get('/export', authenticate, isAdmin, exportLeads);
router.get('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdmin, getLeadById);
router.put('/:id', [
  param('id').isInt(),
  body('status').optional().isIn(['New', 'Contacted', 'Converted', 'Archived']),
  body('internal_notes').optional().trim(),
  validateRequest,
], authenticate, isAdmin, updateLead);

module.exports = router;