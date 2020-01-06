/**
 * @description 微博广场页 test API
 * @author malujie
 */

const server = require('../server')
// const { COOKIE } = require('../testUserInfo')

test('微博广场页数据获取，成功', async () => {
  const res = await server
    .get(`/api/square/loadMore/0`)
    // .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  // 判断返回数据是否具有某个属性
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})