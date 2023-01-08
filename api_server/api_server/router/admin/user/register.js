/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块
const { User } = require("../../../model/users");
// 导入数据库密码加密包
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  // 处理异常——判断用户是否存在
  let user = await User.findOne({ username:req.body.username });
  if (user) {
    return res.cc(new Error("用户名被占用，请更换其他用户名"));
  }

  // 对用户密码进行加密
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  // 注册用户
  await User.create(req.body);
  //  注册成功
  res.cc("注册成功！", 0);
};


