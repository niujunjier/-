const app = getApp()
Page({
  data: {
    userName: '',
    passWord: '',
    items: [
      { name: 'student', value: '学生', checked: 'true'},
      { name: 'teacher', value: '老师' },
      { name: 'manger', value: '管理员' }
    ],
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
    var pData = { "PassWorld": this.data.passWord, "UserName": this.data.userName, "Identity": this.data.currId }
    app.api.request('/index/user/login', pData).then(res => {
      console.log(res)
      if (res.data.Status == 'success'){
        console.log(res.header["Set-Cookie"].split(';')[0])
        wx.setStorageSync("userId", res.header["Set-Cookie"])
        wx.redirectTo({ url: this.data.idMap[this.data.currId]})
      }else{
        wx.showToast({
          title: res.data.Message +'|'+ res.data.Status,
          icon: 'loading',
          duration: 2000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})