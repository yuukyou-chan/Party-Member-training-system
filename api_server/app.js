const express = require('express')
const path = require('path')
// 创建 express 的服务器实例
const app = express()
// 导入校验中间件
const joi = require('joi')
// 导入配置文件
const config = require('./config')
// 导入解析 token 的中间件
const expressJWT = require('express-jwt')

// 连接数据库
require("./model/connect");

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
// 配置cors中间件
const cors = require('cors')
const { log } = require('console')
app.use(cors())

// 开放静态资源
app.use(express.static(path.join(__dirname, 'upload')));

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 响应数据的中间件
app.use(function (req, res, next) {
  // code = 200 为成功； code != 200 为失败； 默认将 code 的值设置为 200，方便处理失败的情况
  res.cc = function (err, code = 200) {
    res.send({
      // 状态
      code,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }


  res.success=(({data=[],message,code=200})=>{
    res.status(code).send({
      code,
      message: message instanceof Error ? message.message : message,
      data
    })
  })

  res.error=(({message,code=500})=>{
    res.status(code).send({
      code,
      message: message instanceof Error ? message.message : message,
    })
  })

  next()
})

// 错误中间件
app.use(function (err, req, res, next) {
  console.log('???')
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.error({
    message:err
  })
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.error({
    message:'身份认证失败！'
  })
  // 未知错误
  res.error({
    message:err
  })
})

// 解析 Token 中间件
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/admin\//] }))

// 管理端
app.use('/admin', require('./router/admin'))

// 移动端
app.use('/mobile', require('./router/mobile'))

// 测试