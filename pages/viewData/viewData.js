// pages/viewData/viewData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flower: 0,
    boom: 0,
    classId: '',
    fPercent: 0,
    bPercent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {
      classId: options.classId
    }
    let self = this;
    app.api.useCookie('/index/Redpack/getRedpack', data).then(function (res) {
      if (res.Status == 'success') {
        let dataList = res.result;
        let boom = 0;
        let flower = 0;
        dataList.forEach(function (ele) {
          if (ele.boom) {
            boom += parseInt(ele.boom);
          }
          if (ele.flower) {
            flower += parseInt(ele.flower);
          }
        })
        var max = boom > flower ? boom : flower;
        max *= 1.5;
        let fPercent = Math.floor(flower / max) * 100;
        let bPercent = Math.floor(boom / max) * 100;
        self.setData({ flower: flower, boom: boom, fPercent: fPercent, bPercent: bPercent });
      }
    })
  }
})