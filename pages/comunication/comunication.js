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
    boom: 0,
    id: ''
  },
  getStuData: function(e){
    console.log(e.detail.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let id = op.classId || 4;
    this.setData({id:id})
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
        let stData = [].concat(self.data.stuList);;
        var f = 0, b = 0;
        var isalr = false;
        stData.forEach(function(ele){
          if (ele.id == data.User.id){
            ele.asw = data.User.asw;
            isalr = true;
          }
        })
        if (!isalr) {
          stData.push(data.User);
        }
        stData.forEach(function(ele){
          if (ele.asw == 'f') {
            f++;
          }
          if (ele.asw == 'b') {
            b++;
          }
        })
        self.setData({ stuList: stData });
        self.setData({ flower: f, boom: b })
        // console.log(stData)
      }
    })
  },
  endClass(){
    var self = this;
    wx.sendSocketMessage({
      data: '{ "Action": "cmu", "RoomId": "' + self.data.id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","asw": "end"} }'
    })
    wx.showToast({
      title: '已结束',
    })
  },
  onUnload() {
    wx.closeSocket();
  }
})