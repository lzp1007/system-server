const md5 = require("md5");

const Admin = require("../models/Admin");

//新增管理员
exports.addAdmin = async function(adminObj) {
  adminObj.loginPwd = md5(adminObj.loginPwd);
  let ins = await Admin.create(adminObj);
  ins =  ins.toJSON();
  delete ins.loginPwd;
  delete ins.deletedAt;
  return ins;
}


//删除管理员
exports.deleteAdmin = async function(adminId) {
  const result = await Admin.destroy({
    where: {
      id: adminId
    }
  })
  return result;
}

//更新管理员信息
exports.updateAdmin = async function(adminId, adminObj) {
  if(adminObj.loginPwd) {
    adminObj.loginPwd = md5(adminObj.loginPwd);
  }
  const result = await Admin.update(adminObj, {
    where: {
      id: adminId
    }
  })

  return result;
}

//登录
exports.login = async function(loginId, loginPwd) {
  loginPwd = md5(loginPwd);
  const result = await Admin.findOne({
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

//得到单个管理员
exports.getAdmin = async function (id) {
  let result = await Admin.findByPk(id,{
    attributes: ["id", "name", "loginId"],
  });
  if (result) {
    return result.toJSON();
  }
  return null;
};

//分页获取管理员
exports.getAdmins = async function (page = 1, limit = 10) {
  let result = await Admin.findAndCountAll({
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