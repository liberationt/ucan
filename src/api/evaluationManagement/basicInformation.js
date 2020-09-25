import request from '@/utils/request'
// 评估师列表
export function getAssessorList(params) {
  return request({
    url: '/assess/pension/assess/emp',
    method: 'get',
    params
  })
}
// 评估机构
export function getOrgList(params) {
  return request({
    url: '/biz/service/facility/provider/assess/agency/drop/down',
    method: 'get',
    params
  })
}

// 删除评估师
export function delAssessor(id) {
  return request({
    url: `/assess/pension/assess/emp/${id}`,
    method: 'delete'
  })
}
// 获取评估师机构
export function getAssessor(id) {
  return request({
    url: `/biz/assess/use/org`,
    method: 'get'
  })
}
// 保存评估师
export function addAssessor(data) {
  return request({
    url: `/assess/pension/assess/emp`,
    method: 'post',
    data: data
  })
}
export function saveAssessor(data) {
  return request({
    url: `/assess/pension/assess/emp`,
    method: 'put',
    data: data
  })
}
// 根据id查评估师
export function getAssessorDetail(id) {
  return request({
    url: `/assess/pension/assess/emp/${id}`,
    method: 'get'
  })
}

// 参数设置
export function getParameterSet(params) {
  return request({
    url: `/assess/pension/assess/parameter/setting`,
    method: 'get',
    params
  })
}
// 参数设置 保存
export function saveParameterSet(data) {
  return request({
    url: `/assess/pension/assess/parameter/setting`,
    method: 'put',
    data
  })
}

// 评估老人
export function getAssessingElderly(params) {
  return request({
    url: `/assess/obj/list`,
    method: 'get',
    params
  })
}

// 设置评估区域
export function saveArea(data) {
  return request({
    url: `/assess/pension/assess/setup/area`,
    method: 'post',
    data
  })
}
// 查询评估区域
export function getArea(id) {
  return request({
    url: `/assess/pension/assess/area/${id}`,
    method: 'get'
  })
}
// 任务池列表
export function getEsimateApplyList(params) {
  return request({
    url: '/assess/apply/task/pool/list',
    method: 'get',
    params
  })
}

// 接单
export function getOrder(params) {
  return request({
    url: '/assess/apply/order',
    method: 'get',
    params
  })
}
// 放回任务池
export function getPool(params) {
  return request({
    url: '/assess/apply/return/to/task/pool',
    method: 'get',
    params
  })
}

// 检查评估师手机号是否已经存在
export function checkMobile(params) {
  return request({
    url: '/assess/pension/assess/emp/mobile',
    method: 'get',
    params
  })
}

// 评估老i人
export function getAssessInfor(id) {
  return request({
    url: `/assess/obj/${id}`,
    method: 'get'
  })
}

// 评估师 机构是否可编辑
export function getEdit(id) {
  return request({
    url: `/assess/account/information`,
    method: 'get'
  })
}
// 评估师 机构可编辑后的机构列表

export function getAssessOrgan(id) {
  return request({
    url: `/assess/pension/agency`,
    method: 'get'
  })
}
