const Class = require("../models/Class");


//获取班级名称
exports.getClassName = async function(classId) {
  return await Class.findByPk(classId, {
    attributes: ["name"]
  })
}

//获取所有班级名称
exports.getAllClassName = async function() {
  return await Class.findAll({
    attributes: ["name"]
  })
}