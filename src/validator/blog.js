/**
 * @description 微博数据校验
 * @author malujie
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

// 执行校验
function blogValidate(data = {}) {
  // 错误返回
  return validate(SCHEMA, data)
}

module.exports = blogValidate