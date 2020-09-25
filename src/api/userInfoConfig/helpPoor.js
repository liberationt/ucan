import request from '@/utils/request'

// 扶贫列表
export function getPoorList(data) {
  return request({
    url: '/biz/help/poor/list',
    method: 'get',
    params: data
  })
}

// 删除扶贫人员
export function removeTableRowData(id) {
  return request({
    url: '/biz/help/poor/' + id,
    method: 'delete'
  })
}

// 新增扶贫人员
export function addPoor(data) {
  return request({
    url: '/biz/help/poor',
    method: 'post',
    data: data
  })
}

// 编辑扶贫人员
export function editPoor(data) {
  return request({
    url: '/biz/help/poor',
    method: 'put',
    data: data
  })
}

// 查看扶贫人员详情
export function getDetailData(id) {
  return request({
    url: '/biz/help/poor/' + id,
    method: 'get'
  })
}
