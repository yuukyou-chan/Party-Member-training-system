// 引入mongoose第三方模块
const mongoose = require("mongoose");

// 创建【申请书】集合规则
const applicationBookSchema = new mongoose.Schema({
  // 用户id
  "u_id":{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  // 上传图片路径
  imgUrl:{
    type:String,
  },
  // 审核状态
  status:{
    type:String,
    default:'未审核',
  },
  // 创建时间
  createTime:{
    type:Date,
    default:new Date()
  }
});

// 创建集合
const ApplicationBook = mongoose.model("Application_Book", applicationBookSchema);



// 验证【申请书】信息
const validateApplicationBook = {
  body: {
    
  },
};

// 将用户集合做为模块成员进行导出
module.exports = {
  ApplicationBook,
  validateApplicationBook,
};
