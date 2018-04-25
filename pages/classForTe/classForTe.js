// pages/classForTe/classForTe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  
  endClass(){
    wx.redirectTo({
      url: '/pages/teentrance/teentrance',
    })
  },

  readCount(){
    wx.navigateTo({
      url: '/pages/stCount/stCount',
    })
  },
  beginClass(){
    wx.navigateTo({
      url: '/pages/liveHome/liveHome',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})