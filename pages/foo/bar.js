// pages/foo/bar.js
Page({
  data: {
    name: 'Jack'
  },
  changeName(){
    this.setData({
      name: 'Mary'
    })
  }
})