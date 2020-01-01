/**
 * @description user api test
 * @author malujie
 */

const server = require('./server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  // nickName: userName,
  gender: 1
}

// 存储cookie
let COOKIE = ''

// 注册
test('注册一个用户', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户 失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 用户名是否存在
test('查询已注册的用户名是否存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测非法格式数据', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123',  // 用户名不以字母开头
    password: '12',   // 密码长度小于3
    gender: 'mail'    // 性别不是一个数字
  })
  expect(res.body.errno).not.toBe(0)
})

// 登录
test('已注册，登录成功', async () => {
  const res = await server.post('/api/user/login').send({ userName, password })
  expect(res.body.errno).toBe(0)
  // 获取登录后的cookie
  COOKIE = res.headers['set-cookie'].join(';')
  console.log('cookie数据', COOKIE)
})

// 修改基本信息
test('修改基本信息成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '测试昵称',
      city: '测试城市',
      picture: '/test.png'
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 修改密码
test('修改密码成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `p_${Date.now()}`
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 删除
test('删除用户，成功', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 退出登录
test('退出登录成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 再次查询用户
test('删除用户后，用户名不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})