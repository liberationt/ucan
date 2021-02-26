import request from '@/utils/request'
const EXPORT_TIMEOUT = 50000 // 导出超时

// 机构列表
export function getOrgList(params) {
  return request({
    url: '/biz/service/facility/provider/assess/agency',
    method: 'get',
    params
  })
}

// 绑定的账户
export function getBindList(params) {
  return request({
    url: '/biz/assess/org/binding',
    method: 'get',
    params
  })
}

// 未绑定的账户
export function getUnBindList(params) {
  return request({
    url: '/biz/assess/org/user',
    method: 'get',
    params
  })
}

// 绑定用户
export function bindUser(data) {
  return request({
    url: '/biz/assess/org/user',
    method: 'post',
    data
  })
}

// 删除用户
export function delBindUser(id) {
  return request({
    url: '/biz/assess/emp/user/' + id,
    method: 'delete'
  })
}

// 搜索用户
export function searchBindList(params) {
  return request({
    url: '/biz/assess/org/user/name',
    method: 'get',
    params
  })
}

// 评估账号列表
export function getEsimateAccountList(params) {
  return request({
    url: '/biz/assess/emp/user',
    method: 'get',
    params
  })
}

// 评估绑定账号
export function bindUserAccountList(data) {
  return request({
    url: '/biz/assess/emp/user',
    method: 'put',
    data
  })
}

// 评估申请列表
export function getEsimateApplyList(params) {
  return request({
    url: '/assess/apply/list',
    method: 'get',
    params
  })
}

// 本院评估师列表
export function getOurHospList(params) {
  return request({
    url: '/assess/pension/assess/emp/our/hosp',
    method: 'get',
    params
  })
}

// 新增评估申请
export function addApply(data) {
  return request({
    url: '/assess/apply',
    method: 'post',
    data
  })
}

// 本院评估申请详情
export function getApplyDetail(params) {
  return request({
    url: '/assess/apply/detail',
    method: 'get',
    params
  })
}

// 编辑评估申请
export function editApply(data) {
  return request({
    url: '/assess/apply',
    method: 'put',
    data
  })
}

// 删除评估申请
export function delApply(id) {
  return request({
    url: `/assess/apply/${id}`,
    method: 'delete'
  })
}

// 取消评估申请
export function cancelApply(params) {
  return request({
    url: '/assess/apply/cancel',
    method: 'get',
    params
  })
}

// 支付人信息
export function payMes(params) {
  return request({
    url: '/assess/assess/payment/version1.0/getQrPayInfo',
    method: 'get',
    params
  })
}

// 支付宝二维码
export function payAli(params) {
  return request({
    url: '/assess/assess/payment/version1.0/alipay',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 微信二维码
export function payWechat(params) {
  return request({
    url: '/assess/assess/payment/version1.0/wxPay',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 支付是否成功
export function paySuccess(params) {
  return request({
    url: '/assess/assess/payment/version1.0/payStatus',
    method: 'get',
    mask: true,
    params
  })
}

// 信息
export function getMes(params) {
  return request({
    url: '/biz/cms/list',
    method: 'get',
    params
  })
}

// 查询信息
export function queryMes(params) {
  return request({
    url: '/biz/cms/list',
    method: 'get',
    params
  })
}

// 新增信息
export function addMes(data) {
  return request({
    url: '/biz/cms/save',
    method: 'post',
    data
  })
}

// 改变信息状态
export function changeMesType(data) {
  return request({
    url: '/biz/cms/update',
    method: 'put',
    data
  })
}

// 信息详情
export function mesDetail(id) {
  return request({
    url: '/biz/cms/detail/' + id,
    method: 'get'
  })
}

// Bianji详情
export function upDataDetail(data) {
  return request({
    url: '/biz/cms/update/cms',
    method: 'put',
    data
  })
}

// 导出评估申请
export function exportApply(params) {
  return request({
    url: '/assess/apply/export',
    method: 'get',
    params,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 支付成功短信
export function shortMes(params) {
  return request({
    url: '/assess/assess/send/phone',
    method: 'get',
    params
  })
}

// 获取评估时效
export function getEsTime(params) {
  return request({
    url: '/assess/pension/assess/parameter/setting',
    method: 'get',
    params
  })
}

// 评估师验证
export function getImg(assessId, empId2, empName2) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/assess/assess/report/upload/detail/' + assessId + '/' + empId2 + '/' + empName2,
    method: 'post'
  })
}

// 判断评估师是外院还是内院
export function getOutIn(params) {
  return request({
    url: '/assess/assess/table/judgeemp',
    method: 'get',
    params
  })
}

// 外院评估师列表
export function getOutList(params) {
  return request({
    url: '/assess/assess/emp/match/list',
    method: 'get',
    params
  })
}

// 评估申请下载模板
export function getShenDownload(data) {
  return request({
    url: '/assess/apply/download/template',
    method: 'post',
    responseType: 'arraybuffer'
  })
}
