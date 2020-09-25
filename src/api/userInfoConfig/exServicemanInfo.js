import request from '@/utils/request';

export function exServicemanSearch(data) {
  return request({
    url: '/admin/person/special',
    method: 'get',
    params: data
  })
}

export function getExServiceman(id) {
  return request({
    url: `/admin/person/special/${id}`,
    method: 'get'
  })
}

export function addExServiceman(data) {
  return request({
    url: '/admin/person/special',
    method: 'post',
    data
  })
}

export function editExServiceman(data) {
  return request({
    url: '/admin/person/special',
    method: 'put',
    data
  })
}

export function removeExServiceman(id) {
  return request({
    url: `/admin/person/special/${id}`,
    method: 'delete'
  })
}

export function getExServicemanDict() {
  return request({
    url: '/admin/person/special/dict',
    method: 'get'
  })
}
