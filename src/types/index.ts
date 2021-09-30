type  Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'


interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}


interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

interface AxiosPromise extends Promise<AxiosResponse> {

}

interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}



export {
  Method,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError
}
