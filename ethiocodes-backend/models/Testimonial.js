const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(150),
  },
  quote: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  photo_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'testimonials',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Testimonial;