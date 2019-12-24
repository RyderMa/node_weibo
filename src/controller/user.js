/**
 * @description user controller
 * @author malujie
 */

const doCrypto = require('../utils/cryp')
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { registerUserNameNotExist, registerUserNameExist } = require('../model/ErrorInfo')

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

module.exports = {
  isExist,
  register
}
