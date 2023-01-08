/**
 * 在这里定义和学生信息相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块

const { Student } = require("../../../model/students");

// 获取学生专业列表
module.exports = async (req, res) => {
  // 处理异常——判断用户是否存在
  let result = await Student.find({}).distinct("major")
  result=result.filter(item=>item)

  res.send({
    status: 200,
    message: "获取学生专业信息成功！",
    data: result,
  });
};
