/**
 * @description 微博首页 api
 * @author malujie
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
// 校验规则中间件
const { genValidator } = require('../../middlewares/validator')
// 微博信息校验规则
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')  // 路由前缀

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  // controller
  ctx.body = await create({ userId, content, image })
})

module.exports = router