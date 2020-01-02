/**
 * @description utils api
 * @author malujie
 */

const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file']
  if(!file) {
    return
  }
  const { size, path, name, type } = file
  // controller
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })
})

module.exports = router