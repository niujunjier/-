// pages/classForTe/classForTe.js
const app = getApp();
Page({
  data: {
    classId: '',
    sendRedStatu: false,
    reward: '测试',
    count: 36,
    isLog: true,
    userData: "{}"
  },

  endClass() {
    wx.redirectTo({
      url: '/pages/teentrance/teentrance',
    })
  },

  readCount() {
    wx.closeSocket()
    wx.navigateTo({
      url: '/pages/stCount/stCount?classId=' + this.data.classId,
    })
  },
  beginClass() {
    console.log(this.data.classId)
    wx.closeSocket()
    wx.navigateTo({
      url: '/pages/question/question?classId=' + this.data.classId,
    })
  },
  onLoad(options){
    this.setData({ classId: options.classId })
  },
  onShow: function (options) {
    console.log(this.data.classId)
    let self = this;
    wx.connectSocket({
      // url: 'ws://121.40.92.185:9502'
      url: 'wss://juplus.cn:9502'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","signed": "teacher"} }'
      })
    })
    wx.onSocketMessage(function (res) {
      console.log(res)
      self.setData({ userData: res.data, isLog: false })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
      console.log(res)
      wx.showToast({
        title: '链接失败'
      });
    })
  },
  onUnload() {
    wx.closeSocket()
  },
  showMaskToggle() {
    this.setData({ sendRedStatu: !this.data.sendRedStatu })
  },
  setReward(e) {
    this.setData({ reward: e.detail.value })
  },
  setCount(e) {
    this.setData({ count: e.detail.value })
  },
  sendReward() {
    let self = this;
    setTimeout(function () {
      if (!self.data.reward) {
        wx.showToast({
          title: '奖品不能为空'
        });
        return;
      }
      if (!self.data.count) {
        wx.showToast({
          title: '数量不能为空'
        });
        return;
      }
      if (!/^[0-9]*$/.test(self.data.count)) {
        wx.showToast({
          title: '数量只能是数字'
        });
        return;
      }
      let list = JSON.parse(self.data.userData);
      let UserList = [];
      list.forEach(function (ele) {
        let user = JSON.parse(ele)
        console.log(user)
        if (user.User.signed != 'teacher' && UserList.indexOf(user.User.id) == -1) {
          UserList.push(parseInt(user.User.id))
        }
      })
      let reWardArr = [];
      reWardArr = self.getArrayItems(UserList, self.data.count);

      console.log(reWardArr)
      console.log('{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","rewardName":"' + self.data.reward + '","pList":"' + JSON.stringify(reWardArr) + '",signed": "teacher"} }')
      wx.sendSocketMessage({
        data: '{ "Action": "login", "RoomId": "' + self.data.classId + '", "User": { "id": "' + app.globalData.code + '","name": "' + app.globalData.name + '","rewardName":"' + self.data.reward + '","pList":"' + JSON.stringify(reWardArr) + '","signed": "teacher"} }'
      })
      self.showMaskToggle();
    }, 500)
  },
  getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
      temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if (temp_array.length > 0) {
        //在数组中产生一个随机索引
        var arrIndex = Math.floor(Math.random() * temp_array.length);
        //将此随机索引的对应的数组元素值复制出来
        return_array[i] = temp_array[arrIndex];
        //然后删掉此索引的数组元素,这时候temp_array变为新的数组
        temp_array.splice(arrIndex, 1);
      } else {
        //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
        break;
      }
    }
    return return_array;
  }
})