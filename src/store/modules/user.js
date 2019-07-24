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
    return apiRequest(payload)
      .then((response) => {
        if (response.token) {
          commit('setToken', response.token)
          commit('setUser', response.user)
          SessionStorage.set('token', response.token)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // try {
    //   let response = await apiRequest(payload)
    //   if (response.token) {
    //     commit('setToken', response.token)
    //     commit('setUser', response.user)
    //     SessionStorage.set('token', response.token)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
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
    commit('seToken', null)
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
