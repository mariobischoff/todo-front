import { apiRequest } from './../../services'
import _ from 'lodash'

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
    try {
      let tasks = await apiRequest(payload)
      if (tasks) {
        commit('setTasks', tasks)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async add ({ commit, state }, payload) {
    try {
      let task = await apiRequest(payload)
      if (task) {
        let tasks = JSON.parse(JSON.stringify(state.tasks))
        tasks.push(task)
        commit('setTasks', tasks)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async remove ({ commit, state }, payload) {
    try {
      let id = await apiRequest(payload)
      if (id) {
        let tasks = JSON.parse(JSON.stringify(state.tasks))
        let index = _.findIndex(tasks, { '_id': id })
        tasks.splice(index, 1)
        commit('setTasks', tasks)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async move ({ commit, state }, payload) {
    try {
      let task = await apiRequest(payload)
      if (task) {
        let tasks = JSON.parse(JSON.stringify(state.tasks))
        let index = _.findIndex(tasks, { '_id': payload.ID })
        tasks[index] = task
        commit('setTasks', tasks)
      }
    } catch (error) {
      console.log(error)
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
