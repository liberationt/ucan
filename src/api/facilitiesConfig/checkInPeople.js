import request from '@/utils/request'

export function checkInPeopleSearch(params) {
  return request({
    url: '/admin/org/person',
    method: 'get',
    params
  })
}

export function getCheckInPeople(id) {
  return request({
    url: '/admin/org/person/' + id,
    method: 'get'
  })
}

export function addCheckInPeople(data) {
  return request({
    url: '/admin/org/person',
    method: 'post',
    data
  })
}

export function editCheckInPeople(data) {
  return request({
    url: '/admin/org/person',
    method: 'put',
    data
  })
}

export function removeCheckInPeople(id) {
  return request({
    url: '/admin/org/person/' + id,
    method: 'delete'
  })
}

// 入住人员身份证唯一性校验
export function uniqueID(params) {
  return request({
    url: '/admin/org/person/forIdCard',
    method: 'get',
    params
  })
}

// 根据身份证号获取信息
export function echoCheckInPeople(idCard) {
  return request({
    url: `/admin/org/person/info/${idCard}`,
    method: 'get'
  })
}
//服务机构
export function getOptionList() {
  return request({
    url: `/admin/org/person/providerList`,
    method: 'get'
  })
}

