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

/**
 * 更新用户信息
 * @param {Object} param0 修改的内容
 * @param {Object} param1 查询条件
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  // 拼接查询条件
  const whereData = { userName }
  if (password) {
    whereData.password = password
  }

  // 执行更新
  const result = await User.update(updateData, {
    where: whereData
  })

  // 修改成功 返回更新行数 1 行
  return result[0] > 0
}

/**
 * 删除用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result 删除的行数
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser
}