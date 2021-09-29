
const  toString = Object.prototype.toString

const isDate = (val: any): val is Date => toString.call(val) === '[object Date]'

const isPlainObject = (val: any): val is Object => toString.call(val) === '[object Object]'

export  {
  isDate,
  isPlainObject
}
