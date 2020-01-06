/**
 * @description 微博广场页 api
 * @author malujie
 */

const router = require('koa-router')()
const { getBlogListStr } = require('../../utils/blog')
const { getSquareBlogList } = require('../../controller/blog-square')

router.prefix('/api/square')

/**
 * 微博广场页加载更多
 */
router.get('/loadMore/:pageIndex', async (ctx, next) => {
  const { pageIndex } = ctx.params
  const result = await getSquareBlogList(pageIndex)

  // 将微博列表格式化为 html 模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router