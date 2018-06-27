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
    first: true,
    lat: '',
    lng: '',
    telat: '',
    teLng: ''
  },
  getStuData: function (e) {
    console.log(e.detail.detail)
  },
  onLoad: function (op) {
    self = this;
    let latitude, longitude;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        latitude = res.latitude
        longitude = res.longitude
        self.setData({ lat: latitude, lng: longitude })
      }
    })
    this.setData({ classId: op.classId })
    this.connect()
  },
  toClassForSt() {
    let self = this;
    let dis = this.getDis(this.data.lat, this.data.lng, this.data.telat, this.data.telat );
    wx.sendSocketMessage({
      data: '{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "yes"} }'
    })
    wx.closeSocket()
    wx.navigateTo({
      url: '/pages/answer/answer?classId=' + this.data.classId
    })
  },
  connect() {
    let self = this;
    wx.connectSocket({
      url: app.globalData.wssUrl
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "unde"} }'
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
      list.forEach(function (ele) {
        if (ele.User.signed != 'teacher' && ele.User.signed != 'manger') {
          stData.push(ele.User)
        } else if (ele.User.pList) {
          if (self.data.first == true) {
            if (ele.User.pList.indexOf(app.globalData.code) != -1) {
              self.setData({ first: false, sendRedStatu: true, rewardName: ele.User.rewardName })
            }
          }
        }
      })
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
      if (map[k].lat) {
        this.setData({ telat: map[k].lat, telng: map[k].lng })
      }
      list.push(map[k])
    })
    return list;
  },
  showMaskToggle() {
    this.setData({ sendRedStatu: !this.data.sendRedStatu })
  },
  getDis(lat1, lng1, lat2, lng2) {
    getDisance(lat1, lng1, lat2, lng2);
    function toRad(d) { return d * Math.PI / 180; }
    function getDisance(lat1, lng1, lat2, lng2) {
      var dis = 0;
      var radLat1 = toRad(lat1);
      var radLat2 = toRad(lat2);
      var deltaLat = radLat1 - radLat2;
      var deltaLng = toRad(lng1) - toRad(lng2);
      var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
      return dis * 6378137;
    }
  }
})