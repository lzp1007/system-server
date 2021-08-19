const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");


//定义模型
const Student = sequelize.define("Student", {
	loginId: {
		type: DataTypes.STRING,
    allowNull: false,
  },
  loginPwd: {
		type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
		type: DataTypes.STRING,
    allowNull: false,
  },
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true,       //不需要真正删除列
})


module.exports = Student;