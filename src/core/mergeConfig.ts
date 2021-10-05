// import { AxiosRequestConfig } from '../types'
//
//
// const mergeConfig = (config1: AxiosRequestConfig,
//                      config2?: AxiosRequestConfig): AxiosRequestConfig
// {
//   if (!config2) {
//     config2 = {}
//   }
//
//   const config = Object.create(null)
//
//   for (let key in config2) {
//     mergeField(key)
//   }
//
//   for (let key in config1) {
//     if (!config2[key]) {
//       mergeField(key)
//     }
//   }
//
//   function mergeField(key: string): void {
//     const start = starts[key] || defaultStrat
//     config[key] = start(config1[key], config2![key])
//   }
//
//   return config
// }
