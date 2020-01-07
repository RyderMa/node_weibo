/**
 * @description 用户关系 services
 * @author malujie
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的粉丝列表
 * @param {Number} followerId 被关注人的 ID
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
          followerId
        }
      }
    ]
  })
  console.log('user-relation查出的结果', result)
  let userList = result.rows.map(row => row.dataValues)
  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUserByFollower
}