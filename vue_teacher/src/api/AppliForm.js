/**
 * 申请表模块相关请求
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getApplicationBooks = params => {
  return request({
    method: 'GET',
    url: '/admin/application/applicationBooks',
    params
  })
}
/**
 * 获取文章频道（专业）
 */
export const getMajors = params => {
  return request({
    method: 'GET',
    url: '/admin/other/majors'
  })
}
/**
 * 删除学生信息
 */
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
