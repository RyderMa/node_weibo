/**
 * @description 用户关系 controller
 * @author malujie
 */

const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { FailModel, SuccessModel } = require('../model/ResModel')
const { getUserByFollower } = require('../services/user-relation')
const { addFollower, deleteFollower } = require('../services/user-relation')

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

/**
 * 关注
 * @param {Number} myUserId 登录用户ID
 * @param {Number} curUserId 被关注人ID
 */
async function follow(myUserId, curUserId) {
  try {
    const result = await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    console.error(ex)
    return new FailModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {Number} myUserId 登录用户ID
 * @param {Number} curUserId 被关注人ID
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if(result) {
    // 取消成功
    return new SuccessModel()
  }
  //取消失败
  return new FailModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  follow,
  unFollow
}