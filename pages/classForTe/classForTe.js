// pages/classForTe/classForTe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classId: ''
  },

  endClass() {
    wx.redirectTo({
      url: '/pages/teentrance/teentrance',
    })
  },

  readCount() {
    wx.navigateTo({
      url: '/pages/stCount/stCount?classId=' + this.data.classId,
    })
  },
  beginClass() {
    wx.navigateTo({
      url: '/pages/liveHome/liveHome?classId=' + this.data.classId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ classId: options.classId })
  }
})