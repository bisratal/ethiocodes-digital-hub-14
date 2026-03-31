const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TeamMember = sequelize.define('TeamMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  photo_id: {
    type: DataTypes.INTEGER,
  },
  social_links: {
    type: DataTypes.JSON,
    get() {
      const rawValue = this.getDataValue('social_links');
      if (!rawValue) return null;
      return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    },
    set(value) {
      this.setDataValue('social_links', value ? JSON.stringify(value) : null);
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'team_members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = TeamMember;