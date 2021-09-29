import { isPlainObject } from './util'

const transformRequest = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

const transformResponse = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // nothing
    }
  }
  return data
}

export { transformRequest, transformResponse }
