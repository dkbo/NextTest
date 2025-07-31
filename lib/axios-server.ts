// lib/axios-server.ts
import axios from 'axios'

import { HTTPServer } from '@/types/axios'

const axiosServer = axios.create({
  baseURL: 'https://asset.ch-si.com.tw/newOrder/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosServer.interceptors.request.use(
  async (config) => {
    if (config.method === 'get') {
      config.params = config.params ?? {}
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosServer.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message ?? '系統錯誤，請稍後再試'
    console.error('[API Error]', msg)
    return Promise.reject(err)
  }
)

const http: HTTPServer = {
  get: (url, params = {}, config = {}) =>
    axiosServer.get(url, { params, ...config }).then((res) => res.data),
  post: (url, data = {}, config = {}) =>
    axiosServer.post(url, data, config).then((res) => res.data),
  put: (url, data = {}, config = {}) => axiosServer.put(url, data, config).then((res) => res.data),
  delete: (url, data = {}, config = {}) =>
    axiosServer.delete(url, { data, ...config }).then((res) => res.data),
}

export default http
