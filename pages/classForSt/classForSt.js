const app = getApp()
Page({
  data: {
    focus: false,
    hasMsg: false,
    value: '',
    liveUrl: '',
  },
  onLoad(op){
      app.api.useCookie('/index/live/getLive?ClassId=1&Identity=teacher', {}).then(data => {
        console.log(data.data.Result.pushUrl)
        this.setData({ pushUrl: data.data.Result.pushUrl, working: true })
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
  checkMagNull(e){
    if (e.detail.value){
      this.setData({ hasMsg: true })
    }else{
      this.setData({ hasMsg: false })
    }
  }
})