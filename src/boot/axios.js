import axios from 'axios'
import { SessionStorage } from 'quasar'

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:3000',
  headers: {
    authorization: SessionStorage.getItem('token') || ''
  }
=======
  baseURL: 'https://stormy-springs-97309.herokuapp.com/'
>>>>>>> d8d45f1d550d25f7a7282560a98465f177d5d762
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
