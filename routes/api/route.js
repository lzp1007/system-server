const express = require("express");
const router = express.Router();
const routeService = require("../../services/routeService");
const sendMsg = require("../getSendResult")


//获取实习路线及任务
router.get("/", async (req, res, next) => {
  try {
    const result = await routeService.getRoute();
    if(result){
      let data = JSON.parse(JSON.stringify(result));
      res.send(sendMsg.getResult(data));
    }else {
      res.send(sendMsg(result));
    };
  } catch (err) {
    next(err);
  }
})

module.exports = router;
