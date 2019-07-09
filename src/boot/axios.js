import axios from 'axios'
import { SessionStorage } from 'quasar'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    authorization: SessionStorage.getItem('token')
  }
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axiosInstance }
