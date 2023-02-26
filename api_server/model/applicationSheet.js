// 引入mongoose第三方模块
const mongoose = require("mongoose");

// 创建【申请表】集合规则
const applicationSheetSchema = new mongoose.Schema({
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
    default:'待审核', // ['待审核','已通过','未通过']
  },
  // 创建时间
  createTime:{
    type:Date,
    default:new Date()
  },
  // 审核意见
  message:{
    type:String,
  },
   // 审核时间
   checkTime:{
    type:Date
  }
});

// 创建集合
const ApplicationSheet = mongoose.model("Application_Sheet", applicationSheetSchema);



// 验证【申请书】信息
const validateApplicationSheet = {
  body: {
    
  },
};

// 将用户集合做为模块成员进行导出
module.exports = {
  ApplicationSheet,
  validateApplicationSheet,
};
