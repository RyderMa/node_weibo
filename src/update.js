const { User, Blog } = require('./model')

!(async function() {
  const updateRes = await User.update({
    nickName: '里斯'
  }, {
    where: {
      nickName: '李四'
    }
  })

  console.log('updateRes', updateRes[0] > 0)
})()