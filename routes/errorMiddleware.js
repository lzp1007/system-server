const getMsg = require("./getSendResult");

module.exports = function(err, req, res, next) {
  if(err) {
    err = err instanceof Error ? err.message : err,
    res.send(getMsg.getErr(err)).status(500);
  }else {
    next(); 
  }
}