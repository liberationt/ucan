import request from '@/utils/request'

export function getBankCardList(params) {
  return request({
    url: '/biz/person/bank/card/list',
    method: 'get',
    params
  })
}
//添加
export function addCard(data) {
    return request({
      url: '/biz/person/bank/card',
      method: 'post',
      data
    })
  }
// 编辑
export function editCard(data) {
    return request({
      url: '/biz/person/bank/card',
      method: 'put',
      data
    })
  }
//银行卡号
export function uniqueBankAccount(params) {
    return request({
      url: '/biz/person/bank/card/forBankAccount',
      method: 'get',
      params
    })
  }
//校验身份证
export function uniqueIdCard(params) {
    return request({
      url: '/biz/person/bank/card/forIdCard',
      method: 'get',
      params
    })
  }
//查看

export function getCard(id) {
    return request({
      url: `/biz/person/bank/card/${id}`,
      method: 'get'
    })
  }
//删除
export function removeCard(id) {
    return request({
      url: `/biz/person/bank/card/${id}`,
      method: 'delete'
    })
}