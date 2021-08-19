const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

const Class = sequelize.define("Class", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true
});


module.exports = Class;