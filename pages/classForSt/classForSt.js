Page({
  data: {
    focus: false,
    hasMsg: false,
    value: '',
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