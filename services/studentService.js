const Student = require("../models/Student");
const md5 = require("md5");

//新增学生
exports.addStudent = async function(studentObj) {
  studentObj.loginPwd = md5(studentObj.loginPwd);
  let ins = await Student.create(studentObj);
  ins = ins.toJSON();
  delete ins.loginPwd;
  delete ins.deletedAt;
  return ins;
}


//删除学生
exports.deleteStudent = async function(studentId) {
  const result = await Student.destroy({
    where: {
      id: studentId
    }
  })

  return result;
}

//更新学生信息
exports.updateStudent = async function(studentId, studentObj) {
  if(studentObj.loginPwd) {
    studentObj.loginPwd = md5(studentObj.loginPwd);
  }
  const result = await Student.update(studentObj, {
    where: {
      id: studentId
    }
  })

  return result;
}

//登录
exports.login = async function(loginId, loginPwd) {
  loginPwd = md5(loginPwd);
  const result = await Student.findOne({
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

//获取单个学生
exports.getStudent = async function(id) {
  let result = await Student.findByPk(id);
  if(result) {
    result.toJSON();
  }
  return null;
}

//分页获取学生
exports.getStudents = async function(page = 1, limit = 10) {
  let result = await Student.findAndCountAll({
    attributes: ["id", "name", "loginId", "ClassId"],
    offset: +page - 1,
    limit: +limit
  }) 
  return {
    total: result.count,
    rows: JSON.parse(JSON.stringify(result.rows)),
  }
}


//获取单个学生
exports.getStudentById = async function (id) {
  let result = await Student.findByPk(id, {
    attributes: ["id", "name", "loginId"],
  });
  if (result) {
    return result.toJSON();
  }
  return null;
};