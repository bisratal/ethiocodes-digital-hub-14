const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('./team.controller');

const router = express.Router();

// Public routes
router.get('/', getTeamMembers);
router.get('/:id', [
  param('id').isInt(),
  validateRequest,
], getTeamMemberById);

// Admin only routes
router.post('/', [
  body('name').notEmpty().trim().isLength({ min: 2, max: 150 }),
  body('role').notEmpty().trim().isLength({ max: 100 }),
  body('bio').optional(),
  body('social_links').optional().isObject(),
  validateRequest,
], authenticate, isAdmin, createTeamMember);

router.put('/:id', [
  param('id').isInt(),
  body('name').optional().trim().isLength({ min: 2, max: 150 }),
  body('status').optional().isBoolean(),
  validateRequest,
], authenticate, isAdmin, updateTeamMember);

router.delete('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdmin, deleteTeamMember);

module.exports = router;