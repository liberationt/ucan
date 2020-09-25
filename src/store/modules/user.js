import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import qs from 'qs'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  accountData: {},
  sysUserConfig: null // 企业设置
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
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_SYS_USER_CONFIG: (state, sysUserConfig) => {
    state.sysUserConfig = sysUserConfig
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code, deviceId } = userInfo
    localStorage.setItem('username', username)
    // localStorage.setItem('password',password)
    return new Promise((resolve, reject) => {
      const queryStr = location.search.slice(1)
      const query = qs.parse(queryStr)
      login({
        username: username.trim(),
        password: password,
        validCode: code,
        deviceId: deviceId,
        grant_type: 'password',
        client_id: 'fO4iq61pPVuhbPSKmAgNF3mt',
        client_secret: 'RBDjX9yl4MouiDazfMJza9LZ',
        redirect_url: query.redirect
      }).then(response => {
        const { access_token } = response
        commit('SET_TOKEN', access_token)
        setToken(access_token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // const {data} = response

        // if (!data) {
        // 	reject('Verification failed, please Login again.')
        // }

        const { roles, name, avatar, introduction } = response

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //     reject('getInfo: roles must be a non-null array!')
        // }
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      // router.addRoutes(accessRoutes)

      resolve()
    })
  },

  // 更新企业设置
  updateSysUserConfig({ commit, dispatch }, sysUserConfig) {
    commit('SET_SYS_USER_CONFIG', sysUserConfig)
    if (sysUserConfig) {
      if (sysUserConfig.sysTitle) {
        document.title = sysUserConfig.sysTitle
      } else {
        document.title = '友康养老云'
      }
      const icoEl = document.querySelector('link[rel=icon]')
      if (sysUserConfig.sysIco) {
        icoEl.setAttribute('href', process.env.VUE_APP_API_IMGURL + sysUserConfig.sysIco)
      } else {
        icoEl.setAttribute('href', process.env.BASE_URL + 'favicon.ico')
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
