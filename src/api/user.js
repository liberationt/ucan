import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/uaa/oauth/token',
    method: 'post',
    params: data
  })
}

// 获取验证码
export function validateCode(id) {
  return request({
    url: '/uaa/validata/code/' + id,
    method: 'get',
    responseType: 'arraybuffer'
    // params: data
  })
}
export function getInfo(token) {
  return request({
    url: '/select',
    method: 'get',
    params: { token }

  })
}

export function logout(token) {
  return request({
    url: '/uaa/logout',
    method: 'get',
    params: { token }
  })
}

export function menuList(token) {
  return request({
    url: '/uaa/user/info',
    method: 'get',
    params: { token }
  })
}

/*
* 获取详情页下的‘编辑’权限
* */
export function getEditAuthority(id) {
  return request({
    url: `/admin/system/menu/parent/menu/${id}`,
    method: 'get'
  })
}

// 初次修改密码
export function updatePass(data) {
  return request({
    url: '/admin/system/user/password/first',
    method: 'post',
    params: data
  })
}

// 首次登录
export function OneLoginChecked(params) {
  return request({
    url: '/admin/system/user/first',
    method: 'get',
    params
  })
}

// 密码校验
export function getPassWord(params) {
  return request({
    url: '/admin/system/user/password/check',
    method: 'get',
    params
  })
}

//通过username获取机构的信息
export function getOrgInfo() {
  return request({
    url:'biz/use/org',
    method:'get'
  })
}
