import request from '@/utils/request'

// 请求分页数据
export function getTableData(data) {
	return request({
		url: '/admin/system/role',
		method: 'get',
		params: data
	})
}

//删除表格行数据
export function removeTableRowData(id) {
	return request({
		url: '/admin/system/role/'+id,
		method: 'delete',
	})
}

//添加表格行数据
export function addTableRowData(data) {
	return request({
		url: '/admin/system/role',
		method: 'post',
		params: data
	})
}

//编辑表格行数据
export function editTableRowData(data) {
	return request({
		url: '/admin/system/role',
		method: 'put',
		params: data
	})
}

//启用-禁用角色状态
export function changeRoleStatus(data) {
	return request({
		url: '/admin/system/role/status',
		method: 'put',
		params: data
	})
}

//用户权限-菜单树
export function userPermissionsTree() {
	return request({
		url: '/admin/system/menu/tree/data',
		method: 'get',
		//params: data
	})
}

//根据用户id查询 菜单的选中的id集合
export function getMenuCheckedId(data) {
	return request({
		url: '/admin/system/menu/role/tree/Data',
		method: 'get',
		params: data
	})
}

//通过数据字典请求角色类型的值
export function queryRoleType(data) {
	return request({
		url: '/admin/system/dict/data',
		method: 'get',
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

//添加数据权限
export function addDataAccess(data) {
	return request({
		url: '/admin/system/role/rule',
		method: 'put',
		params: data
	})
}

//回显数据权限选中的树节点数组
export function echoCheckedTreeNode(id) {
	return request({
		url: '/admin/system/dept/roledept/'+id,
		method: 'get'
	})
}

// 唯一角色验证
export function validateRoleName(data) {
  return request({
    url: '/admin/system/role/name/unique',
    method: 'post',
    params: data
  })
}
// 选中角色列表
export function getCheckedList(id){
	return request({
		url: '/admin/system/roles/user/'+id,
		method: 'get'
	})
}
// 保存
export function saveCheckedList(data){
	return request({
		url: '/admin/system/user/user/role',
		method: 'post',
		data:data
	})
}

// 保存规则
export function saveRules(data){
  return request({
    url: '/admin/system/role/rule',
    method: 'post',
    data:data
  })
}

// 查找规则
export function getRules(data){
  return request({
    url: '/admin/system/role/rule/detail',
    method: 'post',
    data:data
  })
}

//添加表格行数据
export function addTableRowData0ne(data) {
  return request({
    url: '/admin/system/role/one',
    method: 'post',
    params: data
  })
}
