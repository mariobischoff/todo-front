import { apiRequest } from './../../services'
import { SessionStorage } from 'quasar'

const state = {
  user: {},
  token: '',
  error: ''
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  },
  setError (state, error) {
    state.error = error
  }
}

const actions = {
  async login ({ commit }, payload) {
    try {
      let response = await apiRequest(payload)
      if (response.token) {
        commit('setToken', response.token)
        commit('setUser', response.user)
        SessionStorage.set('token', response.token)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async register ({ commit }, payload) {
    try {
      let response = await apiRequest(payload)
      if (response) {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  },
  logout ({ commit }) {
    SessionStorage.remove('token')
    commit('setUser', null)
    commit('setToken', null)
  }
}

const getters = {
  getUser (state) {
    return state.user
  },
  getError (state) {
    return state.error
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
