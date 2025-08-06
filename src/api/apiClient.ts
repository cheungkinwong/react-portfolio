import axios, { AxiosHeaders } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem('token')
      return Promise.reject(new axios.Cancel('Token expired'))
    }
    if (!config.headers || typeof config.headers.set !== 'function') {
      config.headers = new AxiosHeaders()
    }
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
}, error => Promise.reject(error))

export default api
