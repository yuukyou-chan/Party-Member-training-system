// 创建路由
const route = require('express').Router();

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 获取申请书列表
route.get('/applicationBooks', require('./application/applicationBooks'));

// 导出路由
module.exports = route;
