import request from '@/utils/request'

export function findList(data) {
  return request({
    url: '/call/call/calloutservice/version1.0/callout',
    method: 'get',
    params: data
    // dada:data
  })
}

export function calloutphone(data) {
  return request({
    url: '/call/call/calloutservice/version1.0/calloutinsert',
    method: 'post',
    // params: data,
    data: data
  })
}

export function callBombScreen(data) {
  return request({
    url: '/call/call/callinservice/version1.0/bomScreeninsert',
    method: 'post',
    // params: data,
    data: data
  })
}

export function findPersonInfo(data) {
  return request({
    url: '/call/person/personservice/version1.0/getPersonInfoByPhone',
    method: 'get',
    params: data
    // dada:data
  })
}

export function findCallBombList(data) {
  return request({
    url: '/call/call/callinservice/version1.0/getBomScreenList',
    method: 'get',
    params: data
    // dada:data
  })
}

export function findBaseBomScreenList(data) {
  return request({
    url: '/call/call/callinservice/version1.0/getBaseBomScreenList',
    method: 'post',
    data: data
  })
}

export function callTransfer(data) {
  return request({
    url: '/call/call/callinservice/version1.0/callTransfer',
    method: 'post',
    data: data
  })
}

// 请求分页数据
export function getTableData(data) {
  return request({
    url: '/admin/message/service',
    method: 'get',
    params: data
  })
}

// 请求消息数据
export function getMessageData() {
  return request({
    url: '/admin/msg/receive/count',
    method: 'get'
  })
}

// 编辑弹窗提交
export function editDialog(data) {
  return request({
    url: '/admin/system/user',
    method: 'put',
    params: data
  })
}
// 添加弹窗提交
export function addDialog(data) {
  return request({
    url: '/admin/system/user',
    method: 'post',
    params: data
  })
}

// 添加表格行数据
export function addTableRowData(data) {
  return request({
    url: '/admin/system/dept',
    method: 'post',
    params: data
  })
}

// 编辑表格行数据
export function editTableRowData(data) {
  return request({
    url: '/admin/system/dept',
    method: 'put',
    params: data
  })
}

export function describeCdrInsert(data) {
  return request({
    url: '/call/call/callinfoservice/version1.0/describeCdrInsert',
    method: 'post',
    // params: data,
    data: data
  })
}
