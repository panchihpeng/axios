import { isDate, isPlainObject } from './util'

const encode = (val: string): string => encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/gi, ']')


const buildURL = (url: string, params?: any): string => {

  if (!params) return url

  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    let val = params[key]

    if (val === null || typeof val === 'undefined') return

    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })

  })

  const serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('&')

    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}


export { buildURL }
