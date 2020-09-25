import request from '@/utils/request'

// 请求分页数据-------
export function getTableData(data) {
	return request({
		url: '/admin/system/menu',
		method: 'get',
		params: data
	})
}

/*// 查询表格数据
export function searchTableData(data) {
	return request({
		url: '/admin/system/menu',
		method: 'get',
		params: data
	})
}*/

//删除表格行数据-----
export function removeTableRowData(id) {
	return request({
		url: '/admin/system/menu/'+id,
		method: 'delete',
	})
}

//添加表格行数据------
export function addTableRowData(data) {
	return request({
		url: '/admin/system/menu',
		method: 'post',
		params: data
	})
}

//编辑表格行数据
export function editTableRowData(data) {
	return request({
		url: '/admin/system/menu',
		method: 'put',
		params: data
	})
}

//加载模块树
export function loadDepartmentTreeData(data) {
	return request({
		url: '/admin/system/menu/tree/data',
		method: 'get',
		params: data
	})
}

//根据关键字查询子级部门树
export function querySubtreeByKeyword(data) {
	return request({
		url: '/admin/system/menu/children/list',
		method: 'get',
		params: data
	})
}

//递归查找 模块 祖籍树节点集合
export function queryAncestralTreeNodes(id) {
	return request({
		url: '/admin/system/menu/tree/'+id,
		method: 'get',
		//params: data
	})
}

// 模块（菜单）类型接口
export function queryModuleType(data) {
	return request({
		url: '/admin/system/dict/data',
		method: 'get',
		params: data
	})
}

// 判断是否可以禁用
export function isEnable(id) {
  return request({
    url: `/admin/system/menu/enbale/${id}`,
    method: 'get'
  })
}

// 校验菜单名字
export function uniqueMenu(data) {
  return request({
    url: '/admin/system/menu/type/unique',
    method: 'post',
    params: data
  })
}
//系统维护
//获取数量
export function getMaintenance(params) {
	return request({
		url: '/volunteer/volunteer/maintenance',
		method: 'get',
		params
	})
}
//删除
export function deleteMaintenance(params) {
	return request({
		url: '/volunteer/volunteer/maintenance',
		method: 'Delete',
		params
	})
}

// 获取规则
export function getRule(params) {
  return request({
    url: '/admin/system/menu/rule',
    method: 'get',
    params
  })
}

// 新增规则
export function addRule(data) {
  return request({
    url: '/admin/system/menu/rule',
    method: 'post',
    data
  })
}

// 删除规则
export function deleteRule(params) {
  return request({
    url: '/admin/system/menu/rule/' + params,
    method: 'Delete'
  })
}
