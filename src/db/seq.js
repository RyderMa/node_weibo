/**
 * @description sequelize 实例
 * @author malujie
 */

// 线上环境判断
const { isProd, isTest } = require('../utils/env')
const Sequelize = require('sequelize')
const MYSQL_CONF = require('../config/db')

const { host, database, user, password } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

// 单元测试时不输出 sql 语句
if(isTest) {
  conf.logging = () => {}
}

if(isProd) {
  // 线上环境连接池
  conf.pool = {
    max: 5,        // 连接池中最大的连接数量
    min: 0,        // 最小数量
    idle: 10000    // 连接池超过 10s 未使用自动释放
  }
}

/**
 * @param 数据库名称
 * @param 登录名
 * @param 密码
 * @param {host, dialect} 地址 数据库类型
 **/
const seq = new Sequelize(database, user, password, conf)

module.exports = seq