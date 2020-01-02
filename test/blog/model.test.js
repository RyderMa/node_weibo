/**
 * @description 微博数据模型校验
 * @author malujie
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，是否符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const blog = Blog.build({
    userId: 1,
    content: '测试微博',
    image: '/2312312.png'
  })
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('测试微博')
  expect(blog.image).toBe('/2312312.png')
})