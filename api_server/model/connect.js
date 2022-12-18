// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 连接数据库
mongoose
  .connect("mongodb://localhost/admin_api", {
    useNewUrlParser: true,
  })
  .then(() => console.log("数据库连接成功"))
  .catch((err) => {
	console.log(err);
	console.log("数据库连接失败")
  });
