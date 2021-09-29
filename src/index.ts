import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function axios(config: AxiosRequestConfig):void {
  processConfig(config)
  xhr(config)   // send message
}

export default axios
