import request from '@/utils/request'
export function getExportType(params) {
  return request({
    url: '/biz/export/history/types',
    method: 'get',
    params
  })
}
export function getExportList(params) {
  return request({
    url: '/biz/export/history/list',
    method: 'get',
    params
  })
}
