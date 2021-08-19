const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

//定义模型
const Exam = sequelize.define("Exam", {
	title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true,       //不需要真正删除列
})


module.exports = Exam;