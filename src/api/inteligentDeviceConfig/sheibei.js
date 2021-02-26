import request from '@/utils/request'

export function sbSearch(params) {
  return request({
    url: '/biz/bizServiceProviderEqs',
    method: 'get',
    params
  })
}

export function removeSb(id) {
  return request({
    url: `/biz/bizServiceProviderEqs/${id}`,
    method: 'delete'
  })
}

export function orgList(params) {
  return request({
    url: '/biz/service/provider/condition',
    method: 'get',
    params
  })
}

export function addSb(data) {
  return request({
    url: '/biz/bizServiceProviderEqs',
    method: 'post',
    data
  })
}

export function getSbDe(id) {
  return request({
    url: `/biz/bizServiceProviderEqs/${id}`,
    method: 'get'
  })
}

export function editSb(data) {
  return request({
    url: '/biz/bizServiceProviderEqs',
    method: 'put',
    data
  })
}
