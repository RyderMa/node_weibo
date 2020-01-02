/**
 * @description 微博 service
 * @async malujie
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}