const { Blog, User } = require('./model')

!(async function() {
  // 插入一条数据
  const malujie = await User.create({
    userName: 'malujie',
    password: '1234',
    nickName: '马鲁杰'
  })

  const lisi = await User.create({
    userName: 'lisi',
    password: '1234',
    nickName: '里斯'
  })

  const blog1 = await Blog.create({
    title: '博客一',
    content: '第一篇博客',
    userId: malujie.dataValues.id
  })
  const blog2 = await Blog.create({
    title: '博客二',
    content: '第二篇博客',
    userId: malujie.dataValues.id
  })
  const blog3 = await Blog.create({
    title: '博客三',
    content: '第三篇博客',
    userId: malujie.dataValues.id
  })
  const blog4 = await Blog.create({
    title: '博客四',
    content: '第四篇博客',
    userId: lisi.dataValues.id
  })
  const blog5 = await Blog.create({
    title: '博客五',
    content: '第五篇博客',
    userId: lisi.dataValues.id
  })
})()