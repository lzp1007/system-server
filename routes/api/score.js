const express = require("express");
const router = express.Router();
const scoreService = require("../../services/scoreService")
const classService = require("../../services/classService")
const sendMsg = require("../getSendResult")


//获取学生成绩
router.get("/", async (req, res, next) => {
  try {
    let classes = await classService.getAllClassName();
    //得到所有的班级名称
    classes = JSON.parse(JSON.stringify(classes));
    const result = await scoreService.getScore();
    if(result){
      let data = JSON.parse(JSON.stringify(result))
      for(let i = 0; i < data.length; i++) {
        delete data[i].deletedAt;
        const classId = data[i].classId;
        let className = await classService.getClassName(classId);
        className = JSON.parse(JSON.stringify(className)).name;
        data[i].className = className;
      }

      for(let i = 0; i < classes.length; i++) {
        classes[i].rows = [];
        for(let j = 0; j < data.length; j++) {
          if(data[j].className === classes[i].name) {
            classes[i].rows.push(data[j]);
          }
        }
      }
      res.send(sendMsg.getResult(classes));
    }else {
      res.send(sendMsg(result));
    };
  } catch (err) {
    next(err);
  }
})

//提交成绩
router.post("/", async (req, res, next) =>{
  try {
    const result = await scoreService.addScore(req.body);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else {
      res.send(sendMsg.getErr(result));
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;
