import request from '@/utils/request'
//获取列表
export function getLesseeInformation(params) {
  return request({
    url: '/assistive/assistive/rent/person/info',
    method: 'get',
    params
  })
}
//保存
export function saveLesseeInformation(data) {
    return request({
      url: '/assistive/assistive/rent/person/info',
      method: 'post',
      data
    })
  }
//编辑保存
export function editLesseeInformation(data) {
  return request({
    url: '/assistive/assistive/rent/person/info',
    method: 'put',
    data
  })
}
//查看
export function lookLesseeInformation(params) {
  return request({
    url: '/assistive/assistive/rent/person/info/'+params,
    method: 'get',
    params
  })
}
//删除
export function deleteLesseeInformation(params) {
  return request({
    url: '/assistive/assistive/rent/person/info/'+params,
    method: 'delete',
    params
  })
}
//身份证校验
export function echoLesseeInformation(params) {
  return request({
    url: '/assistive/assistive/rent/person/info/validate/'+params,
    method: 'get',
    params
  })
}
//租赁记录
export function recordList(params) {
  return request({
    url: '/assistive/assistive/rent/person/info/list/contract/by/idCard',
    method: 'get',
    params
  })
}