import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest} from'./helpers/data'

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData (config: AxiosRequestConfig):any {
  return transformRequest(config.data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data= transformRequestData(config)
}

function axios(config: AxiosRequestConfig):void {
  processConfig(config)
  xhr(config)
}

export default axios
