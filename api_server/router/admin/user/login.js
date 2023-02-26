/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块
const { User } = require("../../../model/users");
// 导入数据库密码加密包
const bcrypt = require("bcryptjs");
// 导入生成 Token 包
const jwt = require("jsonwebtoken");
const config = require("../../../config");

module.exports= async (req, res) => {
  console.log(User);
  // 接收请求参数
  const { username, password } = req.body;
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
  if(user.password){
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.cc(new Error("密码错误"));
    }
  }else{
    if(password!=='123456'){
      return res.cc(new Error("密码错误"));
    }
  }

  // 对用户信息进行加密———生成 Token 字符串
  const tokenStr = jwt.sign({ user, password: "" }, config.jwtSecretKey, {
    expiresIn: config.expiresIn,
  });

  // 响应
  res.send({
    status: 200,
    message: "登录成功！",
    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
    token: tokenStr,
    data: user,
  });
};
