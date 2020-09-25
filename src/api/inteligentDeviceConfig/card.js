import request from '@/utils/request'

export function cardSearch(params) {
  return request({
    url: '/admin/person/elderly/card',
    method: 'get',
    params
  })
}

export function getCard(id) {
  return request({
    url: `/admin/person/elderly/card/${id}`,
    method: 'get'
  })
}

export function addCard(data) {
  return request({
    url: '/admin/person/elderly/card',
    method: 'post',
    data
  })
}

export function editCard(data) {
  return request({
    url: '/admin/person/elderly/card',
    method: 'put',
    data
  })
}

export function removeCard(id) {
  return request({
    url: `/admin/person/elderly/card/${id}`,
    method: 'delete'
  })
}

export function uniqueIdCard(params) {
  return request({
    url: '/admin/person/elderly/card/forIdCard',
    method: 'get',
    params
  })
}

export function uniqueEcCode(params) {
  return request({
    url: '/admin/person/elderly/card/forEcCode',
    method: 'get',
    params
  })
}

export function uniqueBankAccount(params) {
  return request({
    url: '/admin/person/elderly/card/forBankAccount',
    method: 'get',
    params
  })
}
