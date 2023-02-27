// 导入学生集合
const { Student } = require("../../../model/students");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // 第几页、每页多少条数据、学生姓名、学生学号、教室姓名
  const { pageNum, pageSize, studentUsername, studentNumber, teacherUsername } =
    req.query;

  const condition = {};

  // 学生姓名
  if (studentUsername) {
    condition.username = studentUsername;
  }

  // 学生学号
  if (studentNumber) {
    condition.studentNumber = studentNumber;
  }

  console.log(condition);

  let result = await pagination(Student)
    .find(condition)
    .page(pageNum || 1)
    .size(pageSize || 10)
    .populate("talker")
    .exec();

    // 老师姓名
  if (teacherUsername) {
    result.records = result.records.filter((item) => {
        console.log(item);
        return item["talker"]?.username === teacherUsername
    });
  }

  res.success({
    message: "获取谈话人列表成功！",
    data: result,
  });
};
