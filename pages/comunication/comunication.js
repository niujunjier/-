// pages/stCount/stCount.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList: [],
    coMap: {
      "f": "#ed6d00",
      "b": "#00cbcb",
      "no": "#cccccc"
    },
    flower: 0,
    boom: 0
  },
  getStuData: function(e){
    console.log(e.detail.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let id = op.classId || 4;
    let stulist = [];
    let self = this;
    wx.connectSocket({
      url: app.globalData.wssUrl
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "teacher"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：')
      let data = JSON.parse(res.data);
      if (data.Action == 'cmu'){
        let stData = [];
        var f = 0, b = 0;
        if (data.User.asw == 'f'){
          f++;
        }
        if (data.User.asw == 'b') {
          b++;
        }
        stData.push(data.User);
        self.setData({ stuList: stData });
        self.setData({ flower: f, boom: b })
      }
    })
  },
  onUnload(){
    wx.closeSocket()
  }
})