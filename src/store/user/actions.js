import { axiosInstance } from '../../boot/axios'
export function register (context) {
}

export function login (context, payload) {
  return axiosInstance({ method: 'post', url: 'user/login', data: payload })
    .then(response => {
      return response.data
    })
}
