import request from '@/utils/request'

// 查询接口
export function getServiceData(data) {
	return request({
		url: '/admin/service/record',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/service/record/' + id,
		method: 'delete',
	})
}


//=======================详情页接口===========================
// 查看某一用户详情
export function userDetailsData(id) {
	return request({
		url: '/admin/service/record/'+id,
		method: 'get'
	})
}
// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/record',
		method: 'post',
		data: data,
	})
}
// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/record',
		method: 'put',
		data: data
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

// 服务项目--数据字典接口
export function getServiceItemData(id) {
	return request({
		url:'/admin/service/project/name/'+id,
		method: 'get',
		//params: data
	})
}

// 服务人员--数据字典接口
export function getServiceManData(id) {
	return request({
		url:'/admin/service/person/full/name/'+id,
		method: 'get',
		//params: data
	})
}

//服务记录
// 身份证校验:唯一性校验，数据回显
export function validateID_serverRecord(idCard) {
	return request({
		url: `/admin/service/record/validate/${idCard}`,
		method: 'get'
	})
}

