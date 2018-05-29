// pages/record/record.js
const app = getApp();
Page({
  data: {
    isRecording: false,
    classId: '',
    isFirst: true,
    count: {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    },
    tempFilePath: ''
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
    let self = this;
    this.setData({ isRecording: true })
    wx.startRecord({
      success: function (res) {
        let tempFilePath = res.tempFilePath
        self.setData({ tempFilePath: tempFilePath })
      },
      fail: function (res) {
        wx.showToast({
          title: '录音失败',
        })
      }
    })
  },
  pause() {
    let self = this;
    this.setData({ isRecording: false })
    wx.stopRecord();
    setTimeout(() => {
      console.log(this.data.tempFilePath)
      wx.uploadFile({
        url: 'https://www.juplus.cn/live/index/common/upload',
        filePath: self.data.tempFilePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          let str = res.data;
        },
        fail: function (res) {
          console.log(res);
        }
      });
    },200)
  },
  sendQuestion() {
    let self = this;
    if (!self.data.isFirst) {
      return;
    }
    wx.connectSocket({
      url: 'wss://juplus.cn:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "teacher"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
      if (self.data.isFirst) {
        wx.sendSocketMessage({
          data: '{ "Action": "question", "RoomId": "' + self.data.classId + '", "User": { "url": "https://pan.baidu.com/s/1eRJ9Gps" } }'
        })
        self.setData({ isFirst: false })
      } else {
        let count = { a: 0, b: 0, c: 0, d: 0 };
        let list = JSON.parse(res.data);
        // list.forEach(function (ele) {
        //   let item = JSON.parse(ele)
        //   if (item.Action == 'question') {
        //     count[item.User.asw] ++;
        //   }
        // })
        if (list.Action == 'question' && list.User.asw) {
          count[list.User.asw]++;
        }
        self.setData({ count: count });
      }
    })
  },
  clearQuestion() {
    this.setData({ isFirst: true })
    this.setData({ count: { a: 0, b: 0, c: 0, d: 0 } });
    wx.closeSocket();
  },
  onUnload() {
    wx.closeSocket();
  }
})