const Comment = require("../models/Comment");
const Blog = require("../models/Blog")

//新增评论
exports.addComment = async function(commentObj) {
  const result = await Comment.create(commentObj);
  //让blog列表里的评论数加1
  const blogObj = await Blog.findByPk(commentObj.BlogId, {
    attributes: ["commentNumber"],
  });
  const commentNumber = blogObj.commentNumber + 1;
  await Blog.update({commentNumber}, {
    where: {
      id: commentObj.BlogId,
    }
  })
  return result;
}



//分页获取评论
exports.getComments = async function(BlogId, page, limit) {
  const result =  await Comment.findAndCountAll({
    where: {
      BlogId,
    },
    offset: (+page - 1) * limit,
    limit: +limit,
    order: [["id", "DESC"]]
  });
  const total = result.count;
  const rows = JSON.parse(JSON.stringify(result.rows));
  for(let i = 0; i < rows.length; i++) {
    delete rows[i].BlogId;
    delete rows[i].deletedAt;
  }
  return {
    total,
    rows
  }
}