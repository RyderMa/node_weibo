/**
 * @description user数据校验
 * @author malujie
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',  // 字母开头，字母数字下划线结尾
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

// 执行校验
function userValidate(data = {}) {
  // 错误返回
  return validate(SCHEMA, data)
}

module.exports = userValidate