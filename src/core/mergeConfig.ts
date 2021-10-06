import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

const starts = Object.create(null)

const defaultStart =
  (val1: any, val2: any): any => typeof val2 !== 'undefined' ? val2 : val1

const fromVal2Start = (val1: any, val2: any): any => {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const deepMergeStart = (val1: any, val2: any): any => {
  if (isPlainObject(val2)) {
    return deepMergeStart(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}


const startKeysFromVal2 = ['url', 'params', 'data']

startKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

const startKeysDeepMerge = ['headers']


startKeysDeepMerge.forEach(key => {
  starts[key] = deepMergeStart
})

const mergeConfig = (config1: AxiosRequestConfig,
                     config2?: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const start = starts[key] || defaultStart
    config[key] = start(config1[key], config2![key])
  }

  return config
}

export default mergeConfig
