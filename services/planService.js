const Plan = require("../models/Plan")
//查询实习计划
exports.getPlan = async function() {
  return await Plan.findAll();
}