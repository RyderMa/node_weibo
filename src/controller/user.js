/**
 * @description user controller
 * @author malujie
 */

const doCrypto = require('../utils/cryp')
const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { registerUserNameNotExist, registerUserNameExist, loginFail, deleteUserFail } = require('../model/ErrorInfo')

/**
 * @description 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new FailModel(registerUserNameNotExist)
  }
}

/**
 * 注册
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 1男 2女 3保密
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new FailModel(registerUserNameExist)
  }

  // 执行注册
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new FailModel(registerFail)
  }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {password} password 
 */
async function login({ ctx, userName, password }) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new FailModel(loginFail)
  }
  // 登录成功 ctx.session.userInfo 存储用户信息
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 
 */
async function deleteCurUser(userName) {
  // service
  const result = await deleteUser(userName)
  if (result) {
    // 删除成功
    return new SuccessModel()
  }
  // 失败
  return new FailModel(deleteUserFail)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}
