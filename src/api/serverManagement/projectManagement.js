import request from '@/utils/request'
// 列表
export function getProjectList(params) {
  return request({
    url: '/order/service/order/project/list',
    method: 'get',
    params
  })
}
// 新增保存
export function saveProject(data) {
  return request({
    url: '/order/service/order/project',
    method: 'post',
    data
  })
}
// 获取详情
export function getProjectDetails(id) {
  return request({
    url: `/order/service/order/project/${id}`,
    method: 'get'
  })
}
// 删除
export function removeProject(id) {
  return request({
    url: `/order/service/order/project/${id}`,
    method: 'delete'
  })
}
// 启禁用
export function changeStatus(data) {
  return request({
    url: `/order/service/order/project/setting/service/status`,
    method: 'post',
    params: data
  })
}
// 服务计划
export function getServeList(params) {
  return request({
    url: `/order/service/order/obj/list`,
    method: 'get',
    params
  })
}
// 保存
export function saveOrderObj(data) {
  return request({
    url: `/order/service/order/obj`,
    method: 'post',
    data
  })
}
// 查询
export function getOrderObj(id) {
  return request({
    url: `/order/service/order/obj/${id}`,
    method: 'get'
  })
}
// 服务人员
export function getempList(params) {
  return request({
    url: `/order/service/order/emp/list`,
    method: 'get',
    params
  })
}
// 新增
export function saveOrderPerson(data) {
  return request({
    url: `/order/service/order/emp`,
    method: 'post',
    data
  })
}
// 根据id查询
export function getOrderPerson(id) {
  return request({
    url: `/order/service/order/emp/${id}`,
    method: 'get'
  })
}
// 工单设置
export function getOrderSetting(params) {
  return request({
    url: `/order/service/order/cfg/list`,
    method: 'get',
    params
  })
}
// 保存或者新增
export function saveOrderSetting(data) {
  return request({
    url: `/order/service/order/cfg`,
    method: 'post',
    data
  })
}
export function getOrderSettingDetail(params) {
  return request({
    url: `/order/service/order/cfg/org/config`,
    method: 'get',
    params
  })
}
// 绑定服务人员
export function saveServiceOrder(data) {
  return request({
    url: `/order/service/order`,
    method: 'post',
    data
  })
}
// 服务人员绑定账号
export function saveServiceAccount(data) {
  return request({
    url: `/order/service/order/account`,
    method: 'post',
    data
  })
}
// 设置在职离职状态
export function saveWorkStatus(data) {
  return request({
    url: `/order/service/order/emp/setting/job/status`,
    method: 'post',
    data
  })
}
// 服务商
export function getServiceProvider(params) {
  return request({
    url: `/order/service/provider/drop/down`,
    method: 'get',
    params
  })
}
// 工单列表
export function getOrderList(params) {
  return request({
    url: `/order/service/order`,
    method: 'get',
    params
  })
}
// 工单详情
export function getOrderDetail(id) {
  return request({
    url: `/order/service/order/${id}`,
    method: 'get'
  })
}
// 修改工单
export function saveOrderInfor(data) {
  return request({
    url: `/order/service/order`,
    method: 'put',
    data
  })
}

// 服务人员
export function getServePerson() {
  return request({
    url: `/order/service/order/emp/drop/down`,
    method: 'get'
  })
}
// 服务计划月派单
export function getServeMonth(params) {
  return request({
    url: `/order/service/order/formonth`,
    method: 'get',
    params
  })
}

