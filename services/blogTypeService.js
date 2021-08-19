const BlogType = require("../models/BlogType");

//新增文章分类
exports.addBlogType = async function(BlogTypeObj){
  return await BlogType.create(BlogTypeObj);
}

//获取博客分类
exports.getBlogType = async function() {
  return await BlogType.findAll();
}
