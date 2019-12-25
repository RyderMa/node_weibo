/**
 * @description user 路由配置
 * @author malujie
 */

const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object} ctx 
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false
  }
  if(ctx.session.userInfo) {
    data = {
      isLogin: true,
      userName: ctx.session.userInfo.userName
    }
  }
  return data
}

router.get('/login', async(ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async(ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router