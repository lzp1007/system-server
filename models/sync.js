//同步所有模型
require("./Admin")
require("./Student")
require("./Teacher")
require("./Class")
require("./Description")
require("./BlogType")
require("./Blog")
require("./Comment")
require("./Exam")
require("./Plan")
require("./Score")
require("./PracticalRoute")

const sequelize = require("./db")

sequelize.sync({alter: true}).then(()=> {
  console.log("所有模型同步完成！")
})