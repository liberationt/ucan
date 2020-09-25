import request from '@/utils/request'

// 所属区域树获取
export function getAddress(data) {
	return request({
		url: '/admin/base/area/tree',
		method: 'get',
		params: data,
		mask: true
	})
}

// 老人标签树
export function getElderDict(data) {
	return request({
		url: '/admin/person/info/dict',
		method: 'get',
		params: data
	})
}

// 查询接口
export function elderSearch(data) {
	return request({
		url: '/admin/service/person',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/service/person/' + id,
		method: 'delete',
	})
}


//=======================详情页接口===========================
// 查看某一用户详情
export function userDetailsData(id) {
	return request({
		url: '/admin/service/person/'+id,
		method: 'get'
	})
}
// 所有下拉框的字典数据
export function allSelectdictionaryData() {
	return request({
		url: '/admin/person/info/dict/edit',
		method: 'get'
	})
}
// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/person',
		method: 'post',
		data: data,
	})
}
// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/person',
		method: 'put',
		data: data
	})
}
// 关系
export function relationData() {
	return request({
		url: '/admin/system/dict/data?dictType=biz_relation',
		method: 'get'
	})
}

// 服务商--数据字典接口
export function getInstitutionalTypeData(data) {
	return request({
		url:'/admin/service/facility/provider/permission',
		method: 'get',
		params: data
	})
}

// 服务人员
// 身份证校验:唯一性校验，数据回显
export function validateID_serverPersonal(idCard) {
	return request({
		url: `/admin/service/person/validate/${idCard}`,
		method: 'get'
	})
}
