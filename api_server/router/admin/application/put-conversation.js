// 导入谈话表集合
const { ApplicationConversation } = require("../../../model/applicationConversation");
const _ = require('lodash')

module.exports = async (req, res) => {
  const fields = _.pick(req.query,['_id','status']);

  if(!fields._id){
    res.cc('【_id】字段不能为空',500)
  }

  if(!fields.status){
    res.cc('【status】字段不能为空',500)
  }

try {
  let data = await ApplicationConversation.findByIdAndUpdate(fields._id,{$set:fields},{new:true,select:['-u_id']})
  res.send({
    status: 200,
    message: "修改谈话表成功！",
    data,
  });
} catch (error) {
    res.cc(error,500)
}

 
};
