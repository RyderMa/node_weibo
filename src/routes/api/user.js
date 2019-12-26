/**
 * @description user api
 * @author malujie
 */

const router = require('koa-router')()
const { isTest } = require('../../utils/env')
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
// 用户信息校验规则
const userValidate = require('../../validator/user')
// 登录验证中间件
const { loginCheck } = require('../../middlewares/loginChecks')
// 校验规则中间件
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/user')  // 路由前缀

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // 调用controller
  ctx.body = await isExist(userName)
})

// 注册api
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller
  ctx.body = await register({ userName, password, gender })
})

// 登录api
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // 调用登录controller
  ctx.body = await login({ ctx, userName, password })
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登录删除自己
    const { userName } = ctx.session.userInfo
    // 调用controller
    ctx.body = await deleteCurUser(userName)
  }
})
module.exports = router