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
  onLoad(op) {
    let id = 15;
    // var id = op.classId;
    // this.setData({ classId: id})
    // let self = this;
    // app.api.useCookie('/index/live/getLive?ClassId=' + id + '&Identity=student', {}).then(data => {
    //   console.log(data.data.Result)
    //   this.setData({ liveUrl: data.data.Result.hls })
    //   this.setData({ liveUrl1: data.data.Result.http })
    //   this.setData({ liveUrl2: data.data.Result.rtmp })
    //   var player = wx.createLivePlayerContext('player');
    //   player.play({
    //     success: function (res) {
    //       console.log(res)
    //       console.log('success!')
    //       wx.showToast({
    //         title: 'success!',
    //         icon: 'loading',
    //         duration: 2000
    //       })
    //     },
    //     fail: function (res) {
    //       console.log(res)
    //       console.log('failed!')
    //       wx.showToast({
    //         title: 'failed!',
    //         icon: 'loading',
    //         duration: 2000
    //       })
    //     },
    //     complete: function () {
    //       console.log('complete!')
    //     }
    //   });
    // })
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
    }

  },
  sendMsg() {
    let self = this;
    setTimeout(function () {
      if (self.data.canSend) {
        if (!self.data.value){
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
      }
    }, 500)
  }
})