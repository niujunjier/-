Page({
  data:{
    items: [
      { name: 'students', value: '学生'},
      { name: 'teachers', value: '老师' },
      { name: 'admin', value: '管理员', checked: 'true' }
    ],
    idMap:{
      'students': "/pages/stentrance/stentrance",
      'teachers': "/pages/teentrance/teentrance",
      'admin':"/pages/adentrance/adentrance"
    },
    currId: 'admin'
  },
  radioChange: function (e) {
    this.setData({ currId: e.detail.value})
  },
  toNext(){
    wx.redirectTo({ url: this.data.idMap[this.data.currId]})
  }
})