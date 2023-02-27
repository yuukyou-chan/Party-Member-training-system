// 导入学生集合
const { Student } = require("../../../model/students");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // 第几页、每页多少条数据、学生姓名、学生学号、老师姓名
  const { pageNum, pageSize, studentUsername, studentNumber, teacherUsername } = req.query;

  const condition = {};

  // 学生姓名
  if (studentUsername) {
    condition.username = studentUsername;
  }

  // 学生学号
  if (studentNumber) {
    condition.studentNumber = studentNumber;
  }

  let result = await pagination(Student)
    .find(condition)
    .page(1)
    .size(10000)
    .populate("talker")
    .exec();

  // 老师姓名
  if (teacherUsername) {
    result.records = result.records.filter(item => item["talker"]?.username === teacherUsername).slice(pageNum-1,pageSize);
  }

  res.success({
    message: "获取谈话人列表成功！",
    data: result,
  });
};
