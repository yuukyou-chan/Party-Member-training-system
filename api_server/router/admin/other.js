const route = require('express').Router()


// 获取学生基本信息
route.get('/majors',  require('./other/majors'))

module.exports = route