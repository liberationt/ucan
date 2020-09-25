import request from '@/utils/request'

export function recordSearch(params) {
  return request({
    url: '/admin/pos/record',
    method: 'get',
    params
  })
}
