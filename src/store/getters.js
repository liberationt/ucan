const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  data: state => state.user.data,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  sysUserConfig: state => state.user.sysUserConfig,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  isShow: state => state.permission.isShow,
  errorLogs: state => state.errorLog.logs,
  message: state => state.message.message,
  tabbarItemName: state => state.message.tabbarItemName
}
export default getters
