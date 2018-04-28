const ipConfig = 'https://www.juplus.cn/live';

const request = (url, postData) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ipConfig + url,
      data: postData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  request: request
};