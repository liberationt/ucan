import request from '@/utils/request'

// 按需获取字典数据
export function allSelectdictionaryData(data) {
  return request({
    url: '/admin/system/dict/datas?dictTypes=' + data,
    method: 'get'
  })
}

// 身份证格式校验
export function validateIdCard(idCard) {
  return request({
    url: `/admin/validate/${idCard}`,
    method: 'post'
  })
}
