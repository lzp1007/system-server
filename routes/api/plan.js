const express = require("express");
const router = express.Router();
const planService = require("../../services/planService");
const sendMsg = require("../getSendResult")


//获取实习计划
router.get("/", async (req, res, next) => {
  try {
    const result = await planService.getPlan();
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
