import request from '@/utils/request';
import qs from 'qs';

// 查询接口
export function institutionSearch(data) {
	return request({
		url: '/admin/service/facility?selectType=20XX',
		method: 'get',
		params: data,
	})
}

// 获取机构类型
export function getInstitutionalTypeData(data) {
	return request({
		url:'/admin/system/dict/data/provider',
		method: 'get',
		params: data
	})
}

// 获取机构类型的字段配置
// 服务信息的动态化配置
export function institutionFieldConfig(data) {
	return request({
		url: '/admin/system/service/config?orgType='+data,
		method: 'get'
	})
}

// 所有下拉框的字典数据
export function allSelectdictionaryData(data) {
	return request({
		url: '/admin/system/dict/datas?dictTypes='+data,
		method: 'get'
	})
}

/*
* 删除表格行数据
 */
//日间照护机构，
//综合为老服务中心（邻里汇）
//社区养老组织
//助餐点（社区长者食堂）
export function removeTableRowData(id) {
	return request({
		url: '/admin/service/facility/'+id,
		method: 'delete',
	})
}
//村民互助点  
//社区养老服务站  
//养老服务指导中心
//池州日间照护机构
//池州综合为老服务中心
export function removeTableRowData_chizhou(id) {
    return request({
        url:'/biz/chizhou/service/facility/' + id,
        method: 'delete',
    })
}
//老年活动室
export function removeTableRowData_playRoom(id) {
	return request({
		url: '/admin/service/facility/playRoom/'+id,
		method: 'delete',
	})
}
//护理站
//健康小屋
export function removeTableRowData_healthy(id) {
	return request({
		url: '/admin/service/facility/healthy/'+id,
		method: 'delete',
	})
}
