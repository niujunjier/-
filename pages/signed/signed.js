const app = getApp()
Page({
  data: {
    stuList: [],
    classId: '',
    coMap: {
      "yes": "#ed6d00",
      "no": "#00cbcb",
      "unde": "#cccccc"
    },
    sendRedStatu: false,
    rewardName: '抵用券',
    first: true
  },
  getStuData: function (e) {
    console.log(e.detail.detail)
  },
  onLoad: function (op) {
    this.setData({ classId: op.classId || 18 })
    this.connect()
  },
  toClassForSt() {
    let self = this;
    wx.sendSocketMessage({
      data: '{ "Action": "login", "RomeId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes"} }'
    })
    wx.navigateTo({
      url: '/pages/classForSt/classForSt?classId=' + this.data.classId
    })
  },
  connect() {
    let self = this;
    wx.connectSocket({
      // url: 'ws://121.40.92.185:9502'
      url: 'wss://juplus.cn/wss'
    })
    self.setData({ test: '连接' })
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
      console.log(res)
      let stData = [];
      let list = self.deduplication(res.data);
      console.log(list)
      for (let i = 0; i < 36; i++) {
        console.log(list[i])
        if (list[i]) {
          if (list[i].User.signed != 'teacher' && list[i].User.signed != 'manger') {
            stData.push(list[i].User)
          } else if (list[i].User.pList) {
            console.log(list[i].User.pList)
            console.log(self.data.first)
            if (self.data.first == true) {
              console.log(list[i].User.pList)
              console.log(app.globalData.code)
              console.log(list[i].User.pList.indexOf(app.globalData.code) != -1)
              if (list[i].User.pList.indexOf(app.globalData.code) != -1){
                self.setData({ first: false, sendRedStatu: true, rewardName: list[i].User.rewardName })
              }
            }
          }
        } else {
          stData.push({
            "signed": "unde"
          })
        }
      }
      self.setData({ stuList: stData })
    })
  },
  onUnload() {
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
  },
  showMaskToggle() {
    this.setData({ sendRedStatu: !this.data.sendRedStatu })
  }
})