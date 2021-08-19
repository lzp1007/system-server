const Teacher = require("../models/Teacher");
const md5 = require("md5");

//新增教师
exports.addTeacher = async function(teacherObj) {
  teacherObj.loginPwd = md5(teacherObj.loginPwd);
  let ins = await Teacher.create(teacherObj);
  ins = ins.toJSON();
  delete ins.loginPwd;
  delete ins.deletedAt;
  return ins;
}

//删除教师
exports.deleteTeacher = async function(teacherName) {
  const result = await Teacher.destroy({
    where: {
      name: teacherName
    }
  })

  return result;
}

//更新教师信息
exports.updateTeacher = async function(teacherId, teacherObj) {
  if(teacherObj.loginPwd) {
    teacherObj.loginPwd = md5(teacherObj.loginPwd);
  }
  const result = await Teacher.update(teacherObj, {
    where: {
      id: teacherId
    }
  })

  return result;
}

//登录
exports.login = async function(loginId, loginPwd) {
  loginPwd = md5(loginPwd);
  const result = await Teacher.findOne({
    where: {
      loginId,
      loginPwd
    }
  })
  if(result && result.loginId === loginId) {
    let ins = result.toJSON();
    delete ins.loginPwd;
    delete ins.deletedAt;
    return ins;
  }
  return null;
}

//得到单个教师
exports.getTeacher = async function (id) {
  let result = await Teacher.findByPk(id,{
    attributes: ["id", "name", "loginId"],
  });
  if (result) {
    return result.toJSON();
  }
  return null;
};

//分页获取教师
exports.getTeachers = async function (page = 1, limit = 10) {
  let result = await Teacher.findAndCountAll({
    attributes: ["id", "name", "loginId"], 
    offset: +page - 1, 
    limit: +limit
  }
);
  return {
    total: result.count,
    rows: JSON.parse(JSON.stringify(result.rows)),
  };
};
