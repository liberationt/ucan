import request from '@/utils/request'

// 请求分页数据
export function getTableData(data) {
	return request({
		url: '/admin/system/dict/type',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/system/dict/type/'+id,
		method: 'delete',
		//params: {id}
	})
}

//添加表格行数据
export function addTableRowData(data) {
	return request({
		url: '/admin/system/dict/type',
		method: 'post',
		params: data
	})
}

//编辑表格行数据
export function editTableRowData(data) {
	return request({
		url: '/admin/system/dict/type',
		method: 'put',
		params: data
	})
}

//校验‘字典类型’是否重复
export function checkDictionaryType(data) {
	return request({
		url: '/admin/system/dict/type/checkDictTypeUnique',
		method: 'post',
		params: data
	})
}

//校验‘字典名称’是否重复
export function checkDictionaryName(data) {
	return request({
		url: '/admin/system/dict/type/checkDictNameUnique',
		method: 'post',
		params: data
	})
}
