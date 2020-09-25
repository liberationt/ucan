import request from '@/utils/request'

export function consultantSiteSearch(params) {
  return request({
    url: '/admin/service/advisory/points',
    method: 'get',
    params
  })
}

export function getConsultantSite(id) {
  return request({
    url: `/admin/service/advisory/points/${id}`,
    method: 'get'
  })
}

export function addConsultantSite(data) {
  return request({
    url: '/admin/service/advisory/points',
    method: 'post',
    data
  })
}

export function editConsultantSite(data) {
  return request({
    url: '/admin/service/advisory/points',
    method: 'put',
    data
  })
}

export function removeConsultantSite(id) {
  return request({
    url: `/admin/service/advisory/points/${id}`,
    method: 'delete'
  })
}

// 根据名字搜索机构设施，包含10XX和20XX
export function queryOrgByName(params) {
  return request({
    url: `/admin/service/provider/list/forNameOrAddr?selectType=20XX`,
    method: 'get',
    params
  })
}

// 顾问点名称唯一性校验
export function uniqueName(params) {
  return request({
    url: '/admin/service/advisory/points/forOrgName',
    method: 'get',
    params
  })
}
