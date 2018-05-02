const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList: [],
    classId: '',
    coMap: {
      "yes": "#ed6d00",
      "no": "#00cbcb"
    }
  },
  getStuData: function (e) {
    console.log(e.detail.detail)
  },
  onLoad: function (options) {
    this.setData({ classId: 1 })
    this.connect()
  },
  toClassForSt() {
    let self = this;
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RomeId": ' + self.data.classId + ', "User": { "id": ' + app.globalData.code + ',"name": ' + app.globalData.name + ',"signed": "yes"} }'
      })
    })
    wx.navigateTo({
      url: '/pages/classForSt/classForSt'
    })
  },
  connect() {
    let self = this;
    wx.connectSocket({
      url: 'ws://121.40.92.185:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RomeId": ' + self.data.classId + ', "User": { "id": ' + app.globalData.code + ',"name": ' + app.globalData.name + ',"signed": "no"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：')
      console.log(res.data)
      self.setData({ stuList: res.data })
    })
  }
})