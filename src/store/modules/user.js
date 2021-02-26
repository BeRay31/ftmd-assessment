import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  user_type: '',
  id_user: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID_USER: (state, id_user) => {
    state.id_user = id_user
  },
  SET_USER_TYPE: (state, user_type) => {
    state.user_type = user_type
  }
}

const actions = {
  // user login
  login({ commit }, data) {
    const { token, username, id_user, user_type } = data
    return new Promise((resolve, reject) => {
      commit('SET_ID_USER', id_user)
      commit('SET_TOKEN', token)
      commit('SET_NAME', username)
      commit('SET_USER_TYPE', user_type)
      setToken(token)
      resolve({ username })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = { // HARD CODED
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: 'I am a super administrator'
      }
      commit('SET_AVATAR', data.avatar)
      commit('SET_INTRODUCTION', data.introduction)
      resolve(state)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_USER_TYPE', 'null')
      commit('SET_ID_USER', null)
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER_TYPE', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
