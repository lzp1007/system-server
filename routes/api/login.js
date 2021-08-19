const express = require("express");
const router = express.Router();
const adminService = require("../../services/adminService");
const studentService = require("../../services/studentService");
const teacherService = require("../../services/teacherService");
const sendMsg = require("../getSendResult");
const jwt = require("../jwt");

//处理登录业务
router.post("/", async (req, res, next) => {
  try {
    const loginId = req.body.loginId;
    const loginPwd = req.body.loginPwd;
    const identity = req.body.identity;
    let result = null;
    if(identity === "学生") {
      result = await studentService.login(loginId,loginPwd);
    }else if(identity === "教师") {
      result = await teacherService.login(loginId, loginPwd);
    }else if(identity === "管理员") {
      result = await adminService.login(loginId, loginPwd);
    }
    if(result) {
      //登录成功
      //添加登录者身份
      result.identity = identity;
      //颁发jwt
      jwt.publish(res, undefined, result);
      res.send(sendMsg.getResult(result));
    }else{
      res.send(sendMsg.getErr(result));
    }
  } catch (err) {
    next(err);
  }

})

module.exports = router;