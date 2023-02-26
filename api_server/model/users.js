// 引入mongoose第三方模块
const mongoose = require("mongoose");

// 导入bcrypt
const bcrypt = require("bcryptjs");

// 引入joi模块
const Joi = require("joi");

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  // 用户名
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // 昵称
  nickname: {
    type: String,
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
  // 邮箱
  email: {
    type: String,
    unique: true,
  },
  // 性别
  sex: {
    type: String,
  },
  // 电话
  tel: {
    type: String,
  },
  // 角色
  role: {
    type: String,
  },
});

// 创建集合
const User = mongoose.model("User", userSchema);

async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("admin", salt);
  const user = await User.create({
    username: "admin",
    password: pass,
  });
}

// createUser();

// 验证用户信息
const validateUser = {
  body: {},
};

// 将用户集合做为模块成员进行导出
module.exports = {
  User,
  validateUser,
};
