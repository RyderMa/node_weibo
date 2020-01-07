/**
 * @description 个人主页 API 路由
 * @author malujie
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')
const { getProfileBlogList } = require('../../controller/blog-profile')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  // 渲染出 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

// 关注用户
router.post('/follow', loginCheck, async (ctx, next) => {
  let { id: myUserId } = ctx.session.userInfo
  let { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  let { id: myUserId } = ctx.session.userInfo
  let { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})
module.exports = router