const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.STRING(255),
    get() {
      const rawValue = this.getDataValue('technologies');
      return rawValue ? rawValue.split(',') : [];
    },
    set(value) {
      this.setDataValue('technologies', Array.isArray(value) ? value.join(',') : value);
    },
  },
  client_industry: {
    type: DataTypes.STRING(100),
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'portfolio',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Portfolio;