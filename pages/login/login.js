const app = getApp()
Page({
  data: {
    userName: '',
    passWord: '',
    items: [
      { name: 'students', value: '学生' },
      { name: 'teachers', value: '老师' },
      { name: 'admin', value: '管理员', checked: 'true' }
    ],
    idMap: {
      'students': "/pages/stentrance/stentrance",
      'teachers': "/pages/teentrance/teentrance",
      'admin': "/pages/adentrance/adentrance"
    },
    currId: 'admin'
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
    var pData = {
      UserName: 'student001',
      PassWorld: '123456',
      Identity: 'student'
    }
    app.api.request('/index/user/login', pData).then(res => {
      console.log(res)
      // if (res.data.Status == 'success'){
      //   wx.redirectTo({ url: this.data.idMap[this.data.currId]})
      // }else{
      //   wx.showToast({
      //     title: '账号或密码错误',
      //     icon: 'loading',
      //     duration: 2000
      //   })
      // }
      wx.redirectTo({ url: this.data.idMap[this.data.currId] })
    }).catch(err => {
      console.log(err)
    })
  }
})