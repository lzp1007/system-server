
const express = require("express");
const router = express.Router();
const sendMsg = require("../getSendResult");


router.get("/", async(req, res, next) => {
  res.send(sendMsg.getResult(req.userObj));
})

module.exports = router;