const { Service, Media } = require('../../models');
const logger = require('../../utils/logger');

const getServices = async (req, res, next) => {
  try {
    const services = await Service.findAll({
      where: { status: true },
      include: [{ model: Media, as: 'image', attributes: ['id', 'url', 'name'] }],
      order: [['created_at', 'ASC']],
    });
    
    res.json(services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findByPk(id, {
      include: [{ model: Media, as: 'image', attributes: ['id', 'url', 'name'] }],
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, technologies, image_id } = req.body;
    
    const service = await Service.create({
      title,
      description,
      technologies,
      image_id,
    });
    
    logger.info(`Service created: ${title} by ${req.user.email}`);
    
    const fullService = await Service.findByPk(service.id, {
      include: [{ model: Media, as: 'image' }],
    });
    
    res.status(201).json(fullService);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, image_id, status } = req.body;
    
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    await service.update({
      title: title || service.title,
      description: description || service.description,
      technologies: technologies || service.technologies,
      image_id: image_id !== undefined ? image_id : service.image_id,
      status: status !== undefined ? status : service.status,
    });
    
    logger.info(`Service updated: ${service.title} by ${req.user.email}`);
    
    const updatedService = await Service.findByPk(id, {
      include: [{ model: Media, as: 'image' }],
    });
    
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    await service.destroy();
    
    logger.info(`Service deleted: ${service.title} by ${req.user.email}`);
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};