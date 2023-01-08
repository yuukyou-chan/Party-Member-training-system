// 引入mongoose第三方模块
const mongoose = require("mongoose");

// 导入bcrypt
const bcrypt = require("bcryptjs");

// 引入joi模块
const Joi = require("joi");

// 创建学生集合规则
const studentSchema = new mongoose.Schema({
  // 学号
  studentNumber: {
    type: String,
    unique: true,
  },
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
	unique:true
  },
  // 性别
  sex: {
    type: String,
  },
  // 民族
  nation: {
    type: String,
  },
  // 班级
  class: {
    type: String,
  },
  // 入学年份
  register: {
    type: String,
  },
  // 职位
  career: {
    type: String,
  },
  // 电话
  tel: {
    type: String,
  },
  // 政治身份
  politic: {
    // 共青团员  群主 共产党员
    type: String,
	  default:'共青团员'
  },
  // 状态 入党申请人、积极分子、发展对象、共产党员
  status: {
    type: String,
  },
  // 专业
  major: {
    type: String,
  },
});

// 创建集合
const Student = mongoose.model("Student", studentSchema);

// 验证用户信息
const validateStudent = {
  body: {
    
  },
};

// 将用户集合做为模块成员进行导出
module.exports = {
  Student,
  validateStudent,
};
