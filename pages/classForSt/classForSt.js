const app = getApp()
Page({
  data: {
    focus: false,
    hasMsg: false,
    value: '',
    liveUrl: '',
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
  }
})