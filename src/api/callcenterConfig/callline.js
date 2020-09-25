import request from '@/utils/request'

export function callOnline(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callOnlineinsert',
    method: 'post',
    // params: data,
    data: data
  })
}

export function callOffline(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callOfflineinsert',
    method: 'post',
    data: data
  })
}

export function callUnlink(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callUnlink',
    method: 'post',
    data: data
  })
}

export function callRefuse(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callRefuse',
    method: 'post',
    data: data
  })
}

export function callPause(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callPause',
    method: 'post',
    data: data
  })
}

export function callUnPause(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callUnPause',
    method: 'post',
    data: data
  })
}

export function calloutCancel(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/calloutCancel',
    method: 'post',
    data: data
  })
}

export function callInteract(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callInteract',
    method: 'post',
    data: data
  })
}

export function callUnHold(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callUnHold',
    method: 'post',
    data: data
  })
}

export function callHold(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callHold',
    method: 'post',
    data: data
  })
}


export function callUnMute(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callUnMute',
    method: 'post',
    data: data
  })
}

export function callMute(data) {
  return request({
    url: '/call/call/calllineservice/version1.0/callMute',
    method: 'post',
    data: data
  })
}
