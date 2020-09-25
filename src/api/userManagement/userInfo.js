import request from '@/utils/request';

// 获取账号信息
export function userInfoData() {
	return request({
		url: '/admin/system/user/detail',
		method: 'get'
	})
}
// 修改账号信息
export function editUserInfoData(data) {
	return request({
		url: '/admin/system/user/info',
		method: 'put',
		params: data,
	})
}
