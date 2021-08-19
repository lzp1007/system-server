const { Sequelize } = require('sequelize');

//创建一个sequelize实例
const sequelize = new Sequelize('teachsystem', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null,   
});

module.exports = sequelize;