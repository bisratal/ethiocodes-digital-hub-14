const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdminOrEditor, isAdmin } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  getPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getTags,
} = require('./blog.controller');

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/slug/:slug', getPostBySlug);

// Authenticated routes (with optional authentication)
router.get('/:id', authenticate, getPostById);

// Admin/Editor only routes
router.post('/', [
  body('title').notEmpty().trim().isLength({ min: 3, max: 255 }),
  body('content').notEmpty(),
  body('status').isIn(['Draft', 'Published']).optional(),
  validateRequest,
], authenticate, isAdminOrEditor, createPost);

router.put('/:id', [
  param('id').isInt(),
  body('title').optional().trim().isLength({ min: 3, max: 255 }),
  body('status').optional().isIn(['Draft', 'Published']),
  validateRequest,
], authenticate, isAdminOrEditor, updatePost);

router.delete('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdminOrEditor, deletePost);

module.exports = router;