// pages/qrcode/qrcode.js
Page({
  data: {
    classId: ''
  },
  onLoad(op) {
    console.log(op.classId)
    this.setData({ classId: op.classId })
  },
  begin() {
    wx.navigateTo({
      url: '/pages/classForTe/classForTe?classId='+this.data.classId
    })
  }
})