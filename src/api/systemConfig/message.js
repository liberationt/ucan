import request from '@/utils/request'

// 请求分页数据
export function getTableData(data) {
	return request({
		url: '/admin/message/service',
		method: 'get',
		params: data
	})
}


//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/message/service/' + id,
		method: 'delete',
	})
}

//编辑表格行数据
export function editDialog(data) {
	return request({
		url: '/admin/message/service',
		method: 'put',
		data: data
	})
}

//添加表格行数据
export function addDialog(data) {
	return request({
		url: '/admin/message/service',
		method: 'post',
		data: data
	})
}

/*// 获取系统内置
export function getConfigType() {
	return request({
		url: '/admin/system/dict/data?dictType=sys_Yes_No',
		method: 'get',
	})
}*/


