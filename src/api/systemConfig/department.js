import request from '@/utils/request'

/*// 请求分页数据
export function getTableData(data) {
	return request({
		url: '/admin/system/dept/list',
		method: 'get',
		params: data
	})
}*/

//部门管理-懒加载 表格的下一级数据
export function getSubsetTableData(data) {
	return request({
		url: '/admin/system/dept/subset',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/system/dept/'+id,
		method: 'delete',
	})
}

//添加表格行数据
export function addTableRowData(data) {
	return request({
		url: '/admin/system/dept',
		method: 'post',
		params: data
	})
}

//编辑表格行数据
export function editTableRowData(data) {
	return request({
		url: '/admin/system/dept',
		method: 'put',
		params: data
	})
}

//加载部门树
export function loadDepartmentTreeData(data) {
	return request({
		url: '/admin/system/dept/treeData',
		method: 'get',
		params: data
	})
}

//根据关键字查询子级部门树
export function querySubtreeByKeyword(data) {
	return request({
		url: '/admin/system/dept/children/list',
		method: 'get',
		params: data
	})
}

//通过启用禁用，改变部门的状态
export function changeDeptStatus(data) {
	return request({
		url: '/admin/system/dept/status',
		method: 'put',
		params: data
	})
}

// 部门角色成员
export function deptMember(data) {
  return request({
    url: '/admin/system/roledept/dept/' + data,
    method: 'get'
  })
}

// 部门账户
export function notInRoleUserId(data) {
  return request({
    url: '/admin/system/users/NotInRoleUserId/',
    method: 'get',
    params: data
  })
}

// 搜索账户
export function searchIt(data) {
  return request({
    url: '/admin/system/user/account/tree/',
    method: 'get',
    params: data
  })
}

// 账户列表
export function accountList(data) {
  return request({
    url: '/admin/system/users/role/' + data,
    method: 'get',
  })
}
