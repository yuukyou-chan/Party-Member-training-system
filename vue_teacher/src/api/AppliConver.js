/**
 * 谈话表块相关请求
 */
import request from '@/utils/request'

/**
 * 获取谈话表
 */
export const getApplicationConversations = params => {
  return request({
    method: 'GET',
    url: 'admin/application/conversations',
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
