const Mock = require("mockjs")
const Score = require("../models/Score")

//模拟考试数据
let result =  Mock.mock({
  "data|20": [
    {
      "id|+1": 1,
      "studentName": "@cname",
      "classId|1": [1, 2, 3],
      "score": "@natural(50, 100)",
    }
  ]
}).data;

Score.bulkCreate(result).then(resp => {
  console.log(resp)
}, (err) => {
  console.log(err)
});