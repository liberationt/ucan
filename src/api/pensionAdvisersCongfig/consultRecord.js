import request from '@/utils/request';

// 查询接口
export function institutionSearch(data) {
	return request({
		url: '/admin/service/advice/record',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/service/advice/record/' + id,
		method: 'delete',
	})
}

//=====================详情页接口======================
/*// 所有下拉框的字典数据
export function allSelectdictionaryData(data) {
  return request({
	url: '/admin/system/dict/datas?dictTypes='+data,
	method: 'get'
  })
}*/

// 查看某一机构详情
export function institutionDetailsData(id, st) {
	return request({
		url: '/admin/service/advice/record/' + id + '?selectType=' + st,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/admin/service/advice/record',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/admin/service/advice/record',
		method: 'put',
		data: data,
	})
}

// 顾问点数据接口
export function advempPointData(data) {
	return request({
		url: '/admin/service/advisory/points',
		method: 'get',
		data: data,
	})
}

// 顾问点数据接口
export function advempIdData(id) {
	return request({
		url: '/admin/service/advisory/emp/advpointIdList?advpointId='+id,
		method: 'get',
	})
}


