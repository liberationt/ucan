import request from '@/utils/request';

// 查询接口
export function recordSearch(data) {
	return request({
		url: '/volunteer/vs/record/service',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/volunteer/vs/record/service/' + id,
		method: 'delete',
	})
}
export function removeTableRowDataList(data) {
	return request({
		url: '/volunteer/vs/record/service/batch/delete',
		method: 'post',
		data: data,
	})
}

// 查看某一机构详情
export function recordDetailsData(id) {
	return request({
		url: '/volunteer/vs/record/service/' + id,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/volunteer/vs/record/service',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/volunteer/vs/record/service',
		method: 'put',
		data: data,
	})
}

// 根据idCard查询服务对象
export function validateServiceObj(idCard) {
  return request({
    url: '/volunteer/volunteer/service/obj/validate/' + idCard,
    method: 'get',
  })
}


// 获取志愿者下拉框数据
export function getVolunteerSelectData() {
	return request({
		url: '/volunteer/volunteer/drop/down',
		method: 'get'
	})
}

// 根据选择的志愿者，加载对应的关联项目下拉列表
export function getGuanlianxiangmuSelect(id) {
	return request({
		url: '/volunteer/volunteer/service/obj/project/'+id,
		method: 'get'
	})
}
