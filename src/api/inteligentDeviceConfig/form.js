import request from '@/utils/request'

export function formSearch(params) {
  return request({
    url: 'biz/service/pos/report/form',
    method: 'get',
    params
  })
}
export function getFORMxport(params) {
  return request({
    url: 'biz/service/pos/report/form/export',
    method: 'get',
    params
  })
}
