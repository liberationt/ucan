import request from '@/utils/request';
import qs from 'qs';

export function disabledSearch(data) {
  return request({
    url: '/admin/person/deformity',
    method: 'get',
    params: data
  })
}

export function getDisabled(id) {
  return request({
    url: `/admin/person/deformity/${id}`,
    method: 'get'
  })
}

export function addDisabled(data) {
  return request({
    url: '/admin/person/deformity',
    method: 'post',
    data
  })
}

export function editDisabled(data) {
  return request({
    url: '/admin/person/deformity',
    method: 'put',
    data
  })
}

export function removeDisabled(id) {
  return request({
    url: `/admin/person/deformity/${id}`,
    method: 'delete'
  })
}

export function getDisabledDict() {
  return request({
    url: '/admin/person/deformity/dict',
    method: 'get'
  })
}
