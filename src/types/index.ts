type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

interface AxiosRequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  [propName: string]: any

  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
}


interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

interface RejectedFn<T = any> {
  (error: any): any
}

interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, reject?: RejectedFn): number

  eject(id: number): void
}

interface AxiosTransformer {
  (data: any, headers?: any): any
}

interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

interface Canceler {
  (message?: string): void
}

interface CancelExecutor {
  (cancel: Canceler): void
}

interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

interface Cancel {
  message?: string
}

interface CancelStatic {
  new(message?: string): Cancel
}

export {
  Method,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
  Axios,
  AxiosInstance,
  AxiosInterceptorManager,
  ResolvedFn,
  RejectedFn,
  AxiosTransformer,
  AxiosStatic,
  CancelToken,
  Canceler,
  CancelExecutor,
  CancelTokenSource,
  CancelTokenStatic,
  Cancel,
  CancelStatic
}
