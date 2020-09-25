import request from '@/utils/request'
import qs from 'qs';

// 查询接口
export function getServiceData(data) {
	return request({
		url: '/admin/service/project',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/service/project/' + id,
		method: 'delete',
	})
}


//=======================详情页接口===========================
// 查看某一用户详情
export function userDetailsData(id) {
	return request({
		url: '/admin/service/project/'+id,
		method: 'get'
	})
}
// 所有下拉框的字典数据
export function allSelectdictionaryData(data) {
	return request({
		url: '/admin/system/dict/datas?dictTypes='+data,
		method: 'get'
	})
}
// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/project',
		method: 'post',
		data: data,
	})
}
// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/project',
		method: 'put',
		data: data
	})
}

// 根据地址或机构名称查询
export function lazySearchOrgSite(data) {
	return request({
		url: '/admin/service/facility/provider/forproject?selectType=20XX',
		method: 'get',
		params: data
	})
}

// 服务商名称--数据字典接口
export function getFacilitatorName(data) {
	return request({
		url:'/admin/service/facility/provider',
		method: 'get',
		params: data
	})
}

// 服务商类型--数据字典接口
export function getFacilitatorStyle(val) {
	return request({
		url:'/admin/system/dict/data/provider?selectType='+val,
		method: 'get',
		//params: data
	})
}


