/**
 * @description user service层 操作数据
 * @author malujie
 */

const { User } = require('../db/model/index')
const { formatUser } = require('../services/_format')
/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  password && Object.assign(whereOpt, { password })

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }

  // 数据格式化
  const formatRes = formatUser(res.dataValues)
  return formatRes
}

module.exports = {
  getUserInfo
}