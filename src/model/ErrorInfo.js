/**
 * @description 失败信息集合 error & message
 * @author malujie
 */

module.exports = {
  // 用户名已存在
  registerUserNameExist: {
    errno: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFail: {
    errno: 10002,
    message: '注册失败'
  },
  // 用户名不存在
  registerUserNameNotExist: {
    errno: 10003,
    message: '用户名不存在'
  },
  // 登录失败
  loginFail: {
    errno: 10004,
    message: '用户名或密码错误'
  },
  // 未登录
  loginCheckFail: {
    errno: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFail: {
    errno: 10006,
    message: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFilesSizeFail: {
    errno: 10007,
    message: '上传文件尺寸太大'
  },
  // 修改个人信息失败
  changeInfoFail: {
    errno: 10008,
    message: '修改个人信息失败'
  },
  // json schema 校验失败
  jsonSchemaFail: {
    errno: 10009,
    message: '数据格式校验失败'
  },
  // 删除用户失败
  deleteUserFail: {
    errno: 10010,
    message: '删除用户失败'
  },
  // 添加关注失败
  addFollowerFailInfo: {
    errno: 10011,
    message: '添加关注失败'
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    errno: 10012,
    message: '取消关注失败'
  },
  // 创建微博失败
  createBlogFailInfo: {
    errno: 11001,
    message: '创建微博失败'
  }
}