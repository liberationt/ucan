import request from '@/utils/request';

// 查询接口
export function institutionSearch(data) {
	return request({
		url: '/volunteer/volunteer/statistics',
		method: 'get',
		params: data
	})
}

// 统计图---志愿者统计
export function getVolunteerChartData(data) {
	return request({
		url: '/volunteer/volunteer/getGraph',
		method: 'get',
		params: data
	})
}

// 统计图---服务对象，服务记录统计图数据
export function getServiceObjectRecordData(data) {
	return request({
		url: '/volunteer/volunteer/service/obj/statistics',
		method: 'get',
		params: data
	})
}

// 统计图---社会组织统计图数据
export function getSocialOrgData(data) {
	return request({
		url: '/volunteer/volunteer/social/org/statistics',
		method: 'get',
		params: data
	})
}


