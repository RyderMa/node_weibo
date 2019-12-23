/**
 * @description user controller
 * @author malujie
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { registerUserNameNotExist } = require('../model/ErrorInfo')

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

module.exports = {
  isExist
}
