/**
 * 学生数据相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const list = params => {
  return request({
    method: 'GET',
    url: 'admin/students/list',
    params
  })
}
/**
 * 获取学生专业
 */
export const getInforMajors = params => {
  return request({
    method: 'GET',
    url: '/stu/StuMajor'
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
