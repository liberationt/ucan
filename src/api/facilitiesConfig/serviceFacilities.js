/**
 * 社区养老组织
 * 综合为老服务中心（邻里汇）
 * 日间照护机构
 * 助餐点（社区长者食堂）
 * */
import request from '@/utils/request';

// 查看某一机构详情
export function institutionDetailsData(id,st) {
	return request({
		url: '/admin/service/facility/'+id+'?selectType='+st,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/facility',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/facility',
		method: 'put',
		data: data,
	})
}


