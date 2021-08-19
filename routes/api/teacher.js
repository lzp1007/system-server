const express = require("express");
const router = express.Router();
const teacherService = require("../../services/teacherService");
const sendMsg = require("../getSendResult");


//登录
router.post("/login", async(req, res, next) => {
  try{
    const result = await teacherService.login(req.body.loginId, req.body.loginPwd);
    if(result) {
      //登录成功
      res.send(sendMsg.getResult(result));
    } else{
      res.send(sendMsg.getErr(result));
    }
  }catch(err) {
    next(err);
  }
})

//分页获取教师
router.get("/", async (req, res, next) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await teacherService.getteachers(page, limit);
    res.send(sendMsg.getResult(result));
  }catch(err) {
    next(err);
  }
}) 

//获取单个教师
router.get("/:id", async (req, res, next) => {
  try {
    const result = await teacherService.getteacherById(req.params.id)
    delete result.loginPwd;
    delete result.deletedAt;
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})



//添加教师
router.post("/", async (req, res, next) => {
  try {
    const result = await teacherService.addteacher(req.body);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})



router.delete("/:id",async (req, res, next) => {
  try {
    const result = await teacherService.deleteteacher(req.params.id);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const result = await teacherService.updateteacher(req.params.id, req.body);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})

module.exports = router;


