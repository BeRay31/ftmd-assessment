import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Authorization from '@/api/authorization'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/forgot-password'] // no redirect whitelist

async function validateToken(token) {
  try {
    const respAuth = await Authorization.verifyToken({
      token
    })
    if (respAuth.data) {
      // If admin and token valid
      const prevUserType = localStorage.getItem('user_type')
      if (prevUserType && prevUserType !== respAuth.data.user_type.trim()) {
        await store.dispatch('permission/resetUserType')
        await store.dispatch('user/logout')
        return false
      }
      localStorage.setItem('id_user', respAuth.data.id_user)
      localStorage.setItem('user_type', respAuth.data.user_type.trim())
      const loginData = {
        id_user: respAuth.data.id_user,
        token: token,
        username: localStorage.getItem('username') || 'user',
        user_type: respAuth.data.user_type.trim()
      }
      await store.dispatch('user/login', loginData)
      return true
    } else {
      // reset token cuz not valid
      await store.dispatch('permission/resetUserType')
      await store.dispatch('user/logout')
      return false
    }
  } catch (e) {
    console.error(e.stack)
    await store.dispatch('permission/resetUserType')
    await store.dispatch('user/logout')
    return false
  }
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  let isTokenValid
  if (hasToken) {
    isTokenValid = await validateToken(hasToken)
  }
  if (isTokenValid) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.routes_user_type
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          const { user_type } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', user_type.trim())
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/logout')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
