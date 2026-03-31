const { Testimonial, Media } = require('../../models');
const logger = require('../../utils/logger');

const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { status: true },
      include: [{ model: Media, as: 'photo', attributes: ['id', 'url', 'name'] }],
      order: [['created_at', 'ASC']],
    });
    
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

const getTestimonialById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findByPk(id, {
      include: [{ model: Media, as: 'photo', attributes: ['id', 'url', 'name'] }],
    });
    
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { client_name, company, quote, photo_id, status } = req.body;
    
    const testimonial = await Testimonial.create({
      client_name,
      company,
      quote,
      photo_id,
      status: status !== undefined ? status : true,
    });
    
    logger.info(`Testimonial created: ${client_name} by ${req.user.email}`);
    
    const fullTestimonial = await Testimonial.findByPk(testimonial.id, {
      include: [{ model: Media, as: 'photo' }],
    });
    
    res.status(201).json(fullTestimonial);
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { client_name, company, quote, photo_id, status } = req.body;
    
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    await testimonial.update({
      client_name: client_name || testimonial.client_name,
      company: company !== undefined ? company : testimonial.company,
      quote: quote || testimonial.quote,
      photo_id: photo_id !== undefined ? photo_id : testimonial.photo_id,
      status: status !== undefined ? status : testimonial.status,
    });
    
    logger.info(`Testimonial updated: ${testimonial.client_name} by ${req.user.email}`);
    
    const updatedTestimonial = await Testimonial.findByPk(id, {
      include: [{ model: Media, as: 'photo' }],
    });
    
    res.json(updatedTestimonial);
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    await testimonial.destroy();
    
    logger.info(`Testimonial deleted: ${testimonial.client_name} by ${req.user.email}`);
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};