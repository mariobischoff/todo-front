import { apiRequest } from '../../services'

export function doLogin (context, payload) {
  return apiRequest(payload)
    .then((response) => {
      context.commit('setToken', response.token)
    })
}
