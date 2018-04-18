Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList: []
  },
  getStuData: function (e) {
    console.log(e.detail.detail)
  },
  onLoad: function (options) {
    let stulist = [];
    for (let i = 0; i < 36; i++) {
      stulist.push({
        detail: { name: 'jack', id: 1 },
        color: i < 18 ? '#ed6d00' : '#00cbcb'
      })
    }
    this.setData({ stuList: stulist })
  },
  toClassForSt(){
    wx.navigateTo({
      url: '/pages/classForSt/classForSt',
    })
  }
})