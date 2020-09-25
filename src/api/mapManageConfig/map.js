import request from '@/utils/request'

// 根据areaCode查看区域边界地图
export function getMapPoint(params) {
  return request({
    url: '/biz/area/map/point/' + params,
    method: 'get'
  })
}

// 添加区域边界地图
export function addMapPoint(data) {
  return request({
    url: '/biz/area/map/point',
    method: 'post',
    data
  })
}
