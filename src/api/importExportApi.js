import request from '@/utils/request'
const EXPORT_TIMEOUT = 50000 // 导出超时

// 老人信息下载模板
export function getRepairFaultDownload(data) {
  return request({
    url: '/biz/person/export/template?ignoreField=' + data.ignoreField,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 老人信息导出
export function getElderMesDownload(data) {
  return request({
    url: '/admin/person/export',
    method: 'post',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 残疾人下载模板
export function getDisabledImportTemplate(data) {
  return request({
    url: '/biz/deformity/export/template?ignoreField=' + data.ignoreField,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 残疾人导出
export function getDisabledExport(data) {
  return request({
    url: '/admin/person/deformity/export',
    method: 'post',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 社会救助下载模板
export function getSocialAssistanceImportTemplate(data) {
  return request({
    url: '/biz/help/export/template?ignoreField=' + data.ignoreField,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 社会救助导出
export function getSocialAssistanceExport(data) {
  return request({
    url: '/admin/person/help/export',
    method: 'post',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 优抚人员下载模板
export function getExServicemanImportTemplate(data) {
  return request({
    url: '/biz/preferential/export/template?ignoreField=' + data.ignoreField,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 优抚人员导出
export function getExServicemanExport(data) {
  return request({
    url: '/admin/person/special/export',
    method: 'post',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 特困导出
export function getExtremelyPoorExport(data) {
  return request({
    url: '/biz/extremely/poor/export',
    method: 'post',
    data: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 特困模板下载
export function getExtremelyPoorDownload(data) {
  return request({
    url: '/biz/extremely/poor/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 贫困导出
export function getPoorExport(data) {
  return request({
    url: '/biz/the/poor/export',
    method: 'post',
    data: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 贫困模板下载
export function getPoorDownload(data) {
  return request({
    url: '/biz/the/poor/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 养老机构导出
export function getOrdanDownload(data) {
  return request({
    url: '/admin/service/provider/export',
    method: 'post',
    data: data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 养老机构下载模板
export function getOrdanFaultDownload(data) {
  return request({
    url: '/admin/service/provider/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 操作日志-导出
export function getOperateLogDownload(data) {
  return request({
    url: '/admin/monitor/operlog/export',
    method: 'post',
    data: data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 社区设施下载模板
export function getCommunityFacilitiesDownload(data) {
  return request({
    url: '/admin/service/facility/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 社区设施导出
export function getCommunityFacilitiesExport(data) {
  return request({
    url: '/admin/service/facility/export',
    method: 'post',
    data: data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 敬老卡下载模板
export function getCardImportTemplate() {
  return request({
    url: '/admin/person/elderly/card/export/template',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 敬老卡导出
export function getCardExport(data) {
  return request({
    url: '/admin/person/elderly/card/export',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 银行卡导出
export function getBankCardExport(data) {
  return request({
    url: '/biz/person/bank/card/export',
    method: 'post',
    data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// POS机下载模板
export function getPOSImportTemplate() {
  return request({
    url: '/admin/service/pos/export/template',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// POS机导出
export function getPOSExport(data) {
  return request({
    url: '/admin/service/pos/export',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 导入进度
export function getStatus(token) {
  return request({
    url: '/admin/import/status',
    method: 'get',
    params: { token },
    mask: true
  })
}

// ------------------------------------------------------
// 社会组织管理---下载模板
export function getSocialManagementTemplateDownload(data) {
  return request({
    url: '/volunteer/volunteer/social/org/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 社会组织管理---导出
export function getSocialManagementExport(data) {
  return request({
    url: '/volunteer/export/volunteer/org',
    method: 'get',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 志愿者管理---下载模板
export function getVolunteerManagementTemplateDownload(data) {
  return request({
    url: '/volunteer/volunteer/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 志愿者管理---导出
export function getVolunteerManagementExport(data) {
  return request({
    url: '/volunteer/export/bizVolunteer',
    method: 'get',
    params: data,
    timeout: EXPORT_TIMEOUT
  })
}

// 志愿者服务对象---下载模板
export function getVolunteerServiceObjTemplateDownload(data) {
  return request({
    url: '/volunteer/volunteer/service/obj/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 志愿者服务对象---导出
export function getVolunteerServiceObjExport(data) {
  return request({
    url: '/volunteer/export/volunteer/serviceObj',
    method: 'get',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 志愿者服务记录---下载模板
export function getVolunteerServiceRecordTemplateDownload(data) {
  return request({
    url: '/volunteer/vs/record/service/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 志愿者服务记录---导出
export function getVolunteerServiceRecordExport(data) {
  return request({
    url: '/volunteer/export/volunteer/record',
    method: 'get',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 志愿者报表---导出
export function getVolunteerReportExport(data) {
  return request({
    url: '/volunteer/export/volunteer/report',
    method: 'get',
    params: data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 辅具点 --模板下载
export function getAssistiveReportExportTemplateDownload(data) {
  return request({
    url: '/assistive/assistive/rent/store/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 租赁点导出
export function getAssistiveExport(data) {
  return request({
    url: '/assistive/assistive/rent/store/export',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 导出计生人员
export function getFamilyInfoExport(data) {
  return request({
    url: '/biz/plan/birth/export',
    method: 'post',
    data,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}
// 计生人员模板
export function getFamilyInfoImportTemplate(data) {
  return request({
    url: '/biz/plan/birth/export/template?ignoreField=' + data.ignoreField,
    method: 'post',
    responseType: 'arraybuffer'
  })
}
// 导出长护险
export function getInsuranceExport(data) {
  return request({
    url: 'biz/long/nursing/risks/export',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 下载银行卡模板
export function bankTemplateDownload(data) {
  return request({
    url: '/biz/person/bank/card/export/template?ignoreField= + data.ignoreField',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 导入进度New
export function getStatusNew(token) {
  return request({
    url: '/biz/import/status/new',
    method: 'get',
    params: { token },
    mask: true
  })
}

// 下载Excel
export function excelDownload(data) {
  return request({
    url: '/file/import/history/download/file',
    method: 'post',
    data: data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 导入历史查询
export function searchHistory(data) {
  return request({
    url: '/biz/import/history/list',
    method: 'get',
    params: data
  })
}
// 评估师导入历史查询
export function searchAssessorHistory(data) {
  return request({
    url: '/biz/import/history/assess/list',
    method: 'get',
    params: data
  })
}
// 志愿者管理---下载模板
export function downloadVolunteerTemplate(data) {
  return request({
    url: 'volunteer/download/volunteerTemplate',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 志愿者服务对象--下载模板
export function downloadServiceObjTemplate(data) {
  return request({
    url: 'volunteer/download/serviceObjTemplate',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}
// 志愿者服务对象--下载模板
export function downloadServiceRecordTemplate(data) {
  return request({
    url: 'volunteer/download/serviceRecordTemplate',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 社会组织--下载模板
export function downloadSocialOrgTemplate(data) {
  return request({
    url: 'volunteer/download/socialOrg',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 导出评估表
export function exportAssessmentForm(params) {
  return request({
    url: '/assess/assess/table/export',
    method: 'get',
    params,
    // responseType: 'arraybuffer'
    timeout: EXPORT_TIMEOUT
  })
}

// 评估师下载模板
export function getAssessorDownload(data) {
  return request({
    url: '/assess/download/assess/emp/template',
    method: 'post',
    responseType: 'arraybuffer'
  })
}
// 评估师导出
export function getAssessorExport(params) {
  return request({
    url: '/assess/export/assess/emp',
    method: 'get',
    params,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}
// 导出评估报告

export function exportAssessmentReport(params) {
  return request({
    url: '/assess/assess/report/export',
    method: 'get',
    params,
    // responseType: 'arraybuffer'
    timeout: EXPORT_TIMEOUT
  })
}

//  收款记录导出
export function getAssessorCostExport(params) {
  return request({
    url: '/assess/assess/costs/export/assess/costs',
    method: 'get',
    params,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}
// 导出  辅具合同
export function getAssessContractExport(params) {
  return request({
    url: '/assistive/assistive/rent/contract/export/contract',
    method: 'get',
    params,
    // responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}
