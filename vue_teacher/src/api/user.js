/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/login',
    // data 用来设置 POST 请求体
    data: data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

/**
 * 获取-用户基础资料
 * @returns Promise对象
 */
export const getUserInfoAPI = () => {
  return request({
    method: 'GET',
    url: '/my/userinfo'
  })
}

/**
 * 更新-用户基本资料
 * @param {*} param0 { id: 用户id, email: 用户邮箱, nickname: 用户昵称, user_pic: 用户头像地址, username: 用户名 }
 * @returns Promise对象
 */
export const updateUserInfoAPI = ({ id, email, nickname, userpic, username }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      email,
      nickname,
      userpic,
      username
    }
  })
}
