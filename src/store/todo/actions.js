import { apiRequest } from '../../services'
// import { SessionStorage } from 'quasar'
import { axiosInstance } from '../../boot/axios'

export function doRegister (context, payload) {
  return apiRequest(payload)
}

export function doLogin (context, payload) {
  axiosInstance.post('http://localhost:3000' + '/user/login', payload.DATA)
    .then((response) => {
      let user = { _id: response.data.user._id, name: response.data.user.name, email: response.data.user.email }
      let token = response.data.token
      let tasks = response.data.user.tasks
      context.commit('SET_USER', user)
      context.commit('SET_TOKEN', token)
      context.commit('SET_TASK', tasks)
      return token
    })
  // return apiRequest(payload)
  //   .then((response) => {
  //     SessionStorage.set('token', response.token)
  //     context.commit('setToken', response.token)
  //   })
}

export function callTask (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      context.commit('SET_USER', { _id: response._id, email: response.email, name: response.name })
      context.commit('SET_TASK', response.tasks)
    })
}

export function saveTask (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      context.commit('SET_TASK', response.tasks)
    })
}
