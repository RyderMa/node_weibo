/**
 * @description 数据模型入口文件
 * @author malujie
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 创建外键关系
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}