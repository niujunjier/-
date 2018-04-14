Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMode: false,
    maskTitle: {
      name: '进入教室',
      describe: ''
    },
    classValue: '',
    focus: false
  },
  toUserCenter(){
    wx.navigateTo({ url: "/pages/user/user"})
  },
  toClassCenter(){
    this.setData({ showMode: false, focus: false});
    wx.navigateTo({
      url: '/pages/qrcode/qrcode'
    })
  },
  setClassValue(e){
    this.setData({classValue: e.detail.value});
  },
  inputClassNum(){
    this.setData({ showMode: true, focus: true});
  },
  hideMode(){
    this.setData({ showMode: false, focus: false});
  }
})