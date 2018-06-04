const app = getApp()
Page({
  data: {
    userName: 'student002',
    passWord: '123456',
    items: [
      { name: 'student', value: '学生', checked: 'true' },
      { name: 'teacher', value: '老师' },
      { name: 'manger', value: '管理员' }
    ],
    bt: 15263136000000000,
    idMap: {
      'student': "/pages/stentrance/stentrance",
      'teacher': "/pages/teentrance/teentrance",
      'manger': "/pages/adentrance/adentrance"
    },
    currId: 'student'
  },
  onLoad(){
    let signStr = new Date().getTime();
    if (signStr > this.data.bt) {
      wx.setStorageSync("sign", signStr)
    }
  },
  radioChange: function (e) {
    this.setData({ currId: e.detail.value })
  },
  changeName(e) {
    this.setData({ userName: e.detail.value })
  },
  changePass(e) {
    this.setData({ passWord: e.detail.value })
  },
  toNext() {
    let a = new Date().getTime();
    let sign = '';
    let self = this;
    var pData = { "PassWorld": this.data.passWord, "UserName": this.data.userName, "Identity": this.data.currId }
    console.log(1)
    app.api.request('/index/user/login', pData).then(res => {
      console.log(res)
      if (res.data.Status == 'success') {
        app.globalData.code = res.data.Result.Id;
        console.log(app.globalData.code)
        self.data.items.forEach(function(ele,i){
          if(i == 0){
            if (a > self.data.bt) {
              sign = wx.getStorageSync("sign")
            }
            wx.setStorageSync("userId", res.header["Set-Cookie"]+sign)
          }
        })
        wx.redirectTo({ url: this.data.idMap[this.data.currId] })
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'loading',
          duration: 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})