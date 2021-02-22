const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  id_user: state => state.user.id_user,
  introduction: state => state.user.introduction,
  user_type: state => state.user.user_type,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  routes_user_type: state => state.permission.user_type
}
export default getters
