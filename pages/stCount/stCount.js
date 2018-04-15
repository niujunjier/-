// pages/stCount/stCount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList: []
  },
  getStuData: function(e){
    console.log(e.detail.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let stulist = [];
    for (let i = 0; i < 36; i++) {
      stulist.push({
        detail: { name: 'jack', id: 1 },
        color: i<12?'#ed6d00':(i<24?'#00cbcb':'#eaeaea')
      })
    }
    this.setData({ stuList: stulist })
  }
})