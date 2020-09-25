import request from '@/utils/request';
import qs from 'qs';

// 查询接口
export function chiZhouInstitutionSearch(data) {
	return request({
		url: '/biz/chizhou/service/provider',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function chiZhouRemoveTableRowData(id) {
	return request({
		url: '/biz/chizhou/service/provider/'+id,
		method: 'delete',
	})
}

// 获取机构类型
export function getInstitutionalTypeData(data) {
	return request({
		url:'/admin/system/dict/data/provider',
		method: 'get',
		params: data
	})
}

//=====================详情页接口======================
// 获取机构类型的字段配置
export function institutionFieldConfig(data) {
	return request({
		url: '/admin/system/service/config?orgType='+data,
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

// 查看某一机构详情
export function institutionDetailsData(id,st) {
	return request({
		url: '/biz/chizhou/service/provider/'+id+'?selectType='+st,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/biz/chizhou/service/provider',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/biz/chizhou/service/provider',
		method: 'put',
		data: data,
	})
}


