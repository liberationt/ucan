// 判断是否是当前页面路由
export function isActive(obj, route) {
  return route.path === obj.$route.path
}
// 路由跳转
export function toLastView(obj, visitedViews, view, reportPath) {
  const latestView = visitedViews.slice(-1)[0]
  if (reportPath) {
    return obj.$router.push(reportPath)
  } else if (latestView) {
    obj.$router.push(latestView)
  } else {
    if (view.name === 'Dashboard') {
      obj.$router.replace({ path: '/redirect' + view.fullPath })
    } else {
      obj.$router.push('/')
    }
  }
}
// 关闭当前页面路由
export function closeSelectedTag(obj, view, reportPath) {
  obj.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(obj, view)) {
      toLastView(obj, visitedViews, view, reportPath)
    }
  })
}
