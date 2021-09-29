import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function  transformResponseData(res: AxiosResponse):AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)

}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res=>transformResponseData(res))
}

export default axios
