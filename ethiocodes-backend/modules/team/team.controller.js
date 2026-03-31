const { TeamMember, Media } = require('../../models');
const logger = require('../../utils/logger');

const getTeamMembers = async (req, res, next) => {
  try {
    const members = await TeamMember.findAll({
      where: { status: true },
      include: [{ model: Media, as: 'photo', attributes: ['id', 'url', 'name'] }],
      order: [['created_at', 'ASC']],
    });
    
    res.json(members);
  } catch (error) {
    next(error);
  }
};

const getTeamMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const member = await TeamMember.findByPk(id, {
      include: [{ model: Media, as: 'photo', attributes: ['id', 'url', 'name'] }],
    });
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(member);
  } catch (error) {
    next(error);
  }
};

const createTeamMember = async (req, res, next) => {
  try {
    const { name, role, bio, photo_id, social_links, status } = req.body;
    
    const member = await TeamMember.create({
      name,
      role,
      bio,
      photo_id,
      social_links: social_links ? JSON.stringify(social_links) : null,
      status: status !== undefined ? status : true,
    });
    
    logger.info(`Team member created: ${name} by ${req.user.email}`);
    
    const fullMember = await TeamMember.findByPk(member.id, {
      include: [{ model: Media, as: 'photo' }],
    });
    
    res.status(201).json(fullMember);
  } catch (error) {
    next(error);
  }
};

const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, bio, photo_id, social_links, status } = req.body;
    
    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    await member.update({
      name: name || member.name,
      role: role || member.role,
      bio: bio !== undefined ? bio : member.bio,
      photo_id: photo_id !== undefined ? photo_id : member.photo_id,
      social_links: social_links ? JSON.stringify(social_links) : member.social_links,
      status: status !== undefined ? status : member.status,
    });
    
    logger.info(`Team member updated: ${member.name} by ${req.user.email}`);
    
    const updatedMember = await TeamMember.findByPk(id, {
      include: [{ model: Media, as: 'photo' }],
    });
    
    res.json(updatedMember);
  } catch (error) {
    next(error);
  }
};

const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    await member.destroy();
    
    logger.info(`Team member deleted: ${member.name} by ${req.user.email}`);
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};