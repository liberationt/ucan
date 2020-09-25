import Vue from 'vue'
// 常量池 存放 系统共用常量 如 提示信息

// 导出提示框 标题
export const exportTitleConstant = '导出提示'

// 导出提示框 文本内容
export const exportContentConstant = '数据导出中，5分钟后可前往 [ 数据管理 ] 中下载。'

// 导出提示框 去下载
export const exportGoDownloadConstant = '去下载'

// 导出提示框 知道了
export const exportKnowConstant = '知道了'

// 导出数据最大条数
const exportThreshold = 50000

// ------------------------------------------------------Method-------------------------------------------------------------
/**
 * 是否可以导出 （导出数量小于5万以下支持导出）
 * @param exportCount 导出数量
 */
export function canExport(exportCount) {
  // 导出数据为空 提示
  if (exportCount !== undefined && exportCount <= 0) {
    Vue.prototype.$alert(`当前导出数据为空，请更换筛选条件后重试。`, '温馨提示', {
      type: 'warning',
      confirmButtonText: exportKnowConstant
    });
    return false;
  }

  // 检查最大导出条数限制
  const isExport = exportCount <= exportThreshold;
  if (!isExport) {
    Vue.prototype.$alert(`当前导出数据超过系统限制${exportThreshold}条，请更换筛选条件后重试。`, '导出失败', {
      type: 'error',
      confirmButtonText: exportKnowConstant
    })
  }
  return isExport
}
