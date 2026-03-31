const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Service = sequelize.define('Service', {
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
  image_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'services',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Service;