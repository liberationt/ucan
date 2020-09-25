import request from '@/utils/request'

// 查询接口
export function institutionSearch(data) {
  return request({
    url: '/volunteer/move/service/obj',
    method: 'get',
    params: data
  })
}
