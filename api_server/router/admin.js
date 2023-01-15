// 创建路由
const route = require('express').Router();

// 用户路由
route.use('/user', require('./admin/user'));
// 学生路由
route.use('/students', require('./admin/students'));
// 申请路由
route.use('/application', require('./admin/application'));
// 申请路由
route.use('/other', require('./admin/other'));

// 导出路由
module.exports = route;