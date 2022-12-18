/**
 * 在这里定义和学生信息相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块

const { Students } = require("../../model/students");

// 获取学生基本信息
exports.getStuIfon = (req, res) => {
  const stuInfo = req.body;
};

// 获取学生专业列表
exports.getStuMajor = async (req, res) => {
  // 处理异常——判断用户是否存在
  let result = await Students.find({}).distinct("s_major");

  res.send({
    status: 200,
    message: "获取学生专业信息成功！",
    data: result,
  });
};
