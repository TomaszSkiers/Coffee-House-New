import axios from 'axios'
import  store  from '../redux/store'

const axiosClient = axios.create({
  baseURL: 'http://localhost:4001',
})

axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.user.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
