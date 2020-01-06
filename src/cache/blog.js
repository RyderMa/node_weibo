/**
 * @description 微博缓存层
 * @author malujie
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表缓存
 * @param {pageIndex} pageIndex
 * @param {pageSize} pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult !== null) {
    // 获取缓存成功
    return cacheResult
  }
  // 未获取到缓存 读取数据库并进行缓存
  const result = await getBlogListByUser({pageIndex, pageSize})
  set(key, result)

  return result
}

module.exports = {
  getSquareCacheList
}