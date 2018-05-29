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
    tempFilePath: '',
    recorderManager: ''
  },
  onLoad: function (options) {
    this.setData({ classId: options.classId })
    this.setData({ recorderManager: wx.getRecorderManager() })
    this.data.recorderManager.onStart(() => {
      console.log('recorder start')
    })
    this.data.recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    this.data.recorderManager.onStop((files) => {
      console.log('recorder stop', files)
      const { tempFilePath } = files;
      console.log(tempFilePath)
      setTimeout(() => {
        console.log(this.data.tempFilePath)
        wx.uploadFile({
          url: 'https://www.juplus.cn/live/index/common/upload',
          // url: 'http://www.website.com/home/api/uploadimg',
          filePath: tempFilePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            let str = res.data;
            console.log(res)
            wx.showModal({
              title: '成功',
              content: JSON.stringify(res),
            })
          },
          fail: function (res) {
            console.log(res); wx.showToast({
              title: 'fail',
            })
          }
        });
      }, 200)
    })
    this.data.recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer)
    })
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
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    self.data.recorderManager.start(options)
    // wx.startRecord({
    //   success: function (res) {
    //     let tempFilePath = res.tempFilePath
    //     self.setData({ tempFilePath: tempFilePath })
    //   },
    //   fail: function (res) {
    //     wx.showToast({
    //       title: '录音失败',
    //     })
    //   }
    // })
  },
  pause() {
    let self = this;
    this.setData({ isRecording: false })
    self.data.recorderManager.stop()
    // wx.stopRecord();
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