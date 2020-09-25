import request from '@/utils/request'
// 订单记录列表
export function getOrderRecordList(params) {
  return request({
    url: '/assess/assess/order/orderlist',
    method: 'get',
    params
  })
}

