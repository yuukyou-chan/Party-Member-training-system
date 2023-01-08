/**
 * 申请书模块相关请求
 */
import request from '@/utils/request'

/**
 * 获取申请书列表
 */
export const getApplicationBooks = params => {
  return request({
    method: 'GET',
    url: '/admin/application/books',
    params
  })
}
/**
 * 获取专业
 */
export const getMajors = params => {
  return request({
    method: 'GET',
    url: '/admin/other/majors'
  })
}
