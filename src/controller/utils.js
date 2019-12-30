/**
 * @description utils controller
 * @author malujie
 */

const path = require('path')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { uploadFilesSizeFail } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    // 创建目录
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存上传文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    console.log('文件大于 1M')
    // 删除错误文件
    await fse.remove(filePath)
    return new FailModel(uploadFilesSizeFail)
  }

  // 移动文件到指定目录
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  // 执行移动
  await fse.move(filePath, distFilePath)

  // 返回图片路径
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}