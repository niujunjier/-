// pages/answer/answer.js
const app = getApp();
Page({
  data: {
    classId: '',
    first: true,
    url: '',
    sendRedStatu: false,
    title: {
      name: '提问',
      description: ''
    },
    isPlay: false
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
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "teacher"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      if(self.data.first){
        wx.sendSocketMessage({
          data: '{ "Action": "question", "RoomId": "' + self.data.classId + '", "User": {  } }'
        })
        self.setData({ first: false })
      }else{
        let list = JSON.parse(res.data);
        if (list.Action == 'question' && list.User.url) {
          self.setData({ url: list.User.url, sendRedStatu: true })
        }
      }
      console.log(res)
    })
  },
  goLive() {
    wx.navigateTo({
      url: '/pages/classForSt/classForSt?classId=' + this.data.classId,
    })
  },
  sendAsw(e){
    console.log(e.target.dataset.key)
    wx.sendSocketMessage({
      data: '{ "Action": "question", "RoomId": "' + this.data.classId + '", "User": { "asw": "' + e.target.dataset.key +'" } }'
    })
    this.setData({ sendRedStatu: false })
  },
  test(){
    wx.sendSocketMessage({
      // data: '{ "Action": "question", "RoomId": "' + this.data.classId + '", "User": { "asw": "a" } }'
      data: '{ "Action": "question", "RoomId": "' + this.data.classId + '", "User": { "url": "https://pan.baidu.com/s/1eRJ9Gps" } }'
    })
  },
  showMaskToggle(){
    this.setData({ sendRedStatu: false })
  },
  onUnload(){
    wx.closeSocket();
  }
})