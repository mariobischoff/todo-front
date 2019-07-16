import axios from 'axios'
import { SessionStorage } from 'quasar'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/'
})

axiosInstance.interceptors.request.use(
  (config) => {
    let token = SessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axiosInstance }
