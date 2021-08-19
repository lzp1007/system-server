const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");


//定义模型
const PracticalRoute = sequelize.define("PracticalRoute", {
	name: {
		type: DataTypes.STRING,
    allowNull: false,
  },
  targetCdt: {
		type: DataTypes.STRING,
    allowNull: false,
  },
  targetName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  outTask: {
    type: DataTypes.STRING(1000),
    allowNull: false 
  },
  inTask: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
},{
  createdAt: false,
  updatedAt: false,
})


module.exports = PracticalRoute;