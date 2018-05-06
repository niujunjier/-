// pages/adentrance/adentrance.js
Page({
  data: {
    showMode: false,
    maskTitle: {
      name: '',
      describe: ''
    },
    classValue: '',
    focus: false
  },
  hideMode() {
    this.setData({ showMode: false, focus: false });
  },
  setClassValue(e) {
    this.setData({ classValue: e.detail.value });
  },
  readMsg() {
    let url = '';
    if (this.data.maskTitle.name == '查看留言') {
      url = '/pages/leaveMsg/leaveMsg?classId=' + this.data.classValue
    } else if (this.data.maskTitle.name == '进入教室') {
      url = '/pages/classForSt/classForSt?classId=' + this.data.classValue
    } else {
      url = '/pages/viewData/viewData?classId=' + this.data.classValue
    }
    wx.navigateTo({
      url: url
    })
  },
  viewMessage() {
    this.setData({
      maskTitle: {
        name: '查看留言',
        describe: ''
      }
    })
    this.setData({ showMode: true })
  },
  enterClassroom() {
    this.setData({
      maskTitle: {
        name: '进入教室',
        describe: ''
      }
    })
    this.setData({ showMode: true })
  },
  enterViewData() {
    this.setData({
      maskTitle: {
        name: '查看数据',
        describe: ''
      }
    })
    this.setData({ showMode: true })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})