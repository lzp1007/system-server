const express = require("express");
const router = express.Router();
const examService = require("../../services/examService");
const sendMsg = require("../getSendResult")


//获取考试题目
router.get("/", async (req, res, next) => {
  try {
    const result = await examService.getExam();
    if(result){
      let data = JSON.parse(JSON.stringify(result))
      res.send(sendMsg.getResult(data));
    }else {
      res.send(sendMsg(result));
    };
  } catch (err) {
    next(err);
  }
})

module.exports = router;
