const seq = require('./seq')
require('./model')

// 测试链接
seq.authenticate()
.then(() => {
  console.log('connection ok')
})
.catch(err => {
  console.log(err)
})

/**
 * @param {force} 强制添加，每次都会覆盖
 */
seq.sync({ force: true })
.then(() => {
  console.log('sync ok')
  // 同步完成，退出程序
  process.exit()
})