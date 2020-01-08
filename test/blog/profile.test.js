/**
 * @description 个人主页 API test
 * @author malujie
 */

const server = require('../server')
const { z_COOKIE, z_USERNAME } = require('../testUserInfo')

test('个人主页微博数据获取，成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${z_USERNAME}/0`)
    .set('cookie', z_COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  // 判断返回数据是否具有某个属性
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})