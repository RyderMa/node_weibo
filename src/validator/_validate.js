/**
 * @description ajv 校验数据
 * @author malujie
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 输出所有的校验错误
})

/**
 * json schema 校验
 * @param {object} schema json schema 校验规则
 * @param {object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if(!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate