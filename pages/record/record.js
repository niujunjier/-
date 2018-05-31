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
    recorderManager: '',
    url: ''
  },
  onLoad: function (options) {
    let self = this;
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
        // let innerAudioContext = wx.createInnerAudioContext()
        // innerAudioContext.src = tempFilePath;
        // innerAudioContext.onPlay(() => {
        //   console.log('开始播放')
        // })
        // innerAudioContext.onError((res) => {
        //   console.log(res.errMsg)
        //   console.log(res.errCode)
        // })
        // innerAudioContext.onEnded((res) => {
        //   console.log(res)
        // })
        // innerAudioContext.play();
        wx.uploadFile({
          url: 'https://www.juplus.cn/live/index/common/upload',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            "ClassId": options.classId,
            "UserId": app.globalData.code
          },
          header: {
            'content-type': 'multipart/form-data',
            'cookie': wx.getStorageSync("userId")
          },
          success: function (res) {
            let str = res.data;
            console.log(res)
            wx.showModal({
              title: '成功',
              content: "录制成功",
            })
            self.setData({ url: 'https://www.juplus.cn/' + JSON.parse(res.data).url })
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
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
  },
  pause() {
    let self = this;
    this.setData({ isRecording: false })
    self.data.recorderManager.stop()
  },
  sendQuestion() {
    let self = this;
    if (!self.data.url) {
      wx.showToast({
        title: '没有录音',
      })
      return;
    }
    if (!self.data.isFirst) {
      wx.showToast({
        title: '不要多次发送',
      })
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
          data: '{ "Action": "question", "RoomId": "' + self.data.classId + '", "User": { "url": "' + self.data.url + '" } }'
        })
        wx.showToast({
          title: '发送成功',
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
    if (!this.data.url) {
      wx.showToast({
        title: '没有录音',
      })
      return;
    }
    this.setData({ isFirst: true, url: '' })
    this.setData({ count: { a: 0, b: 0, c: 0, d: 0 } });
    wx.closeSocket();
    wx.showToast({
      title: '已清空',
    })
  },
  onUnload() {
    wx.closeSocket();
  }
})