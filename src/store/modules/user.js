import { apiRequest } from './../../services'
import { SessionStorage } from 'quasar'

const state = {
  user: {},
  token: ''
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

const actions = {
  async login ({ commit }, payload) {
    let response = await apiRequest(payload)
    if (response.token) {
      commit('setToken', response.token)
      SessionStorage.set('token', response.token)
    }
  },
  logout ({ commit }) {
    commit('seToken', '')
  }
}

const getters = {
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
