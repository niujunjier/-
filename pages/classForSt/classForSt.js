const app = getApp()
Page({
  data: {
    focus: false,
    hasMsg: false,
    value: '',
    liveUrl: '',
    liveUrl1: '',
    liveUrl2: '',
    canSend: true,
    classId: '',
    msgArr: [],
    srcMap: {
      boom: {
        'no': '../../assets/image/zhadanbai.png',
        'yes': '../../assets/image/zhadan.png'
      },
      flower: {
        'no': '../../assets/image/xianhuabai.png',
        'yes': '../../assets/image/xianhua.png'
      }
    },
    sendStatu: {
      boom: 'no',
      flower: 'no'
    }
  },
  onUnload() {
    wx.closeSocket()
  },
  onLoad(op) {
    let self = this;
    var id = op.classId;
    wx.connectSocket({
      url: 'wss://juplus.cn:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
      let msgOp = JSON.parse(res.data)
      if (msgOp.Action == 'msg') {
        let msgarr = JSON.parse(JSON.stringify(self.data.msgArr));
        msgarr.push(msgOp.User.msg);
        if (msgarr.length > 10) {
          msgarr.splice(0, 1)
        }
        self.setData({ msgArr: msgarr })
      }
    })
    this.setData({ classId: id })
    app.api.useCookie('/index/live/getLive?ClassId=' + id + '&Identity=student', {}).then(data => {
      console.log(data.data.Result)
      this.setData({ liveUrl: data.data.Result.hls })
      this.setData({ liveUrl1: data.data.Result.http })
      this.setData({ liveUrl2: data.data.Result.rtmp })
      var player = wx.createLivePlayerContext('player');
      player.play({
        success: function (res) {
          console.log(res)
          console.log('success!')
          wx.showToast({
            title: 'success!',
            icon: 'loading',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res)
          console.log('failed!')
          wx.showToast({
            title: 'failed!',
            icon: 'loading',
            duration: 2000
          })
        },
        complete: function () {
          console.log('complete!')
        }
      });
    })
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  awakenKey() {
    this.setData({ focus: !this.data.focus })
  },
  getMsg(e) {
    this.setData({ value: e.detail.value })
    this.setData({ hasMsg: true })
  },
  checkMagNull(e) {
    if (e.detail.value) {
      this.setData({ hasMsg: true })
    } else {
      this.setData({ hasMsg: false })
    }
  },
  sendBoom() {
    var self = this;
    let sendStatu = JSON.parse(JSON.stringify(this.data.sendStatu))
    if (sendStatu.boom == 'no') {
      let data = {
        classId: self.data.classId,
        boom: 1,
        flower: 0
      }
      app.api.useCookie('/index/Redpack/setRedpack', data).then(function (res) {
        sendStatu.boom = 'yes'
        self.setData({ sendStatu: sendStatu })
        setTimeout(function () {
          self.setData({ sendStatu: { boom: 'no', flower: 'no' } })
        }, 5000)
      })
      wx.sendSocketMessage({
        data: '{ "Action": "msg", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes","msg": "' + app.globalData.name+'送了一个炸弹"} }'
      })
    }
  },
  sendFlower() {
    var self = this;
    let sendStatu = JSON.parse(JSON.stringify(this.data.sendStatu))
    if (sendStatu.flower == 'no') {
      let data = {
        classId: self.data.classId,
        boom: 0,
        flower: 1
      }
      app.api.useCookie('/index/Redpack/setRedpack', data).then(function (res) {
        sendStatu.flower = 'yes'
        self.setData({ sendStatu: sendStatu })
        setTimeout(function () {
          self.setData({ sendStatu: { boom: 'no', flower: 'no' } })
        }, 5000)
      })
      wx.sendSocketMessage({
        data: '{ "Action": "msg", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes","msg": "' + app.globalData.name +'送了一个鲜花"} }'
      })
    }

  },
  sendMsg() {
    let self = this;
    setTimeout(function () {
      if (self.data.canSend) {
        if (!self.data.value) {
          wx.showToast({
            title: '不能为空',
            icon: 'loading',
            duration: 1000
          })
          return;
        }
        let data = {
          ClassId: self.data.classId,
          Comment: self.data.value
        }
        app.api.useCookie('/index/Comments/setComments', data).then(function (res) {
          self.setData({ value: '' })
          self.setData({ hasMsg: false })
          self.setData({ canSend: false })
          setTimeout(function () {
            self.setData({ canSend: true })
          }, 10000)
        })
        wx.sendSocketMessage({
          data: '{ "Action": "msg", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes","msg": "' + self.data.value + '"} }'
        })
      }
    }, 500)
  }
})