const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskTitle: {
      name: '进入教室',
      describe: ''
    },
    classValue: '',
    showMode: false
  },
  onLoad(op) {
    this.setData({ classValue: app.globalData.classId })
  },
  toUserCenter() {
    wx.navigateTo({ url: "/pages/user/user" })
  },
  toClassCenter() {
    if (!this.data.classValue) {
      wx.showToast({
        title: '您还没有班级',
        icon: 'loading',
        duration: 1000
      })
    }else{
      wx.navigateTo({
        url: '/pages/signed/signed?classId=' + this.data.classValue
      })
    }
  },
  showMaskToggle() {
    this.setData({ showMode: !this.data.showMode })
  },
  setClassValue(e) {
    this.setData({ classValue: e.detail.value })
  },
  readMsg() {
    let self = this;
    if (!this.data.classValue) {
      wx.showToast({
        title: '您还没有班级',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '/pages/leaveMsg/leaveMsg?classId=' + this.data.classValue
      })
    }
  }
})