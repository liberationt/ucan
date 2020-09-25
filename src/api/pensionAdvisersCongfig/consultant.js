import request from '@/utils/request'

export function consultantSearch(params) {
  return request({
    url: '/admin/service/advisory/emp',
    method: 'get',
    params
  })
}

export function getConsultant(id) {
  return request({
    url: `/admin/service/advisory/emp/${id}`,
    method: 'get'
  })
}

export function addConsultant(data) {
  return request({
    url: '/admin/service/advisory/emp',
    method: 'post',
    data
  })
}

export function editConsultant(data) {
  return request({
    url: '/admin/service/advisory/emp',
    method: 'put',
    data
  })
}

export function removeConsultant(id) {
  return request({
    url: `/admin/service/advisory/emp/${id}`,
    method: 'delete'
  })
}

// 顾问员身份证唯一性接口校验
export function uniqueID(params) {
  return request({
    url: '/admin/service/advisory/emp/forIdCard',
    method: 'get',
    params
  })
}
