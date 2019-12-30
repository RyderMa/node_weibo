/**
 * @description 基于 jquery 封装的 ajax
 * @author malujie
 */

(function (window, $) {
  // 定义屈居方法 ajax
  if (window.ajax != null) {
    console.log('window ajax被占用')
    return
  }
  window.ajax = {}

  // get
  window.ajax.get = function (url, callback) {
    ajaxFn('get', url, null, callback)
  }

  // post
  window.ajax.post = function (url, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('post', url, params, callback)
  }

  // 图片上传
  window.ajax.upload = function (url, file, callback) {
    var formData = new FormData()
    formData.append('file', file)
    $.ajax({
      type: 'POST',
      url,
      contentType: false,
      processData: false,
      data: formData,
      success: function(res) {
        if(res.errno != 0) {
          // 错误
          callback(res)
          return
        }
        // 正确
        callback(null, res.data)
      },
      error: function(err) {
        callback(err.message)
      }
    })
  }

  /**
   * ajax 基础方法 ajaxFn
   * @param {string} method 
   * @param {string} url 
   * @param {object} params 
   * @param {function} callback 
   */
  function ajaxFn(method, url, params, callback) {
    $.ajax({
      type: method.toUpperCase(),
      url,
      contentType: 'application/json;charset=UTF-8',
      data: params ? JSON.stringify(params) : '',
      success: function(res) {
        if(res.errno !== 0) {
          callback(res.message)
          return
        }
        callback(null, res.data)
      },
      error: function(err) {
        callback(err.message)
      }
    })
  }
})(window, jQuery)