import request from '@/utils/request'
// 获取机构类型
export function getInstitutionalTypeData(data) {
  return request({
    url: '/admin/system/dict/data/provider/account/number',
    method: 'get',
    params: data
  })
}
// 机构配对列表
export function getOrgPairData(params) {
  return request({
    url: 'biz/service/facility/provider/assess/agency/match',
    method: 'get',
    params: params
  })
}
// 解除机构配对
export function relieveOrgPair(id) {
  return request({
    url: 'biz/service/facility/provider/assess/agency/match/' + id,
    method: 'delete'
  })
}
// 没有配对的数据列表
export function getNotMatchOrgPairData(params) {
  return request({
    url: 'biz/service/facility/provider/assess/agency/not/match',
    method: 'get',
    params: params
  })
}
// 确认配对接口
export function matchOrgPair(params) {
  return request({
    url: 'biz/service/facility/provider/assess/agency/match',
    method: 'put',
    params: params
  })
}

