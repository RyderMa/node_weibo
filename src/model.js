const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型 数据表会生成 users
const User = seq.define('user', {
  // id 自动创建设为主键、自增
  userName: {
    type: Sequelize.STRING,   // varchar(255)
    allowNull: false          // 是否可为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comments: '昵称'            // 注释
  }
})

// 创建blogs
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 外键关联 两种前后关联关系
Blog.belongsTo(User, {
  // 默认情况下自动关联 id
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}