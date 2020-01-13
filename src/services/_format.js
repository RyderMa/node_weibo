/**
 * @description 数据格式化
 * @author malujie
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../config/constant')

/**
 * 用户默认头像
 * @param {object} obj 用户对象
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 时间格式化函数
 * @param {string} time
 */
function timeFormat(time) {
  return time
}

/**
 * 格式化微博数据时间
 * @param {Object} obj
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|object} list 用户列表或单个用户信息
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 用户列表
    return list.map(_formatUserPicture)
  }

  // 单个用户信息
  return _formatUserPicture(list)
}

/**
 * 格式化微博内容
 * @param {Object} obj
 */
function _formatContent(obj) {
  obj.formatContent = obj.content
  obj.formatContent = obj.formatContent.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    return `<a href="/profile/${userName}">@${nickName}</a>`
  })
  return obj
}

/**
 * 格式化微博信息
 * @param {Array|object} list 微博列表或单条微博信息
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 微博列表
    return list.map(_formatDBTime).map(_formatContent)
  }

  // 单条微博信息
  return _formatContent(_formatDBTime(list))
}

module.exports = {
  formatUser,
  formatBlog
}