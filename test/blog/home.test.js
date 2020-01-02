/**
 * @description 微博首页 test
 * @author malujie
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

const blogInfo = {
  content: '微博测试内容' + Date.now(),
  image: '/dasd.png'
}

let BLOG_ID = ''

// 创建微博
test('创建一条微博，应该成功', async () => {
  const res = await server.post('/api/blog/create').send(blogInfo).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(blogInfo.content)
  expect(res.body.data.image).toBe(blogInfo.image)

  // 保存微博ID
  BLOG_ID = res.body.data.id
})