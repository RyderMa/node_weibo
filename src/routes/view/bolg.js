/**
 * @description 微博页面路由
 * @author malujie
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const { getProfileBlogList } = require('../../controller/blog-profile')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index.ejs', {})
})

// 个人主页微博列表
router.get('/profile', loginRedirect, async (ctx, next) => {
  // 当前用户个人主页
  const { userName } = ctx.session.userInfo
  console.log('用户名', userName)
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName == curUserName
  if(isMe) {
    // 是当前用户
    curUserInfo = myUserInfo
  }else {
    // 不是当前用户
    const existResult = await isExist(curUserName)
    if(existResult.errno !== 0) {
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }
  // 获取微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const {isEmpty,blogList,pageSize,pageIndex,count} = result.data

  await ctx.render('profile.ejs', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      isMe,
      userInfo: curUserInfo
    }
  })
})

module.exports = router