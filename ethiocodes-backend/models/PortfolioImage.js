const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PortfolioImage = sequelize.define('PortfolioImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  media_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'portfolio_images',
  timestamps: false,
});

module.exports = PortfolioImage;