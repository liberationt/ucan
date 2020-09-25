import request from '@/utils/request';

export function socialAssistanceSearch(data) {
  return request({
    url: '/admin/person/help',
    method: 'get',
    params: data
  })
}

export function getSocialAssistance(id) {
  return request({
    url: `/admin/person/help/${id}`,
    method: 'get'
  })
}

export function addSocialAssistance(data) {
  return request({
    url: '/admin/person/help',
    method: 'post',
    data
  })
}

export function editSocialAssistance(data) {
  return request({
    url: '/admin/person/help',
    method: 'put',
    data
  })
}

export function removeSocialAssistance(id) {
  return request({
    url: `/admin/person/help/${id}`,
    method: 'delete'
  })
}

export function getSocialAssistanceDict() {
  return request({
    url: '/admin/person/help/dict',
    method: 'get'
  })
}
