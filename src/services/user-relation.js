/**
 * @description 用户关系 services
 * @author malujie
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 获取关注该用户的粉丝列表
 * @param {number} followerId 被关注人的 ID
 */
async function getUserByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            // option.notequal
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  })
  let userList = result.rows.map(row => formatUser(row.dataValues))
  return {
    count: result.count,
    userList
  }
}

/**
 * 获取用户已关注列表
 * @param {number} userId 用户 ID
 */
async function getFollwersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId
      }
    }
  })
  let userList = result.rows.map(row => {
    row.dataValues.user = formatUser(row.dataValues.user.dataValues)
    // 仅返回用户数据
    return row.dataValues.user
  })
  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {number} userId 用户ID
 * @param {number} followerId 被关注人ID
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户ID
 * @param {number} followerId 被关注人ID
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUserByFollower,
  getFollwersByUser,
  addFollower,
  deleteFollower
}