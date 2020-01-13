/**
 * @description 微博首页 controller
 * @author malujie
 */

const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../config/constant')

/**
 * 创建微博
 * @param {string} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 微博图片
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content), // xss 过滤
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new FailModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博数据列表
 * @param {number} userId 用户ID
 * @param {number} pageIndex 页码
 */
async function getHomeBolgList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length <= 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create,
  getHomeBolgList
}