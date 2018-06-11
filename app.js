const api = require('./utils/api.js')
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code;
        console.log(this.globalData)
      }
    })
  },
  globalData: {
    userInfo: null,
    code: '',
    name: '',
    wssUrl: 'wss://living.zhanluo.top:9502',
    classId: null,
    courseId: null,
    courseName: ''
  },
  api: api
})