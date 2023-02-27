// 创建路由
const route = require('express').Router();

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 用户注册
route.post('/register', require('./user/register'));
// 用户登录
route.post('/login', require('./user/login'));
// 用户登录
route.get('/userinfo', require('./user/userinfo'));
// 
route.post('/updateInfo', require('./user/updateInfo'));
// 获取用户列表
route.get('/list', require('./user/get-list'));
// 导出路由
module.exports = route;
