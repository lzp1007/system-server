const Mock = require("mockjs")
const Exam = require("../models/Exam")

//模拟考试数据
let result =  Mock.mock({
  "data|50": [
    {
      "id|+1": 1,
      "title": "@csentence(10, 15)",
      options: [
        "A：" + "@cword(5)",
        "B：" + "@cword(5)",
        "C：" + "@cword(5)",
        "D：" + "@cword(5)",
      ],
      "answer|1": ["A", "B", "C", "D"] 
    }
  ]
}).data;

for(let i = 0; i < result.length; i++) {
  result[i].options = JSON.stringify(result[i].options);
}

Exam.bulkCreate(result).then(resp => {
  console.log(resp)
}, (err) => {
  console.log(err)
});