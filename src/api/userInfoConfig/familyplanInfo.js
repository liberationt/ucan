import request from '@/utils/request';

export function getDateList(params) {
  return request({
    url: '/biz/plan/birth/list',
    method: 'get',
    params
  })
}

export function getFamilyPlan(id) {
  return request({
    url: `/biz/plan/birth/${id}`,
    method: 'get'
  })
}

export function addFamilyPlan(data) {
  return request({
    url: '/biz/plan/birth',
    method: 'post',
    data
  })
}

export function editFamilyPlan(data) {
  return request({
    url: '/biz/plan/birth',
    method: 'put',
    data
  })
}

export function removeFamilyPlan(id) {
  return request({
    url: `/biz/plan/birth/${id}`,
    method: 'delete'
  })
}

export function getExServicemanDict() {
  return request({
    url: '/admin/person/special/dict',
    method: 'get'
  })
}
