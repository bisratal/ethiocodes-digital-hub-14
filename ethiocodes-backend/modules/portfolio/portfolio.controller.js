const { Portfolio, Media, PortfolioImage } = require('../../models');
const { Op } = require('sequelize');
const logger = require('../../utils/logger');

const getProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, industry, search } = req.query;
    const offset = (page - 1) * limit;
    
    const where = { status: true };
    if (industry) where.client_industry = industry;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { technologies: { [Op.iLike]: `%${search}%` } },
      ];
    }
    
    const { count, rows } = await Portfolio.findAndCountAll({
      where,
      include: [
        { model: Media, as: 'images', through: { attributes: ['position'] } },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset,
    });
    
    res.json({
      projects: rows,
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

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const project = await Portfolio.findByPk(id, {
      include: [
        { model: Media, as: 'images', through: { attributes: ['position'] } },
      ],
    });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, client_industry, image_ids } = req.body;
    
    const project = await Portfolio.create({
      title,
      description,
      technologies,
      client_industry,
    });
    
    if (image_ids && image_ids.length) {
      const images = image_ids.map((mediaId, index) => ({
        project_id: project.id,
        media_id: mediaId,
        position: index,
      }));
      await PortfolioImage.bulkCreate(images);
    }
    
    logger.info(`Portfolio project created: ${title} by ${req.user.email}`);
    
    const fullProject = await Portfolio.findByPk(project.id, {
      include: [{ model: Media, as: 'images' }],
    });
    
    res.status(201).json(fullProject);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, client_industry, status, image_ids } = req.body;
    
    const project = await Portfolio.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await project.update({
      title: title || project.title,
      description: description || project.description,
      technologies: technologies || project.technologies,
      client_industry: client_industry || project.client_industry,
      status: status !== undefined ? status : project.status,
    });
    
    if (image_ids) {
      await PortfolioImage.destroy({ where: { project_id: id } });
      const images = image_ids.map((mediaId, index) => ({
        project_id: id,
        media_id: mediaId,
        position: index,
      }));
      await PortfolioImage.bulkCreate(images);
    }
    
    logger.info(`Portfolio project updated: ${project.title} by ${req.user.email}`);
    
    const updatedProject = await Portfolio.findByPk(id, {
      include: [{ model: Media, as: 'images' }],
    });
    
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const project = await Portfolio.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await PortfolioImage.destroy({ where: { project_id: id } });
    await project.destroy();
    
    logger.info(`Portfolio project deleted: ${project.title} by ${req.user.email}`);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const reorderProjects = async (req, res, next) => {
  try {
    const { orders } = req.body; // Array of { id, order }
    
    for (const item of orders) {
      await Portfolio.update(
        { order: item.order },
        { where: { id: item.id } }
      );
    }
    
    logger.info(`Projects reordered by ${req.user.email}`);
    
    res.json({ message: 'Projects reordered successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
};