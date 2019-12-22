/**
 * @description 404 error 路由
 * @author malujie
 */

const router = require('koa-router')()

// error路由
router.get('/error', async(ctx, next) => {
  await ctx.render('error')
})

router.get('*', async(ctx, next) => {
  await ctx.render('404')
})

module.exports = router