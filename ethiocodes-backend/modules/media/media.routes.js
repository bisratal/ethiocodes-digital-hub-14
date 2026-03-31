const express = require('express');
const multer = require('multer');
const path = require('path');
const { param } = require('express-validator');
const authenticate = require('../../middleware/authMiddleware');
const { isAdminOrEditor } = require('../../middleware/roleMiddleware');
const { validateRequest } = require('../../utils/validation');
const {
  uploadMedia,
  getMediaList,
  getMediaById,
  deleteMedia,
  getMediaUrl,
} = require('./media.controller');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || 'general';
    const uploadPath = path.join(__dirname, '../../uploads', folder);
    if (!require('fs').existsSync(uploadPath)) {
      require('fs').mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 },
});

// Authenticated routes
router.get('/', authenticate, isAdminOrEditor, getMediaList);
router.get('/:id/url', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdminOrEditor, getMediaUrl);
router.get('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdminOrEditor, getMediaById);
router.post('/upload', authenticate, isAdminOrEditor, upload.single('file'), uploadMedia);
router.delete('/:id', [
  param('id').isInt(),
  validateRequest,
], authenticate, isAdminOrEditor, deleteMedia);

module.exports = router;