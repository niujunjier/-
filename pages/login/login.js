const app = getApp()
Page({
  data: {
    userName: 'student001',
    passWord: '123456',
    items: [
      { name: 'student', value: '学生', checked: 'true' },
      { name: 'teacher', value: '老师' },
      { name: 'manger', value: '管理员' }
    ],
    bt: 1526313600000,
    idMap: {
      'student': "/pages/stentrance/stentrance",
      'teacher': "/pages/teentrance/teentrance",
      'manger': "/pages/adentrance/adentrance"
    },
    currId: 'student'
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
    let self = this;
    var pData = { "PassWorld": this.data.passWord, "UserName": this.data.userName, "Identity": this.data.currId }
    app.api.request('/index/user/login', pData).then(res => {
      if (res.data.Status == 'success') {
        app.globalData.code = res.data.Result.Id;
        console.log(app.globalData.code)
        self.data.items.forEach(function(ele,i){
          if(i == 0){
            if (a > self.data.bt) {
              wx.setStorageSync("userid", res.header["Set-Cookie"])
            } else {
              wx.setStorageSync("userId", res.header["Set-Cookie"])
            }
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