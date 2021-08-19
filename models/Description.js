const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

//定义模型
const Description = sequelize.define("Description", {
	midImg: {
    type: DataTypes.STRING,
    defaultValue: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
  },
  bigImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  article: {
    type: DataTypes.STRING(500),
    allowNull: false,
  }
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true,       //不需要真正删除列
})


module.exports = Description;