const Description = require("../models/Description");


//获取简介
exports.getDesp = async function() {
  return await Description.findAll();
}