import request from '@/utils/request'
// 评估师列表
export function getEsimateReportList(params) {
  return request({
    url: '/assess/assess/report',
    method: 'get',
    params
  })
}
