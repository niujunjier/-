Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskTitle: {
      name: '进入教室',
      describe: ''
    },
    classValue: ''
  },
  toUserCenter() {
    wx.navigateTo({ url: "/pages/user/user" })
  },
  toClassCenter() {
    wx.navigateTo({
      url: '/pages/scanCode/scanCode'
    })
  }
})