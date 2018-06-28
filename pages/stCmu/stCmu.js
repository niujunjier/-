// pages/stCmu/stCmu.js
const app = getApp();
var timer = null;
var timer1 = null;

Page({
  data: {
    maskTitle: {
      name: '留言',
      describe: ''
    },
    showMode:  false,
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
    id: '',
    value: ''
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
      let data = JSON.parse(res.data);
      console.log('收到服务器内容：')
      if (self.data.first){
        wx.sendSocketMessage({
          data: '{ "Action": "cmu", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","asw": "no"} }'
        })
        self.setData({ first: false });
      }
      if (data.Action == "cmu" && data.User.asw=='end'){
        self.setData({ showMode: true });
      }
    })
    timer1 = setInterval(() => {
      wx.sendSocketMessage({
        data: '{ "Action": "cmu", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","asw": "no"} }'
      })
    }, 180000)
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
  setClassValue(e){
    this.setData({ value: e.detail.value })
  },
  sendMsg(){
    let self = this;
    setTimeout(function () {
      if (!self.data.value) {
        wx.showToast({
          title: '不能为空',
          icon: 'loading',
          duration: 1000
        })
        return;
      }
      let data = {
        ClassId: app.globalData.classId,
        Comment: self.data.value
      }
      app.api.useCookie('/index/Comments/setComments', data).then(function (res) {
        self.setData({ value: '', showMode: false })
      })
    }, 500)
  },
  onUnload: function () {
    clearInterval(timer)
    clearInterval(timer1)
    wx.closeSocket();
  }
})