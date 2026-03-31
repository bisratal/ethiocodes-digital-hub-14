const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Portfolio = sequelize.define("Portfolio", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  technologies: DataTypes.STRING,
  clientIndustry: DataTypes.STRING,
});

module.exports = Portfolio;