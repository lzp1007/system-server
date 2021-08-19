const Exam = require("../models/Exam")

//获取评论
exports.getExam = async function() {
  let result =  await Exam.findAll({
    attributes: ["id", "title", "options", "answer"]
  });
  result = JSON.parse(JSON.stringify(result));
  for(let i = 0; i < result.length; i++) {
    result[i].options = JSON.parse(result[i].options);
  }
  return result;
}