// 导入申请书集合
const { User } = require("../../../model/users");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");
const _ = require('lodash')

module.exports = async (req, res) => {
  // 第几页，每页多少条数据，审核状态，专业，学号
  const { pageNum, pageSize} = req.query;

  const condition=_.omit(req.query,['password'])

  let result = await pagination(User).find(condition).page(pageNum||1).size(pageSize||10).exec();

  res.success({
    message:'获取用户列表！',
    data:result
  })
};