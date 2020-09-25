import request from '@/utils/request'

// 查询接口
export function getServiceData(data) {
  return request({
	url: '/admin/policy/info',
	method: 'get',
	params: data
  })
}

//删除表格行数据
export function removeTableRowData(id) {
  return request({
	url: '/admin/policy/info/' + id,
	method: 'delete',
  })
}

// 老人标签树
export function getPolicyTree(data) {
	return request({
		url: '/admin/policy/info/dict',
		method: 'get',
		params: data
	})
}

//=======================政策咨询信息详情页接口===========================
// 查看某一用户详情
export function userDetailsData(id) {
  return request({
	url: '/admin/policy/info/'+id,
	method: 'get'
  })
}

// 提交数据---新增
export function submitDataAdd(data) {
  return request({
	url: '/admin/policy/info',
	method: 'post',
	data: data,
  })
}
// 提交数据---编辑
export function submitDataEdit(data) {
  return request({
	url: '/admin/policy/info',
	method: 'put',
	data: data
  })
}

//=======================政策咨询审核接口===========================
// 提交数据---编辑
export function pilicyInfoAudit(data) {
	return request({
		url: '/admin/policy/info/audit',
		method: 'put',
		data: data
	})
}

