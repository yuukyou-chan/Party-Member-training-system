// 导入申请书集合
const { ApplicationBook } = require("../../../model/applicationBook");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // 第几页，每页多少条数据，审核状态，专业，学号
  const { pageNum, pageSize, status,major,studentNumber } = req.query;

  const condition={}

  if(major){
    condition.major=major
  }

  if(status){
    condition.status=status
  }

  let result = await pagination(ApplicationBook).find(condition).page(pageNum||1).size(pageSize||10).populate("u_id").exec();

  if(studentNumber){
    result.records=result.records.filter(item=>item['u_id'].studentNumber===studentNumber)
  }else if(major){
    result.records=result.records.filter(item=>item['u_id'].major===major)
  }


  res.success({
    message:'获取申请书列表成功！',
    data:result
  })
};
