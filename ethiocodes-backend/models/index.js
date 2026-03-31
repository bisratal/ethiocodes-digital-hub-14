const { sequelize } = require('../config/db');
const User = require('./User');
const BlogPost = require('./BlogPost');
const Portfolio = require('./Portfolio');
const PortfolioImage = require('./PortfolioImage');
const Lead = require('./Lead');
const Service = require('./Service');
const TeamMember = require('./TeamMember');
const Testimonial = require('./Testimonial');
const Media = require('./Media');

// Define associations
User.hasMany(BlogPost, { foreignKey: 'author_id', as: 'posts' });
BlogPost.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

BlogPost.belongsTo(Media, { foreignKey: 'featured_image_id', as: 'featuredImage' });

Portfolio.belongsToMany(Media, { through: PortfolioImage, foreignKey: 'project_id', as: 'images' });
Media.belongsToMany(Portfolio, { through: PortfolioImage, foreignKey: 'media_id', as: 'projects' });

PortfolioImage.belongsTo(Portfolio, { foreignKey: 'project_id' });
PortfolioImage.belongsTo(Media, { foreignKey: 'media_id' });

Service.belongsTo(Media, { foreignKey: 'image_id', as: 'image' });
TeamMember.belongsTo(Media, { foreignKey: 'photo_id', as: 'photo' });
Testimonial.belongsTo(Media, { foreignKey: 'photo_id', as: 'photo' });

Media.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

module.exports = {
  sequelize,
  User,
  BlogPost,
  Portfolio,
  PortfolioImage,
  Lead,
  Service,
  TeamMember,
  Testimonial,
  Media,
};