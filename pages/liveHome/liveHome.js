const app = getApp()
Page({
  data: {
    recording: false,
    pushUrl: '',
    working: false,
    classId: ''
  },
  onLoad(op) {
    this.setData({ classId: op.classId })
    app.api.request('/index/live/cancelLive?ClassId='+ this.data.classId +'&Identity=teacher', {}).then(res => {
      console.log(res)
      app.api.useCookie('/index/live/getLive?ClassId=' + this.data.classId +'&Identity=teacher', {}).then(data => {
        console.log(data.data.Result.pushUrl)
        this.setData({ pushUrl: data.data.Result.pushUrl, working: true })
        var pusher = wx.createLivePusherContext('pusher');
        pusher.start({
          success: function (ret) {
            console.log('start push success!')
            wx.showToast({
              title: 'success!',
              icon: 'loading',
              duration: 2000
            })
          },
          fail: function () {
            console.log('failed!')
            wx.showToast({
              title: 'start push failed!',
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function () {
            console.log('complete!')
            wx.showToast({
              title: 'start push failed!',
              icon: 'loading',
              duration: 2000
            })
          }
        });
      })
    })

  },
  onHide(op) {
    app.api.request('/index/live/finishLive?ClassId=1&Identity=teacher', {}).then(res => {
      console.log(res)
    })
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  recordToggle() {
    this.setData({ recording: !this.data.recording })
  }
})