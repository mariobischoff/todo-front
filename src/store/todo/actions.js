import { apiRequest } from '../../services'
import { SessionStorage } from 'quasar'

export function doLogin (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      SessionStorage.set('token', response.token)
      context.commit('setToken', response.token)
    })
}

export function callTask (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      context.commit('setUser', { _id: response._id, email: response.email, name: response.name })
      context.commit('setTask', response.tasks)
    })
}

export function saveTask (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      context.commit('setTask', response.tasks)
    })
}
