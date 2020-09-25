import request from '@/utils/request'

//请求日志数据
export function getTableData(data) {
	return request({
		url: '/admin/monitor/logininfor',
		method: 'get',
		params: data
	})
}

//删除日志数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/monitor/logininfor/'+id,
		method: 'delete',
	})
}

//清空日志数据
export function emptyTableRowData() {
	return request({
		url: '/admin/monitor/logininfor/clean',
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