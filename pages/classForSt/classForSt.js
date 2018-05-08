const app = getApp()
Page({
  data: {
    focus: false,
    hasMsg: false,
    value: '',
    liveUrl: '',
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
    var id = op.classId;
    this.setData({classId: id})
    let self = this;
    app.api.useCookie('/index/live/getLive?ClassId=' + id + '&Identity=student', {}).then(data => {
      console.log(data.data.Result)
      this.setData({ liveUrl: data.data.Result.rtmp })
      var player = wx.createLivePlayerContext('player');
      player.requestFullScreen({
        success: function () {
          console.log('success!')
        },
        fail: function () {
          console.log('failed!')
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
      sendStatu.boom = 'yes'
      this.setData({ sendStatu: sendStatu })
      setTimeout(function () {
        console.log(111)
        self.setData({ sendStatu: { boom: 'no', flower: 'no' } })
      }, 5000)
    }
  },
  sendFlower() {
    var self = this;
    let sendStatu = JSON.parse(JSON.stringify(this.data.sendStatu))
    if (sendStatu.flower == 'no') {
      sendStatu.flower = 'yes'
      this.setData({ sendStatu: sendStatu })
      setTimeout(function () {
        console.log(111)
        self.setData({ sendStatu: { boom: 'no', flower: 'no' } })
      }, 5000)
    }
  },
  sendMsg() {
    let self = this;
    if (this.data.canSend) {
      this.setData({ value: '' })
      this.setData({ hasMsg: false })
      this.setData({ canSend: false })
      setTimeout(function () {
        self.setData({ canSend: true })
      }, 10000)
      // let data = {

      // }
      // app.api.useCookie('/index/Comments/getComments',data).then(function(res){

      // })
    }
  }
})