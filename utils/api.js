const ipConfig = 'https://tcc.taobao.com';

const request = (url, postData) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ipConfig + url,
      data: postData,
      method: 'POST',
      success: function (data) {
        resolve(data)
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