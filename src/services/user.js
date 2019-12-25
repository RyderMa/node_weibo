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
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 创建用户
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}