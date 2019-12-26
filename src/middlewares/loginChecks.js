/**
 * @description 登录验证的中间件
 * @author malujie
 */

const { FailModel } = require('../model/ResModel')
const { loginCheckFail } = require('../model/ErrorInfo')

/**
 * api 下的 login 验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  } 
  ctx.body = new FailModel(loginCheckFail)
}

/**
 * 页面 下的 login 验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录跳转到登录页
  const curUrl = ctx.url
  ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)
}

module.exports = {
  loginCheck,
  loginRedirect
}