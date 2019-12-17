const { Blog, User } = require('./model')

!(async function() {
  // const malujie = await User.findOne({
  //   where: {
  //     userName: 'malujie'
  //   }
  // })
  // console.log('malujie', malujie.dataValues)

  // const ma = await User.findOne({
  //   // 查出对应列
  //   attributes: ['userName', 'nickName'],
  //   where: {
  //     userName: 'malujie'
  //   }
  // })

  // console.log('ma', ma.dataValues)

  // 查询整个列表
  // const maBlogs = await Blog.findAll({
  //   where: {
  //     userId: 1
  //   },
  //   order: [
  //     ['id', 'desc']
  //   ]
  // })
  // console.log(
  //   'maBlogsList',
  //   maBlogs.map(blog => blog.dataValues)
  // )

  // 分页查询
  // const page1 = await Blog.findAll({
  //   limit: 2,   // 每页条数
  //   offset: 4,  // 跳过条数
  //   order: [
  //     ['id', 'desc']
  //   ]
  // })
  // console.log('page1', page1.map(blog => blog.dataValues))

  // 查询分页并返回总数
  // const blogListAndCount = await Blog.findAndCountAll({
  //   limit: 2,
  //   offset: 0,
  //   order: [
  //     ['id', 'desc']
  //   ]
  // })

  // console.log(
  //   'blogListAndCount',
  //   blogListAndCount.count, // 全部数量
  //   blogListAndCount.rows.map(blog => blog.dataValues)
  // )

  // 连表查询1
  // const blogListWithUser = await Blog.findAndCountAll({
  //   order: [
  //     ['id', 'desc']
  //   ],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['userName', 'nickName'],
  //       where: {
  //         userName: 'malujie'
  //       }
  //     }
  //   ]
  // })

  // console.log(
  //   'blogListWithUser', 
  //   blogListWithUser.count,
  //   blogListWithUser.rows.map(blog => {
  //     blog.dataValues.user = blog.dataValues.user.dataValues
  //     return blog.dataValues
  //   })
  // )

  // 连表查询2
  const userListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog
      }
    ]
  })
  console.log(
    'userListWithBlog',
    userListWithBlog.count,
    JSON.stringify(userListWithBlog.rows.map(user => {
      user.dataValues.blogs =  user.dataValues.blogs.map(blog => blog.dataValues)
      return user.dataValues
    }))
  )
})()