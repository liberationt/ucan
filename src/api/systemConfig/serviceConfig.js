import request from '@/utils/request'

// 获取服务配置列表信息
export function getServiceConfigList(data) {
  return request({
    url: '/admin/system/service/config/list',
    method: 'get',
    params: data
  })
}

// 修改服务配置信息
export function modifyServiceConfig(data) {
  return request({
    url: '/admin/system/service/config',
    method: 'put',
    data: data
  })
}

// 添加服务配置信息
export function addServiceConfig(data) {
  return request({
    url: '/admin/system/service/config',
    method: 'post',
    data: data
  })
}

// 删除服务配置信息
export function deleteServiceConfig(id) {
  return request({
    url: '/admin/system/service/config/' + id,
    method: 'delete'
  })
}
