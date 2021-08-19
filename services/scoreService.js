const Score = require("../models/Score");

//新增学生成绩
exports.addScore= async function(scoreObj){
  return await Score.create(scoreObj);
}

//获取学生成绩
exports.getScore = async function() {
  return await Score.findAll();
}
