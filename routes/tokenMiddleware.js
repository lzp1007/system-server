const { getErr } = require("./getSendResult");
const jwt = require("./jwt");

//解析token
module.exports = (req, res, next) => {
  //如果请求不是/api/login或者download开头，则需要认证
  if(req.path !== "/api/login" && !req.path.startsWith("/download")) {
    //开始认证
    const result = jwt.verify(req);
    if(result) {
      //认证通过
      req.userObj = result;
      next();
    } else{
      //认证失败
      handleNoToken(req, res, next);
    }
  }else {
    next();
    return;
  } 
}

//处理没有认证的情况
function handleNoToken(req, res, next) {
  res.send(getErr("you dont have any token to access the api", 403)).status(403);
}
