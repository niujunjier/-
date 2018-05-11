// pages/viewData/viewData.js
const app = getApp();
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
      console.log(res.Status)
      console.log(res)
      if (res.data.Status == 'success') {
        console.log(1)
        let dataList = res.data.result;
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
        let fPercent = (flower / max).toFixed(2) * 100;
        let bPercent = (boom / max).toFixed(2) * 100;
        console.log(fPercent, bPercent)
        self.setData({ flower: flower, boom: boom, fPercent: fPercent, bPercent: bPercent });
      }
    })
  }
})