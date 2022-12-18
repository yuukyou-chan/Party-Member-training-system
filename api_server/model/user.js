// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
	},
	email: {
		type: String,
		// 保证邮箱地址在插入数据库时不重复
		unique: true,
	},
	leval: {
		type: String,
	},
	// 手机号码
	tele: {
		type: String,
	},
});

// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser () {
	const salt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash('admin', salt);
	const user = await User.create({
		username: 'admin',
		password: pass,
	});
}

// createUser();

// 验证用户信息
const validateUser ={
	body: {
		username: Joi.string().min(1).max(12).required().error(new Error('用户名不符合验证规则')),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
		// nickname: Joi.string().min(2).max(12).error(new Error('用户名不符合验证规则')),
		// email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
		// tele: Joi.string().min(11).max(11).error(new Error('手机格式不符合要求')),
	}
}

// 将用户集合做为模块成员进行导出
module.exports = {
	User,
	validateUser
}