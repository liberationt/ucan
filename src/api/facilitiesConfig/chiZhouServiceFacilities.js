/**
 * //村民互助点  -2021
      //社区养老服务站  -2022
      //养老服务指导中心 -2023
      //池州日间照护机构 -2010_chizhou
      //综合为老服务中心 -2011_chizhou
 * */
import request from '@/utils/request';

// 查看某一机构详情
export function institutionDetailsData(id,st) {
	return request({
		url: '/biz/chizhou/service/facility/'+id+'?selectType='+st,
		method: 'get'
	})
}

// 提交数据---新增
export function submitDataAdd(data) {
	return request({
		url: '/biz/chizhou/service/facility',
		method: 'post',
		data: data,
	})
}

// 提交数据---编辑
export function submitDataEdit(data) {
	return request({
		url: '/biz/chizhou/service/facility',
		method: 'put',
		data: data,
	})
}



