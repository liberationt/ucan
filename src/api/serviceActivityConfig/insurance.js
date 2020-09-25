import request from '@/utils/request'
import qs from 'qs';
export function getInsuranceData(data) {
	return request({
		url: 'biz/long/nursing/risks/list',
		method: 'get',
		params: data
	})
}