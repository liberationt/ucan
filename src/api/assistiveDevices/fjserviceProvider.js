import request from '@/utils/request'
//获取列表
export function getServiceProviderList(params) {
  return request({
    url: '/assistive/assistive/rent/sp',
    method: 'get',
    params
  })
}
//查看
export function lookServiceProvider(params) {
    return request({
      url: '/assistive/assistive/rent/sp/detail',
      method: 'get',
      params
    })
}
//添加
export function addServiceProvider(data) {
  return request({
    url: '/assistive/assistive/rent/sp',
    method: 'post',
    data
  })
}
//删除
export function deleteServiceProvider(params) {
  return request({
    url: "/assistive/assistive/rent/sp/"+params,
    method: 'delete',
    params
  })
}
//更新
export function updateServiceProvider(data) {
  return request({
    url: "/assistive/assistive/rent/sp",
    method: 'put',
    data
  })
}
//校验服务商

export function checkSpName(params) {
  return request({
    url: "/assistive/assistive/rent/sp/spName",
    method: 'get',
    params
  })
}
//校验统一代码
export function checkSpOrgCode(params) {
  return request({
    url: "/assistive/assistive/rent/sp/spOrgCode",
    method: 'get',
    params
  })
}

