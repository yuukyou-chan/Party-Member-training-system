/**
 * 在这里定义和学生信息相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块

const { Student } = require("../../../model/students");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
    // 第几页，每页多少条数据，政治身份，专业，学号
    const { pageNum = 1, pageSize = 10, politic,major,studentNumber } = req.query;

    const condition={
      pageNum,
      pageSize
    }
  
    if(major){
      condition.major=major
    }
  
    if(politic){
      condition.politic=politic
    }
  result = await pagination(Student).find(condition).page(pageNum).size(pageSize).exec()
    res.send({
      status: 200,
      message: "获取学基本信息成功！",
      data: result,
    });
  
};
