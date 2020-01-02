/**
 * @description 微博首页 controller
 * @author malujie
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 创建微博
 * @param {string} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 微博图片
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({ userId, content, image })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new FailModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}