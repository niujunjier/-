const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList: [],
    classId: '',
    coMap: {
      "yes": "#ed6d00",
      "no": "#00cbcb",
      "unde": "#cccccc"
    }
  },
  getStuData: function (e) {
    console.log(e.detail.detail)
  },
  onLoad: function (op) {
    this.setData({ classId: op.classId || 2 })
    this.connect()
  },
  toClassForSt() {
    let self = this;
    wx.sendSocketMessage({
      data: '{ "Action": "login", "RomeId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes"} }'
    })
    wx.navigateTo({
      url: '/pages/classForSt/classForSt?classId='+this.data.classId
    })
  },
  connect() {
    let self = this;
    wx.connectSocket({
      url: 'ws://121.40.92.185:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RomeId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "no"} }'
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
      for (let i = 0; i < 36; i++) {
        if (list[i]) {
          stData.push(list[i].User)
        } else {
          stData.push({
            "signed": "unde"
          })
        }
      }
      self.setData({ stuList: stData })
    })
  },
  onHide() {
    wx.closeSocket()
  },
  deduplication(jArr) {
    let arr = JSON.parse(jArr);
    let map = {},list =[];
    arr.forEach(function(li,i){
      let item = JSON.parse(li)
      map[item.User.id] = item;
    })
    Object.keys(map).forEach(function(k){
      list.push(map[k])
    })
    return list;
  }
})