/**
 * 在这里定义和学生信息相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块
const db = require('../../db/index')

// 获取学生基本信息
exports.getStuIfon = (req, res) => {
  const stuInfo = req.body
}

// 获取学生专业列表
exports.getStuMajor = (req, res) => {
  const sql = `select distinct s_major from students`
  db.query(sql, function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    const arr = []
    results.forEach(i => arr.push(i.s_major))
    res.send({
      status: 200,
      message: '获取学生专业信息成功！',
      data: arr,
    })
  })
}
