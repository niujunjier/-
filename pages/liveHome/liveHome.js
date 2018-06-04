const app = getApp()
Page({
  data: {
    recording: false,
    pushUrl: '',
    working: false,
    classId: '',
    showMode: false,
    baocun: '../../assets/image/baocun2.png',
    msgArr: []
  },
  onLoad(op) {
    this.setData({ classId: op.classId })
    console.log(op.classId)
    let self = this;
    wx.connectSocket({
      url: app.globalData.wssUrl
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + op.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
      let msgOp = JSON.parse(res.data)
      if (msgOp.Action == 'msg') {
        let msgarr = JSON.parse(JSON.stringify(self.data.msgArr));
        msgarr.push(msgOp.User.msg);
        if (msgarr.length > 10) {
          msgarr.splice(0, 1)
        }
        self.setData({ msgArr: msgarr })
      }
    })

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