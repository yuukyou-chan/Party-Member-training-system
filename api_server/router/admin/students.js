const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../../router_handler/admin/students')

// 获取学生基本信息
router.get('/StuIfon', userHandler.getStuIfon)
// 获取学生专业列表
router.get('/StuMajor', userHandler.getStuMajor)

module.exports = router