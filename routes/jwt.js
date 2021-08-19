const secret = "hfuter";
const jwt = require("jsonwebtoken");
//颁发jwt
exports.publish = function(res, maxAge = 24 * 3600 * 1000, info = {}) {
  const token = jwt.sign(info, secret, {
    expiresIn: maxAge,
  })

  //添加header
  res.header("authorization", token);
}

//验证jwt
exports.verify = function(req) {
  let token;
  //从headers中取token
  token = req.headers.authorization;
  if(token) {
    //获取到了token
    //authorization: bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
    try {
      const result = jwt.verify(token, secret);
      return result;
    } catch (err) {
      return null;
    }
  }else {
    //获取token失败
    return null;
  }
}