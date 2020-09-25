import request from '@/utils/request'

//请求日志数据
export function getTableData(data) {
	return request({
		url: '/admin/monitor/operlog',
		method: 'get',
		params: data
	})
}

//删除日志数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/monitor/operlog/'+id,
		method: 'delete',
	})
}

//清空日志数据
export function emptyTableRowData() {
	return request({
		url: '/admin/monitor/operlog/clean',
		method: 'delete',
	})
}

// 所有下拉框的字典数据
export function allSelectdictionaryData(data) {
	return request({
		url: '/admin/system/dict/datas?dictTypes='+data,
		method: 'get'
	})
}

//查看日志数据详情
export function getTableDataDetails(data) {
	return request({
		url: '/admin/monitor/operlog',
		method: 'get',
		params: data
	})
}