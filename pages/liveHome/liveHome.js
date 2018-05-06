const app = getApp()
Page({
  data: {
    recording: false,
    pushUrl: '',
    working: false,
    classId: '',
    showMode: false,
    baocun: '../../assets/image/baocun2.png'
  },
  onLoad(op) {
    this.setData({ classId: op.classId })
    console.log(op.classId)
    app.api.request('/index/live/cancelLive?ClassId='+ this.data.classId +'&Identity=teacher', {}).then(res => {
      console.log(res)
      app.api.useCookie('/index/live/getLive?ClassId=' + this.data.classId +'&Identity=teacher', {}).then(data => {
        console.log(data.data.Result.pushUrl)
        console.log(data.data.Result.pushUrl)
        this.setData({ pushUrl: data.data.Result.pushUrl, working: true })
        this.startPush()
      })
    })
  },
  onUnload(op) {
    console.log(123)
    app.api.request('/index/live/finishLive?ClassId=' + this.data.classId +'&Identity=teacher', {}).then(res => {
      console.log(res)
    })
  },
  startPush(){
    let pusher = wx.createLivePusherContext('pusher');
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
      }
    });
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  recordToggle() {
    this.setData({ recording: !this.data.recording })
    let pusher = wx.createLivePusherContext('pusher');
    if (!this.data.recording){
      pusher.resume({
        success: function (ret) {
          console.log('resume push success!')
          wx.showToast({
            title: 'resume!',
            icon: 'loading',
            duration: 2000
          })
        },
        fail: function () {
          console.log('resume failed!')
          wx.showToast({
            title: 'resume push failed!',
            icon: 'loading',
            duration: 2000
          })
        },
        complete: function () {
          console.log('complete!')
        }
      })
    }else{
      pusher.pause({
        success: function (ret) {
          console.log('pause push success!')
          wx.showToast({
            title: 'pause success!',
            icon: 'loading',
            duration: 2000
          })
        },
        fail: function () {
          console.log('pause failed!')
          wx.showToast({
            title: 'start push failed!',
            icon: 'loading',
            duration: 2000
          })
        },
        complete: function () {
          console.log('complete!')
        }
      })
    }
  },
  save() {
    let self = this;
    wx.showToast({
      title: '保存成功',
    })
    this.setData({ baocun: '../../assets/image/baocun.png' })
    setTimeout(function(){
      self.setData({ baocun: '../../assets/image/baocun2.png' })
    },10000)
  }
})