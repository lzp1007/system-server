const Blog = require("../models/Blog");
const BlogType = require("../models/BlogType");

//新增文章
exports.addBlog = async function(blogObj) {
  return await Blog.create(blogObj);
}

//修改文章
exports.updateBlog = async function(blogId, blogObj) {
  return await Blog.update(blogObj, {
    where: {
      id: blogId
    }
  })
}

//查询单个文章
exports.getBlog = async function(articleId) {
  let result = await Blog.findByPk(articleId);
  result = result.toJSON();
  let blogTypeObj = await BlogType.findByPk(result.BlogTypeId);
  blogTypeObj =  blogTypeObj.toJSON()
  delete result.deletedAt;
  result.category = {
    id: blogTypeObj.id,
    name: blogTypeObj.name
  }
  return result;
}

//查询文章列表
exports.getBlogs = async function(page = 1, limit = 10, categoryId = -1) {
  limit = +limit;
  let offset = (+page - 1) * limit;
  categoryId = +categoryId;
  let result;
  let total;
  let rows;
  if(categoryId === -1) {
    result = await Blog.findAndCountAll({ offset, limit});
    total = result.count;
    rows = JSON.parse(JSON.stringify(result.rows));
    for(let i = 0; i < rows.length; i++) {
      delete rows[i].toc;
      delete rows[i].htmlContent;
      delete rows[i].deletedAt;
      delete rows[i].blogTypeId;
      rows[i].category = {
        id: -1,
        name: "全部"
      }
    }
  }else {
    result = await Blog.findAndCountAll(
      { 
        where: {
          blogTypeId: categoryId
        },
        offset, 
        limit
      });
    let blogTypeObj = await BlogType.findByPk(categoryId);
    total = result.count;
    rows = JSON.parse(JSON.stringify(result.rows));
    let name = blogTypeObj.toJSON().name;
    for(let i = 0; i < rows.length; i++) {
      delete rows[i].toc;
      delete rows[i].htmlContent;
      delete rows[i].deletedAt;
      delete rows[i].blogTypeId;
      rows[i].category = {
        id: categoryId,
        name
      }
    }
  }
  return {
    total,
    rows
  }
}

//修改浏览量
exports.updateScaner = async function(blogId) {
  let result = await Blog.findByPk(blogId,{
    attributes: ["scanNumber"]
  });
  //让评论增加1
  const scanNumber = result.scanNumber + 1;
  await Blog.update({scanNumber},{
    where: {
      id: blogId
    }
  })

  return result;
}