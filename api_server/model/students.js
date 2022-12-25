// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');
// 创建学生集合规则
const studentsSchema = new mongoose.Schema({
    // 学号
    s_id:{
        type:String,
    },
    // 姓名
	s_name:{
        type:String,
    },
    // 密码
    s_password:{
        type:String,
    },
    // 性别
    s_sex:{
        type:String,
    },
    // 民族
    s_nation:{
        type:String,
    },
    // 班级
    s_class:{
        type:String,
    },
    // 年份
    s_register:{
        type:String,
    },
    // 职位
    s_career:{
        type:String,
    },
    // 电话
    s_tel:{
        type:String,
    },
    // 政治身份
    s_politic:{
      // 0：共青团员  1：积极分子  2:发展对象  3：党员
        num:Number,
    },
    // 状态
    s_status:{
        type:String,
    },
    // 专业
    s_major:{
        type:String,
    },
});

// 创建集合
const Students = mongoose.model('Student', studentsSchema);

// 验证用户信息
const validateStudent ={
	body: {
        
	}
}

// 将用户集合做为模块成员进行导出
module.exports = {
	Students,
	validateStudent
}