const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Published'),
    defaultValue: 'Draft',
  },
  category: {
    type: DataTypes.STRING(100),
  },
  tags: {
    type: DataTypes.STRING(255),
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? rawValue.split(',') : [];
    },
    set(value) {
      this.setDataValue('tags', Array.isArray(value) ? value.join(',') : value);
    },
  },
  featured_image_id: {
    type: DataTypes.INTEGER,
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  published_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'blog_posts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = BlogPost;