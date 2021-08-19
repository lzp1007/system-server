const Route = require("../models/PracticalRoute")
//查询实习计划
exports.getRoute = async function() {
  return await Route.findAll();
}