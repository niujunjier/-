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
    setTimeout(function(){
      if (!self.data.reward){
        wx.showToast({
          title: '奖品不能为空'
        });
        return;
      }
      if (!self.data.count) {
        wx.showToast({
          title: '数量不能为空'
        });
        return;
      }
      if (!/^[0-9]*$/.test(self.data.count)){
        wx.showToast({
          title: '数量只能是数字'
        });
        return;
      }
      let stArr = [];
      self.setData({ sendRedStatu: !self.data.sendRedStatu })
      for (let i = 0; i < self.data.count; i++) {
        getRdm()
      }
      function getRdm() {
        let self = self;
        if (stArr.indexOf(Math.ceil(Math.random() * 36)) != -1) {
          getRdm();
        } else {
          stArr.push(Math.ceil(Math.random() * 36))
        }
      }
      wx.connectSocket({
        // url: 'ws://121.40.92.185:9502'
        url: 'wss://juevent.com'
      })
      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！')
        wx.sendSocketMessage({
          data: '{ "Action": "login", "RomeId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","rewardName":"' + self.data.reward + '","signed": "teacher","prizeList":' + JSON.stringify(stArr) + '} }'
        })
      })
      wx.onSocketError(function (res) {
        console.log(res)
        console.log('WebSocket连接打开失败，请检查！')
      })
      wx.onSocketMessage(function (res) {
        console.log(res)
      })
    },500)
  }
})