import request from '@/utils/request'

export function getSubsidyList(data) {
  return request({
    url: '/biz/subsidy/list',
    method: 'get',
    params: data
  })
}
export function getSubsidyDetails(id) {
  return request({
    url: `/biz/subsidy/${id}`,
    method: 'get'
  })
}
export function saveSubsidyDetails(data) {
  return request({
    url: `/biz/subsidy`,
    method: 'put',
    data
  })
}
export function deleteSubsidy(id) {
  return request({
    url: `/biz/subsidy/${id}`,
    method: 'delete'
  })
}
