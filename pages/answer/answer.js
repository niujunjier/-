// pages/answer/answer.js
Page({
  data: {
    classId: ''
  },
  onLoad: function (options) {
    this.setData({ classId: options.classId || 234})
    let self = this;
    wx.connectSocket({
      url: 'wss://juplus.cn:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      console.log(res)
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
    })
  },
  goLive() {
    wx.navigateTo({
      url: '/pages/classForSt/classForSt?classId=' + this.data.classId,
    })
  }
})