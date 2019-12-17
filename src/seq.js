const Sequelize = require('sequelize')

// 线上环境连接池
// const conf = {
//   host: 'localhost',
//   dialect: 'mysql'
// }

conf.pool = {
  max: 5,        // 连接池中最大的连接数量
  min: 0,        // 最小数量
  idle: 10000    // 连接池超过 10s 未使用自动释放
}

/**
 * @param 数据库名称
 * @param 登录名
 * @param 密码
 * @param {host, dialect} 地址 数据库类型
 **/
const seq = new Sequelize('weibo_node', 'root', '123456', conf)

module.exports = seq