// 导入申请书集合
const { ApplicationBook } = require("../../../model/applicationBook");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

// 获取申请书列表
module.exports = async (req, res) => {
  // 第几页，每页多少条数据，审核状态，专业，学号
  const { pageNum = 1, pageSize = 10, status,major,studentNumber } = req.query;

  const condition={
    pageNum,
    pageSize
  }

  if(major){
    condition.major=major
  }

  if(status){
    condition.status=status
  }

  let result = await pagination(ApplicationBook).find(condition).page(pageNum).size(pageSize).populate("u_id").exec();

  if(studentNumber){
    result.records=result.records.filter(item=>item['u_id'].studentNumber===studentNumber)
  }

  res.send({
    status: 200,
    message: "获取申请书列表成功！",
    data: result,
  });
};
