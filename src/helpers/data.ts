import { isPlainObject } from './util'

const transformRequest = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}


export { transformRequest }
