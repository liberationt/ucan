import request from '@/utils/request'

// 请求分页数据
export function getTableData(data) {
    return request({
        url: '/admin/system/user',
        method: 'get',
        params: data
    })
}


//删除表格行数据
export function removeTableRowData(id) {
    return request({
        url: '/admin/system/user/' + id,
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
        url: '/admin/system/user/status',
        method: 'put',
        params: data
    })
}
// 获取用户项目
export function getAccountProject() {
    return request({
        url: '/admin/system/project/use/user',
        method: 'get',
        // params: data
    })
}
// 重置密码
export function resetPass(id) {
    return request({
        url: '/admin/system/user/password/' + id,
        method: 'get',
    })
}

// 重置密码-获取出事密码
export function getInitPassword() {
    return request({
        url: '/admin/system/config/key/sys.user.initPassword',
        method: 'get',
    })
}

//获取所属部门、账号角色、数据范围树
export function department(data) {
    return request({
        url: '/admin/system/dept/treeData',
        method: 'get',
        params: data
    })
}

export function accountRole() {
    return request({
        url: '/admin/system/role/key',
        method: 'get',
        // params: data
    })
}
// 获取账号类型
export function accountType() {
    return request({
        url: '/admin/system/dict/data?dictType=sys_account_type',
        method: 'get',
        // params: data
    })
}
// 获取辅具账号类型
export function accountfjType() {
    return request({
        url: '/admin/system/dict/data?dictType=assistive_rent_type',
        method: 'get',
        // params: data
    })
}
// 获取账号数据类型
export function accountDataType() {
    return request({
        url: '/admin/system/dict/data?dictType=sys_account_data_type',
        method: 'get',
        // params: data
    })
}
// 获取入院評估账号数据类型
export function accountEsDataType() {
  return request({
    url: '/admin/system/dict/data?dictType=assess_rent_type',
    method: 'get',
    // params: data
  })
}
// 获取默认密码
export function getInitialPass() {
    return request({
        url: '/admin/system/config/key/sys.user.initPassword',
        method: 'get',
        // params: data
    })
}
// 编辑弹窗提交
export function editDialog(data) {
    return request({
        url: '/admin/system/user',
        method: 'put',
        params: data
    })
}
// 添加弹窗提交
export function addDialog(data) {
    return request({
        url: '/admin/system/user',
        method: 'post',
        params: data
    })
}

// 修改密码
export function updatePass(data) {
    return request({
        url: '/admin/system/user/password',
        method: 'post',
        params: data
    })
}
// 唯一登录号验证
export function validateLoginName(data) {
    return request({
        url: '/admin/system/user/name/unique',
        method: 'post',
        params: data
    })
}
// 获取账号类型、账号数据类型显示权限
export function getCharacters() {
    return request({
        url: '/admin/system/user/role',
        method: 'get',

    })
}

// 创建企业设置
export function createUserConfig(data) {
  return request({
    url: '/admin/system/user/logo',
    method: 'post',
    data
  })
}
// 修改企业设置
export function updateUserConfig(data) {
  return request({
    url: '/admin/system/user/logo',
    method: 'put',
    data
  })
}

// 请求消息数据
export function getMessageData() {
	return request({
		url: '/admin/msg/receive/count',
		method: 'get'
	})
}

// 消息详情---请求消息数据
export function getMessageDetailsData(data) {
	return request({
		url: '/admin/msg/receive/',
		method: 'get',
		params: data
	})
}

// 读取消息---将未读的消息状态改为已读
export function getMessageReadStatus(id) {
	return request({
		url: '/admin/msg/receive/read/state/'+id,
		method: 'get',
	})
}
