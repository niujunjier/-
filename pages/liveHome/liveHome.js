const app = getApp()
Page({
  data: {
    recording: false,
    pushUrl: '',
    working: false
  },
  onLoad(op){
    app.api.request('/index/live/cancelLive?ClassId=1&Identity=teacher', {}).then(res => {
      console.log(res)
      app.api.useCookie('/index/live/getLive?ClassId=1&Identity=teacher', {}).then(data => {
        console.log(data.data.Result.pushUrl)
        this.setData({ pushUrl: data.data.Result.pushUrl, working: true })
      })
    })
    
  },
  onHide(op){
    app.api.request('/index/live/finishLive?ClassId=1&Identity=teacher', {}).then(res => {
      console.log(res)
    })
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  recordToggle(){
    this.setData({ recording: !this.data.recording})
  }
})