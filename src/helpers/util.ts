const toString = Object.prototype.toString

const isDate = (val: any): val is Date => toString.call(val) === '[object Date]'

const isPlainObject = (val: any): val is Object => toString.call(val) === '[object Object]'

function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

const deepMerge = (...objs: any[]): any => {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]

        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export { isDate, isPlainObject, extend, deepMerge }
