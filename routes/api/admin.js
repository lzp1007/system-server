const express = require("express");
const router = express.Router();
const adminService = require("../../services/adminService");
const sendMsg = require("../getSendResult");

//分页获取管理员
router.get("/", async (req, res, next) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await adminService.getAdmins(page, limit);
    res.send(sendMsg.getResult(result));
  }catch(err) {
    next(err);
  }
}) 

//获取单个管理员
router.get("/:id", async (req, res, next) => {
  try {
    const result = await adminService.getAdminById(req.params.id)
    delete result.loginPwd;
    delete result.deletedAt;
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})



//添加管理员
router.post("/", async (req, res, next) => {
  try {
    const result = await adminService.addAdmin(req.body);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})



router.delete("/:id",async (req, res, next) => {
  try {
    const result = await adminService.deleteAdmin(req.params.id);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const result = await adminService.updateAdmin(req.params.id, req.body);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    next(err);
  }
})

module.exports = router;


