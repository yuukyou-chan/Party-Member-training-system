// 导入数据库模块
const { User } = require('../../../model/users');

module.exports = async (req, res) => {
  const { username, email, tel, nickname } = req.body;
  // 根据用户名找到用户数据
  let user = await User.updateOne(
    { username: username },
    { $set: {email: email, nickname: nickname, tel: tel} },
    {upsert:true}
  )

  res.success({
    message: '更新用户信息成功！',
    data: user,
  });
};
