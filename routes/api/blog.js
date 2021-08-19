const express = require("express");
const router = express.Router();
const blogService = require("../../services/blogService");
const sendMsg = require("../getSendResult");

//获取博客列表
router.get("/", async(req, res, next) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const categoryId = req.query.categoryid || -1;
    const result = await blogService.getBlogs(page, limit, categoryId);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else{
      res.send(sendMsg.getErr(result));
    }
  }catch(err) {
    next(err);
  }
})

//获取单个博客
router.get("/:id", async (req, res, next) => {
  try {
    let result = await blogService.getBlog(req.params.id);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else{
      res.send(sendMsg.getErr(result));
    }
  } catch (err) {
    next(err);
  }
})

//修改浏览量
router.put("/scaner", async (req, res, next) => {
  try {
    const result = await blogService.updateScaner(req.body.blogId);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else{
      res.send(sendMsg.getErr(result));
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;