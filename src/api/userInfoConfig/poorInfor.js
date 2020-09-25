import request from '@/utils/request'
// 特困列表
export function getExtremelyPoorList(params) {
  return request({
    url: '/biz/extremely/poor/list',
    method: 'get',
    params
  })
}
// 特困删除
export function removeExtremelyPoor(id) {
  return request({
    url: `/biz/extremely/poor/${id}`,
    method: 'delete'
  })
}
// 获取贫困  id
export function getExtremelyData(id) {
  return request({
    url: `/biz/extremely/poor/${id}`,
    method: 'get'
  })
}
// 保存
export function addExtremelyPoor(data) {
  return request({
    url: `/biz/extremely/poor`,
    method: 'post',
    data: data
  })
}
// 编辑
export function editExtremelyPoor(data) {
  return request({
    url: `/biz/extremely/poor/`,
    method: 'put',
    data: data
  })
}
// 贫困列表
export function getPoorList(params) {
  return request({
    url: '/biz/the/poor/list',
    method: 'get',
    params
  })
}
// 贫困删除
export function removePoor(id) {
  return request({
    url: `/biz/the/poor/${id}`,
    method: 'delete'
  })
}
// 获取贫困  id
export function getDetailData(id) {
  return request({
    url: `/biz/the/poor/${id}`,
    method: 'get'
  })
}
// 保存
export function addPoor(data) {
  return request({
    url: `/biz/the/poor`,
    method: 'post',
    data: data
  })
}
// 编辑
export function editPoor(data) {
  return request({
    url: `/biz/the/poor/`,
    method: 'put',
    data: data
  })
}

