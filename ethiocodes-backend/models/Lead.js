const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  company: {
    type: DataTypes.STRING(150),
  },
  message: {
    type: DataTypes.TEXT,
  },
  project_description: {
    type: DataTypes.TEXT,
  },
  budget: {
    type: DataTypes.STRING(50),
  },
  timeline: {
    type: DataTypes.STRING(50),
  },
  type: {
    type: DataTypes.ENUM('Contact', 'Project', 'Newsletter'),
    defaultValue: 'Contact',
  },
  status: {
    type: DataTypes.ENUM('New', 'Contacted', 'Converted', 'Archived'),
    defaultValue: 'New',
  },
  internal_notes: {
    type: DataTypes.TEXT,
  },
  is_newsletter: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'leads',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Lead;