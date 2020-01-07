/**
 * @description 微博页面路由
 * @author malujie
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')

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
  if (isMe) {
    // 是当前用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }
  // 获取微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, userList: fansList } = fansResult.data

  // 获取已关注人
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, userList: followersList } = followersResult.data

  // 我是否关注了当前用户
  const amIFollowed = fansList.some(user => {
    return user.userName == myUserName
  })

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
      userInfo: curUserInfo,
      amIFollowed,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    }
  })
})

// 广场微博列表
router.get('/square', async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  // 渲染页面
  await ctx.render('square.ejs', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

module.exports = router