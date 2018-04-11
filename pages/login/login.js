Page({
  data:{
    items: [
      { name: 'students', value: '学生', checked: 'true'},
      { name: 'teachers', value: '老师' },
      { name: 'admin', value: '管理员' }
    ],
    idMap:{
      'students': "/pages/adentrance/adentrance",
      'teachers': "",
      'admin':""
    },
    currId: 'students'
  },
  radioChange: function (e) {
    this.setData({ currId: e.detail.value})
  },
  toNext(){
    wx.redirectTo({ url: this.data.idMap[this.data.currId]})
  }
})