/**
 * @description 微博首页 test
 * @author malujie
 */

const server = require('../server')
const { z_COOKIE } = require('../testUserInfo')

const blogInfo = {
  content: '微博测试内容' + Date.now(),
  image: '/dasd.png'
}

let BLOG_ID = ''

// 创建微博
test('创建一条微博，应该成功', async () => {
  const res = await server.post('/api/blog/create').send(blogInfo).set('cookie', z_COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(blogInfo.content)
  expect(res.body.data.image).toBe(blogInfo.image)

  // 保存微博ID
  BLOG_ID = res.body.data.id
})

// 加载第一页数据
test('微博首页微博列表数据加载', async () => {
  const res = await server.get('/api/blog/loadMore/0').set('cookie', z_COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})