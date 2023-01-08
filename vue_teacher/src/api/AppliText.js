/**
 * 申请表模块相关请求
 */
import request from '@/utils/request'

/**
 * 获取申请表列表
 */
export const getApplicationSheets = params => {
  return request({
    method: 'GET',
    url: 'admin/application/sheets',
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
