import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

const strats = Object.create(null)

const defaultStart = (val1: any, val2: any): any => (typeof val2 !== 'undefined' ? val2 : val1)

// just use val2
const fromVal2Strat = (val1: any, val2: any): any => {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const deepMergeStart = (val1: any, val2: any): any => {

  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})


const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStart
})


const mergeConfig = (
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig => {

  const config = Object.create(null)

  const mergeField = (key: string): void => {
    const strat = strats[key] || defaultStart // 拿到合并策略函数  strats 对象，对象上面挂着方法 strat
    config[key] = strat(config1[key], config2![key])
  }

  if (!config2) {
    config2 = {}
  }

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  return config
}


export default mergeConfig
