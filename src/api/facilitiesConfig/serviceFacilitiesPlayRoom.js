/*
*  老年活动室
*  养老辅具展示点
* */
import request from '@/utils/request';

// 查看某一机构详情
export function institutionDetailsData(id,st) {
	return request({
		url: '/admin/service/facility/playRoom/'+id+'?selectType='+st,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/facility/playRoom',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/facility/playRoom',
		method: 'put',
		data: data,
	})
}
