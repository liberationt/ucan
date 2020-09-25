import request from '@/utils/request'
const EXPORT_TIMEOUT = 50000 // 导出超时
export function getDateList(params) {
  return request({
    url: '/sms/sms/smsservice/sms/listupsms',
    method: 'get',
    params
  })
}
// 导出
export function getDataDownload(data) {
  return request({
    url: '/sms/sms/smsservice/sms/export',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}
