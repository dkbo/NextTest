// lib/axios-server.ts
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://asset.ch-si.com.tw/newOrder/api',
  headers: {
    'Content-Type': 'application/json',
    // 可加入 token，例如從 cookie/localStorage 讀取
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.method === 'get') {
      config.params = config.params ?? {}
    }
    return config
  },
  (error) => Promise.reject(error)
)

type RequestData = Record<string, unknown>
type RequestParams = Record<string, string | number | boolean | null | undefined>
type RequestPayload = RequestData | RequestParams

interface HTTPClient {
  get<T>(url: string, params?: RequestParams, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>
}

const http = {} as HTTPClient

;(['get', 'post', 'put', 'delete'] as const).forEach((method) => {
  http[method] = <T>(
    url: string,
    payload: RequestPayload = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const axiosPayload = method === 'get' ? { params: payload } : { data: payload }
    return axiosInstance({
      method: method as Method,
      url,
      ...axiosPayload,
      ...config,
    })
      .then((res: AxiosResponse<T>) => res.data)
      .catch((err) => {
        throw err
      })
  }
})

export default http
