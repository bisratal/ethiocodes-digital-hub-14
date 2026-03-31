const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Lead = sequelize.define("Lead", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  message: DataTypes.TEXT,
  project_description: DataTypes.TEXT,
  budget: DataTypes.STRING,
  timeline: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("New", "Contacted", "Converted"),
    defaultValue: "New",
  },
});

module.exports = Lead;