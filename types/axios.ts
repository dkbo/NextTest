// lib/axios-server.ts
import { AxiosRequestConfig } from 'axios'

type Primitive = string | number | boolean | null | undefined
export type RequestParams = Record<string, Primitive>
export type RequestData = Record<string, unknown>

export interface HTTPServer {
  get<T>(url: string, params?: RequestParams, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>
}
