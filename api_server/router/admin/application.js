// 创建路由
const route = require('express').Router();

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 获取申请书列表
route.get('/books', require('./application/get-books'));
// 获取申请表列表
route.get('/sheets', require('./application/get-sheets'));
// 获取谈话表列表
route.get('/conversations', require('./application/get-conversations'));

// 修改申请书
route.put('/book', require('./application/put-book.js'));
// 修改申请表
route.put('/sheet', require('./application/put-sheet.js'));
// 修改谈话表
route.put('/conversation', require('./application/put-conversation.js'));

// 导出路由
module.exports = route;
