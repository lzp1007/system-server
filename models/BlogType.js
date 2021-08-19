const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

//定义模型
const BlogType = sequelize.define("BlogType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  articleCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
  }
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true,       //不需要真正删除列
})

module.exports = BlogType;