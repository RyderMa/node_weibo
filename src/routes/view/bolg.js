/**
 * @description 微博页面路由
 * @author malujie
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index.ejs', {})
})

module.exports = router