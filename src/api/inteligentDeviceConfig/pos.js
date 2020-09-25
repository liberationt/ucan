import request from '@/utils/request'

export function posSearch(params) {
  return request({
    url: '/admin/service/pos',
    method: 'get',
    params
  })
}

export function getPOS(id) {
  return request({
    url: `/admin/service/pos/${id}`,
    method: 'get'
  })
}

export function addPOS(data) {
  return request({
    url: '/admin/service/pos',
    method: 'post',
    data
  })
}

export function editPOS(data) {
  return request({
    url: '/admin/service/pos',
    method: 'put',
    data
  })
}

export function removePOS(id) {
  return request({
    url: `/admin/service/pos/${id}`,
    method: 'delete'
  })
}

// 查询POS机所属机构
export function searchOrgByName(name) {
  return request({
    url: '/admin/service/provider/list/forNameOrAddr?selectType=20XX',
    method: 'get',
    params: {
      orgName: name
    }
  })
}

export function uniqueEqCode(params) {
  return request({
    url: '/admin/service/pos/forEqCode',
    method: 'get',
    params
  })
}

export function uniqueSimCode(params) {
  return request({
    url: '/admin/service/pos/forSimCode',
    method: 'get',
    params
  })
}
