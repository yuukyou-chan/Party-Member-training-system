const route = require('express').Router()

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 获取学生基本信息
route.get('/list',  require('./students/list'))

module.exports = route