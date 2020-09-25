import request from '@/utils/request'
/**
 * 查询问卷
 * @param {*} params
 */
export function getQuestionnaireList(params) {
  return request({
    url: '/assess/pension/assess/questionnaire/list',
    method: 'get',
    params
  })
}
/**
 * 新增问卷
 * @param {*} data
 */
export function addQuestionnaire(data) {
  return request({
    url: '/assess/pension/assess/questionnaire/save',
    method: 'post',
    data
  })
}

/**
 * 编辑问卷
 * @param {*} params
 */
export function editQuestionnaire(data) {
  return request({
    url: '/assess/pension/assess/questionnaire/update',
    method: 'put',
    data
  })
}

/**
 * 删除问卷
 * @param {*} data
 */
export function delQuestionnaire(id) {
  return request({
    url: `/assess/pension/assess/questionnaire/delete/${id}`,
    method: 'delete'
  })
}
/**
 * 新增照护项目
 * @param {*} data
 */
export function addOpinion(data) {
  return request({
    url: `/assess/pension/assess/questionnaire/save/opinion`,
    method: 'post',
    data
  })
}
/**
 * 删除照护项目
 * @param {0} id
 */
export function delOpinion(id) {
  return request({
    url: `/assess/pension/assess/questionnaire/delete/opinion/${id}`,
    method: 'delete'
  })
}
/**
 * 编辑照护项目
 * @param {*} data
 */
export function editOpinion(data) {
  return request({
    url: `/assess/pension/assess/questionnaire/update/opinion`,
    method: 'put',
    data
  })
}
/**
 * 获取照护项目关系信息
 */
export function getRelativePro(id) {
  return request({
    url: `/assess/pension/assess/questionnaire/list/project/${id}`,
    method: 'get'
  })
}
/**
 * 新增照护项目绑定问卷
 * @param {*} data
 */
export function addRelativePro(data) {
  return request({
    url: '/assess/pension/assess/questionnaire/save/project',
    method: 'post',
    data
  })
}
/**
 * 编辑照护项目绑定问卷
 * @param {*} data
 */
export function editRelativePro(data) {
  return request({
    url: `/assess/pension/assess/questionnaire/update/project`,
    method: 'put',
    data
  })
}

