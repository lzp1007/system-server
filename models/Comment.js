const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

//定义模型
const Comment = sequelize.define("Comment", {
	nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(600),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
  },
  createDate: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true,       //不需要真正删除列
})


module.exports = Comment;