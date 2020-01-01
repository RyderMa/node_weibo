/**
 * @description user controller
 * @author malujie
 */

const doCrypto = require('../utils/cryp')
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const {
  registerUserNameNotExist,
  registerUserNameExist,
  loginFail,
  deleteUserFail,
  changeInfoFail,
  changePasswordFail
} = require('../model/ErrorInfo')

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
 * 修改个人信息
 * @param {Object} ctx
 * @param {string} nickName nickName
 * @param {string} city city
 * @param {string} picture picture
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  // service
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )
  console.log('修改结果', result)

  if (result) {
    // 成功更新 session 数据
    Object.assign(ctx.session.userInfo, { nickName, city, picture })
    return new SuccessModel()
  }
  // 失败
  return new FailModel(changeInfoFail)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 原密码
 * @param {string} newPassword 新密码
 */
async function changePassword({ userName, password, newPassword }) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    }, // 密码加密
    {
      userName,
      password: doCrypto(password)
    }
  )

  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new FailModel(changePasswordFail)
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
  changeInfo,
  deleteCurUser,
  changePassword
}
