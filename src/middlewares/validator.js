/**
 * @description json schema 中间件
 * @author malujie
 */

const { FailModel } = require('../model/ResModel')
const { jsonSchemaFail } = require('../model/ErrorInfo')

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证出现错误信息
      ctx.body = new FailModel(jsonSchemaFail)
      return
    }
    // 验证成功，继续
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}