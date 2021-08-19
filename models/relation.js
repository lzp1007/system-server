//设置模型关系
const Blog = require("./Blog");
const BlogType = require("./BlogType");
const Class = require("./Class")
const Student = require("./Student")
const Teacher = require("./Teacher")
const Comment = require("./Comment")

Class.hasMany(Student);
Student.belongsTo(Class);

Teacher.hasMany(Class);
Class.belongsTo(Teacher);

BlogType.hasMany(Blog);
Blog.belongsTo(BlogType);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);
