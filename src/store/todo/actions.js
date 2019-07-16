import { apiRequest } from '../../services'
import { SessionStorage } from 'quasar'

export function doRegister (context, payload) {
  return apiRequest(payload)
}

export function doLogin (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      SessionStorage.set('token', response.token)
      context.commit('SET_TOKEN', response.token)
    })
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

export function test (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      context.commit('DEL_TASK', 0)
      context.commit('SET_TASK', response.tasks)
    })
}
