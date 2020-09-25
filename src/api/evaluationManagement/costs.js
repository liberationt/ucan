import request from '@/utils/request'
// 收款记录列表
export function getRecordList(params) {
  return request({
    url: '/assess/assess/costs/costslist',
    method: 'get',
    params
  })
}

