// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');
// 创建学生集合规则
const appliTextSchema = new mongoose.Schema({
    // 学号
    s_id:{
        type:String,

        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
    },
    // 申请书图片
	  text:{
        type:String,
    },
    // 申请书状态 0：未审核 1：已审核 2：未通过
    t_status:{
        type:String,
    },
    // 处理人
    t_handler:{
        type:String,
    },
});

// 创建集合
const appliText = mongoose.model('appliText', studentsSchema);

// 验证用户信息
const validateStudent ={
	body: {
        
	}
}

// 将用户集合做为模块成员进行导出
module.exports = {
	appliText,
	validateStudent
}