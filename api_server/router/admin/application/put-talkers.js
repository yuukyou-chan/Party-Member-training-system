// 导入学生集合
const { Student } = require("../../../model/students");
const _ = require('lodash')

module.exports = async (req, res) => {
  // 学生唯一id、谈话人
  const fields = _.pick(req.body,['_id','talker']);
  if(!fields._id){
    return res.error({
      message:'【_id】字段不能为空'
    })
  }

  if(!fields.talker){
    return res.error({
      message:'【talker】字段不能为空'
    })
  }

  try {
    let data = await Student.findByIdAndUpdate(fields._id,{$set:fields},{new:true}).populate("talker",'-password')
    res.success({
      data,
      message:'修改谈话人成功！'
    })
  } catch (error) {
    res.error({
      message:error
    })
  }

};
