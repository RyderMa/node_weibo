/**
 * @description 用户关系单元测试
 * @author malujie
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const { z_id, z_USERNAME, z_COOKIE, m_id, m_USERNAME, m_COOKIE } = require('../testUserInfo')

// 为了避免已经关注了
test('首先要取消关注', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: m_id })
    .set('cookie', z_COOKIE)
  expect(1).toBe(1)
})

// z 关注 m
test('关注应该成功', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: m_id })
    .set('cookie', z_COOKIE)
  expect(res.body.errno).toBe(0)
})

// 获取 m 的粉丝，应该有 z
test('获取粉丝列表，应该含有 z ', async () => {
  const res = await getFans(m_id)
  const { count, userList: fansList } = res.data
  const existZ = fansList.some(user => user.userName == z_USERNAME)

  expect(count > 0).toBe(true)
  expect(existZ).toBe(true)
})

// 获取 z 的关注人，应该有 m
test('获取已关注列表', async () => {
  const res = await getFollowers(z_id)
  const { count, userList: followersList } = res.data
  const existM = followersList.some(user => user.userName == m_USERNAME)

  expect(count > 0).toBe(true)
  expect(existM).toBe(true)
})

// 获取可 at 用户列表
test('获取at列表', async () => {
  const res = await server
    .get('/api/user/getAtList')
    .set('cookie', m_COOKIE)
  const atList = res.body
  console.log('at列表', atList)
  const hasUserName = atList.some(item => {
    return item.indexOf(`- ${z_USERNAME}`) >= 0
  })
  expect(hasUserName).toBe(true)
})

// z 取消关注 m
test('取消关注应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: m_id })
    .set('cookie', z_COOKIE)
  expect(res.body.errno).toBe(0)
})