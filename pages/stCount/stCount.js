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
    let id = op.classId || 2;
    let stulist = [];
    let self = this;
    wx.connectSocket({
      // url: 'ws://121.40.92.185:9502'
      url: 'wss://juplus.cn/wss'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RomeId": "' + id + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "teacher"} }'
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
      for (let i = 0; i < 36; i++) {
        if (list[i]) {
          if (list[i].User.signed != 'teacher'){
            if (list[i].User.signed == 'no'){
              n++;
            } else if (list[i].User.signed == 'yes'){
              y++;
            }
            stData.push(list[i].User)
          }else{
            u++;
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