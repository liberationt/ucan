import request from '@/utils/request'

//请求日志数据
export function getTableData(data) {
	return request({
		url: '/admin/system/user/upgrade',
		method: 'get',
		params: data
	})
}

//升级账号接口
export function accountUpgradeAPI(data) {
	return request({
		url: '/admin/system/user/upgrade',
		method: 'post',
		params: data
	})
}