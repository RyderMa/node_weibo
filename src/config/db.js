/**
 * @description 数据库存储配置
 * @author malujie
 */

// 线上环境判断
const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: '3306',
  database: 'weibo_node'
}
// 线上环境的配置
// if(isProd) {
//   REDIS_CONF = {
//     port: 1111,
//     host: '11111111'
//   }
//   MYSQL_CONF = {
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     port: '3306',
//     database: 'weibo'
//   }
// }

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}