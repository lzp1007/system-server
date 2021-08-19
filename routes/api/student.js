const express = require("express");
const router = express.Router();
const studentService = require("../../services/studentService");
const sendMsg = require("../getSendResult");


//分页获取学生
router.get("/", async (req, res, next) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await studentService.getStudents(page, limit);
    res.send(sendMsg.getResult(result));
  }catch(err) {
    next(err);
  }
}) 

//获取单个学生
router.get("/:id", async (req, res, next) => {
  try {
    const result = await studentService.getStudentById(req.params.id)
    delete result.loginPwd;
    delete result.deletedAt;
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})



//添加学生
router.post("/", async (req, res, next) => {
  try {
    const result = await studentService.addStudent(req.body);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else {
      res.send(sendMsg.getErr(result));
    }
  } catch (err) {
    next(err);
  }
})

router.delete("/:id",async (req, res, next) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else {
      res.send(sendMsg.getErr(result));
    }
  } catch (err) {
    next(err);
  }
})

//修改学生
router.put("/:id", async (req, res, next) => {
  try {
    const result = await studentService.updateStudent(req.params.id, req.body);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else {
      res.send(sendMsg(result));
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;


