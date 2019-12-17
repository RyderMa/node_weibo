/**
 * @description 连接 redis 的方法 get & set
 * @author malujie
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis get
 * @param {string} key 
 */
function get(key) {
  // 从redis读取数据异步操作
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err)
        return
      }
      if(val == null) {
        resolve(null)
        return
      }
      try {
        // 尝试是否能够转换
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

/**
 * redis set
 * @param {string} key 
 * @param {*} val 
 * @param {number} timeout 过期时间单位 s
 */
function set(key, val, timeout = 60 * 60) {
  if(typeof val == 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)    // 设置过期时间
}

module.exports = {
  get,
  set
}