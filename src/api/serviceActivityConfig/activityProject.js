import request from '@/utils/request'
import qs from 'qs';

// 查询接口
export function getServiceData(data) {
	return request({
		url: '/admin/service/event',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/service/event/' + id,
		method: 'delete',
	})
}


//=======================详情页接口===========================
// 查看某一用户详情
export function userDetailsData(id) {
	return request({
		url: '/admin/service/event/'+id,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/event',
		method: 'post',
		data: data,
	})
}
// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/event',
		method: 'put',
		data: data
	})
}

// 根据地址或机构名称查询
export function lazySearchOrgSite(data) {
	return request({
		url: '/admin/service/provider/list/forNameOrAddr?selectType=20XX',
		method: 'get',
		params: data
	})
}
