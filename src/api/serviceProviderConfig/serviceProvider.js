import request from '@/utils/request'

export function serviceProviderSearch(params) {
  return request({
    url: '/admin/service/facility/provider/permission',
    method: 'get',
    params
  })
}

export function getServiceProvider(id, st) {
  return request({
    url: '/admin/service/facility/playRoom/' + id + '?selectType=' + st,
    method: 'get'
  })
}

export function addServiceProvider(data) {
  return request({
    url: '/admin/service/facility/playRoom',
    method: 'post',
    data
  })
}

export function editServiceProvider(data) {
  return request({
    url: '/admin/service/facility/playRoom',
    method: 'put',
    data
  })
}

export function removeServiceProvider(id) {
  return request({
    url: '/admin/service/person/provider/' + id,
    method: 'delete'
  })
}

export function getServiceProviderDict() {
  return request({
    url: '/admin/system/dict/data/provider?selectType=30XX',
    method: 'get'
  })
}
