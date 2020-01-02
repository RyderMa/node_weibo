const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./config/db')
const { SESSION_SCERET_KEY } = require('./config/sceretsKeys')
const { isProd } = require('./utils/env')

const utilsApiRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const blogViewRouter = require('./routes/view/bolg')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname + '/public')))
app.use(koaStatic(path.join(__dirname + '..' + '../../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SCERET_KEY]
app.use(session({
  key: 'weibo.sid',               // cookie name 默认 'koa.sid'
  prefix: 'weibo:sess:',             // redis key 前缀 默认 'koa:sess:'
  cookie: {
    path: '/',                   // 整个网页路由都可以获取到
    httpOnly: true,                  // 仅允许服务端修改
    maxAge: 24 * 60 * 60 * 1000    // ms cookie过期时间
  },
  // ttl   : 24 * 60 * 60 * 1000,        // redis key 过期时间 默认 cookie过期时间
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger 中间件演示
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())   // 404 路由注册到最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
