// pages/question/question.js
Page({
  data: {
    classId: ''
  },
  onLoad: function (options) {
    this.setData({ classId: options.classId })
  },
  goLive(){
    wx.navigateTo({
      url: '/pages/liveHome/liveHome?classId=' + this.data.classId,
    })
  },
  goRecord() {
    wx.navigateTo({
      url: '/pages/record/record?classId=' + this.data.classId,
    })
  },
  goCmu() {
    wx.navigateTo({
      url: '/pages/comunication/comunication?classId=' + this.data.classId,
    })
  }
})