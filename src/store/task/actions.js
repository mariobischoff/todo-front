import { axiosInstance } from '../../boot/axios'
export function register (context) {
}

export function getAll (context) {
  return axiosInstance({ method: 'get', url: 'task' })
    .then(response => {
      return response.data
    })
}
