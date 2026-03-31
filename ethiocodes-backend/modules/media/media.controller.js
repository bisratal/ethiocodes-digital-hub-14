const path = require('path');
const fs = require('fs');
const { Media, User } = require('../../models');
const logger = require('../../utils/logger');

const ensureUploadDir = (folder) => {
  const uploadPath = path.join(__dirname, '../../uploads', folder);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  return uploadPath;
};

const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { folder = '/' } = req.body;
    
    const media = await Media.create({
      name: req.file.originalname,
      filename: req.file.filename,
      url: `/uploads/${folder}/${req.file.filename}`,
      type: req.file.mimetype,
      size: req.file.size,
      uploaded_by: req.user.id,
      folder,
    });
    
    logger.info(`File uploaded: ${req.file.filename} by ${req.user.email}`);
    
    res.status(201).json({
      id: media.id,
      name: media.name,
      url: media.url,
      size: media.size,
      type: media.type,
    });
  } catch (error) {
    next(error);
  }
};

const getMediaList = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, folder, type } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (folder) where.folder = folder;
    if (type) where.type = { [Op.iLike]: `%${type}%` };
    
    const { count, rows } = await Media.findAndCountAll({
      where,
      include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'email'] }],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset,
    });
    
    res.json({
      media: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMediaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const media = await Media.findByPk(id, {
      include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'email'] }],
    });
    
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    // Delete physical file
    const filePath = path.join(__dirname, '../../', media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await media.destroy();
    
    logger.info(`File deleted: ${media.filename} by ${req.user.email}`);
    
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getMediaUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    res.json({ url: media.url });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getMediaList,
  getMediaById,
  deleteMedia,
  getMediaUrl,
};