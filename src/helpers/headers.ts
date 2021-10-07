import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'
import { head } from 'shelljs'

const normalizeHeaderName = (headers: any, normalizedName: string): any => {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })

}


const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

const parseHeaders = (headers: string): any => {

  const parsed = Object.create(null)

  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()

    if (!key) return

    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })
  return parsed
}
const flattenHeaders = (headers: any, method: Method): any => {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => delete headers[method])
}
export {
  processHeaders,
  parseHeaders,
  flattenHeaders
}
