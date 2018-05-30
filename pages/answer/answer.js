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
    isPlay: false,
    innerAudioContext: ''
  },
  onLoad: function (options) {
    this.setData({ classId: options.classId || 234 })
    this.setData({ innerAudioContext: wx.createInnerAudioContext() })
    // this.data.innerAudioContext.src = "https://pan.baidu.com/s/1eRJ9Gps";
    this.data.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.data.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    this.data.innerAudioContext.onEnded((res) => {
      console.log(res)
    })
    // this.data.innerAudioContext.play();
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
      if (self.data.first) {
        wx.sendSocketMessage({
          data: '{ "Action": "question", "RoomId": "' + self.data.classId + '", "User": {  } }'
        })
        self.setData({ first: false })
      } else {
        let list = JSON.parse(res.data);
        if (list.Action == 'question' && list.User.url) {
          self.setData({ url: list.User.url, sendRedStatu: true })
          self.data.innerAudioContext.src = list.User.url;
        }
      }
      console.log(res)
    })
  },
  playToggle() {
    let self = this;
    console.log(self.data.innerAudioContext.src)
    self.setData({ isPlay: !self.data.isPlay });
    if (self.data.isPlay){
      self.data.innerAudioContext.play();
    }else{
      self.data.innerAudioContext.pause();
    }
  },
  goLive() {
    wx.navigateTo({
      url: '/pages/classForSt/classForSt?classId=' + this.data.classId,
    })
  },
  sendAsw(e) {
    console.log(e.target.dataset.key)
    wx.sendSocketMessage({
      data: '{ "Action": "question", "RoomId": "' + this.data.classId + '", "User": { "asw": "' + e.target.dataset.key + '" } }'
    })
    this.setData({ sendRedStatu: false })
  },
  test() {
    wx.sendSocketMessage({
      // data: '{ "Action": "question", "RoomId": "' + this.data.classId + '", "User": { "asw": "a" } }'
      data: '{ "Action": "question", "RoomId": "' + this.data.classId + '", "User": { "url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46" } }'
    })
  },
  showMaskToggle() {
    this.setData({ sendRedStatu: false })
  },
  onUnload() {
    wx.closeSocket();
  }
})