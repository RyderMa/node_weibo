/**
 * @description 微博数据模型
 * @author malujie
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER, } = require('../types')

// blogs
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博所有者id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '微博图片地址'
  }
})

module.exports = Blog
