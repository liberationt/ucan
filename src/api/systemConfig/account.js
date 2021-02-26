import request from '@/utils/request'

// 机构账户管理 ＋ menuID
export function getOrgList(params) {
  return request({
    url: '/biz/service/facility/provider/assess/agency/account/number',
    method: 'get',
    params
  })
}
// 社区账户
export function getComList(params) {
  return request({
    url: '/biz/service/facility/provider/facility/account/number',
    method: 'get',
    params
  })
}

