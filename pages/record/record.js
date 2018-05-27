// pages/record/record.js
const app = getApp();
Page({
  data: {
    isRecording: false,
    classId: ''
  },
  onLoad: function (options) {
    this.setData({ classId: options.classId })
  },
  recordToggle() {
    if (this.data.isRecording) {
      this.pause()
    } else {
      this.recording()
    }
  },
  recording() {
    this.setData({ isRecording: true })
  },
  pause() {
    this.setData({ isRecording: false })
  },
  sendQuestion() {
    let self = this;
    wx.connectSocket({
      url: 'wss://juplus.cn:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "question", "RoomId": "' + self.data.classId + '", "User": { "url": "https://pan.baidu.com/s/1eRJ9Gps" } }'
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
    })
  },
  clearQuestion(){
    wx.closeSocket();
  }
})