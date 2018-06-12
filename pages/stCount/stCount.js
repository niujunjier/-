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
    let latitude ,longitude;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        latitude = res.latitude
        longitude = res.longitude
        wx.connectSocket({
          url: app.globalData.wssUrl
          // url: 'wss://juplus.cn:9502'
        })
      }
    })
    let id = op.classId || 4;
    let stulist = [];
    let self = this;
    
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","lat":"' + latitude + '","lng": "' + longitude +'","signed": "teacher"} }'
      })
    })
    wx.onSocketError(function (res) {
      console.log(res)
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：')
      let stData = [];
      let list = self.deduplication(res.data);
      var y=0,u=0,n=0;
      console.log(list)
      list.forEach(function(ele){
        if (ele.User.signed != 'teacher') {
          if (ele.User.signed == 'no') {
            n++;
          } else if (ele.User.signed == 'yes') {
            y++;
          } else if (ele.User.signed == 'unde') {
            u++;
          }
          stData.push(ele.User)
        } 
      })
      self.setData({ stuList: stData });
      self.setData({no: n,yes: y,unde: u})
    })
  },
  onUnload(){
    wx.closeSocket()
  },
  deduplication(jArr) {
    let arr = JSON.parse(jArr);
    let map = {}, list = [];
    arr.forEach(function (li, i) {
      let item = JSON.parse(li)
      map[item.User.id] = item;
    })
    Object.keys(map).forEach(function (k) {
      list.push(map[k])
    })
    return list;
  }
})