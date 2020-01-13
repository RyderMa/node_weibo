/**
 * @description 微博首页 api
 * @author malujie
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create, getHomeBolgList } = require('../../controller/blog-home')
const { getBlogListStr } = require('../../utils/blog')
// 校验规则中间件
const { genValidator } = require('../../middlewares/validator')
// 微博信息校验规则
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')  // 路由前缀

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  // controller
  ctx.body = await create({ userId, content, image })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex) // 转换成 number 整数类型
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBolgList(userId, pageIndex)
  // 渲染成 html 模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router