import request from '@/utils/request';
import data from "../../views/pdf/content";

// 查询接口
export function institutionSearch(data) {
	return request({
		url: '/volunteer/volunteer',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/volunteer/volunteer/' + id,
		method: 'delete',
	})
}

//=====================详情页接口======================
// 所属组织
export function socialOrgidSelectData() {
  return request({
	url: '/volunteer/volunteer/social/org/drop/down',
	method: 'get'
  })
}

// 关联项目
export function relatedProjectsSelectData() {
	return request({
		url: '/volunteer/volunteer/project/drop/down',
		method: 'get'
	})
}

// 查看某一用户详情
export function userDetailsData(id) {
	return request({
		url: '/volunteer/volunteer/'+id,
		method: 'get'
	})
}

/*// 查看某一机构详情
export function institutionDetailsData(id, st) {
	return request({
		url: '/admin/service/advice/record/' + id + '?selectType=' + st,
		method: 'get'
	})
}*/

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/volunteer/volunteer',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/volunteer/volunteer',
		method: 'put',
		data: data,
	})
}

// 顾问点数据接口
export function advempPointData(data) {
	return request({
		url: '/volunteer/service/advisory/points',
		method: 'get',
		data: data,
	})
}

// 顾问点数据接口
export function advempIdData(id) {
	return request({
		url: '/volunteer/service/advisory/emp/advpointIdList?advpointId='+id,
		method: 'get',
	})
}

// 绑定对象---志愿者数据接口
export function getBoundVolunteerData() {
	return request({
		url: '/volunteer/volunteer/drop/down',
		method: 'get',
	})
}

// 绑定对象---志愿者表格数据接口
export function getBoundVolunteerTableData(data) {
	return request({
		url: '/volunteer/volunteer/service/obj/drop/down',
		method: 'get',
		params: data
	})
}

// 绑定对象---志愿者表格数据接口-提交
export function postVolunteerTableData(data) {
	return request({
		url: '/volunteer/volunteer/obj',
		method: 'post',
		data: data
	})
}

// 获取当前志愿者的绑定对象
export function getVolunteerBoundObj(id) {
	return request({
		url: '/volunteer/volunteer/service/obj/volunteer/'+id,
		method: 'get',
	})
}

// 志愿者管理后台校验身份证
export function validateVolunteerManagementID(id) {
	return request({
		url: '/volunteer/validate/'+id,
		method: 'post',
	})
}
// //解除志愿绑定
export function unboundVolunteers(id) {
	return request({
		url: '/volunteer/volunteer/unbound/'+id,
		method: 'delete',
	})
}

