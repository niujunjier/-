// pages/stCount/stCount.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList: [],
    coMap: {
      "yes": "#ed6d00",
      "no": "#00cbcb",
      "unde": "#cccccc"
    },
    yes: 0,
    no: 0,
    unde: 0
  },
  getStuData: function(e){
    console.log(e.detail.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let stulist = [];
    let self = this;
    wx.connectSocket({
      url: 'ws://121.40.92.185:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RomeId": "' + op.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "teacher"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：')
      let stData = [];
      let list = JSON.parse(res.data) || [];
      var y=0,u=0,n=0;
      for (let i = 0; i < 36; i++) {
        if (list[i]) {
          console.log(JSON.parse(list[i]).User.signed)
          if (JSON.parse(list[i]).User.signed != 'teacher'){
            if (JSON.parse(list[i]).User == 'no'){
              n++;
            } else if (JSON.parse(list[i]).User == 'yes'){
              y++;
            }
            stData.push(JSON.parse(list[i]).User)
          }
        } else {
          u++;
          stData.push({
            "signed": "unde"
          })
        }
      }
      self.setData({ stuList: stData });
      self.setData({no: n,yes: y,unde: u})
    })
  }
})