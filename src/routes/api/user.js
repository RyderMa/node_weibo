/**
 * @description user api
 * @author malujie
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')  // 路由前缀

// 注册api
router.post('/register', async (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // 调用controller
  ctx.body = await isExist(userName)
})

module.exports = router