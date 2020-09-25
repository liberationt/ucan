import request from '@/utils/request'

// 请求分页数据
export function getTableData(data) {
    return request({
        url: '/screen/screen/data/config',
        method: 'get',
        params: data
    })
}

//删除表格行数据
export function removeTableRowData(id) {
  return request({
    url: `/screen/screen/data/config/${id}`,
    method: 'delete'
  })
}

//禁用启用
export function disableTableRowData(params) {
  return request({
    url: `/screen/screen/data/config/disable`,
    method: 'put',
    params
  })
}

//更新
export function updateTableRowData(data) {
  return request({
    url: `/screen/screen/data/config`,
    method: 'put',
    data
  })
}

//添加
export function addTableRowData(data) {
  return request({
    url: `/screen/screen/data/config`,
    method: 'post',
    data
  })
}
