/**
 * @description 微博广场页数据获取
 * @author malujie
 */

const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
const { getBlogListByUser } = require('../services/blog')

/**
 * 微博广场页数据加载
 * @param {Number} pageIndex 当前页
 */
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)

  const blogList = result.blogList
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getSquareBlogList
}