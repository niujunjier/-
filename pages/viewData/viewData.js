// pages/viewData/viewData.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flower: 0,
    boom: 0,
    classId: '全体班级',
    fPercent: 0,
    bPercent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {}
    let url = '/index/Redpack/getRedpackSum'
    if (options.classId != 'all') {
      data = {
        classId: options.classId
      }
      this.setData({ classId: options.classId })
      url = '/index/Redpack/getRedpack'
    }
    let self = this;
    app.api.useCookie(url, data).then(function (res) {
      console.log(res.Status)
      console.log(res)
      if (res.data.Status == 'success') {
        let boom = 0;
        let flower = 0;
        if (options.classId != 'all') {
          let dataList = res.data.result;
          dataList.forEach(function (ele) {
            if (ele.boom) {
              boom += parseInt(ele.boom);
            }
            if (ele.flower) {
              flower += parseInt(ele.flower);
            }
          })
        } else {
          let dataList = res.data.Result;
          dataList.forEach(function (ele) {
            // if (ele.boom) {
            boom += parseInt(parseInt(ele.total_boom));
            // }
            // if (ele.flower) {
            flower += parseInt(parseInt(ele.total_flower));
            // }
          })
        }

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