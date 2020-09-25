import request from '@/utils/request'
const EXPORT_TIMEOUT = 50000 // 导出超时
// 获取产品字典列表
export function getProductList(params) {
  return request({
    url: '/assistive/product/category',
    method: 'get',
    params
  })
}

// 获取产品列表

export function getRentProductList(params) {
  return request({
    url: '/assistive/rent/product',
    method: 'get',
    params
  })
}

// 产品下载模板
export function getOrdanFaultDownload(data) {
  return request({
    url: '/assistive/rent/product/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 产品导出
export function getOrdanDownload(data) {
  return request({
    url: '/assistive/rent/product/export',
    method: 'post',
    data: data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 供应商列表
export function getSupplier(params) {
  return request({
    url: '/assistive/supplier/drop/down',
    method: 'get',
    params
  })
}

// 添加租赁产品
export function addProduct(data) {
  return request({
    url: '/assistive/rent/product',
    method: 'post',
    data
  })
}

// 查看详情
export function lookDetail(params) {
  return request({
    url: '/assistive/rent/product/' + params,
    method: 'get',
    params
  })
}

// 删除列表
export function deleteList(params) {
  return request({
    url: '/assistive/rent/product/' + params,
    method: 'delete',
    params
  })
}

// 编辑保存
export function editDetail(data) {
  return request({
    url: '/assistive/rent/product',
    method: 'put',
    data
  })
}

// ////////////////////////适配师

// 获取服务商列表
export function getSpList(params) {
  return request({
    url: '/assistive/assistive/rent/sp/all',
    method: 'get',
    params
  })
}

// 获取适配师列表
export function getRentAdapterList(params) {
  return request({
    url: '/assistive/rent/adapter',
    method: 'get',
    params
  })
}

// 获取租赁点下拉数据
export function getStoreList(params) {
  return request({
    url: '/assistive/assistive/rent/store/all',
    method: 'get',
    params
  })
}

// 根据服务商获取租赁点下拉数据
export function getServerStoreList(params) {
  return request({
    url: '/assistive/assistive/rent/store/byOrgId',
    method: 'get',
    params
  })
}

// 新增适配师
export function addAdapter(data) {
  return request({
    url: '/assistive/rent/adapter',
    method: 'post',
    data
  })
}

// 下载适配师模板
export function getAdapterDownload(data) {
  return request({
    url: '/assistive/rent/adapter/export/template',
    method: 'post',
    data: data,
    responseType: 'arraybuffer'
  })
}

// 导出适配师
export function getOrdanAdapterDownload(data) {
  return request({
    url: '/assistive/rent/adapter/export',
    method: 'post',
    data: data,
    responseType: 'arraybuffer',
    timeout: EXPORT_TIMEOUT
  })
}

// 删除列表
export function deleteAdapterList(params) {
  return request({
    url: '/assistive/rent/adapter/' + params,
    method: 'delete',
    params
  })
}

// 查看详情
export function lookAdapterDetail(params) {
  return request({
    url: '/assistive/rent/adapter/' + params,
    method: 'get',
    params
  })
}

// 编辑保存
export function editAdapterDetail(data) {
  return request({
    url: '/assistive/rent/adapter',
    method: 'put',
    data
  })
}

// 获取适配师下拉列表
export function lookLease(params) {
  return request({
    url: '/assistive/assistive/rent/contract/lease/' + params,
    method: 'get',
    params
  })
}

// 根据承租人身份证号查询承租人信息
export function searchMes(params) {
  return request({
    url: '/assistive/assistive/rent/contract/lessee/' + params,
    method: 'get',
    params
  })
}
// 验证身份证号

export function validateID(idCard) {
  return request({
    url: `/assistive/assistive/rent/contract/check/${idCard}`,
    method: 'get'
  })
}

// 获取产品下拉列表
export function getRentProductListAll(params) {
  return request({
    url: '/assistive/rent/product/listAll',
    method: 'get',
    params
  })
}

// 合同列表
export function listContract(params) {
  return request({
    url: '/assistive/assistive/rent/contract',
    method: 'get',
    params
  })
}
// 合同列表 ->  作废
export function contractInvalid(params) {
  return request({
    url: '/assistive/assistive/rent/contract/' + params,
    method: 'delete',
    params
  })
}

// 获取产品详情
export function getProductDetail(params) {
  return request({
    url: '/assistive/assistive/rent/contract/product',
    method: 'get',
    params
  })
}

// 保存合同
export function addContract(data) {
  return request({
    url: '/assistive/assistive/rent/contract',
    method: 'post',
    data
  })
}

// 终止合同
export function stopContract(data) {
  return request({
    url: '/assistive/assistive/rent/contract/end',
    method: 'post',
    data
  })
}

// 历史记录
export function getHisList(params) {
  return request({
    url: '/assistive/assistive/rent/contract/history/' + params,
    method: 'get',
    params
  })
}

// 获取详情
export function getDetail(params) {
  return request({
    url: '/assistive/assistive/rent/contract/' + params,
    method: 'get',
    params
  })
}

// 添加合同附件/
export function addFile(data) {
  return request({
    url: '/assistive/assistive/rent/contract/annex',
    method: 'post',
    data
  })
}

// 获取合同附件详情/
export function getFileDetail(data) {
  return request({
    url: '/assistive/assistive/rent/contract/annex/' + data,
    method: 'get',
    data
  })
}
// 获取供应商列表
export function getSupplierList(params) {
  return request({
    url: '/assistive/supplier',
    method: 'get',
    params
  })
}
// 删除
export function deleteSupplier(params) {
  return request({
    url: '/assistive/supplier/' + params,
    method: 'delete',
    params
  })
}
// 新增
export function addSupplier(data) {
  return request({
    url: '/assistive/supplier',
    method: 'post',
    data
  })
}
// 编辑
export function editSupplier(data) {
  return request({
    url: '/assistive/supplier',
    method: 'put',
    data
  })
}
// 查看
export function lookSupplier(params) {
  return request({
    url: '/assistive/supplier/' + params,
    method: 'get',
    params
  })
}
// 保存

