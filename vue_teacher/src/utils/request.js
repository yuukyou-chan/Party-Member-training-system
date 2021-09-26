/**
 * 基于axios的请求模块
 */
import axios from 'axios'

// 创建一个axios实例.，复制一个axios
// 通过这个实例去发请求，把需要配置配置给这个实例来黑处理
const request =  axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
    }
)

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default requst

// 谁要使用就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//     method: ,
//     url: ''
// })
  