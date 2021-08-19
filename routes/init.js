const express = require("express")
const app = express();
const port = 12306;
const path = require("path");
//静态资源目录
const staticRoot = path.resolve(__dirname, "../public");
const cors = require("cors")

//--------------------------------------------------------


//静态资源映射中间件
app.use(express.static(staticRoot))


//跨域处理中间件
const whiteList = ["null", "http://localhost:12306", "http://localhost:8080"]
app.use(cors({
  exposedHeaders: ["authorization"],   //配置后前端可以拿到headers中的token
  origin(origin, callback) {
    if(!origin) {
      callback(null, origin);
      return;
    }
    if(whiteList.includes(origin)) {
      callback(null, origin);
    }else {
      callback(new Error("not allowed"));
    }
  }
}));


// 应用token中间件
app.use(require("./tokenMiddleware"));


//处理消息体中间件
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//处理api请求
app.use("/api/login", require("./api/login"));
app.use("/api/student", require("./api/student"));
app.use("/api/admin", require("./api/admin"));
app.use("/api/teacher", require("./api/teacher"));
app.use("/api/blogtype", require("./api/blogType"));
app.use("/api/blog", require("./api/blog"));
app.use("/api/comment", require("./api/comment"));
app.use("/api/desp", require("./api/desp"));
app.use("/api/exam", require("./api/exam"));
app.use("/api/plan", require("./api/plan"));
app.use("/api/route", require("./api/route"));
app.use("/api/whoami", require("./api/whoAmI"));
app.use("/api/score", require("./api/score"));

//处理下载资源的请求
app.use("/download", require("./api/download"));

//错误处理中间件
app.use(require("./errorMiddleware"));

app.listen(port, () => {
  console.log(`serve listen on ${port}`);
})