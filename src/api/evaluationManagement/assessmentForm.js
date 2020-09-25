import request from '@/utils/request'
// 评估师列表
export function getAssessmentList(params) {
  return request({
    url: '/assess/assess/table',
    method: 'get',
    params
  })
}
// 开始评估
export function getStartAssess(params) {
  return request({
    url: '/assess/assess/table/openStartAssess',
    method: 'get',
    params
  })
}
// 获取验证码
export function getVerificationCode(params) {
  return request({
    url: '/assess/assess/table/getVerificationCode',
    method: 'get',
    params
  })
}
// 开始评估保存
export function saveStartAssess(params) {
  return request({
    url: '/assess/assess/table/startAssess',
    method: 'get',
    params
  })
}
// 评估基本信息
export function getEditAssess(params) {
  return request({
    url: '/assess/assess/table/editAssess',
    method: 'get',
    params
  })
}
// 评估问卷信息
export function getQuestionnaire(params) {
  return request({
    url: '/assess/assess/table/editAssessQuestionnaire',
    method: 'get',
    params
  })
}
// 保存基本信息
export function updateAssess(params) {
  return request({
    url: '/assess/assess/table/updateAssess',
    method: 'put',
    data: params
  })
}
// 保存问卷信息
export function updateAssessQuestionnaire(params) {
  return request({
    url: '/assess/assess/table/updateAssessQuestionnaire',
    method: 'put',
    data: params
  })
}
// 爱好及病
export function getHobby(params) {
  return request({
    url: 'assess/extend/prop',
    method: 'get',
    params
  })
}
// 修改评估时间 -> 获取评估时间
export function editAssessDate(params) {
  return request({
    url: '/assess/assess/table/editAssessDate',
    method: 'get',
    params
  })
}

// 修改评估时间 -> 提交评估时间
export function updateAssessDate(params) {
  return request({
    url: '/assess/assess/table/updateAssessDate',
    method: 'put',
    params
  })
}

// 预览评估结果
export function getPreviewAssess(params) {
  return request({
    url: '/assess/assess/table/previewAssess',
    method: 'get',
    params
  })
}
// 提交
export function savePreview(data) {
  return request({
    url: `/assess/assess/table/commitAssess/${data.assessId}`,
    method: 'post'
  })
}

// 评估报告预览评估结果
export function getViewAssesss(params) {
  return request({
    url: '/assess/assess/report/viewAssess',
    method: 'get',
    params
  })
}
