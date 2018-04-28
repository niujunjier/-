Page({
  data: {
    recording: false
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  recordToggle(){
    this.setData({ recording: !this.data.recording})
  }
})