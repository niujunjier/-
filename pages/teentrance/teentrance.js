const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMode: false,
    maskTitle: {
      name: '进入教室',
      describe: '上次创建班级为701'
    },
    classValue: '',
    lastClassValue: '',
    focus: false
  },
  onLoad(op) {
    app.api.useCookie('/index/user/searchLastClass/Id/' + app.globalData.code, { UserId: app.globalData.code }).then(data => {
      console.log(data)
      if (data.data.Status == 'success') {
        this.setData({ lastClassValue: data.data.Result.classNo })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  toUserCenter() {
    wx.navigateTo({ url: "/pages/user/user" })
  },
  toClassCenter() {
    let self = this;
    if (self.data.lastClassValue) {
      wx.navigateTo({
        url: '/pages/classForTe/classForTe?classId=' + self.data.lastClassValue
      })
    } else {
      wx.showLoading({
        title: '您还没有班级',
        duration: 1000
      })
    }
  },
  setClassValue(e) {
    this.setData({ classValue: e.detail.value });
  },
  inputClassNum() {
    this.setData({ showMode: true, focus: true });
  },
  hideMode() {
    console.log(this.data.classValue)
    this.setData({ showMode: false, focus: false });
    console.log(this.data.classValue)
  },
  readMsg() {
    console.log(this.data.classValue)
    if (this.data.lastClassValue) {
      wx.navigateTo({
        url: '/pages/leaveMsg/leaveMsg?classId=' + this.data.lastClassValue
      })
    } else {
      wx.showToast({
        title: '你还没有班级',
        icon: 'loading',
        duration: 2000
      })
    }
  }
})