import request from '@/utils/request'

// 服务商全称列表
export function getIpsNameList(data) {
  return request({
    url: '/order/service/provider/drop/down',
    method: 'get',
    params: data
  })
}

// 服务商列表
export function getIpsList(data) {
  return request({
    url: '/order/service/provider/list',
    method: 'get',
    params: data
  })
}

// 服务商全称唯一性
export function getIpsNameOnly(data) {
  return request({
    url: '/order/service/provider/check/orgname',
    method: 'get',
    params: data
  })
}

// 社会统一信息信用代码唯一性
export function getIpsOrgcodeOnly(data) {
  return request({
    url: '/order/service/provider/check/orgcode',
    method: 'get',
    params: data
  })
}

// 新增服务商
export function addISP(data) {
  return request({
    url: '/order/service/provider',
    method: 'post',
    data: data
  })
}

// 编辑服务商
export function editISP(data) {
  return request({
    url: '/order/service/provider',
    method: 'put',
    data: data
  })
}

// 服务商详情
export function getIpsDetail(id) {
  return request({
    url: '/order/service/provider/' + id,
    method: 'get'
  })
}

// 套餐列表
export function getMealList(data) {
  return request({
    url: '/order/service/order/setmeal/list',
    method: 'get',
    params: data
  })
}

// 禁用套餐
export function banMeal(data) {
  return request({
    url: '/order/service/order/setmeal/setUp',
    method: 'put',
    params: data
  })
}

// 服务项目列表
export function getServiceItemList(data) {
  return request({
    url: '/order/service/order/project/drop/down',
    method: 'post',
    params: data
  })
}

// 新增套餐
export function addMeal(data) {
  return request({
    url: '/order/service/order/setmeal',
    method: 'post',
    data: data
  })
}

// 套餐详情
export function getMealDetail(id) {
  return request({
    url: '/order/service/order/setmeal/' + id,
    method: 'get'
  })
}

// 删除套餐
export function delMeal(id) {
  return request({
    url: '/order/service/order/setmeal/' + id,
    method: 'delete'
  })
}

// 编辑套餐
export function editMeal(data) {
  return request({
    url: '/order/service/order/setmeal',
    method: 'put',
    data: data
  })
}

export function getFwsIs(data) {
  return request({
    url: '/order/service/provider/check/bind',
    method: 'get',
    params: data
  })
}

// 套餐下拉
export function getMealDown(data) {
  return request({
    url: '/order/service/order/setmeal/drop/down',
    method: 'get',
    params: data
  })
}

// 服务人员下拉
export function getSrviceManDown(data) {
  return request({
    url: '/order/service/order/emp/drop/down',
    method: 'get',
    params: data
  })
}

// 服务项目详情
export function getServiceItemDetail(id) {
  return request({
    url: '/order/service/order/project/' + id,
    method: 'get'
  })
}

// 新增计划
export function addPlan(data) {
  return request({
    url: '/order/service/order/plan',
    method: 'post',
    data: data
  })
}

// 计划详情
export function getPlanDetail(id) {
  return request({
    url: '/order/service/order/plan/' + id,
    method: 'get'
  })
}

// 编辑计划
export function editPlan(data) {
  return request({
    url: '/order/service/order/plan',
    method: 'put',
    data: data
  })
}

//
export function orderCounts(id) {
  return request({
    url: '/order/service/order/dispatch/obj/' + id,
    method: 'get'
  })
}

// 预览工单
export function orderLook(data) {
  return request({
    url: '/order/service/order/dispatch/previewCalendar',
    method: 'post',
    data: data
  })
}

// 提交工单
export function orderPut(data) {
  return request({
    url: '/order/service/order/dispatch/submit',
    method: 'post',
    data: data
  })
}
