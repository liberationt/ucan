import request from '@/utils/request'

export function pensionInfoSearch(data) {
  return request({
    url: '/biz/homeCare/services',
    method: 'get',
    params: data
  })
}

export function pensionInfoDetail(data) {
  return request({
    url: '/biz/homeCare/services/personCode',
    method: 'get',
    params: data
  })
}

export function historyInfoDetail(data) {
  return request({
    url: '/biz/homeCare/services/typeOfSubsidy',
    method: 'get',
    params: data
  })
}

