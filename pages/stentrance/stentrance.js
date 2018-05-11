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
  toUserCenter() {
    wx.navigateTo({ url: "/pages/user/user" })
  },
  toClassCenter() {
    wx.navigateTo({
      url: '/pages/scanCode/scanCode'
    })
  },
  showMaskToggle() {
    this.setData({ showMode: !this.data.showMode })
  },
  setClassValue(e) {
    this.setData({ classValue: e.detail.value })
  },
  readMsg() {
    setTimeout(function(){
      if (!this.data.classValue) {
        wx.showToast({
          title: '不能为空',
          icon: 'loading',
          duration: 1000
        })
      } else {
        wx.navigateTo({
          url: '/pages/leaveMsg/leaveMsg?classId=' + this.data.classValue
        })
      }
    }.bind(this),500)
  }
})