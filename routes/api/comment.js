const express = require("express");
const router = express.Router();
const commentService = require("../../services/commentService");
const sendMsg = require("../getSendResult");

//分页获取评论
router.get("/", async (req, res, next) => {
  try {
    const BlogId = req.query.blogId;
    const page = req.query.page;
    const limit = req.query.limit; 
    const result = await commentService.getComments(BlogId, page, limit);
    if(result) {
      res.send(sendMsg.getResult(result));
    }else {
      res.send(sendMsg.getErr(result));
    }
  } catch (err ) {
    next(err);
  }
})

//提交评论
router.post("/", async(req, res, next) => {
  try {
    let commentObj = req.body; 
    commentObj.BlogId = commentObj.blogId;
    delete commentObj.blogId;
    const result = await commentService.addComment(req.body);
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