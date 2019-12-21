/**
 * @description jsonApi test
 * @author malujie
 */

const server = require('./sever')

test('json api callback data test', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})