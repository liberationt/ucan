/*
*  护理站
*  健康小屋
* */
import request from '@/utils/request';

// 查看某一机构详情
export function institutionDetailsData(id,st) {
	return request({
		url: '/admin/service/facility/healthy/'+id+'?selectType='+st,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/facility/healthy',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/facility/healthy',
		method: 'put',
		data: data,
	})
}


