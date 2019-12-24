/**
 * @description 加密方法
 * @author malujie
 */

const crypto = require('crypto')
// 密钥
const { CRYPTO_SCERET_KEY } = require('../config/sceretsKeys')

/**
 * md5加密
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文密码
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SCERET_KEY}`
  return _md5(str)
}

module.exports = doCrypto