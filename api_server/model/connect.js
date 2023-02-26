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
