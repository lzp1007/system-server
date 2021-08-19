const express = require("express");
const router = express.Router();
const despService = require("../../services/despService");
const sendMsg = require("../getSendResult")


//获取简介
router.get("/", async (req, res, next) => {
  try {
    const result = await despService.getDesp();
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
