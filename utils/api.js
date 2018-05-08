const ipConfig = 'https://www.juplus.cn/live';

const request = (url, postData) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ipConfig + url,
      data: postData,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
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
const useCookie = (url, postData) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ipConfig + url,
      data: postData,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync("userId")
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
  request: request,
  useCookie: useCookie
};