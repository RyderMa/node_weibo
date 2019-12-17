/**
 * @description 存储配置
 * @author malujie
 */

// 线上环境判断
const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

// 线上环境的配置
// if(isProd) {
//   REDIS_CONF = {
//     port: 1111,
//     host: '11111111'
//   }
// }

module.exports = {
  REDIS_CONF
}