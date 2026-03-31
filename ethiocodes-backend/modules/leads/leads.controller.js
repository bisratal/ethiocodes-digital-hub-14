const { Lead } = require('../../models');
const { sendLeadNotification, sendNewsletterConfirmation } = require('../../utils/emailService');
const logger = require('../../utils/logger');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, message } = req.body;
    
    const lead = await Lead.create({
      name,
      email,
      company,
      message,
      type: 'Contact',
    });
    
    await sendLeadNotification(lead);
    
    logger.info(`New contact lead: ${email}`);
    
    res.status(201).json({ message: 'Message sent successfully', leadId: lead.id });
  } catch (error) {
    next(error);
  }
};

const submitProject = async (req, res, next) => {
  try {
    const { name, email, company, project_description, budget, timeline } = req.body;
    
    const lead = await Lead.create({
      name,
      email,
      company,
      project_description,
      budget,
      timeline,
      type: 'Project',
    });
    
    await sendLeadNotification(lead);
    
    logger.info(`New project lead: ${email}`);
    
    res.status(201).json({ message: 'Project request submitted successfully', leadId: lead.id });
  } catch (error) {
    next(error);
  }
};

const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existing = await Lead.findOne({
      where: { email, is_newsletter: true },
    });
    
    if (existing) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    
    // Create a lead specifically for newsletter
    const lead = await Lead.create({
      name: email.split('@')[0],
      email,
      type: 'Newsletter',
      is_newsletter: true,
    });
    
    await sendNewsletterConfirmation(email);
    
    logger.info(`New newsletter subscriber: ${email}`);
    
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    next(error);
  }
};

const getLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, type, search, from, to } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { company: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (from && to) {
      where.created_at = { [Op.between]: [new Date(from), new Date(to)] };
    } else if (from) {
      where.created_at = { [Op.gte]: new Date(from) };
    } else if (to) {
      where.created_at = { [Op.lte]: new Date(to) };
    }
    
    const { count, rows } = await Lead.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset,
    });
    
    res.json({
      leads: rows,
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

const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, internal_notes } = req.body;
    
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    await lead.update({
      status: status || lead.status,
      internal_notes: internal_notes || lead.internal_notes,
    });
    
    logger.info(`Lead updated: ${lead.email} - Status: ${lead.status}`);
    
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

const exportLeads = async (req, res, next) => {
  try {
    const { status, type, from, to } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (from && to) {
      where.created_at = { [Op.between]: [new Date(from), new Date(to)] };
    }
    
    const leads = await Lead.findAll({
      where,
      order: [['created_at', 'DESC']],
    });
    
    // Generate CSV
    const headers = ['ID', 'Name', 'Email', 'Company', 'Type', 'Status', 'Message', 'Project Description', 'Budget', 'Timeline', 'Created At'];
    const rows = leads.map(lead => [
      lead.id,
      lead.name,
      lead.email,
      lead.company || '',
      lead.type,
      lead.status,
      lead.message || '',
      lead.project_description || '',
      lead.budget || '',
      lead.timeline || '',
      lead.created_at.toISOString(),
    ]);
    
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=leads_${new Date().toISOString()}.csv`);
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  submitProject,
  subscribeNewsletter,
  getLeads,
  getLeadById,
  updateLead,
  exportLeads,
};