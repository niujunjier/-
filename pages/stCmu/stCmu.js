// pages/stCmu/stCmu.js
const app = getApp();
var timer = null;
Page({

  data: {
    acpic: {
      f: '../../assets/image/fac.jpg',
      b: '../../assets/image/bac.jpg'
    },
    dapic: {
      f: '../../assets/image/fda.jpg',
      b: '../../assets/image/bda.jpg'
    },
    isAc: true,
    first: true,
    id: ''
  },

  onLoad: function (op) {
    let id = op.classId || 4;
    this.setData({ id: id })
    let stulist = [];
    let self = this;
    timer = setInterval(()=>{
      self.setData({ isAc: true });
    },60000)
    wx.connectSocket({
      url: app.globalData.wssUrl
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：')
      let data = JSON.parse(res.data);
      if (self.data.first){
        self.setData({ first: false });
        wx.sendSocketMessage({
          data: '{ "Action": "cmu", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","asw": "no"} }'
        })
      }
    })
  },
  sendFlower: function () {
    let self = this;
    if (this.data.isAc) {
      this.setData({ isAc: false })
      wx.sendSocketMessage({
        data: '{ "Action": "cmu", "RoomId": "' + self.data.id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","asw": "f"} }'
      })
    }
  },
  sendBoom: function () {
    let self = this;
    if (this.data.isAc) {
      this.setData({ isAc: false })
      wx.sendSocketMessage({
        data: '{ "Action": "cmu", "RoomId": "' + self.data.id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","asw": "b"} }'
      })
    }
  },
  onUnload: function () {
    wx.closeSocket();
  }
})