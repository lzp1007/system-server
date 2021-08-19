const express = require("express");
const router = express.Router();
const blogTypeService = require("../../services/blogTypeService");
const sendMsg = require("../getSendResult")


//获取博客分类
router.get("/", async (req, res, next) => {
  try {
    const result = await blogTypeService.getBlogType();
    if(result){
      let data = JSON.parse(JSON.stringify(result))
      for(let i = 0; i < data.length; i++) {
        delete data[i].deletedAt;
      }
      res.send(sendMsg.getResult(data));
    }else {
      res.send(sendMsg(result));
    };
  } catch (err) {
    next(err);
  }
})

module.exports = router;
