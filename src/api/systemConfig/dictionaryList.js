import request from '@/utils/request'

// 请求分页数据
export function getTableData(data) {
	return request({
		url: '/admin/system/dict/data',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/system/dict/data/'+id,
		method: 'delete',
		//params: {id}
	})
}

//添加表格行数据
export function addTableRowData(data) {
	return request({
		url: '/admin/system/dict/data',
		method: 'post',
		params: data
	})
}

//编辑表格行数据
export function editTableRowData(data) {
	return request({
		url: '/admin/system/dict/data',
		method: 'put',
		params: data
	})
}

//校验‘字典键值’是否重复
export function checkDictionaryKey(data) {
	return request({
		url: '/admin/system/dict/data/unique',
		method: 'post',
		params: data
	})
}
