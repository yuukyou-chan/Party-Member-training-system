/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块
const { User } = require("../../model/user");
// 导入数据库密码加密包
const bcrypt = require("bcryptjs");
// 导入生成 Token 包
const jwt = require("jsonwebtoken");
const config = require("../../config");

// 注册用户的处理函数
exports.regUser = async (req, res) => {
  // 处理异常——判断用户是否存在
  let user = await User.findOne({ username:req.username });
  if (user) {
    return res.cc(new Error("用户名被占用，请更换其他用户名"));
  }

  // 对用户密码进行加密
  console.log(req.body);
  // const salt = await bcrypt.genSalt(10);
  // req.password = await bcrypt.hash(req.password, salt);

  req.body.password = bcrypt.hashSync(req.body.password, 10);

  // 注册用户
  await User.create(req.body);

  //  注册成功
  res.cc("注册成功！", 0);
};

// 登录的处理函数
exports.login = async (req, res) => {
  // 接收请求参数
  const { username, password } = req.body;

  console.log(req.body);
  console.log(username,password);
  // 处理异常——用户名为空或密码为空
  if (username.trim().length == 0 || password.trim().length == 0) {
    return res.cc(new Error("请输入用户名或密码"));
  }

  // 处理异常——找不到用户
  let user = await User.findOne({ username });
  if (!user) {
    return res.cc(new Error("找不到用户"));
  }

  // 处理异常——密码不正确
  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.cc(new Error("密码错误"));
  }

  // 对用户信息进行加密———生成 Token 字符串
  const tokenStr = jwt.sign({ user, password: "" }, config.jwtSecretKey, {
    expiresIn: config.expiresIn,
  });

  // 响应
  res.send({
    status: 0,
    message: "登录成功！",
    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
    token: tokenStr,
    data: user,
  });
};

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  res.send("ok");
};
