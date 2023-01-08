// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 连接数据库
mongoose
  .connect("mongodb://root:root@localhost/admin_api?authSource=admin", {
    useNewUrlParser: true,
  })
  .then(() => console.log("数据库连接成功"))
  .catch((err) => {
	console.log(err);
	console.log("数据库连接失败")
  });
