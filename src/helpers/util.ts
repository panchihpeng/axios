const toString = Object.prototype.toString

const isDate = (val: any): val is Date => toString.call(val) === '[object Date]'

const isPlainObject = (val: any): val is Object => toString.call(val) === '[object Object]'

function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export { isDate, isPlainObject, extend }
