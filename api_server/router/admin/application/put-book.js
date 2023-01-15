// 导入申请书集合
const { ApplicationBook } = require("../../../model/applicationBook");
const _ = require('lodash')

module.exports = async (req, res) => {
  const fields = _.pick(req.body,['_id','status','message']);

  if(!fields._id){

    return res.error({
      message:'【_id】字段不能为空',
    })
  }

  if(!fields.status){

    return res.error({
      message:'【status】字段不能为空',
    })
  }

  // 记录审核时间
  fields.checkTime=new Date()

  try {
    let data = await ApplicationBook.findByIdAndUpdate(fields._id,{$set:fields},{new:true,select:['-u_id']})
    res.success({
      data,
      message:'修改申请书成功！'
    })
  } catch (error) {
    res.error({
      message:error
    })
  }
  
};
