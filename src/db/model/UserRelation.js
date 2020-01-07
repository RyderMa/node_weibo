/**
 * @description 用户关注关系
 * @author malujie
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

// UserRelation
const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户ID'
  }
})

module.exports = UserRelation