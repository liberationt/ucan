import request from '@/utils/request'

// 筛选区域，params: {areaName, areaCode}
export function searchArea(params) {
  return request({
    url: '/admin/base/area/child/parent',
    method: 'get',
    params
  })
}

// 区域维护应能访问到所有区域数据，所有 scope 设为 all
export function getAreaChildren(areaCode) {
  return request({
    url: '/admin/base/area/tree',
    method: 'get',
    params: {
      areaCode,
      scope: 'All'
    }
  })
}

export function addArea(data) {
  return request({
    url: '/admin/base/area',
    method: 'post',
    data
  })
}

export function editArea(data) {
  return request({
    url: '/admin/base/area',
    method: 'put',
    data
  })
}

