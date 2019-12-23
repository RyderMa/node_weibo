/**
 * @description res 的数据mox
 * @author malujie
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * 成功数据
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * 失败数据
 */
class FailModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  FailModel
}