<<<<<<< HEAD
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 连接数据库

// mongodb://admin_api:admin_api@8.218.144.195:27017/?authMechanism=DEFAULT&authSource=admin_api

mongoose
  .connect(
    'mongodb://admin_api:admin_api@8.218.144.195/admin_api?authSource=admin_api',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('数据库连接成功'))
  .catch((err) => {
    console.log(err);
    console.log('数据库连接失败');
  });
=======
// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 连接数据库
mongoose
  .connect("mongodb://localhost/admin_api?authSource=admin", {
    useNewUrlParser: true,
  })
  .then(() => console.log("数据库连接成功"))
  .catch((err) => {
	console.log(err);
	console.log("数据库连接失败")
  });
>>>>>>> 55f4a5d33434bd7bb210759c62bddd9eea1a7653
