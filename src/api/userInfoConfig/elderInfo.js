import request from '@/utils/request'
import qs from 'qs'

// 所属区域树获取
export function getAddress(data) {
  return request({
    url: '/admin/base/area/tree',
    method: 'get',
    params: data,
    mask: true
  })
}

// 老人标签树
export function getElderDict(data) {
  return request({
    url: '/admin/person/info/dict',
    method: 'get',
    params: data
  })
}

// 查询接口
export function elderSearch(data) {
  return request({
    url: '/admin/person/info',
    method: 'get',
    params: data
  })
}

// 删除表格行数据
export function removeTableRowData(id) {
  return request({
    url: '/admin/person/info/' + id,
    method: 'delete'
  })
}

// =======================详情页接口===========================
// 查看某一用户详情
export function userDetailsData(id) {
  return request({
    url: '/admin/person/info/' + id,
    method: 'get'
  })
}
// 所有下拉框的字典数据
export function allSelectdictionaryData() {
  return request({
    url: '/admin/person/info/dict/edit',
    method: 'get'
  })
}
// 提交数据---新增
export function submitDataAdd(data) {
  return request({
    url: '/admin/person/info',
    method: 'post',
    data: data
  })
}
// 提交数据---编辑
export function submitDataEdit(data) {
  return request({
    url: '/admin/person/info',
    method: 'put',
    data: data
  })
}
// 关系
export function relationData() {
  return request({
    url: '/admin/system/dict/data?dictType=biz_relation',
    method: 'get'
  })
}

// 迁入查询
export function getMovePerson(params) {
  return request({
    url: '/biz/move/person/id/card',
    method: 'get',
    params
  })
}
// 保存
export function saveMovePerson(data) {
  return request({
    url: '/biz/move/person',
    method: 'post',
    data: data
  })
}

// 迁入历史
export function getMovePersonList(params) {
  return request({
    url: '/biz/move/person',
    method: 'get',
    params
  })
}

// 服务项目获取已选人员列表
export function getSeletedList(params) {
  return request({
    url: '/biz/pos/service/project',
    method: 'get',
    params
  })
}
// 服务项目 关联
export function addSeletedList(data) {
  return request({
    url: '/biz/pos/service/project',
    method: 'post',
    data: data
  })
}
// 服务项目 解绑
export function removeSeletedList(data) {
  return request({
    url: '/biz/pos/service/project',
    method: 'delete',
    data: data
  })
}

// /pos/service/project
