import request from '@/utils/request'
//获取列表
export function getRentalPointList(params) {
    return request({
      url: '/assistive/assistive/rent/store',
      method: 'get',
      params
    })
}
//查看
export function lookRentalPoint(params) {
    return request({
      url: '/assistive/assistive/rent/store/detail',
      method: 'get',
      params
    })
}
//添加
export function addRentalPoint(data) {
  return request({
    url: '/assistive/assistive/rent/store',
    method: 'post',
    data
  })
}
//更新
export function updateRentalPoint(data) {
  return request({
    url: "/assistive/assistive/rent/store",
    method: 'put',
    data
  })
}
//删除
export function deleteRentalPoint(params) {
    return request({
      url: "/assistive/assistive/rent/store/"+params,
      method: 'delete',
      params
    })
}
//校验统一代码
export function checkOrgName(params) {
    return request({
      url: "/assistive/assistive/rent/store/orgName",
      method: 'get',
      params
    })
}
//服务商
export function getServerList(params) {
  return request({
    url: "/assistive/assistive/rent/sp/all",
    method: 'get',
    params
  })
}
//租赁点
export function getrentalOptions(params) {
  return request({
    url: "/assistive/assistive/rent/store/all",
    method: 'get',
    params
  })
}
