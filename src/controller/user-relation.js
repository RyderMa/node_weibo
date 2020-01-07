/**
 * @description 用户关系 controller
 * @author malujie
 */

const { getUserByFollower } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * 根据用户 ID 获取粉丝列表
 * @param {Number} userId 用户ID
 */
async function getFans(userId) {
  const { count, userList } = await getUserByFollower(userId)
  return new SuccessModel({
    count,
    userList
  })
}

module.exports = {
  getFans
}