/**
 * @description 微博 service
 * @async malujie
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建一条微博数据
 * @param {Object} param0
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {Object} param0
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const userWhereOpt = {}
  if (userName) {
    userWhereOpt.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页条数
    offset: pageSize * pageIndex, // 跳过数量
    order: [
      ['id', 'desc']
    ],
    include: [ // 连表查询
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpt
      }
    ]
  })

  // findAndCountAll 的 result.count 为数据总数 result.rows 为数组形式的查询结果
  let blogList = result.rows.map(row => {
    row.dataValues.user = formatUser(row.dataValues.user.dataValues)
    return formatBlog(row.dataValues)
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 获取已关注人微博列表
 * @param {Object} param0
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  })

  let blogList = result.rows.map(row => {
    row.dataValues.user = formatUser(row.dataValues.user.dataValues)
    return formatBlog(row.dataValues)
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}