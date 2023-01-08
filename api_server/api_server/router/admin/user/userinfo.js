const { User } = require("../../../model/users");

// 获取用户基本信息的处理函数
module.exports = async (req, res) => {
  const { _id } = req.query;

  // 处理异常——找不到用户
  let user = await User.findOne({ _id });
 
  if (!user) {
    return res.cc(new Error("找不到用户"));
  }

  user.password = "";

  res.send({
    status: 0,
    message: "获取用户基本信息成功！",
    data: user,
  });
};
