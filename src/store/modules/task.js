import { apiRequest } from './../../services'

const state = {
  tasks: []
}

const mutations = {
  setTasks (state, tasks) {
    state.tasks = tasks
  },
  moveFrom (state, payload) {
    state.tasks[payload._id] = payload.from
  }
}

const actions = {
  async getAll ({ commit }, payload) {
    let tasks = await apiRequest(payload)
    if (tasks) {
      commit('setTasks', tasks)
    }
  },
  async save ({ commit, state }, payload) {
    let task = await apiRequest(payload)
    if (task) {
      let tasks = JSON.parse(JSON.stringify(state.tasks))
      tasks.push(task)
      commit('setTasks', tasks)
    }
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
