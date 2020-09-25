/**
 * 用户信息管理通用的接口
 */

import request from '@/utils/request'

//老人信息
// 身份证校验
export function validateID(idCard) {
  return request({
    url: `/admin/person/validate/${idCard}`,
    method: 'post'
  })
}

// 身份证唯一性校验
export function uniqueID(data) {
  return request({
    url: '/admin/person/info/idCard/unique',
    method: 'post',
    params: data
  })
}

// 根据身份证和用户类型回显用户信息
// C 残疾;H 救助;F优抚;P老人
export function echoPerson(idCard, personType) {
  return request({
    url: '/admin/person/id/card/echoEcho',
    method: 'get',
    params: {
      idCard,
      personType
    }
  })
}

