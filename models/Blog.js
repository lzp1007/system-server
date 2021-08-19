const sequelize = require("./db");
const { DataTypes } = require("sequelize");

//定义模型
const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  scanNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  commentNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  thumb: {
    type: DataTypes.STRING,
  },
  toc: {
    type: DataTypes.STRING(5000),
  },
  htmlContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createDate: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true,       
})

module.exports = Blog;