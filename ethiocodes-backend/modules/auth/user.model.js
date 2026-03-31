const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("Admin", "Editor"),
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,

  // 🔥 THIS IS THE FIX
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = User;