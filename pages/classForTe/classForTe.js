// pages/classForTe/classForTe.js
const app = getApp();
Page({
  data: {
    classId: '',
    sendRedStatu: false,
    reward: '',
    count: 0,
    isLog: true
  },

  endClass() {
    wx.redirectTo({
      url: '/pages/teentrance/teentrance',
    })
  },

  readCount() {
    wx.navigateTo({
      url: '/pages/stCount/stCount?classId=' + this.data.classId,
    })
  },
  beginClass() {
    console.log(this.data.classId)
    wx.navigateTo({
      url: '/pages/liveHome/liveHome?classId=' + this.data.classId,
    })
  },
  onLoad: function (options) {
    console.log(options.classId)
    this.setData({ classId: options.classId })
  },
  showMaskToggle() {
    this.setData({ sendRedStatu: !this.data.sendRedStatu })
  },
  setReward(e) {
    this.setData({ reward: e.detail.value })
  },
  setCount(e) {
    this.setData({ count: e.detail.value })
  },
  sendReward() {
    let self = this;
    let stArr = [];
    this.setData({ sendRedStatu: !this.data.sendRedStatu })
    for (let i = 0; i < this.data.count; i++) {
      getRdm()
    }
    function getRdm() {
      let self = this;
      if (stArr.indexOf(Math.ceil(Math.random() * 36)) != -1) {
        getRdm();
      } else {
        stArr.push(Math.ceil(Math.random() * 36))
      }
    }
    wx.connectSocket({
      url: 'ws://121.40.92.185:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RomeId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","rewardName":"' + self.data.reward +'","signed": "teacher","prizeList":' + JSON.stringify(stArr) + '} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
      // if (self.data.isLog) {
      //   wx.sendSocketMessage({
      //     data: '{ "Action": "sendRed", "RomeId": "' + self.data.classId + '", "User": { "name": "' + self.data.reward + '","prize": "teacher","prizeList":' + JSON.stringify(stArr) + '} }'
      //   })
      //   self.setData({ isLog: false })
      // }
    })
  }
})