const sequelize = require("./db");
const { DataTypes } = require("sequelize");

//定义模型
const Plan = sequelize.define("Plan", {
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
},{
  createdAt: false,
  updatedAt: false,
})

module.exports = Plan;