const app = getApp()
Page({
  data: {
    focus: false,
    hasMsg: false,
    value: '',
    liveUrl: '',
    srcMap:{
      boom:{
        'no': '../../assets/image/zhadanbai.png',
        'yes': '../../assets/image/zhadan.png'
      },
      flower: {
        'no': '../../assets/image/xianhuabai.png',
        'yes': '../../assets/image/xianhua.png'
      }
    },
    sendStatu:{
      boom: 'no',
      flower: 'no'
    }
  },
  onLoad(op) {
    var id = op.classId;
    app.api.useCookie('/index/live/getLive?ClassId='+id+'&Identity=student', {}).then(data => {
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
  sendBoom(){
    let sendStatu = JSON.parse(JSON.stringify(this.data.sendStatu))
    if (sendStatu.boom == 'no'){
      sendStatu.boom = 'yes'
      this.setData({ sendStatu: sendStatu})
    }
  },
  sendFlower(){
    let sendStatu = JSON.parse(JSON.stringify(this.data.sendStatu))
    if (sendStatu.flower == 'no') {
      sendStatu.flower = 'yes'
      this.setData({ sendStatu: sendStatu })
    }
  },
  sendMsg(){
    this.setData({value:''})
    this.setData({ hasMsg: false })
  }
})