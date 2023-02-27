// 导入数据库模块
const { User } = require("../../../model/users");

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

  res.success({
    message:'更新用户信息成功！'
  })
};


