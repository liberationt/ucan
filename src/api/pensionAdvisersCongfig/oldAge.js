import request from '@/utils/request';

// 查询接口
export function searchList(data) {
  return request({
    url: '/admin/intelligent/pension/adviser',
    method: 'get',
    params: data
  })
}

// 添加
export function addList(data) {
  return request({
    url: '/admin/pension/suggest',
    method: 'post',
    data
  })
}

// 另一个查询接口
export function searchOtherList(data) {
  return request({
    url: '/admin/pension/suggest',
    method: 'get',
    params: data
  })
}

// 民生查询接口
export function searchListMs(data) {
  return request({
    url: '/biz/intelligent/peopleslivelihood/pension/adviser',
    method: 'post',
    data
  })
}

// 民生字典匹配
export function getLabel(data) {
  return request({
    url: '/biz/intelligent/peopleslivelihood/pension/adviser/label',
    method: 'get',
    params: data
  })
}
