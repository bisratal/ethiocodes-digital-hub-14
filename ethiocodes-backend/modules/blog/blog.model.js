const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Blog = sequelize.define("Blog", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  category: DataTypes.STRING,
  tags: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("Draft", "Published"),
    defaultValue: "Draft",
  },
});

module.exports = Blog;