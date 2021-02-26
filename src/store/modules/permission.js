import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(user_type, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(user_type)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, user_type) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(user_type, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, user_type)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  user_type: null
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_USER_TYPE: (state, user_type) => {
    state.user_type = user_type
  }
}

const actions = {
  generateRoutes({ commit }, user_type) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, user_type)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_USER_TYPE', user_type)
      resolve(accessedRoutes)
    })
  },
  resetUserType({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER_TYPE', null)
      resolve(true)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
